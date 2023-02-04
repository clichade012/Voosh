const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors")
const route = require('./route/route')
const app = express()

app.use(express.json())
app.use(cors())

mongoose.set('strictQuery',true)

mongoose.connect("mongodb+srv://Chaitanya012:uEEYLDPlUa999wEK@cluster0.0zsen34.mongodb.net/Voosh-db?retryWrites=true&w=majority",
  {  useNewUrlParser:true
}) 
.then(()=> console.log("Mongodb is connected"))
.catch( err => console.log(err))


app.use('/',route)

app.listen( 3000 , function(){
    console.log('Express app running on port '+ (4000));
})

