const cac = require("cac");

const cli = cac("test");

cli.command("init").action(async (...rest) => {
  // rest-- [ { '--': [] } ]
  console.log(__dirname);
  console.log("rest--", rest);
  outputDefaultConfig(rest[0]);
});

cli.help();
cli.version(require("./package.json").version);

cli.parse();
