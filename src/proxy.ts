/**
 * Retired cybercafé URLs (site launched 9 Oct 2026, rebranded 10 Oct 2026).
 * None has an equivalent on the new site, so they answer 410 Gone, which tells
 * search engines to drop them, rather than redirecting to an unrelated page
 * (which Google treats as a soft 404). The matcher keeps this off every other route.
 */
export function proxy() {
  return new Response(
    `<!doctype html><html lang="en-KE"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Page removed | Kelper Investments Ltd</title></head><body style="font-family:system-ui,sans-serif;max-width:36rem;margin:4rem auto;padding:0 1rem;color:#101b29;background:#f5f3ee"><h1>This page has been removed</h1><p>Kelper is now Kelper Investments Ltd: construction, engineering services and supplies.</p><p><a href="/">Go to the home page</a></p></body></html>`,
    { status: 410, headers: { "content-type": "text/html; charset=utf-8", "x-robots-tag": "noindex" } },
  );
}

export const config = {
  matcher: [
    "/print",
    "/prepare",
    "/prepare/:path*",
    "/services/(printing|photocopying|scanning|binding-lamination|typing|cv-writing|job-applications|kra-services|ecitizen|student-funding|school-printing|business-printing|computer-internet)",
  ],
};
