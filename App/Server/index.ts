import express = require('express')
import { PageBuilder } from './src/PageBuilder';
const app = express()

export class ExpressServer
{
    private port: number = 3000;
    private builder: PageBuilder; 

    constructor(port?: number)
    {
        if (port !== undefined)
            this.port = port;

        this.builder = new PageBuilder();
        this.startServer();
    }

    private startServer(): void
    {
        app.use(express.static('../data'));
        app.use(express.static('../styling'));

        app.get('/', (req: express.Request, res: express.Response) => {
            res.send(this.builder.buildPage());
        });

        app.listen(this.port, () => console.log(`Server listening on port ${this.port}!`))
    }
}

new ExpressServer(1337);
