import myUser from "../models/model.user";
import { Request, Response } from 'express';
import dotenv from 'dotenv';
import md5 from 'md5';
import jwt from 'jsonwebtoken';
dotenv.config();




export const createUser = async (request: Request, response: Response) => {

    let data = request.body; // getting the details for the new user creation...

    let exist = await myUser.findOne({
        email: data.email
    });

    // verifying if the user with the given email does not exist already.

    if (exist) {
        response.status(405).json(exist);
        return;

    } else {


        try {

            const newUser = new myUser({
                userName: data.userName,
                userEmail: data.userEmail,
                userPassword: md5(data.userPassword) // encrypting the password using hashing function with *md5* library.

            });

            newUser.save();
            response.status(200).json({ message: 'Saved New User!' });
            // console.log(newUser);

        }

        catch (error) {
            response.status(500).json(error);
            //console.log(error);
        }

    }

};

export const authenticateUser = async (request: Request, response: Response) => {

    let data = request.body;
    let password = md5(data.password);
    console.log(password);

    try {

        let inUser = await myUser.findOne({
            userEmail: data.userEmail
        });

        if(inUser){  // checking if inUser is not empty.

        if (inUser.userPassword == password) {
          
            jwt.sign({ userId: inUser._id }, process.env.TOKENSECRET, { expiresIn: "2h" }, (err: any, token: any) => { // TOEKNSECRET is stored in the .env file provided with the token expiry period of 2hrs
                if (err) {
                    console.error(err);
                } else {
                   
                    response.status(200).json({ inUser, auth: token });
                }

            });

        }

    }

        else {

            response.status(400).json("Something Went wrong!");

        }

    } catch (error) {

        response.status(500).json(error);
      
    }


};


function verifyToken(req : Request , res: Response, next: () => void) {  // validating the token came from the client side in order to use any functionality of the application further

    let token = req.headers['authorization'];
    // //console.log(token)
    if (token) {
        token = token.split(' ')[1]; // splitting the token value from the *bearer* keyword
        jwt.verify(token, process.env.TOKENSECRET, (err: any, valid: any) => {
            if (err) {
                res.status(401).send({ reult: "Please provide a valid token" });
            } else {
                next();
            }
        })


    } else {

        res.status(403).send({ result: "Please add token with header" });
    }

};

export default verifyToken;
