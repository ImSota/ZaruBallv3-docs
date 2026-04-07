const fs = require("fs");
const opentype = require("opentype.js");
const https = require("https");

// Create an SVG from 'Z' in Plaster font
// First, we need the Plaster TTF.
// From Google Fonts: https://fonts.gstatic.com/s/plaster/v33/zZ-rXyRuHqXwv63Zz5k.ttf

const fontUrl =
  "https://fonts.gstatic.com/s/plaster/v33/zZ-rXyRuHqXwv63Zz5k.ttf";
const dest = "./plaster.ttf";

https
  .get(fontUrl, (res) => {
    const file = fs.createWriteStream(dest);
    res.pipe(file);
    file.on("finish", () => {
      file.close(() => {
        opentype.load(dest, (err, font) => {
          if (err) {
            console.error("Font could not be loaded: " + err);
            return;
          }
          const path = font.getPath("Z", 0, 75, 100);
          const svgPathData = path.toPathData(2);

          const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <path d="${svgPathData}" fill="currentColor" />
  <style>
    path { fill: #000; }
    @media (prefers-color-scheme: dark) { path { fill: #fff; } }
  </style>
</svg>`;

          fs.writeFileSync("./public/favicon.svg", svgContent);
          console.log("favicon.svg created successfully");
        });
      });
    });
  })
  .on("error", (err) => {
    console.error("Error downloading font:", err.message);
  });
