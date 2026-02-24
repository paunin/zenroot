import { cpSync, mkdirSync, readFileSync, readdirSync } from "node:fs";
import { join, basename } from "node:path";

const clientDir = "build/client";
const routesDir = "app/routes";
const indexHtml = join(clientDir, "index.html");

const routes = readdirSync(routesDir)
  .filter((f) => f.endsWith(".tsx") && f !== "_index.tsx")
  .map((f) => basename(f, ".tsx"));

for (const route of routes) {
  const dir = join(clientDir, route);
  mkdirSync(dir, { recursive: true });
  cpSync(indexHtml, join(dir, "index.html"));
  console.log(`  -> ${route}/index.html`);
}

console.log(`Copied index.html to ${routes.length} route(s)`);
