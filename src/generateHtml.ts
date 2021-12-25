// 1. generate html file
import fs from "fs/promises";
import path from "path";
import { OUTPUT_HTML_FILENAME, OUTPUT_TREE_FILENAME } from "./constants";
// import chalk from "chalk";

export const generateHtml = async (outputPath: string) => {
  // e D:\project\frontend-5.0\node_modules\project-maps\dist
  // console.log("---", __dirname, "--", process.cwd(), "--", __filename);
  const chartJsPath = path.relative(
    process.cwd(),
    __filename.replace(/mapcli\.js/g, "chart.js")
  );
  // console.log("chartJsPath", chartJsPath);
  const str = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Project-Maps</title>
      <style>
        * {
          padding: 0;
          margin: 0;
        }
      </style>
    </head>
    <body>
      <div style="width: 100vw; height: 100vh; display: flex">
        <div id="container" style="flex: 1"></div>
      </div>
      <script src="./${OUTPUT_TREE_FILENAME}"></script>
      <script src="./${chartJsPath}"></script>
    </body>
  </html>

  `;
  // link chart.js url
  try {
    await fs.writeFile(path.resolve(outputPath, OUTPUT_HTML_FILENAME), str);
    console.log(`write-${OUTPUT_HTML_FILENAME}.js-success`);
  } catch (error) {
    console.error(`write-${OUTPUT_HTML_FILENAME}.js-error`, error);
  }
};
