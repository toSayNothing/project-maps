// controller
import { cac } from "cac";
import { generateHtml } from "./generateHtml";
import { outputDefaultConfig, getUserFolderMaps } from "./initConfig";

const cli = cac("project-maps");

// 1. init config
cli.command("init").action(async () => {
  console.log("call-init");
  outputDefaultConfig(__dirname).finally(() => {
    process.exit(1);
  });
});

//2. tree
cli.command("tree").action(async () => {
  console.log("call-tree");
  getUserFolderMaps(__dirname).finally(() => {
    process.exit(1);
  });
});

// 3. generate html
cli.command("generate").action(async () => {
  console.log("call-generate");
  generateHtml(__dirname).finally(() => {
    process.exit(1);
  });
});

cli.help();
cli.version(require("../package.json").version);

cli.parse();
