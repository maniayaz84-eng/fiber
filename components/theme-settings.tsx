"use client";

import { Check, Moon, Sun } from "lucide-react";
import { useAppTheme } from "@/components/app-shell";

export function ThemeSettings() {
  const { theme, setTheme } = useAppTheme();

  return (
    <section className="settings-section" aria-labelledby="appearance-heading">
      <div className="settings-section-heading">
        <span className="settings-section-icon"><Sun size={18} /></span>
        <div>
          <h2 id="appearance-heading">Appearance</h2>
          <p>Choose the color theme for Fiber Link on this device.</p>
        </div>
      </div>
      <div className="theme-options" role="group" aria-label="Color theme">
        <button
          className={`theme-option${theme === "light" ? " selected" : ""}`}
          type="button"
          aria-pressed={theme === "light"}
          onClick={() => setTheme("light")}
        >
          <span className="theme-preview theme-preview-light" aria-hidden="true">
            <span className="theme-preview-top" />
            <span className="theme-preview-content">
              <span className="theme-preview-sidebar" />
              <span className="theme-preview-lines"><i /><i /><i /></span>
            </span>
          </span>
          <span className="theme-option-label"><Sun size={15} /> Light</span>
          {theme === "light" && <span className="theme-option-check"><Check size={13} /></span>}
        </button>
        <button
          className={`theme-option${theme === "dark" ? " selected" : ""}`}
          type="button"
          aria-pressed={theme === "dark"}
          onClick={() => setTheme("dark")}
        >
          <span className="theme-preview theme-preview-dark" aria-hidden="true">
            <span className="theme-preview-top" />
            <span className="theme-preview-content">
              <span className="theme-preview-sidebar" />
              <span className="theme-preview-lines"><i /><i /><i /></span>
            </span>
          </span>
          <span className="theme-option-label"><Moon size={15} /> Dark</span>
          {theme === "dark" && <span className="theme-option-check"><Check size={13} /></span>}
        </button>
      </div>
      <p className="settings-hint">Your choice is saved in this browser and also available from the top menu.</p>
    </section>
  );
}
