import { useNavigate, useLocation } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { useState, useEffect } from "react";
import { SUPPORTED_LANGS } from "~/lib/constants";

interface SettingsModalProps {
  currentLang: string;
}

export function SettingsModal({ currentLang }: SettingsModalProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  async function switchLang(newLang: string) {
    const pathWithoutLang = location.pathname.replace(/^\/[a-z]{2}/, "");
    await i18next.changeLanguage(newLang);
    navigate(`/${newLang}${pathWithoutLang || ""}`);
    setOpen(false);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors px-2 py-1 rounded-lg hover:bg-hover"
        aria-label={t("settings.title")}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="relative w-full max-w-sm rounded-2xl border border-border bg-panel backdrop-blur-xl shadow-2xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h2 className="text-sm font-semibold text-text-primary">{t("settings.title")}</h2>
              <button
                onClick={() => setOpen(false)}
                className="text-text-secondary hover:text-text-primary transition-colors p-1 rounded-lg hover:bg-hover"
                aria-label="Close"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="px-5 py-4">
              <p className="text-xs font-medium text-text-label uppercase tracking-wide mb-3">
                {t("settings.language_label")}
              </p>
              <div className="flex flex-wrap gap-2">
                {SUPPORTED_LANGS.map((lng) => (
                  <button
                    key={lng}
                    onClick={() => switchLang(lng)}
                    className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                      lng === currentLang
                        ? "text-accent bg-accent-dim border border-accent/20"
                        : "text-text-secondary hover:text-text-primary bg-hover/50 border border-border hover:border-border"
                    }`}
                  >
                    {t(`language.${lng}`)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
