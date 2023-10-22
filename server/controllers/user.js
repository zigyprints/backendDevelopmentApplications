import User from '../models/user.js'
import crypt from 'crypto'
import { connect } from '../config.js'

const get_hash = (text) => {
    const hash = crypt.createHash('sha512')
    hash.update(text)
    return hash.digest('hex')
}

export const getAllUsers = async (req, res) => {
    console.log('from users fetching section...')
    connect()
    try {
        const users = await User.find();
        if (!users || users.length < 1) return res.status(500).json({
            msg: 'There was an error'
        })
        console.log({ users })

        res.status(200).send({
            success: true,
            users
        });
    } catch (error) {
        console.log({ message: error.message, error });
        res.status(500).send({
            success: false,
            error: error.message
        });
    }
};


export const getUser = async (req, res) => {
    console.log('from user fetching section...')
    connect()
    try {

        const { id } = req;
        // console.log({ id })
        const user = await User.findById(id).populate('messages'); 
        if (!user) return res.status(500).json({
            msg: 'There was an error'
        })

        // console.log({ user })
        res.status(200).send({
            success: true,
            user
        });
    } catch (error) {
        console.log({ message: error.message, error });
        res.status(500).send({
            success: false,
            error: error.message
        });
    }
};

export const updateUserDetails = async (req, res) => {
    connect()
    try {
        const { user } = req.body;
        let existingUser = await User.findById(user._id);

        if (!existingUser) {
            throw new Error('No such user exists');
        }

        existingUser.set(user);
        existingUser = await existingUser.save();
        if (!existingUser) {
            throw new Error('There was a problem updating the user details.');
        }

        await existingUser.populate('messages');
        return res.status(200).send({
            success: true,
            msg: 'User details updated successfully.',
            user: existingUser,
        });

    } catch (error) {
        console.log({ error });
        return res.status(500).send({
            success: false,
            msg: 'An error occurred while updating the user details.',
        });
    }
};

export const getUserById = async (req, res) => {
    connect()
    console.log({ id: req.params })
    try {
        const { id } = req.params
        let user;

        if (req.id === id) user = await User.findById(id) ; 
        else if (req.id !== id) user = await User.findById(id).populate('');
        
        if (!user) throw new Error('Error while getting the user')

        return res.status(200).json({
            success: true,
            msg: 'Fetched user details successfully',
            user
        })

    } catch (error) {
        console.log({ error: error })
        return res.status(500).send({
            success: false,
            msg: 'An error occured while fetching user details!'
        })
    }
}

export const getUserMessages = async (req, res) => {
    connect()
    try {
        const [firstUser, secondUser] = await Promise.all([
            User.findById(req.id)
            .populate('messages'),
            User.findById(req.body.user._id).populate('messages')
        ])
        if (!firstUser || !secondUser) throw new Error(`Couldn't find the user!`)

        const firstUserMessageIds = new Set(firstUser.messages.map((msg) => msg._id.toString()));
        const messages = secondUser.messages.filter((msg) => firstUserMessageIds.has(msg._id.toString()));

        return res.status(200).send({
            success: true,
            messages,
            profile: firstUser,
        })

    } catch (error) {
        console.log({ message: error.message, error });
        return res.status(500).send({
            success: false,
            msg: 'There was an error, Please try again later'
        })
    }
}