import { verifyToken } from '../middlewares/verifyToken';
import { add, deleteTodo, getUserTodos, update } from '../controllers/Todo';
import express from 'express';

export default (router: express.Router) => {
  router.post('/user/add', verifyToken,add);
  router.patch('/user/update/:id', verifyToken,update);
  router.delete('/user/delete/:id', verifyToken,deleteTodo);
  router.get('/user/', verifyToken,getUserTodos);
};