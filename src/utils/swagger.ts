import {Express, Request, Response} from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options : swaggerJsDoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "To-do List API Docs",
            version: "1.0.0"
        }
    },
    apis: ['src/routes/todoRouter.ts']
}

const swaggerSpec = swaggerJsDoc(options);

function swaggerDocs(app: Express, port : string) {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    app.get("/docs.json", (req: Request, res: Response) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    })
}

export default swaggerDocs;
