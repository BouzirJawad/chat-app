const bcrypt = require("bcrypt")
const User = require("../models/User")
const { generateToken } = require("../config/jwt")

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body
        const user = await User.findOne({email})

        if(user){
            res.status(404).json({message: "User already exists!"})
            return
        }

        const hashPass = await bcrypt.hash(password, 10)
        const newUser = new User({username, email, password: hashPass})

        await newUser.save()
        res.status(201).json({message: "User registered successfully!"})

    } catch (error) {
        console.error(error.message)
        res.status(500).json({message: "Server error, Enable to register!"})
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })

        if (!user) {
            res.status(400).json({message: "Invalid credentials! (user not found)"})
            return
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            res.status(400).json({message: "Invalid credentials! (wrong password)"})
            return
        }

        const token = generateToken(user._id)
        res.status(201).json({token})

    } catch (error) {
        console.error(error.message)
        res.status(500).json({message: "Server error, Enable to login!"})
    }
}

const getMe = async (req, res) => {
    res.json(req.user)
}

const updateUser = async (req, res)=>{
    try {
        const { confirmationPassword } = req.body

        const user = await User.findOne({ _id: req.params.id })

        if (!user) {
            res.status(400).json({message: "User not found!"})
        }

        const isMatch = await bcrypt.compare(confirmationPassword, user.password)

        if (!isMatch) {
            res.status(400).json({message: "Wrong password!"})
            return
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body},
            { new: true, runValidators: true })
        
        res.status(200).json({message: "User updated successfully !", updatedUser})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

module.exports = { register, login, getMe, updateUser }