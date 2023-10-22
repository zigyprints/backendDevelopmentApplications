import jwt from 'jsonwebtoken';
import { values, connect } from '../config.js';

export const verifyToken = async (req, res, next) => {
    connect()
    try {
        const token = req.cookies.accessCookie;
        console.log({ token });
        if (!token) return res.status(403).send({
            success: false,
            error: "You don't have enough permissions to access this page."
        })

        const result = await jwt.verify(token, values.jwt_secret);
        if (!result) return res.status(403).send({
            success: false,
            error: "You don't have enough permissions to access this page."
        })

        req.token = token;
        req.id = result.id;
        next();
    } catch (error) {
        console.log({ error });
        return res.status(500).send({
            success: false,
            error: error.message,
        });
    }
};