require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const passport = require('passport')
const GoogleStatergy = require('passport-google-oauth20').Strategy
const session = require('express-session')

const expenseRouter = require('./routes/routes')
const connectDB = require('./database/database')

const User = require('./models/user')

app.set('trust proxy', 1)
app.use(cors({
  origin:'http://localhost:3000',
  credentials:true,
}))
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {},
  })
)

app.use(express.json())
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, cb) => {
  cb(null, user)
})

passport.deserializeUser((obj, cb) => {
  cb(null, obj)
})

passport.use(
  new GoogleStatergy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/auth/google/callback',
      scope: ['profile'],
    },
    (accessToken, refreshToken, profile, done) => {
      done(null, { profile })
    }
  )
)

app.get('/', (req, res) => {
  res.send('expensivify api')
})

app.get('/login',passport.authenticate('google',{scope:['profile']}))
app.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/login',successRedirect:'http://localhost:3000'}),(req,res)=>{
  console.log(req.user)
})

// app.get('/check',passport.authenticate('verify',(error)),(req,res)=>{
//   res.json({isVerified:req.isAuthenticated()})
// })

app.post('/register',async(req,res)=>{
  try {
    const user = await User.create({ ...req.body })
    res.status(201).json({ user: user })
  } catch (error) {
    res.status(400).json({error})
  }

})


app.use('/expenses',expenseRouter)


app.get('/logout',(req,res)=>{
  req.logout((err)=>{
    if(err) console.log(err)
    res.send('user logged out')
    console.log(req.isAuthenticated())
  })
  
})

app.get('/api/v1/expenses', expenseRouter)

const port = 5000 || process.env.PORT

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => {
      console.log(`app listening on the port ${port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
