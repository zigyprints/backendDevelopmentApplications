import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/user';

const secretKey = process.env.SECRET_KEY;

console.log(secretKey);
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretKey: secretKey,
};

const jwtVerify = async (payload: { userId: number }, done: any) => {
    try{
        const user = await User.findByPk(payload.userId);

        if(!user){
            return done(null, false);
        }

        return done(null, user);
    } catch (error) {
        return done( error, false);
    }
};

passport.use(new JwtStrategy(jwtOptions, jwtVerify));

export const authMiddleware = passport.authenticate('jwt', {session: false});

export const todoAuthMiddleware = (req: any, res: any, next: any) => {
    if(!req.user){
        return res.status(401).json({ error: 'Unauthorized'});
    }

    next();
};