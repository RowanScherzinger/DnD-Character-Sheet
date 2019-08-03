import fs = require("fs");
import pathModule = require("path");

const path = pathModule.posix;

export class PageBuilder
{
    private appRoot: string = "../";
    private pagesDir: string = "/pages/";
    private compsDir: string = "/components/";
    private htmlExt: string = ".html";

    private indexPath: string = "/index.html";
    private fileEncoding: string = "utf8"

    constructor(appRoot: string)
    {
        this.appRoot = appRoot;
        this.pagesDir = path.join(this.appRoot, this.pagesDir);
        this.compsDir = path.join(this.appRoot, this.compsDir);
        this.indexPath = path.join(this.appRoot, this.indexPath);

        console.log(this.pagesDir, this.compsDir, this.indexPath);
    }

    public buildPage(): string
    {
        let final: string = fs.readFileSync(this.indexPath, this.fileEncoding);

        const pageTags: string[] = final.match(/{{[a-z-]*}}/g);
        for (const tag of pageTags)
        {
            final = final.replace(tag, this.getPage(tag.replace("{{", "").replace("}}", "")));    
        }

        const compTags: string[] = final.match(/\[\[[a-z-]*\]\]/g);
        for (const tag of compTags)
        {
            final = final.replace(tag, this.getComponent(tag.replace("[[", "").replace("]]", "")));    
        }

        return final;
    }

    /**
     * Returns a "page"
     * @param fileName name of the file of the page ie "character-sheet" for "character-sheet.html"
     */
    private getPage(fileName: string): string
    {
        return fs.readFileSync(this.pagesDir + fileName + this.htmlExt, this.fileEncoding);
    }

    /**
     * Unused for now
     * @param fileName name of the file of the component ie "button" for "button.html"
     */
    private getComponent(fileName: string): string
    {
        return fs.readFileSync(this.compsDir + fileName + this.htmlExt, this.fileEncoding);
    }
}