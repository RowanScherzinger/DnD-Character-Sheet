import minimist = require("minimist");
import { BuildTool } from "./src/BuildTool";
const args = minimist(process.argv.slice(2));

function main(): void
{
    new BuildTool().runBuild(() =>
    {
        console.log("Build complete");
    },
    () =>
    {
        console.log("Build failed");
    });
}

main();