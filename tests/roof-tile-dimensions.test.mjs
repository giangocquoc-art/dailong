import assert from "node:assert/strict";
import test, { after } from "node:test";
import { fileURLToPath } from "node:url";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";

const root = fileURLToPath(new URL("..", import.meta.url));
const vite = await createServer({
  appType: "custom",
  configFile: false,
  root,
  resolve: { alias: { "@": root } },
  server: { middlewareMode: true },
});

after(() => vite.close());

test("roof tile diagrams preserve the three verified L/M/S dimensions", async () => {
  const { RoofTileDimensions } = await vite.ssrLoadModule(
    "/components/roof-tile-dimensions.tsx",
  );
  for (const lang of ["vi", "en"]) {
    const html = renderToStaticMarkup(React.createElement(RoofTileDimensions, { lang }));
    assert.equal((html.match(/class="roof-size-card"/g) ?? []).length, 3);
    for (const measurement of ["200 mm", "195 mm", "100 mm", "145 mm", "165 mm", "80 mm", "102 mm", "117 mm", "60 mm"]) {
      assert.ok(html.includes(measurement), measurement);
    }
    assert.match(html, /role="img"/);
  }
});
