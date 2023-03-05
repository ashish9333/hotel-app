const express = require("express");
const router = express.Router();

const Room =require('../models/roomList')
const BookingRoom =require('../models/roomBook')



router.post('/getallrooms',Room.getAllRoomsList)
router.post('/addBookingRoom',BookingRoom.bookingRoomModel)
router.post('/getAllBookings',BookingRoom.getAllBooking)
router.post('/editBooking',BookingRoom.editBooking)
router.post('/deleteBooking',BookingRoom.deleteBooking)



module.exports = router;