const express = require("express");
const cors = require('cors');

require('./db')
const app=express();
const roomsRoute = require('./routes/roomsRoute')
const bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(cors());


app.use('/api/rooms', roomsRoute)

const port= process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

