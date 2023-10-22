import jwt from 'jsonwebtoken'
import User from '../models/user.js' 
import { values , connect } from '../config.js'
import crypt from 'crypto'


const get_hash = (text) => {
    const hash = crypt.createHash('sha512')
    hash.update(text)
    return hash.digest('hex')
}

const createToken = async (id) => {
    return jwt.sign({ id }, values.jwt_secret, {
        expiresIn: values.time
    })
}

export const register = async (req, res) => { 
   connect() 
    const { username, password, name } = req.body

    try {
        let user = await User.findOne({ username })
        // console.log(user)
        if (user) return res.status(400).send({
            success: false,
            msg: "This username is already taken. Please try with another username.",
            // toPath:"/register"
        })

        user = new User({
            name,
            username,
            password: get_hash(password)
        })

        user = await user.save()

        if (!user) throw err
        return res.status(200).send({
            success: true,
            msg: "Registration successful, you can login now.",
        })

    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success: false,
            msg: "There was an error registering you! Please try again later.",
            toPath: "/register"
        })
    }
}

export const login = async (req, res) => {
    connect() 
    const { username, password } = req.body
    console.log({username , password})
    try {

        let user = await User.findOne({ username })

        if (!user) return res.status(400).send({
            success: false,
            msg: "No user is registered with this username! Please try registering. Thanks.",
            toPath: "/register"
        })

        else if (user.password !== get_hash(password)) return res.status(403).send({
            success: false,
            msg: "Incorrect Password! Please try entering correct password",
            toPath: "/login",
            user: {
                username
            }
        })

        else if (user.password === get_hash(password)) {
            const token = await createToken(user._id)
            user.token = token ; 
            await user.save() ; 
            if(!user) throw new Error('There was an error!');
            //setting the cookie 
            res.cookie('accessCookie', token, {
                withCredentials: true,
                httpOnly: true,
                maxAge: values.time*1000000,
                secure: false,   
            });

            console.log({user})


            
            if (!user) return res.status(500).send({
                success: false,
                msg: 'There was an error logging you in! Please try again later.'
            })


            return res.status(200).send({
                success: true,
                msg: "Welcome " + user.name + ",Login successful! Please Update your profile for ticket booking. Thanks.",
                user
            })
        }
    } catch (err) {
        console.log({Message:err.message})
        return res.status(400).send({
            success: false,
            msg: "There was an error logging you in! Please try again later. Thanks.",
            toPath: "/login"
        })
    }
};

export const logout = async (req, res) => {
    connect() 
    try {
        res.clearCookie('accessCookie')
        res.status(200).json({
            success: true,
            msg: 'User logged out successfully'
        })

    } catch (error) {
        console.log({ message: error.message, error })
        return res.status(500).send({
            success: false,
            msg: 'There was an error logging you out.'
        })
    }
}