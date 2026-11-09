# Fiber Link

Fiber Link is the starting point for a bilingual customer portal and admin workspace for a Pakistani fiber internet provider. This first implementation is a visual, runnable foundation. It does not yet authenticate users, store customer data, accept payment proof, send email, or manage live ISP services.

## Requirements

- Node.js 20.9 or later
- npm
- A Supabase project for the later authentication and database phases

## Run locally

In Windows PowerShell, from the project folder:

```powershell
npm.cmd install
npm.cmd run dev
```

Open http://localhost:3000.

To run checks:

```powershell
npm.cmd run lint
npm.cmd run typecheck
npm.cmd run build
```

## Current preview

- Responsive Fiber Link branding and navigation
- Custom fiber-network logo mark and matching browser icon
- English/Roman Urdu switcher for the landing page and navigation
- Persistent light/dark theme preference
- Profile menu with sign-in, settings, and admin preview links
- Public landing, package, and coverage placeholder pages
- About and contact pages with verified-information placeholders
- Admin workspace preview at `/admin` with payment, subscription, customer, package, settings, audit-history, and sign-in-preview routes
- Light/dark appearance selection on the personal settings page
- Customer help assistant with browser speech input and spoken replies when supported

The help assistant answers general questions only; it is not connected to a live agent or customer account. With Roman Urdu selected, its guidance and spoken replies are in Roman Urdu. The browser voice uses the Pakistani English speech locale because Roman Urdu is written in Latin letters; recognition and pronunciation depend on browser support and available voices. Audio is handled by the browser's speech service and may be processed under that provider's privacy policy. Customers are warned not to share passwords, payment information, or private documents.

The admin screens are **not protected by authentication yet** and must not be used for real operations. They show empty preview states only. Supabase authentication, server-side role enforcement, database migrations, and Row Level Security are required before connecting business data or enabling admin actions.

## Environment configuration

Copy `.env.example` to `.env.local` when the backend phase begins. Supabase and email integrations are not active yet. Never put a Supabase service-role key in a `NEXT_PUBLIC_*` variable or expose it to browser code.

Do not add real package prices, support details, payment instructions, coverage claims, or admin accounts until Fiber Link has supplied verified values.

## Roadmap

1. Foundation and shared responsive design
2. Customer/admin authentication and Supabase RLS
3. Package and subscription flows
4. Private payment-proof storage and admin review
5. Notifications, audit history, business settings, and activation
6. Automated tests, deployment setup, and operational documentation
