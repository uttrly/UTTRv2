const jwtSecret = require('./jwtConfig');
const bcrypt = require('bcryptjs');

const BCRYPT_SALT_ROUNDS = 12;

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const db = require('../../models')
const JWTstrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt

passport.use(
  'register',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false
    },
    (email, password, done) => {
      try{
        db.User.findOne({
          where: {
            email: email
          }
        }).then(user => {
          if (user !== null) {
            console.log('You have already registered with this Email.')
            return done(null, false, {message: 'Already registered using this email.'})
          } else {
            console.log(`passport user 1 ${user}`)
            bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
            .then(hashedPassword => {
              db.User.create({
                email: email,
                password: hashedPassword
              })
              .then(user => {
                console.log('user created')
                return done(null, user)
              })
            })
          }
        })
      } catch (err){
        done(err)
      }
    }
  )
)

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false,
    },
    (email, password, done) => {
      try {
        db.User.findOne({
          where: {
            email: email
          }
        }).then(user => {
          if (user === null) {
            return done(null, false, {message: 'Email not found.'})
          } else {
            bcrypt.compare(password, user.password)
            .then(response => {
              if (!response){
                console.log('Password does not mat our records.')
                return done(null, false, {message: 'Password does not match our records.'})
              }
              console.log('User found & authenticated.')
              return done(null, user)
            })
          }
        })
      } catch (err) {
        done(err)
      }
    }
  )
)

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: jwtSecret.secret
}

passport.use(
  'jwt',
  new JWTstrategy(opts, (jwt_payload, done) => {
    console.log('this is passport jwt')
    console.log(jwt_payload)
    try {
      db.User.findOne({
        where: {
          email: jwt_payload.email
        }
      }).then(user => {
        if (user){
          console.log('User found in db in passport.')
          done(null, user)
        } else {
          console.log("User not found in db.")
          done(null, false)
        }
      })
    } catch (err) {
      done(err)
    }
  })
)