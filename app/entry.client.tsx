import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { initI18n } from "~/i18n/config";

function hydrate() {
  startTransition(() => {
    hydrateRoot(
      document,
      <StrictMode>
        <RemixBrowser />
      </StrictMode>
    );
  });
}

initI18n().then(hydrate).catch((err) => {
  console.error("i18n init failed, hydrating anyway:", err);
  hydrate();
});
