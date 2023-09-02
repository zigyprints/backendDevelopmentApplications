import swaggerJSDoc from 'swagger-jsdoc';
const options = {
    definition: {
        openapi: '3.0.0', // Specify the version of Swagger
        info: {
            title: 'Your API Title',
            version: '1.0.0',
            description: 'Your API Description',
        },
    },
    // Paths to the API docs and the routes to scan for comments
    apis: ['./routes/index/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
