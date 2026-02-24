import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "icon", href: "/images/icon.svg", type: "image/svg+xml" },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Static meta for bots/crawlers (before JS loads) */}
        <title>Zen Root</title>
        <meta name="description" content="Find your center. A mindful space for clarity and calm." />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Zen Root" />
        <meta property="og:title" content="Zen Root" />
        <meta property="og:description" content="Find your center. A mindful space for clarity and calm." />
        <meta property="og:image" content="https://zenroot.io/images/meta.png" />
        <meta property="og:url" content="https://zenroot.io" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Zen Root" />
        <meta name="twitter:description" content="Find your center. A mindful space for clarity and calm." />
        <meta name="twitter:image" content="https://zenroot.io/images/meta.png" />

        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <div className="flex flex-col min-h-dvh">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export function HydrateFallback() {
  return (
    <div className="flex items-center justify-center h-dvh bg-bg text-text-primary">
      <p className="text-text-secondary text-sm animate-pulse">Loading…</p>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <div className="flex items-center justify-center h-dvh bg-bg text-text-primary">
      <div className="text-center p-8">
        <h1 className="text-2xl font-semibold mb-2">
          {isRouteErrorResponse(error)
            ? `${error.status} ${error.statusText}`
            : "Something went wrong"}
        </h1>
        <p className="text-text-secondary">
          {isRouteErrorResponse(error)
            ? error.data
            : "Please refresh the page and try again."}
        </p>
      </div>
    </div>
  );
}
