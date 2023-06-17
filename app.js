const express        = require( 'express')
const mongoose       = require( 'mongoose')
const dotenv         = require( 'dotenv')
const morgan         = require( 'morgan')
const methodOverride = require( 'method-override')
const session        = require( 'express-session')
const MongoStore     = require( 'connect-mongo')
const connectDB      = require( './config/db')
const path           = require('path')
const querystring    = require('querystring')
const { urlencoded } = require('body-parser')

// Load config
dotenv.config({ path: './config/.env' })

connectDB()

const app = express()

// Body Parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// EJS
app.set('view engine', 'ejs')

// Sessions
app.use(session({
    secret: 'trackpad nutria',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl:process.env.MONGO_URI,
        mongooseConnection: mongoose.connection})
}))

// Static folder
app.use(express.static('public'))

// Routes
app.use('/', require('./routes/index'))

const PORT = process.env.PORT || 3000

app.listen(
    PORT, 
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)