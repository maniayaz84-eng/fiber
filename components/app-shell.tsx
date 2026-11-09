"use client";

import Link from "next/link";
import {
  ChevronDown,
  Globe2,
  LayoutDashboard,
  LogIn,
  Menu,
  Moon,
  Settings,
  Sun,
  UserCircle,
  X,
} from "lucide-react";
import { SignalLink } from "@/components/signal-link";
import {
  useEffect,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { HelpAssistant } from "@/components/help-assistant";

type Locale = "en" | "roman-ur";
type Theme = "light" | "dark";

const preferenceEvent = "fiber-link-preference-change";

function subscribeToPreferences(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(preferenceEvent, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(preferenceEvent, onChange);
  };
}

function notifyPreferenceChange() {
  window.dispatchEvent(new Event(preferenceEvent));
}

function setLocalePreference(locale: Locale) {
  window.localStorage.setItem("fiber-link-locale", locale);
  notifyPreferenceChange();
}

function setThemePreference(theme: Theme) {
  window.localStorage.setItem("fiber-link-theme", theme);
  notifyPreferenceChange();
}

function getLocaleSnapshot(): Locale {
  return window.localStorage.getItem("fiber-link-locale") === "roman-ur"
    ? "roman-ur"
    : "en";
}

function getThemeSnapshot(): Theme {
  const savedTheme = window.localStorage.getItem("fiber-link-theme");
  if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function useAppPreferences() {
  const locale = useSyncExternalStore<Locale>(
    subscribeToPreferences,
    getLocaleSnapshot,
    () => "en",
  );
  return locale;
}

export function useAppTheme() {
  const theme = useSyncExternalStore<Theme>(
    subscribeToPreferences,
    getThemeSnapshot,
    () => "light",
  );
  return { theme, setTheme: setThemePreference };
}

const labels = {
  en: {
    home: "Home",
    packages: "Packages",
    coverage: "Coverage",
    about: "About",
    contact: "Contact",
    howItWorks: "How it works",
    signIn: "Sign in",
    getStarted: "Get started",
    profile: "Profile",
    settings: "Settings",
    admin: "Admin preview",
    language: "Language",
    theme: "Appearance",
    light: "Light",
    dark: "Dark",
    menu: "Open menu",
  },
  "roman-ur": {
    home: "Home",
    packages: "Packages",
    coverage: "Coverage",
    about: "Hamaray baare mein",
    contact: "Rabita",
    howItWorks: "Tareeqa",
    signIn: "Sign in",
    getStarted: "Shuru karein",
    profile: "Profile",
    settings: "Settings",
    admin: "Admin preview",
    language: "Zabaan",
    theme: "Appearance",
    light: "Light",
    dark: "Dark",
    menu: "Menu kholein",
  },
} satisfies Record<Locale, Record<string, string>>;

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      className={`brand${compact ? " brand-compact" : ""}`}
      href="/"
      aria-label="Fiber Link home"
    >
      <span className="brand-mark" aria-hidden="true">
        <svg viewBox="0 0 64 64" fill="none">
          <path
            d="M11 22c12.4-10.7 29.6-10.7 42 0M18 31c8.3-7.1 19.7-7.1 28 0M25 40c4.1-3.5 9.9-3.5 14 0"
            stroke="white"
            strokeLinecap="round"
            strokeWidth="4"
          />
          <circle cx="32" cy="48" r="3.5" fill="#A8FFF3" />
        </svg>
      </span>
      <span className="brand-wordmark">
        <span className="brand-name">
          Fiber<span>Link</span>
        </span>
        <span className="brand-tagline">INTERNET</span>
      </span>
    </Link>
  );
}

function Header() {
  const locale = useAppPreferences();
  const { theme, setTheme } = useAppTheme();
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = labels[locale];

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.lang = locale === "en" ? "en" : "ur-Latn";
  }, [locale, theme]);

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  function changeLocale(nextLocale: Locale) {
    setLocalePreference(nextLocale);
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          <Link href="/">{t.home}</Link>
          <Link href="/packages">{t.packages}</Link>
          <Link href="/coverage">{t.coverage}</Link>
          <Link href="/about">{t.about}</Link>
          <Link href="/contact">{t.contact}</Link>
          <Link href="/#how-it-works">{t.howItWorks}</Link>
        </nav>
        <div className="header-actions">
          <SignalLink className="icon-button signal-header-link" />
          <button
            className="icon-button language-button"
            type="button"
            aria-label={`${t.language}: ${locale === "en" ? "English" : "Roman Urdu"}`}
            onClick={() => changeLocale(locale === "en" ? "roman-ur" : "en")}
          >
            <Globe2 size={17} />
            <span>{locale === "en" ? "EN" : "RU"}</span>
          </button>
          <button
            className="icon-button theme-button"
            type="button"
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
            onClick={toggleTheme}
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <div className="profile-wrap">
            <button
              className="profile-trigger"
              type="button"
              aria-label={`${t.profile} menu`}
              aria-expanded={profileOpen}
              aria-haspopup="menu"
              onClick={() => setProfileOpen((open) => !open)}
            >
              <span className="profile-avatar">
                <UserCircle size={21} />
              </span>
              <span className="profile-label">{t.profile}</span>
              <ChevronDown size={15} />
            </button>
            {profileOpen && (
              <div className="profile-menu" role="menu">
                <p className="menu-eyebrow">{t.profile}</p>
                <Link href="/login" role="menuitem" onClick={() => setProfileOpen(false)}>
                  <LogIn size={16} /> {t.signIn}
                </Link>
                <Link href="/settings" role="menuitem" onClick={() => setProfileOpen(false)}>
                  <Settings size={16} /> {t.settings}
                </Link>
                <Link href="/admin" role="menuitem" onClick={() => setProfileOpen(false)}>
                  <LayoutDashboard size={16} /> {t.admin}
                </Link>
                <div className="menu-theme-row">
                  <span>{t.theme}</span>
                  <button className="theme-choice" type="button" onClick={toggleTheme}>
                    {theme === "light" ? <Moon size={15} /> : <Sun size={15} />}
                    {theme === "light" ? t.dark : t.light}
                  </button>
                </div>
              </div>
            )}
          </div>
          <Link className="button button-small header-cta" href="/signup">
            {t.getStarted}
          </Link>
          <button
            className="icon-button mobile-menu-button"
            type="button"
            aria-label={mobileOpen ? "Close menu" : t.menu}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          <Link href="/" onClick={() => setMobileOpen(false)}>{t.home}</Link>
          <Link href="/packages">{t.packages}</Link>
          <Link href="/coverage">{t.coverage}</Link>
          <Link href="/about" onClick={() => setMobileOpen(false)}>{t.about}</Link>
          <Link href="/contact" onClick={() => setMobileOpen(false)}>{t.contact}</Link>
          <Link href="/#how-it-works">{t.howItWorks}</Link>
          <Link href="/login" onClick={() => setMobileOpen(false)}>{t.signIn}</Link>
          <Link href="/settings" onClick={() => setMobileOpen(false)}>{t.settings}</Link>
          <Link href="/admin" onClick={() => setMobileOpen(false)}>{t.admin}</Link>
        </nav>
      )}
    </header>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <HelpAssistant />
    </>
  );
}

export { Brand };
