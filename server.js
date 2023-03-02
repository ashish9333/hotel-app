const express = require("express");
require('./db')
const app=express();
const roomsRoute = require('./routes/roomsRoute')
const bodyParser = require('body-parser');
app.use(bodyParser.json())


app.use('/api/rooms', roomsRoute)

const port= process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

