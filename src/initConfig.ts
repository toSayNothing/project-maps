// this file has two missions:
// 1. output default config for user
// 2. get all folder tree data with config

import fs from "fs/promises";
import path from "path";
import fileSize from "filesize";
import {
  DEFAULT_CONFIG,
  OUTPUT_CONFIG_FILENAME,
  OUTPUT_TREE_FILENAME,
  UserConfig,
  WINDOW_TREE_KEY,
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
      __dirname,
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
  obj: Record<string, TreeDataItem>
) => {
  let arr = await fs.readdir(path.resolve(pathName));
  arr = arr.filter((fileName) => !userConfig.exclude.includes(fileName));
  await Promise.all(
    arr.map(async (fileName) => {
      const fullFileName = path.resolve(pathName, fileName);
      const curRelativePath = path.relative(__dirname, fullFileName);
      const curDesc = userConfig.relativepathDesc[curRelativePath]?.desc ?? "";
      const curCollapsed =
        userConfig.relativepathDesc[curRelativePath]?.collapsed ?? "";
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
          obj[fileName].children ?? {}
        );
      }
    })
  );
};

/** 2. get all folder tree data */
export const getUserFolderMaps = async (rootPath: string) => {
  const treeObj = {};
  const userConfig = getUserConfig();
  try {
    await searchPath(rootPath, userConfig, "root", treeObj);
    await fs.writeFile(
      path.resolve(rootPath, OUTPUT_TREE_FILENAME),
      `window.${WINDOW_TREE_KEY} = ` + JSON.stringify(treeObj, null, 2)
    );
    console.log("write-projectMaps.tree.js-success");
  } catch (error) {
    console.log("write-projectMaps.tree.js-error", error);
  }
};
