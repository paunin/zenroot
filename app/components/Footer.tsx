import { Link } from "@remix-run/react";
import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-border py-8 px-6">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <p className="text-xs text-text-secondary">
          &copy; {new Date().getFullYear()} Zen Root. {t("footer.rights")}
        </p>
        <Link
          to="/privacy-policy"
          className="text-xs text-text-secondary hover:text-text-primary transition-colors"
        >
          {t("footer.privacy")}
        </Link>
      </div>
    </footer>
  );
}
