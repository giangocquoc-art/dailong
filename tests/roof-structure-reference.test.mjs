import assert from "node:assert/strict";
import test, { after } from "node:test";
import { fileURLToPath } from "node:url";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";

const root = fileURLToPath(new URL("..", import.meta.url));
const vite = await createServer({
  appType: "custom", configFile: false, root,
  resolve: { alias: { "@": root } }, server: { middlewareMode: true },
});
after(() => vite.close());

test("roof structure and measurements retain both cards and all original L/M/S labels", async () => {
  const { RoofTileConstruction, RoofTileDimensions } =
    await vite.ssrLoadModule("/components/roof-tile-dimensions.tsx");
  const html = renderToStaticMarkup(
    React.createElement(React.Fragment, null,
      React.createElement(RoofTileConstruction, { lang: "vi" }),
      React.createElement(RoofTileDimensions, { lang: "vi" }),
    ),
  );
  assert.equal((html.match(/roof-construction-card/g) ?? []).length, 2);
  assert.match(html, /\/images\/roof\/than-mai-from-reference\.webp/);
  assert.match(html, /\/images\/roof\/diem-mai-from-reference\.webp/);
  assert.equal((html.match(/class="product-info-card roof-construction-card"/g) ?? []).length, 2);
  assert.equal((html.match(/class="roof-size-card"/g) ?? []).length, 3);
  assert.match(html, /Thân mái: Ngói âm và Ngói dương/);
  assert.match(html, /Diềm mái: Diềm âm và Diềm dương/);
  for (const size of ["200 mm", "195 mm", "100 mm", "145 mm", "165 mm", "80 mm", "102 mm", "117 mm", "60 mm"]) {
    assert.ok(html.includes(size), size);
  }
});
