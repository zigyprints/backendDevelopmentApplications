import bcrypt from 'bcrypt';


export class Password {
    static async hashPassword(password:string){
        password = await bcrypt.hash(password,10); 
        return password;
    };

    static async comparePassword(storedPassword:string,typedPassword:string){
        const result = await bcrypt.compare(typedPassword,storedPassword);
        return result;
    }
};