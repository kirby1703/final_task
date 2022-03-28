const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')
const User = require('../models/User')
const errorHandler = require('../utils/errorHandler')

// [Auth] Login
module.exports.login = async function(req, res) {
    const candidate = await User.findOne({ email: req.body.email })
    if (candidate) {
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
        if (passwordResult) {
            // Generate token
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwtSecret, { expiresIn: '1h' })
            res.status(200).json({ token: `Bearer ` + token })
        } else {
            // Incorrect password
            res.status(401).json({ message: "Неверный пароль. Проверьте правильность ввода" })
        }
    } else {
        // User not found
        res.status(404).json({ message: "Пользователя с таким Email не существует" })
    }
}

// [Auth] Register
module.exports.register = async function(req, res) {
    // -> Email Password
    const candidate = await User.findOne({ email: req.body.email })

    if (candidate) {
        // If email has been already taken -> error
        res.status(409).json({ message: 'Email уже используется' })
    } else {
        // User allowed to create an account
        const salt = bcrypt.genSaltSync(10)
        const password = req.body.password
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        })

        try {
            await user.save()
            res.status(201).json(user)
        } catch (error) {
            errorHandler(res, error)
        }

    }
}