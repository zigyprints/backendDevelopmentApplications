import * as fs from 'fs';
import * as bcrypt from 'bcrypt';
import { config } from 'dotenv';
import * as jwt from 'jsonwebtoken';
config();

const USERS_JSON_DB_PATH: string = process.env.USERS_DB_JSON_PATH;
const JWT_KEY: string = process.env.JWT_PRIVATE_KEY;

interface User {
    username: string,
    password: string
}

const getUsers = (path: string = USERS_JSON_DB_PATH): any | Error => {
    try {
        const jsonData = fs.readFileSync(path, 'utf-8');
        return JSON.parse(jsonData);

    } catch (err) {
        console.error("Error reading JSON file:", err);
        return err;
    }
}

const writeUsers = (data: any, path: string = USERS_JSON_DB_PATH): void => {
    try {
        const users_array: object[] = getUsers();
        users_array.push(data);
        const jsonData = JSON.stringify(users_array, null, 2);
        fs.writeFileSync(path, jsonData, 'utf8');
    } catch (err) {
        console.error("Error writing JSON to file:", err)
    }
}

const hashPassword = async (pass: string, saltRounds: number = 10): Promise<string> => {
    return bcrypt
        .hash(pass, saltRounds)
        .then((hash: string) => hash)
        .catch((error: Error) => {
            throw error;
        });
}

const authPassword = async (normalPass: string, hashedPass: string): Promise<boolean> => {
    return bcrypt
        .compare(normalPass, hashedPass)
        .then((match: boolean) => match)
        .catch((error: Error) => {
            throw error;
        })
}

const verifyToken = async (token: string): Promise<boolean | object> => {
  return new Promise((resolve, reject) => {
    const tokenParts = token.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      resolve(false);
    }

    const jwtToken = tokenParts[1];
    jwt.verify(jwtToken, JWT_KEY, (err: Error | null, user: object) => {
      if (err) {
        resolve(false);
      } else {
        resolve(user);
      }
    });
  });
};

const foo = async () => {
    try {
      const normalPass: string = "secretPass";
  
      const hashed = await hashPassword(normalPass);
      const val = await authPassword(normalPass, hashed);
  
      console.log(val);
    } catch (error) {
      console.error("Error:", error);
    }
  };

export {
    User,
    getUsers,
    writeUsers,
    hashPassword,
    authPassword,
    verifyToken
}
