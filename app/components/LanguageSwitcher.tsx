import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { supportedLngs } from "~/i18n/config";

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  function switchLang(newLang: string) {
    i18n.changeLanguage(newLang);
    setOpen(false);
  }

  return (
    <>
      {open && (
        <div
          className="fixed inset-0"
          style={{ zIndex: 100 }}
          onClick={() => setOpen(false)}
        />
      )}
      <div className="relative" style={{ zIndex: open ? 102 : undefined }}>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors px-2 py-1 rounded-lg hover:bg-hover"
          aria-label={t("language.label")}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9 9 0 100-18 9 9 0 000 18zm0 0c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3s-4.5 4.03-4.5 9 2.015 9 4.5 9zM3 12h18" />
          </svg>
          <span className="uppercase text-xs font-medium">{i18n.language.slice(0, 2)}</span>
        </button>

        {open && (
          <div
            className="absolute right-0 top-full mt-2 w-40 rounded-xl border border-white/15 bg-[#1c1c26] overflow-hidden"
            style={{ zIndex: 101, boxShadow: "0 8px 32px rgba(0,0,0,0.6)" }}
          >
            {supportedLngs.map((lng) => (
              <button
                key={lng}
                type="button"
                onClick={() => switchLang(lng)}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                  i18n.language.startsWith(lng)
                    ? "text-accent bg-accent-dim"
                    : "text-text-secondary hover:text-text-primary hover:bg-hover"
                }`}
              >
                {t(`language.${lng}`)}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
