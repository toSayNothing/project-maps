// this file has two missions:
// 1. output default config for user
// 2. get all folder tree data
// 2. generate folderMapScript and html file

import fs from "fs/promises";
import path from "path";
import fileSize from "filesize";
import {
  UserConfig,
  DEFAULT_CONFIG,
  WINDOW_TREE_KEY,
  OUTPUT_CONFIG_FILENAME,
  OUTPUT_HTML_FILENAME,
} from "./constants";

export interface TreeDataItem {
  parentName: string;
  fullPath: string;
  relativePath: string;
  size: string;
  desc: string;
  collapsed: boolean;
  children?: {
    [key: string]: TreeDataItem;
  };
}

/** 1. output default config for user */
export const outputDefaultConfig = async (outputPath: string) => {
  const oldUserConfig = getUserConfig();
  // check old config file, then merge it
  // console.log("oldUserConfig", oldUserConfig);
  const toWriteConfig: UserConfig = oldUserConfig
    ? {
        exclude: [
          ...new Set(oldUserConfig.exclude.concat(DEFAULT_CONFIG.exclude)),
        ],
        // merge user desc and default desc
        relativepathDesc: [
          ...new Set([
            ...Object.keys(DEFAULT_CONFIG.relativepathDesc),
            ...Object.keys(oldUserConfig.relativepathDesc),
          ]),
        ].reduce<UserConfig["relativepathDesc"]>((acc, cur) => {
          acc[cur] = Object.assign(
            {},
            oldUserConfig.relativepathDesc[cur] ?? {},
            DEFAULT_CONFIG.relativepathDesc[cur] ?? {}
          );
          return acc;
        }, {}),
      }
    : DEFAULT_CONFIG;
  try {
    await fs.writeFile(
      path.resolve(outputPath, OUTPUT_CONFIG_FILENAME),
      `module.exports = ` + JSON.stringify(toWriteConfig, null, 2)
    );
    console.log("write-projectMaps.config.js-success");
  } catch (err) {
    console.error("write-projectMaps.config.js-error", err);
  }
};

function makeTreeDataItem(
  parentName: string,
  fullPath: string,
  relativePath: string,
  size: string,
  desc: string,
  isDir: boolean,
  collapsed: boolean
) {
  const obj: TreeDataItem = {
    parentName,
    fullPath,
    relativePath,
    size,
    desc, // init to empty string
    collapsed,
  };
  if (isDir) obj.children = {};
  return obj;
}
const getUserConfig = () => {
  try {
    const userConfig: typeof DEFAULT_CONFIG = require(path.resolve(
      process.cwd(),
      OUTPUT_CONFIG_FILENAME
    ));
    return userConfig;
  } catch (error) {
    console.error("getUserConfig-error,use default config");
    return DEFAULT_CONFIG;
  }
};
const searchPath = async (
  pathName: string,
  userConfig: typeof DEFAULT_CONFIG,
  parentName: string,
  obj: Record<string, TreeDataItem>,
  level: number
) => {
  let arr = await fs.readdir(path.resolve(pathName));
  arr = arr.filter((fileName) => !userConfig.exclude.includes(fileName));
  await Promise.all(
    arr.map(async (fileName) => {
      const fullFileName = path.resolve(pathName, fileName);
      const curRelativePath = path.relative(process.cwd(), fullFileName);
      const curDesc = userConfig.relativepathDesc[curRelativePath]?.desc ?? "";
      const isLevelCollapsed = level <= 2 ? false : true;
      const curCollapsed =
        userConfig.relativepathDesc[curRelativePath]?.collapsed ??
        isLevelCollapsed;
      const stat = await fs.stat(fullFileName);
      const isDir = stat.isDirectory();
      obj[fileName] = makeTreeDataItem(
        parentName,
        fullFileName,
        curRelativePath,
        fileSize(stat.size),
        curDesc,
        isDir,
        curCollapsed
      );
      if (isDir) {
        await searchPath(
          fullFileName,
          userConfig,
          fileName,
          obj[fileName].children ?? {},
          level + 1
        );
      }
    })
  );
};

/** 2. get all folder tree data */
export const generateFolderMapScripts = async (rootPath: string) => {
  const treeObj = {};
  const userConfig = getUserConfig();
  try {
    await searchPath(rootPath, userConfig, "root", treeObj, 1);
    return `window.${WINDOW_TREE_KEY} = ` + JSON.stringify(treeObj, null, 2);
  } catch (error) {
    console.log("write-projectMaps.tree.js-error", error);
  }
};

/** 3. generate folderMapScript and html file */
export const generateHtml = async (outputPath: string) => {
  const folderMapScripts = await generateFolderMapScripts(outputPath);
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
      <script>
      ${folderMapScripts}
      </script>
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
