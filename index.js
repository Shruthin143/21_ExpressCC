const express = require('express')
const path = require('path')
const logger = require('./middleware/logger')
const expbhs = require('express-handlebars')
const members = require('./Members')

const app = express()
// app.use(logger)

//Body parser middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//Handlebars middleware
app.engine('handlebars', expbhs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.get('/',(req, res) => res.render('index',{
    title: 'Member App',
    members
}))

// app.get('/',(req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'))
// })  //This is not feasible since we neet to write the whole bunch of code for every page.  we need to make a folder a static one to serve the requests

//Set static folder

app.use(express.static(path.join(__dirname, 'public')))

//Members api routes

app.use('/api/members', require('./routes/api/member'))


const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on Port ${PORT}`))