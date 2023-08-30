import express from 'express';
import todoController from '../controllers/todoController'; 

const router = express.Router();

/**
 * @openapi
 * /api/:
 *   get:
 *     tags: 
 *      - Get Todos
 *     summary: Get a list of all To-Dos.
 *     description: Returns the details of all the To-Dos currently present in the database.
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     default: To-Do Name
 *                   description:
 *                     type: string
 *                     default: This is a To-Do description.
 *                   isCompleted: 
 *                     type: boolean
 *                     default: false
 *                   _id: 
 *                     type: string
 *                     default: 64eee4f84f9e477a7e079813
 *                   createdAt: 
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:           
 *               success:
 *                type: boolean
 *                default: false    
 *               message:
 *                type: string
 *                default: Server Error! 
 */

router
    .route('/')
        .get(todoController.getTodos)

/**
 * @openapi
 * /api/create:
 *   post:
 *     tags: 
 *      - Create Todos
 *     summary: Create a new To-Do.
 *     description: Creates a new To-Do according to the parameters and saves it in the database.
 *     requestBody:
 *      required: true 
 *      content:
 *       application/json:
 *          schema:
 *           type: object
 *           required:
 *            - name
 *           properties:           
 *            name:
 *             type: string
 *             default: New To-Do  
 *            description:
 *             type: string
 *             default: New To-Do Description         
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:           
 *               success:
 *                type: boolean
 *                default: true    
 *               message:
 *                type: string
 *                default: To-Do Added Successfully!          
 *       422:
 *         description: Validation Error
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:           
 *               success:
 *                type: boolean
 *                default: false    
 *               message:
 *                type: string
 *                default: The name of the To-Do must be unique!          
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:           
 *               success:
 *                type: boolean
 *                default: true    
 *               message:
 *                type: string
 *                default: Bad request!          
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:           
 *               success:
 *                type: boolean
 *                default: false    
 *               message:
 *                type: string
 *                default: Server Error!        
 */

router
    .route('/create')
        .post(todoController.createTodo);

/**
 * @openapi
 * '/api/udpate/{todoId}':
   *  patch:
   *     tags:
   *     - Update Todos
   *     summary: Update a single To-Do by its ID.
   *     description: Updates the details of the To-Do of which the ID is passed in the params.
   * 
   *     parameters:
   *      - name: todoId
   *        in: path
   *        description: The id of the To-Do
   *        required: true
   *     requestBody:
 *        required: true 
 *        content:
 *         application/json:
 *          schema:
 *           type: object
 *           properties:           
 *            name:
 *             type: string
 *             default: Updated To-Do  
 *            description:
 *             type: string
 *             default: Updated To-Do Description
 *            isCompleted:
 *             type: boolean
 *             default: true
 *     responses:
 *       200:
 *         description: Successful.
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:           
 *               success:
 *                type: boolean
 *                default: true    
 *               message:
 *                type: string
 *                default: To-Do Deleted Successfully!           
 *       404:
 *         description: Not Found Error
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:           
 *               success:
 *                type: boolean
 *                default: false    
 *               message:
 *                type: string
 *                default: No To-Do with given ID found!        
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:           
 *               success:
 *                type: boolean
 *                default: false    
 *               message:
 *                type: string
 *                default: Server Error!         
 */


router
    .route('/update/:id')
        .patch(todoController.updateTodo);

/**
 * @openapi
 * '/api/delete/{todoId}':
   *  delete:
   *     tags:
   *     - Delete Todos
   *     summary: Update a single To-Do by its ID.
   *     description: Deleted the details of the To-Do of which the ID is passed in the params.
   *     parameters:
   *      - name: todoId
   *        in: path
   *        description: The id of the To-Do
   *        required: true
 *     responses:
 *       200:
 *         description: Successful.
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:           
 *               success:
 *                type: boolean
 *                default: true    
 *               message:
 *                type: string
 *                default: To-Do Deleted Successfully!           
 *       404:
 *         description: Not Found Error
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:           
 *               success:
 *                type: boolean
 *                default: false    
 *               message:
 *                type: string
 *                default: No To-Do with given ID found!        
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:           
 *               success:
 *                type: boolean
 *                default: false    
 *               message:
 *                type: string
 *                default: Server Error!         
 */


router
    .route('/delete/:id')
        .delete(todoController.deleteTodo);

/**
 * @openapi
 * '/api/{todoId}':
   *  get:
   *     tags:
   *     - Get Todos
   *     summary: Get a single To-Do by its ID.
   *     description: Retreives the details of the To-Do of which the ID is passed in the params.
   *     parameters:
   *      - name: todoId
   *        in: path
   *        description: The id of the To-Do
   *        required: true
 *     responses:
 *       200:
 *         description: Successful.
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *               name:
 *                type: string
 *                default: To-Do Name            
 *               description:
 *                type: string
 *                default: This is a To-Do description.           
 *               isCompleted:
 *                type: boolean
 *                default: false            
 *               createdAt:
 *                type: string
 *                format: date-time    
 *               _id:
 *                type: string
 *                default: 64eee4f84f9e477a7e079813           
 *       404:
 *         description: Not Found Error
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:           
 *               success:
 *                type: boolean
 *                default: false    
 *               message:
 *                type: string
 *                default: No such To-Do exists!        
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:           
 *               success:
 *                type: boolean
 *                default: false    
 *               message:
 *                type: string
 *                default: Server Error!         
 */

router
    .route('/:id')
        .get(todoController.getTodoById)
    
export default router;
