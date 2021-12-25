// controller
import { cac } from "cac";
import { generateHtml } from "./generateHtml";
import { outputDefaultConfig, getUserFolderMaps } from "./initConfig";
// import path from "path";

const cli = cac("project-maps");

// 1. init config
cli.command("init").action(async () => {
  console.log("call-init", process.cwd());
  try {
    await outputDefaultConfig(process.cwd());
  } catch (error) {
    process.exit(1);
  }
});

//2. tree
cli.command("tree").action(async () => {
  console.log("call-tree");
  try {
    await getUserFolderMaps(process.cwd());
  } catch (error) {
    process.exit(1);
  }
});

// 3. generate html
cli.command("generate").action(async () => {
  console.log("call-generate");
  try {
    await generateHtml(process.cwd());
  } catch (error) {
    process.exit(1);
  }
});

// all in one
cli.command("map").action(async () => {
  console.log("call-map");
  const workPath = process.cwd();
  try {
    await outputDefaultConfig(workPath);
    await getUserFolderMaps(workPath);
    await generateHtml(workPath);
  } catch (error) {
    process.exit(1);
  }
});

cli.help();
cli.version(require("../package.json").version);

cli.parse();
