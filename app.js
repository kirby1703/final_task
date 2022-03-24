const express = require('express')
const bodyParser = require('body-parser')
const { default: mongoose } = require('mongoose')
const passport = require('passport')
const app = express()
const keys = require('./config/keys')

mongoose.connect(keys.mongoUrl)
    .then(() => console.log('MongoDB sucessfully connected'))
    .catch(error => console.log(`An error has occured: ${error}`))

// Using plugins
app.use('/uploads', express.static('uploads'))
app.use(require('cors')())
app.use(require('morgan')('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// Passport
app.use(passport.initialize())
require('./middleware/passport')(passport)

// Routes
const authRoutes = require('./routes/auth')
const analyticsRoutes = require('./routes/analytics')
const categoryRoutes = require('./routes/category')
const orderRoutes = require('./routes/order')
const positionRoutes = require('./routes/position')

// Using routes
app.use('/api/auth', authRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/position', positionRoutes)


module.exports = app