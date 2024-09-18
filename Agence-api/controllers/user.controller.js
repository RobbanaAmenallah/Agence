const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('./../models/user')

const app = express()

app.get('/', (req, res) => {
    User
        .find()
        .then((user) => {
            res.status(200).send(user)
        })
        .catch(() => {
            res.status(400).send({ message: "Error fetching data" })
        })
})

app.get('/:id',async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.findOne({_id: id})

        if (!user){
            res.status(400).send({ message: "user not found" })

        }
        else{
            res.status(200).send(user)
        }
    } catch (error) {
        res.status(400).send({ message: "Error fetching data", error : error })
    }
})

app.post('/', (req, res) => {
    // get data from postman / front
    const user = req.body
    // creation d'un objet
    const userToSave = new User({ firstname: user.firstname, lastname: user.lastname,email: user.email ,password: user.password })

    userToSave
        .save()
        .then(() => {
            res.send({ message: "user saved !" })
        })
        .catch(() => {
            res.status(400).send({ message: "user already exist !" })
        })
})

app.post('/signup', (req, res) => {
    const user = req.body
    const hashedPassword = bcrypt.hashSync(user.password)

    // creation d'un objet
    const userToSave = new User({ firstname: user.firstname, lastname: user.lastname,email: user.email ,password: hashedPassword })

    userToSave
        .save()
        .then(() => {
            res.send({ message: "user saved !" })
        })
        .catch(() => {
            res.status(400).send({ message: "user already exist !" })
        })
})


app.post('/signin',async (req, res) => {
    const data = req.body
    const user = await User.findOne({email: data.email})

    if (!user) {
        res.status(404).send({ message: "user not found!" })
    } else {
        const compare = bcrypt.compareSync( data.password , user.password)
        if (!compare) {
            res.status(404).send({ message: "wrong or email password!" })
        } else {
            const payload = { userId: user._id}
            const token = jwt.sign(payload, "SECRET_KEY")
            res.status(200).send({ token:token })

        }

    }
})

app.patch('/:id',async(req, res) => {
    try{
    const id = req.params.id
    // get data from postman / front
    const data = req.body
    // creation d'un objet
    const user = await User.findOneAndUpdate({_id: id},data,{new:true})

    if (!user){
        res.status(404).send({ message: "User not found" })

    }
    else{
        res.status(200).send(user)
    }
    }   
    catch(error){
            res.status(400).send({ message: "user already exist !", error:error })
        }
})

app.delete('/:id', async(req, res) => {
    try {
        const id = req.params.id
        const user = await User.findOneAndDelete({_id: id})

        if (!user){
            res.status(400).send({ message: "User not found" })

        }
        else{
            res.status(200).send({message : "User deleted" })
        }
    } catch (error) {
        res.status(400).send({ message: "Error fetching data", error : error })
    }
})

module.exports = app