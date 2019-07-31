const db = require("../models");
const passport = require('passport')
const jwtSecret = require('../config/passport/jwtConfig')
const jwt = require('jsonwebtoken')

const validateSignUpInfo = require('../validation/signup')
const validateSignInInfo = require('../validation/signin')

module.exports = {
    signup: (req, res, next) => {
        console.log(`triggered signed up route`)
        const {errors, isValid} = validateSignUpInfo(req.body)
        if (!isValid) {
            return res.status(400).json(errors)
        }        
        passport.authenticate('register', (err, user, info) => {
            if (err){
                return res.status(400).json(err)
            }
            if(info !== undefined){
                console.log(info.message)
                res.send({message: info.message})
            } else {
                console.log(`authController user ${user}`)
                req.logIn(user, err => {
                    const data = {
                        email: req.body.email
                    }
                    db.User.findOne({
                        where: {
                            email: data.email
                        }
                    }).then(user => {
                        user.update({
                            email: data.email
                        }).then(()=> {
                            console.log('User created in db.')
                            res.status(200).send({message: `${req.body.email} is created as an user.`})
                        })
                    })
                })
            }
        })(req, res, next)
    },
    signin: (req, res, next) => {
        console.log(`triggered signed in route`)
        const {errors, isValid} = validateSignInInfo(req.body)
        if (!isValid) {
            return res.status(400).json(errors)
        }
        passport.authenticate('login', (err, user, info) => {
            if (err) {
                return res.status(400).json(err)
            }
            if(info !== undefined){
                console.log("info !== undefined")
                console.log(info.message)
                res.send(info.message)
            } else {
                req.logIn(user, err => {
                    console.log(`signin logIn function ${user}`)
                    db.User.findOne({
                        where: {
                            email: user.email
                        }
                    }).then(user => {
                        console.log(`response user found in db ${user}`)
                        console.log(user.id, user.email)
                        const token = jwt.sign({id: user.id, email: user.email}, jwtSecret.secret)
                        console.log(`${token} returned`)
                        res.status(200).send({
                            auth: true,
                            token: token,
                            message: 'user found & logged in'
                        })
                    })
                })
            }
        })(req, res,next)
    },
    findUser: (req, res, next) => {
        console.log("triggered auth controller find user")
        passport.authenticate('jwt', {session: false}, (err, user, info) => {
            console.log(`sent to passport jwt`)
            if (err) {
                console.log(`find user error message`)
                console.log(err)
            }
            if (info !== undefined) {
                console.log('this is findUser info.msg')
                console.log(info.message)
                res.send(info.message)
            } else {
                console.log('User found in db from route')
                res.status(200).send({
                    auth: true,
                    id: user.id,
                    email: user.email,
                    message: 'User found in db.'
                })
            }
        })(req, res, next)
    },
    // updateUser: () => {
    //     console.log('still need to complete updateUser')
    // },
    // deleteUser: () => {
    //     console.log('still need to complete delete user')
    // }



}