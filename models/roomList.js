const mongoose = require('mongoose');
  

const RoomListSchema = mongoose.Schema({
    roomType: {
        type: String
    },
    roomNumber: {
        type: Number
    },
    costPerHour: {
        type: Number
    }
});

const RoomList = module.exports = mongoose.model('roomlists', RoomListSchema);

module.exports.getAllRoomsList = (req,res)=>{  
    try {
        if(req.body.roomNumber) {
            const query = {roomNumber : +req.body.roomNumber}
            RoomList.findOne(query).then(rooms => {
                if(!rooms){
                    return res.status(201).send({
                        status: 201, error: "Something went Wrong",
                        msg: "Rooms not found"
                    });
                }
                return res.status(200).send({
                    status: 200, data: rooms,
                    msg: "success"
                });
            })
        }
        else {
            return res.status(201).send({ status: 201, msg: 'roomType or roomNumber field is missing' })
        }
    }
    catch(err){
        console.log(err)
        return res.status(500).send({
            status: 500, error: "Something went Wrong",
            msg: err
        });
    }
}

