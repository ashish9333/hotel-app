const mongoose = require("mongoose");

var mongoURL = 'mongodb+srv://sajankumar23658:ashish@cluster0.n2h0kxl.mongodb.net/sample'

mongoose.connect(mongoURL , {useUnifiedTopology : true , useNewUrlParser:true})

var connection =mongoose.connection

connection.on('error' , ()=>{
    console.log('Mongo DB Connection Failed')
})

connection.on('connected' , ()=>{
    console.log('Mongo DB Connection Sucessful')
})

module.exports= mongoose