const mongoose = require("mongoose");

var mongoURL = 'mongodb+srv://ashish9333:ashish9333@rooms.7stuhuq.mongodb.net/roomlist'

mongoose.connect(mongoURL , {useUnifiedTopology : true , useNewUrlParser:true})

var connection =mongoose.connection

connection.on('error' , ()=>{
    console.log('Mongo DB Connection Failed')
})

connection.on('connected' , ()=>{
    console.log('Mongo DB Connection Sucessful')
})

module.exports= mongoose