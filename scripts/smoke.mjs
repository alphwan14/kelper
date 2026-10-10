/**
 * Smoke test for a running build. No dependencies.
 *
 *   npm run build && npm start      # in one terminal
 *   npm run smoke                   # checks http://localhost:3000
 *   npm run smoke -- https://kelper.co.ke   # after a deploy
 */
const base = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");
const site = "https://kelper.co.ke";

const pages = ["/", "/services", "/services/construction", "/services/engineering", "/services/supplies", "/quote", "/about", "/contact", "/privacy"];
const other200 = ["/credits", "/robots.txt", "/sitemap.xml", "/opengraph-image", "/icon.svg", "/apple-icon", "/manifest.webmanifest", "/brand/kelper-mark.png", "/brand/kelper-logo.svg"];
const gone = ["/print", "/prepare", "/prepare/kra-pin", "/services/printing", "/services/kra-services", "/services/cv-writing"];
const missing = ["/does-not-exist", "/services/unknown"];
// Words from the retired cybercafé site that must not appear on any page.
const banned = /cyber ?caf|photocop|kuccps|ecitizen|nil returns|print job|paperwork, sorted/i;

let failures = 0;
const check = (ok, msg) => {
  console.log(`${ok ? "ok  " : "FAIL"} ${msg}`);
  if (!ok) failures++;
};
const get = (path) => fetch(base + path, { redirect: "manual" });

for (const path of pages) {
  const res = await get(path);
  const html = await res.text();
  check(res.status === 200, `${path} → ${res.status}`);
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  // Next.js may print the root canonical with or without the trailing slash.
  check([site + path, path === "/" ? site : null].includes(canonical), `${path} canonical ${canonical}`);
  check(/<title>[^<]*Kelper Investments Ltd[^<]*<\/title>/.test(html), `${path} title names the company`);
  check((html.match(/<h1[\s>]/g) ?? []).length === 1, `${path} has exactly one h1`);
  check(!banned.test(html), `${path} has no retired cybercafé copy`);
  check(!/<img(?![^>]*\balt="[^"])[^>]*>/.test(html), `${path} every image has alt text`);
}
for (const path of other200) check((await get(path)).status === 200, `${path} → 200`);
for (const path of gone) check((await get(path)).status === 410, `${path} → 410 Gone`);
for (const path of missing) check((await get(path)).status === 404, `${path} → 404`);

const sitemap = await (await get("/sitemap.xml")).text();
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(site, "") || "/");
check(pages.every((p) => locs.includes(p)) && locs.length === pages.length, `sitemap lists exactly the ${pages.length} public pages`);
const robots = await (await get("/robots.txt")).text();
check(robots.includes(`Sitemap: ${site}/sitemap.xml`), "robots.txt points to the sitemap");

console.log(failures ? `\n${failures} check(s) failed` : "\nAll checks passed");
process.exit(failures ? 1 : 0);
