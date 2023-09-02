import express from 'express';
import { Document } from 'mongoose'; 
import jwt from "jsonwebtoken";
import { MyObjectType } from '../types/objecttype';

export interface MyRequest extends express.Request {
    user: MyObjectType ;
}
