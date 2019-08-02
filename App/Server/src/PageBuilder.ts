import fs = require("fs");

export class PageBuilder
{
    private pagesDir: string = "../pages/";
    private compsDir: string = "../components/";
    private htmlExt: string = ".html";

    private indexPath: string = "../index.html";
    private fileEncoding: string = "utf8"

    public buildPage(): string
    {
        let final: string = fs.readFileSync(this.indexPath, this.fileEncoding);

        const tags: string[] = final.match(/{{[a-z-]*}}/g);

        for (const tag of tags)
        {
            final = final.replace(tag, this.getPage(tag.replace("{{", "").replace("}}", "")));    
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