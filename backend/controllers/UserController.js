const User = require("../models/User")

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const jwtSecret = process.env.JWT_SECRET

//Generate user token
const generateToken = (id) => {
    return jwt.sign({id}, jwtSecret, {
        expiresIn: "7d"
    })
}

//Register user and sign in
const register = async(req, res) => {
    const {name, email, password} = req.body

    //check if user exist
    const user = await User.findOne({email})

    if(user){
        res.status(422).json({errors: ["Por favor, utilize outro email."]})
        return
    }

    //generate password hash
    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt)

    //create user
    const newUser = await User.create({
        name,
        email,
        password: passwordHash
    })

    //if user was created successfully, return the token
    if(!newUser){
        res.status(422).json({errors: ["Houve um erro, tente por favor mais tarde."]})
        return
    }

    res.status(201).json({
        _id: newUser._id,
        token: generateToken(newUser._id)
    })
}

//sign user in
const login = async (req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({email})

    //check if user exists
     if(!user){
        res.status(404).json({errors: ["Usuário não encontrado."]})
        return
     }

     //check if password matches
     if(!(await bcrypt.compare(password, user.password))){//se as senhas nao forem iguais
        res.status(422).json({errors: ["Senha inválida."]})
        return
     }

     //return user token
     res.status(201).json({
        _id: user._id,
        profileImage: user.profileImage,
        token: generateToken(user._id)
    })
}

module.exports = {
    register,
    login
}