import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logging from './library/Logging';

const router = express();

// connect to mongo

mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
        Logging.info('Connected to MongoDB');
    })
    .catch((error) => {
        Logging.error('Unable to Connect: ');
        Logging.error(error);
    });

// start the server only if the Mongo is connected
