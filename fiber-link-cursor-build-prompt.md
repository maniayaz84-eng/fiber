# Cursor Build Prompt — Fiber Link ISP Customer & Admin Web App

> **Project:** Fiber Link  
> **Product:** Bilingual customer portal and admin dashboard for a Pakistani fiber-internet provider  
> **Primary goal:** Let customers create accounts, browse internet packages, submit payment proof, and track activation. Let authorized admins review payments and activate subscriptions.

---

## 1. Your role

Act as a senior full-stack architect, product designer, security engineer, and pragmatic technical lead.

I am a beginner and do not know how to build or operate this system. Do not assume I understand technical terms. Make sensible decisions, explain important choices in plain language, and build the application in small, verifiable phases.

Do not merely generate a large amount of code. First inspect the repository, identify what already exists, and make a plan. Then implement, run checks, fix errors, and report exactly what works and what still needs configuration.

**Do not claim a feature is complete unless it has been implemented and verified.**

## 2. Product idea and business workflow

Fiber Link is a Pakistani fiber internet provider. Customers should be able to:

1. Open the public website.
2. Switch the interface between **English** and **Roman Urdu**.
3. Create an account, sign in, and sign out.
4. View available internet packages and their prices, speed, validity, and important conditions.
5. Select a package and submit a subscription request.
6. See the available payment instructions configured by Fiber Link (for example, bank transfer, JazzCash, or Easypaisa). Do not invent account numbers or payment details.
7. Upload a payment screenshot/receipt.
8. Submit the payment for review.
9. Receive an email confirming that the payment proof was received and is awaiting verification. Also notify the configured Fiber Link admin email that a payment needs review.
10. Track the request status from their dashboard.
11. After an admin approves the payment, see the subscription status change to **Approved / Activation pending** or **Active**, according to the real provisioning process.
12. Receive an email when the payment is approved, rejected, or the service is activated.

Admins should be able to:

- Sign in through a protected admin route.
- View a dashboard with pending payments, customers, packages, and subscription statuses.
- Review a payment screenshot securely.
- Approve or reject a payment, with an optional rejection reason.
- Activate a subscription only after the required approval and provisioning steps.
- Create, edit, publish, unpublish, and archive packages.
- View customer and subscription details.
- Search and filter records.
- See an audit history of important admin actions.

### Important business distinction

**Payment approval is not automatically the same as internet service activation.** Unless Fiber Link has a real ISP provisioning API or an administrator confirms that the connection has been provisioned, show `Activation pending`, not `Active`.

Build a clear, future-ready provisioning integration boundary, but do not pretend that a router, OLT, RADIUS, PPPoE, or ISP billing system has been connected. For the first version, an authorized admin may manually mark the service Active after confirming provisioning.

## 3. Target users and language

- Audience: customers in Pakistan.
- Brand name: **Fiber Link**.
- Languages: English and Roman Urdu (Urdu written using Latin characters).
- Use simple, familiar language and Pakistan-relevant examples.
- Currency: Pakistani Rupees, displayed as `PKR` or `Rs.` consistently.
- Phone input should support Pakistan's `+92` format while allowing sensible local formatting.
- Do not assume a city, coverage area, address, package, price, payment account, or support phone number. Make these configurable and use clearly labelled placeholders until Fiber Link supplies real information.

### Localization requirements

- Add a visible language switcher.
- Store translations in organized locale files or a similarly maintainable structure.
- Translate all customer-facing navigation, buttons, forms, validation messages, statuses, emails, and empty states.
- Use natural Roman Urdu, not Urdu script, for the Roman Urdu option.
- Keep package names, technical units, and brand names consistent between languages.
- Persist the selected language for the user where practical.
- Ensure layouts work with longer Roman Urdu text.

## 4. Recommended stack and architecture

Use a modern, stable, maintainable stack. Before installing packages, check current official documentation and choose mutually compatible stable versions. Do not use experimental features unless there is a strong reason.

- **Framework:** Next.js with App Router and TypeScript.
- **UI:** Tailwind CSS and a consistent accessible component system such as shadcn/ui.
- **Backend platform:** Supabase.
  - Supabase Auth for customer and admin authentication.
  - Supabase Postgres for application data.
  - Supabase Storage for private payment-proof files.
  - Row Level Security (RLS) for database access control.
- **Validation:** Zod or an equivalent TypeScript validation library.
- **Forms:** React Hook Form where useful.
- **Email:** Resend or another documented transactional email provider, called only from trusted server-side code.
- **Deployment target:** Vercel for the Next.js application and Supabase for backend services.
- **Testing:** unit/integration tests for critical business logic and Playwright for key end-to-end flows, where practical.

Prefer a modular monolith: one Next.js application with clear customer, admin, server, and data-access boundaries. Do not introduce microservices, Kubernetes, Redis, or extra infrastructure without a demonstrated need. Keep the first version cost-effective.

### Architecture principles

- Use Server Components by default; use Client Components only when interaction requires them.
- Use Server Actions or Route Handlers for trusted server-side mutations. Choose one consistent pattern for each kind of operation.
- Never trust client-side role checks or client-submitted prices/statuses.
- Keep Supabase access in well-defined server-side modules where possible.
- Use database constraints and transactions/RPCs for critical state transitions when appropriate.
- Paginate admin lists; do not fetch every record at once.
- Add indexes for common filters and joins.
- Keep external services behind small adapters so they can be replaced.
- Avoid unnecessary dependencies and duplicated business logic.

## 5. Roles and authorization

Implement at least these roles:

- `customer`
- `admin`

Rules:

- New public signups must always become `customer`.
- A visitor must never be able to select or assign themselves the `admin` role.
- Admin access must be granted only through a trusted server-side process or a controlled database operation by an existing authorized administrator.
- Protect every admin page, server action, route handler, and database operation. Hiding an admin link is not security.
- Enforce authorization in the database using RLS as well as in server-side application code.
- A customer may read and update only their own permitted profile fields.
- A customer may read only their own subscription/payment records.
- A customer may create a subscription request for themselves, but cannot set it to approved or active.
- A customer may upload payment proof only for their own eligible pending request.
- Customers must not read another customer's private payment screenshot or personal data.
- Only admins may review payment proof, change package availability, approve/reject payments, and mark service activation.
- Never expose the Supabase service-role key to the browser.

## 6. Database design

Create version-controlled Supabase SQL migrations. Include foreign keys, indexes, timestamps, constraints, and RLS policies. Adjust names if needed, but preserve the business rules.

Suggested tables:

### `profiles`

- `id` UUID primary key referencing `auth.users.id`
- `full_name`
- `phone`
- `preferred_locale` (`en` or `roman-ur`)
- `created_at`
- `updated_at`

Role assignment should use a secure design. Prefer a protected role table or trusted server-managed role metadata with database policies that prevent users from editing their own role. Do not rely on editable user metadata for authorization.

### `packages`

- `id` UUID primary key
- `name`
- `description`
- `speed_mbps`
- `price_pkr`
- `validity_days` or a clearly documented billing period
- `features` JSONB or normalized feature rows
- `is_published`
- `created_at`
- `updated_at`

Validate prices and speeds on the server. Store money in an appropriate exact numeric type, not floating-point.

### `subscriptions`

- `id` UUID primary key
- `customer_id` references profiles/auth users
- `package_id` references packages
- `package_price_pkr` snapshot at request time
- `status`
- `requested_at`
- `approved_at`
- `activated_at`
- `rejected_at`
- `rejection_reason`
- `service_address` and any necessary installation/contact fields, only if required by the actual business process
- `created_at`
- `updated_at`

Suggested status lifecycle:

`payment_pending` → `under_review` → `payment_approved` → `activation_pending` → `active`

Alternative terminal/retry statuses:

`payment_rejected`, `cancelled`, `suspended`, `expired`

Document allowed transitions. Reject invalid transitions on the server and, where suitable, in a database function/constraint.

### `payments`

- `id` UUID primary key
- `subscription_id`
- `customer_id`
- `amount_pkr`
- `payment_method`
- `transaction_reference` (optional)
- `proof_storage_path`
- `status` (`pending`, `approved`, `rejected`)
- `reviewed_by`
- `reviewed_at`
- `review_note`
- `created_at`
- `updated_at`

A payment screenshot is private financial/customer information. Store only a storage path in the database, not a public URL.

### `admin_audit_logs`

- `id` UUID primary key
- `admin_id`
- `action`
- `entity_type`
- `entity_id`
- `metadata` JSONB with safe, non-secret details
- `created_at`

Audit approval, rejection, package changes, role changes, and activation actions. Do not log passwords, access tokens, service keys, or payment screenshot contents.

You may add notification/outbox or email-delivery tables if they materially improve reliable email delivery. Avoid overengineering.

## 7. Payment proof upload and review

Implement a safe upload workflow:

1. Customer selects a payment method configured by the admin.
2. Show the exact configured instructions and amount due.
3. Customer uploads a receipt image.
4. Validate file size and allowed MIME types on the server. Allow only necessary image formats (for example JPEG, PNG, and WebP); do not trust the filename or browser MIME type alone.
5. Use a private Supabase Storage bucket, such as `payment-proofs`.
6. Generate non-guessable object paths tied to the authenticated customer and subscription.
7. Enforce Storage policies so customers can upload/read only their own eligible proof and admins can review proofs.
8. Do not create permanent public links. Use short-lived signed URLs generated only after authorization.
9. Prevent duplicate or conflicting submissions where appropriate.
10. Record the payment as pending and move the subscription into the correct review state.
11. Notify the customer and admin only after the database operation succeeds.
12. If email delivery fails, preserve the payment submission and record/retry the notification; do not lose the customer's request.

Do not integrate real payment processing or claim that a screenshot proves funds were received. Admin verification is required.

## 8. Email notifications

Create responsive, branded email templates in English and Roman Urdu.

Required notifications:

- Customer: payment proof received; payment is awaiting verification.
- Admin: new payment submission needs review.
- Customer: payment approved; activation is pending.
- Customer: payment rejected; include the admin's safe rejection reason and next step.
- Customer: internet service activated.
- Optional: subscription request/cancellation updates.

Requirements:

- Send email from trusted server-side code only.
- Use environment variables for provider API keys and sender identity.
- Never put secrets in source code or `NEXT_PUBLIC_*` variables.
- Validate recipient addresses and avoid email injection.
- Make notification sending resilient: a temporary email failure must not undo a valid payment submission.
- Avoid duplicate emails on retries; use idempotency or a notification/outbox record.
- In development, use a safe test mode or provider sandbox where available.
- Do not claim email has been delivered merely because an email API request was attempted. Record delivery/provider status where available.

## 9. Customer website and routes

Use a clear route structure. Adapt it if needed, but keep public, customer, and admin areas separate.

### Public routes

- `/` — Home page
- `/packages` — Internet packages
- `/coverage` — Coverage information (show configurable placeholder content until real areas are supplied)
- `/about` — About Fiber Link
- `/contact` — Contact information (configurable placeholders)
- `/login` — Sign in
- `/signup` — Create account
- `/forgot-password` — Password recovery
- `/auth/callback` — Supabase auth callback if required

### Customer routes

- `/dashboard` — Customer overview
- `/dashboard/packages` — Browse/select packages
- `/dashboard/subscribe/[packageId]` — Subscription request and payment instructions
- `/dashboard/subscriptions` — All of the customer's subscriptions
- `/dashboard/subscriptions/[id]` — Subscription details, payment status, and timeline
- `/dashboard/profile` — Profile and language preference

### Admin routes

- `/admin/login` — Admin sign-in entry (must still verify admin authorization)
- `/admin` — Admin overview
- `/admin/payments` — Payment review queue
- `/admin/payments/[id]` — Payment detail and private proof preview
- `/admin/subscriptions` — Subscription management
- `/admin/subscriptions/[id]` — Subscription detail and activation controls
- `/admin/customers` — Customer list and details
- `/admin/packages` — Package management
- `/admin/settings` — Configurable payment instructions, support details, and business settings
- `/admin/audit-logs` — Audit history

If you use route groups, keep URLs clean. Add loading, error, not-found, and unauthorized states.

## 10. UI/UX and customer experience

Create a polished, trustworthy ISP brand experience. Do not use a generic unstyled dashboard.

Visual direction:

- Brand: Fiber Link.
- Style: modern Pakistani telecom/internet provider; clean, fast, reliable, professional.
- Use a consistent color system with accessible contrast. A deep blue/navy base with a restrained cyan accent is a reasonable starting point, but define design tokens so the brand can be changed.
- Use clear typography, whitespace, readable cards, simple icons, and consistent button hierarchy.
- Responsive from small mobile screens upward. Many customers will use phones.
- Optimize loading performance and avoid heavy animation.
- Use accessible labels, keyboard navigation, visible focus states, semantic HTML, and helpful error messages.

Customer homepage should include:

- Clear headline explaining Fiber Link internet service.
- Primary call to action: View Packages.
- Package highlights.
- A simple “How it works” section: Choose package → Submit payment proof → Verification → Activation.
- Coverage/contact section with configurable content.
- Trust-building FAQ section without invented claims.

Customer dashboard should include:

- Welcome and account summary.
- Current subscription and status.
- Payment/subscription progress timeline.
- Clear next action.
- Package details and payment receipt status.
- Support/contact link using configured real details.

Admin dashboard should prioritize operational work:

- Pending payment count.
- New subscription requests.
- Recently reviewed payments.
- Active subscriptions.
- Search, filters, pagination, and clear status labels.
- Confirmation dialogs for important actions.
- Rejection reason field.
- Clear success/error feedback.

Avoid fake statistics, fake customer reviews, fake coverage claims, and invented business details. Use empty states when there is no real data.

## 11. Core workflows and acceptance criteria

The app is not complete until these flows work end-to-end.

### A. Signup and sign-in

- A new customer can register with email/password and required profile fields.
- Email confirmation behavior is configured and documented.
- New users receive only the customer role.
- Sign-in, sign-out, password reset, and session handling work.
- Protected pages redirect appropriately.
- An ordinary customer cannot access admin data or actions.

### B. Package selection

- Published packages appear publicly and in the customer dashboard.
- Unpublished packages cannot be newly subscribed to.
- Package price and details are revalidated on the server at submission time.
- Subscription stores a price snapshot so later package price changes do not rewrite old requests.

### C. Payment submission

- An authenticated customer can request a package and submit payment proof.
- Invalid file types, oversized files, and unauthorized uploads are rejected.
- Proof is stored privately.
- Customer sees a pending-review status.
- Admin receives a notification and can open the authorized review screen.
- Customer cannot approve their own payment or alter payment status.

### D. Admin review

- Admin can approve or reject a pending payment.
- Rejection requires a clear reason.
- The database update is authorized and state transitions are validated.
- An audit record is created.
- Customer receives the corresponding notification.
- Repeated clicks/retries do not create duplicate approvals or inconsistent records.

### E. Activation

- Payment approval changes the request to `activation_pending` unless real provisioning is confirmed.
- Admin can mark it `active` only after confirming service provisioning.
- Activation time and acting admin are recorded.
- Customer sees the updated status and receives an activation email.
- Never show `active` merely because payment was approved.

### F. Language and responsive behavior

- User can switch between English and Roman Urdu.
- Main customer flows and notification emails are translated.
- The application is usable on mobile, tablet, and desktop.

## 12. Security, privacy, and reliability checklist

Implement and verify:

- Supabase RLS on every table containing user/customer/business data.
- Private Storage bucket and Storage access policies.
- Server-side role checks for every admin operation.
- No service-role key or secret exposed to client code.
- Input validation on the server for all mutations.
- Safe file upload validation and private file access.
- CSRF protections appropriate to the chosen Next.js mutation approach.
- Rate limiting or abuse controls for authentication, uploads, and sensitive endpoints where practical.
- Secure session handling using the recommended current Supabase/Next.js approach.
- No passwords or secrets in logs.
- Safe error messages that do not expose internal details.
- Audit trail for privileged operations.
- Database backups and recovery considerations documented.
- Basic accessibility and dependency/security checks.

Do not invent a security guarantee. Explain any remaining risks or production configuration tasks.

## 13. Environment variables and setup documentation

Create `.env.example` with placeholder values only. Never create or commit a real `.env` file containing secrets.

Likely variables (use the exact names required by the chosen libraries):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` or the current recommended publishable key
- `SUPABASE_SERVICE_ROLE_KEY` (server only; only if genuinely needed)
- `RESEND_API_KEY`
- `EMAIL_FROM`
- `ADMIN_NOTIFICATION_EMAIL`
- `NEXT_PUBLIC_APP_URL`

Document where each value comes from and which values must remain private.

Create a beginner-friendly `README.md` covering:

1. What the application does.
2. Tools/accounts needed.
3. How to install dependencies.
4. How to configure Supabase.
5. How to apply database migrations.
6. How to create the first admin safely.
7. How to configure the private Storage bucket and policies.
8. How to configure email.
9. How to run locally.
10. How to run tests and production build.
11. How to deploy.
12. How to change packages, payment instructions, support details, and translations.
13. Common errors and how to resolve them.

Provide exact commands for Windows PowerShell as well as cross-platform commands where useful.

## 14. Build process: inspect → plan → implement → verify

Work in controlled phases. Do not skip verification.

### Phase 0 — Repository inspection

- Inspect the existing files, package manager, scripts, framework version, and current implementation.
- Do not overwrite working code without understanding it.
- Identify missing requirements and risks.
- Produce a concise implementation plan and proposed file structure.
- Ask me only for information that is genuinely blocking. Otherwise use clearly labelled placeholders.

### Phase 1 — Foundation

- Set up or repair Next.js, TypeScript, Tailwind, linting, and the UI component system.
- Add environment validation and `.env.example`.
- Build the responsive visual foundation and shared layout.
- Verify install, lint, typecheck, and build.

### Phase 2 — Supabase foundation

- Configure Supabase clients using current official guidance.
- Add SQL migrations, schema, indexes, RLS, Storage policies, and secure role management.
- Add seed data only for clearly labelled demo packages.
- Verify policies with customer and admin test identities.

### Phase 3 — Authentication and localization

- Implement signup, login, logout, password reset, and auth callback.
- Implement protected customer/admin routing.
- Implement English and Roman Urdu localization.
- Verify that customers cannot elevate their role.

### Phase 4 — Packages and customer portal

- Build public package pages and customer dashboard.
- Implement package selection and subscription request.
- Verify server-side package and price validation.

### Phase 5 — Payment proof and admin review

- Implement private receipt upload.
- Implement admin payment queue and secure receipt preview.
- Implement approval/rejection state transitions and audit logs.
- Implement email notifications with retry-safe behavior.
- Verify customer isolation and unauthorized-access cases.

### Phase 6 — Activation and operational settings

- Implement activation-pending and active states.
- Add manual admin activation with confirmation and audit history.
- Add configurable payment instructions and business contact settings.
- Keep future ISP provisioning integration behind a documented adapter/interface.

### Phase 7 — Final QA and handoff

- Run lint, typecheck, tests, and production build.
- Run Playwright tests for signup, package selection, payment upload, admin review, rejection, and activation.
- Test mobile layouts and both languages.
- Fix all discovered issues that are within scope.
- Review RLS and Storage policies again.
- Provide a final report with completed features, test results, remaining setup, known limitations, and exact next steps.

At the end of each phase, summarize:
- What was built.
- Files/migrations changed.
- Commands run and whether they passed.
- Any issue that remains.
- What the next phase will do.

Do not silently skip a failed check. Diagnose and fix it, or explain why it cannot be fixed yet.

## 15. Cursor working rules

- Use the repository's existing conventions unless they are unsafe or clearly unsuitable.
- Read relevant files before editing them.
- Prefer small, focused changes over rewriting the entire project.
- Keep components reusable and business logic out of presentation components.
- Use strict TypeScript; avoid `any` unless justified and documented.
- Do not hardcode real credentials, payment details, email addresses, package prices, phone numbers, or coverage areas.
- Do not fabricate API integrations or pretend external services are configured.
- Do not disable lint, type checking, RLS, or security checks just to make a build pass.
- Add tests for important business rules and authorization.
- Update README and `.env.example` whenever setup changes.
- If a required external account or secret is missing, build the integration safely with documented configuration steps and a development-safe fallback.
- Keep a `TODO` only when a real external dependency or business decision blocks completion. Explain each TODO in the final report.

## 16. Initial business information to configure later

Use placeholders and make these editable in admin settings until the owner supplies verified values:

- Fiber Link logo and brand assets.
- Actual packages, speed, price, validity, and fair-usage policy.
- Supported coverage areas.
- Payment methods and verified account instructions.
- Customer support phone/WhatsApp/email.
- Business address and operating hours.
- Admin notification email.
- Email sender domain and verification.
- Actual ISP provisioning process or API details.
- Terms of service, privacy policy, cancellation/refund policy.

Do not invent any of the above.

## 17. Definition of done

The first production-ready release is done only when:

- A customer can sign up and sign in.
- A customer can browse real configured packages and submit a subscription request.
- A customer can upload payment proof to private storage.
- The customer and admin receive the correct status notifications, subject to configured email delivery.
- An authorized admin can securely review, approve, or reject a payment.
- Approval does not falsely activate the internet service.
- An authorized admin can mark service active after actual provisioning.
- Customers can see only their own records and files.
- English and Roman Urdu work throughout the core journey.
- RLS, Storage policies, server-side authorization, and audit logging are implemented and tested.
- Lint, typecheck, automated tests, and production build pass.
- README and `.env.example` explain how a beginner can configure and deploy the app.

---

# Start here

First inspect the current Cursor workspace and repository. Then show me a short plan and the proposed architecture. If the repository is empty, scaffold the project. If it already contains code, preserve and improve it.

**Do not start by generating every page at once. Build phase by phase, verify each phase, and keep the application runnable throughout.**
