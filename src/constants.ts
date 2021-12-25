export interface UserConfig {
  /** exclude folder/file name */
  exclude: string[];
  relativepathDesc: {
    [key: string]: {
      desc: string;
      collapsed: boolean;
    };
  };
}

export const DEFAULT_CONFIG: UserConfig = {
  exclude: ["node_modules"],
  relativepathDesc: {
    ".git": {
      desc: "git workspace",
      collapsed: true,
    },
    ".husky": {
      desc: "husky workspace",
      collapsed: true,
    },
    ".vscode": {
      desc: "vscode config",
      collapsed: true,
    },
    dist: {
      desc: "",
      collapsed: true,
    },
    "yarn.lock": {
      desc: "yarn package lock file",
      collapsed: true,
    },
  },
};

export const OUTPUT_CONFIG_FILENAME = "projectMaps.config.js";
export const OUTPUT_TREE_FILENAME = "projectMaps.tree.js";
export const OUTPUT_HTML_FILENAME = "projectMaps.views.html";
export const WINDOW_TREE_KEY = "projectMapsTree";
