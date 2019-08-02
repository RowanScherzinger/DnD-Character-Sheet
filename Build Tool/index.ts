import minimist = require("minimist");
const args = minimist(process.argv.slice(2));

function main(): void
{
    console.log(args);
}

main();