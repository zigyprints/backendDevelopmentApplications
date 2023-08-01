import express from 'express';
import { login,signup } from '../controllers/Auth';

export default (router: express.Router) => {
  router.post('/auth/signup', signup);
  router.post('/auth/login', login);
};