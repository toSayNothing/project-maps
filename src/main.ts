// controller
import { cac } from "cac";
import { generateHtml } from "./generateHtml";
import { outputDefaultConfig, getUserFolderMaps } from "./initConfig";
// import path from "path";

const cli = cac("project-maps");

// 1. init config
cli.command("init [root]").action(async () => {
  outputDefaultConfig(__dirname).finally(() => {
    // process.exit(1);
  });
});

//2. tree
cli.command("tree [root]").action(async () => {
  console.log("call-tree");
  getUserFolderMaps(__dirname).finally(() => {
    // process.exit(1);
  });
});

// 3. generate html
cli.command("generate [root]").action(async () => {
  console.log("call-generate");
  generateHtml(__dirname).finally(() => {
    // process.exit(1);
  });
});

// all in one
cli.command("map").action(async () => {
  console.log("call-map");
  await outputDefaultConfig(__dirname);
  await getUserFolderMaps(__dirname);
  await generateHtml(__dirname);
});

cli.help();
cli.version(require("../package.json").version);

cli.parse();
