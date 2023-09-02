import express from 'express';
import auth from './auth';
import todo from './todo';

const router = express.Router();

export default (): express.Router => {
  auth(router);
  todo(router);

  return router;
};
