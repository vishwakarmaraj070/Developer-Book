const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const Users = require('./api/Users')
const path = require('path')

const app = express()

// use middle ware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// connect with db

db =  require('./Keys/keys').mongoDBAlas
mongoose.connect(process.env.MONGODB_URI || db, { useNewUrlParser: true }, (err) => {
    if (!err) {
        console.log("MongoDB connection successfully")
    }
    else {
        console.log(`MongoDb Error : ${err}`)
    } 
})

// Users router
app.use('/user', Users)

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, "client", "build")))

    app.get('*', (req, res)=>{
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}

// server run on post
const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`server is running on port : ${port}`)
})