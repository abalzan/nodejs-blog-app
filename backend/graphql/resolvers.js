const User = require('../models/user');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');

module.exports = {
    createUser: async ({userInput }, req) => {
        const errors = [];
        if(!validator.isEmail(userInput.email)) {
            errors.push({message: 'Email is invalid'});
        }
        if(validator.isEmpty(userInput.password) || !validator.isLength(userInput.password, {min: 5})) {
            errors.push({message: 'Password too short'});
        }
        if(errors.length > 0) {
            const error = new Error('Invalid input, please check your data.');
            error.data = errors;
            error.statusCode = 422;
            throw error;
        }

        const existingUser = await User.findOne({email: userInput.email});
        if (existingUser) {
            throw new Error('User exists already.');
        }
        const hashedPassword = await bcrypt.hash(userInput.password, 12);
        const user = new User({
            email: userInput.email,
            password: hashedPassword,
            name: userInput.name,
        });
        const createdUser = await user.save();
        return {...createdUser.toObject(), _id: createdUser.id.toString()};
    },
    login: async ({email, password}) => {
        const user = await User.findOne({email: email});
        if (!user) {
            const error = new Error('User not found.');
            error.statusCode = 401;
            throw error;
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            const error = new Error('Password is incorrect.');
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign({
            userId: user._id.toString(),
            email: user.email
        }, 'secret', {expiresIn: '1h'});

        return {token, userId: user._id.toString()};
    }
}
