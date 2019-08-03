import fs = require("fs");
import ncpModule = require("ncp");
import rimraf  = require("rimraf");
import pathModule = require("path");
import { PageBuilder } from "./PageBuilder";

const ncp = ncpModule.ncp;
const path = pathModule.posix;

export class BuildTool
{
    private buildRoot: string = "../build/"
    private appRoot: string = "../App/"
    private dataRoot: string = "/data/";
    private html: string = "/index.html";
    private css: string = "/main.css";

    private utf8: string = "utf8";

    private doneCallback: () => void;
    private failCallback: () => void;

    public runBuild(done: () => void, fail: () => void): void
    {
        this.doneCallback = done;
        this.failCallback = fail;

        if (fs.existsSync(this.buildRoot))
        {
            rimraf.sync(this.buildRoot);
            console.log("Deleted old build.");
        }
        fs.mkdirSync(this.buildRoot);
        console.log("Created build folder.");

        console.log("Copying data folder");
        ncp(path.join(this.appRoot, this.dataRoot), this.buildRoot, (err: Error | null) => {
            this.handleDataCopy(err);
        });
    }

    private handleDataCopy(err: Error | null): void
    {
        if (err !== null)
        {
            console.error(err);
            this.doneCallback();
        }

        console.log("Building index.html");
        fs.writeFileSync(path.join(this.buildRoot, this.html), this.buildHTML(path.join(this.appRoot, this.html)));

        console.log("Copying main.css");
        fs.copyFileSync(path.join(this.appRoot, this.css), path.join(this.buildRoot, this.css));
        
        this.doneCallback();
    }

    private buildHTML(indexPath: string): string
    {
        const builder: PageBuilder = new PageBuilder(this.appRoot);
        return builder.buildPage();
    }
}