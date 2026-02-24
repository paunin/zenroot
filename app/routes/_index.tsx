import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useTranslation } from "react-i18next";

export const meta: MetaFunction = () => [
  { title: "Zen Root" },
  { name: "description", content: "Find your center. A mindful space for clarity and calm." },
];

const products = [
  {
    name: "Zen Launcher",
    descriptionKey: "products.launcher.description",
    href: "/launcher",
    external: false,
    image: "launcher.jpg",
  },
  {
    name: "Zen Radio",
    descriptionKey: "products.radio.description",
    href: "/radio",
    external: false,
    image: "radio.png",
  },
];

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="max-w-2xl mx-auto px-6 py-16 space-y-12">
      {products.map((product) => (
        <div key={product.name} className="space-y-5">
          {product.external ? (
            <a
              href={product.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xl font-outfit font-medium text-text-primary hover:text-accent transition-colors"
            >
              {product.name}
              <svg className="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          ) : (
            <Link
              to={product.href}
              className="inline-flex items-center gap-2 text-xl font-outfit font-medium text-text-primary hover:text-accent transition-colors"
            >
              {product.name}
              <svg className="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          )}
          {product.external ? (
            <a href={product.href} target="_blank" rel="noopener noreferrer">
              <img
                src={`/images/${product.image}`}
                alt={product.name}
                className="w-full aspect-[1280/800] rounded-2xl border border-border object-cover"
              />
            </a>
          ) : (
            <Link to={product.href}>
              <img
                src={`/images/${product.image}`}
                alt={product.name}
                className="w-full aspect-[1280/800] rounded-2xl border border-border object-cover"
              />
            </Link>
          )}
          <p className="text-sm text-text-secondary leading-relaxed">{t(product.descriptionKey)}</p>
        </div>
      ))}
    </div>
  );
}
