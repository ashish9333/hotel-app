const mongoose = require("mongoose");
const  RoomList = require("./roomList");
const { ObjectId } = require('mongodb');

const roomBookSchema = mongoose.Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        },       
    },
    roomNumber:{
        type:Number,
        required: [true, "Room number required"]
       
    },
    startTime:{
        type: Date,
        required: [true, "start date and time is required"]
       
    },
    endTime:{
        type: Date,
        required: [true, "End date and time is required"]
    },
    costPerHour: {
        type: Number,
    },
    totalPrice: {
        type: Number,
    },
    active : {
        type: Number,
        default: 1
    },
    isDeleted: {
        type: Number,
        default: 0
    },
    refundStatus:  {
        type: String
    },
    refundAmount:  {
        type: Number
    }

} , {
    timestamps:true,
})

const BookingRoomModel=  module.exports =  mongoose.model('bookingrooms' , roomBookSchema);


module.exports.bookingRoomModel = (req,res) => {
    try {    
    const startDate =  new Date(req.body.startTime).toISOString();
    const EndDate =  new Date(req.body.endTime).toISOString();
    const parseStartDate = Date.parse(startDate);
    const parseEndDate = Date.parse(EndDate)
    const diff = parseEndDate - parseStartDate;
    const diffInHours = diff/1000/60/60
    const totalHours = parseFloat(diffInHours).toFixed(2);
    if(diff <= 0) {
        return res.status(201).send({
            status: 201, error: "Something went Wrong",
            msg: "End date should be greater that start date"
        });
    }
    
   const roomDetails = {
    roomNumber: +req.body.roomNumber,
    startTime: {$gte : startDate},
    endTime: {$lte: EndDate},
    isDeleted: 0,
    active: 0
   }

   try{BookingRoomModel.findOne(roomDetails).then(async(bookedRooms) => { 
    if (bookedRooms) {
        return res.status(201).send({ error: "error", msg: 'Room is already booked' });
    }
    RoomList.findOne({roomNumber: +req.body.roomNumber}).then(rooms => {
        if(!rooms){
            return res.status(201).send({
                status: 201, error: "Something went Wrong",
                msg: "Rooms not found"
            });
        }

         const newRoomBooking = new BookingRoomModel({
            email: req.body.email,
            roomNumber: +req.body.roomNumber,
            startTime: startDate,
            endTime: EndDate,
            costPerHour: +rooms.costPerHour,
            totalPrice: +totalHours*rooms.costPerHour
        });
        newRoomBooking.save().then(() =>{
                return res.status(200).send({ status: 200, success: "success", msg: "Succesfully added" });
    
        }).catch((err)=>{
            return res.status(500).send({
                status: 500, error: "Something went Wrong",
                msg: err
            });
        });
    });

       
})}catch(err){
    return res.status(500).send({
        status: 500, error: "Something went Wrong",
        msg: err
    });
}

}
catch(err){
    return res.status(500).send({
        status: 500, error: "Something went Wrong",
        msg: err
    });
}

}



module.exports.getAllBooking = (req,res)=>{  
    const query = {};
    if(req.body.roomNumber) {
        query.roomNumber = req.body.roomNumber;
    }
    if(req.body.startTime && eq.body.endTime){
        const startDate =  new Date(req.body.startTime).toISOString();
        const EndDate =  new Date(req.body.endTime).toISOString();

        query.startTime = startDate;
        query.EndDate = EndDate;
    }
    try {
        BookingRoomModel.find(query).then((bookedRooms) => {
            console.log(bookedRooms)
            if (!bookedRooms) {
                return res.status(200).send({ success: "success", msg: 'success', data : [] });
            }
            return res.status(200).send({ success: "success", msg: 'success', data : bookedRooms });
        });
    }
    catch(err){
        console.log(err)
        return res.status(500).send({
            status: 500, error: "Something went Wrong",
            msg: err
        });
    }
}



module.exports.editBooking = (req,res)=>{  
    try{
        const startDate =  new Date(req.body.startTime).toISOString();
        const EndDate =  new Date(req.body.endTime).toISOString();
        const parseStartDate = Date.parse(startDate);
        const parseEndDate = Date.parse(EndDate)
        const diff = parseEndDate - parseStartDate;
        const diffInHours = diff/1000/60/60
        const totalHours = parseFloat(diffInHours).toFixed(2);
        if(diff <= 0) {
            return res.status(201).send({
                status: 201, error: "Something went Wrong",
                msg: "End date should be greater that start date"
            });
        }

        
    if(req.body.id){
        BookingRoomModel.findById(req.body.id).then((data) => {
            if(!data){
                return res.status(500).send({
                    status: 201, error: "Something went Wrong",
                    msg: 'Data not available'
                });
            }
            const roomDetails = {
                roomNumber: +req.body.roomNumber,
                startTime: {$gte : startDate},
                endTime: {$lte: EndDate},
                isDeleted: 0,
                active: 0
               }
            BookingRoomModel.findOne(roomDetails).then((data) => {
                if (data) {
                    return res.status(201).send({ error: "error", msg: 'Room is already booked' });
                }
                RoomList.findOne({roomNumber: +req.body.roomNumber}).then(rooms => {
                    console.log(rooms,'asda')
                    if(!rooms){
                        return res.status(201).send({
                            status: 201, error: "Something went Wrong",
                            msg: "Rooms not found"
                        });
                    }
                    const updateRoom = {
                        email: req.body.email,
                        roomNumber: +req.body.roomNumber,
                        startTime: startDate,
                        endTime: EndDate,
                        costPerHour: +rooms.costPerHour,
                        totalPrice: +totalHours*rooms.costPerHour
                    };
                   

                    BookingRoomModel.findOneAndUpdate(
                        {
                            _id: new mongoose.mongo.ObjectId(req.body.id)
                        },
                        updateRoom).then((updateRoom) => {
                            return res.status(200).send({ status: 200, success: "success", msg: "Succesfully added" });
                        }).catch((err)=>{
                            return res.status(500).send({
                                status: 500, error: "Something went Wrong",
                                msg: err
                            });
                        });
                });
            });
            
        })
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

module.exports.deleteBooking=(req,res)=>{  
    try {
    if(req.body.id){
        
        BookingRoomModel.findById(req.body.id).then((data) => {
            if(!data){
                return res.status(500).send({
                    status: 201, error: "Something went Wrong",
                    msg: 'Data not available'
                });
            }

            const startDate =  new Date(req.body.startTime);
            const currentDate =  new Date().toISOString();
            const parseStartDate = Date.parse(startDate);
            const parseCurrentDate = Date.parse(currentDate)
            const diff = parseStartDate - parseCurrentDate;
            const diffInHours = diff/1000/60/60
            const totalHours = parseFloat(diffInHours).toFixed(2);
            const updateRefundStatus = {}
            if(totalHours >48 ) {
                updateRefundStatus.refundAmount = data.totalPrice;
                updateRefundStatus.refundStatus = 'Fully Refund'
            }
            else if(totalHours <48 &&  totalHours > 24) {
                updateRefundStatus.refundAmount = data.totalPrice/2;
                updateRefundStatus.refundStatus = 'Partial Refund'
            }
            else {
                updateRefundStatus.refundAmount = 0;
                updateRefundStatus.refundStatus = 'No Refund'
            }
            

        BookingRoomModel.findOneAndUpdate(
            {
                _id: new mongoose.mongo.ObjectId(req.body.id)
            },
            { isDeleted :1, active: 0, ...updateRefundStatus }).then((updateRoom) => {
                return res.status(200).send({ status: 200, success: "success", msg: "Succesfully deleted" });
            }).catch((err)=>{
                return res.status(500).send({
                    status: 500, error: "Something went Wrong",
                    msg: err
                });
            });
        });


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