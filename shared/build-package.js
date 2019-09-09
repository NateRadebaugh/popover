// this gets run from the package directory
const execSync = require("child_process").execSync;
const path = require("path");

let babel = path.resolve(__dirname, "../node_modules/.bin/babel");

const exec = (command, extraEnv) =>
  execSync(command, {
    env: Object.assign({}, process.env, extraEnv),
    stdio: "inherit"
  });

console.log("\nBuilding ES modules ...");
exec(`${babel} src -d es --ignore src/*.test.js --root-mode upward`, {
  MODULE_FORMAT: "esm"
});

console.log("Building CommonJS modules ...");
exec(`${babel} src -d . --ignore src/*.test.js --root-mode upward`, {
  MODULE_FORMAT: "cjs"
});
