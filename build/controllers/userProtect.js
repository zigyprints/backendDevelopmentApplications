import jwt from 'jsonwebtoken';
const userProtect = (req, res, next) => {
    if (req.cookies.login) {
        const isVerified = jwt.verify(req.cookies.login, process.env.JWT_KEY);
        if (isVerified) {
            next();
        }
        else {
            res.status(400).send({ message: "User not logged in" });
        }
    }
    else {
        res.status(400).send({ message: "User not logged in" });
    }
};
export default userProtect;
