import { Link } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header() {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-bg/80 border-b border-border">
      <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-outfit font-medium tracking-tight text-text-primary hover:text-accent transition-colors"
        >
          <img src="/images/icon.png" alt="" className="w-6 h-6" />
          Zen Root
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            to="/"
            className="text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            {t("nav.home")}
          </Link>
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
}
