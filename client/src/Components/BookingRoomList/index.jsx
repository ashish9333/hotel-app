import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
axios.default.baseUrl = ''
function BookingRoomList() {
  const [bookingList,setBookingList] = useState([])
  useEffect(() => {
    axios.post('http://localhost:4000/api/rooms/getAllBookings',{ headers: { 'Content-Type': 'application/json' }},{}).then((data) => {

        setBookingList(data.data.data)
    }).catch((err) => {
      console.log(err)
    })
},[])
console.log(bookingList,'bookingListbookingList')
  return ( 
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>User Email</th>
          <th>Room Number</th>
          <th>Start time</th>
          <th>End time</th>
          <th>Cost Per Hour</th>
          <th>Total Price</th>
          <th>Booking</th>
          <th>Refund</th>
        </tr>
      </thead>
      <tbody>
    {  bookingList && bookingList.length > 0 &&
      bookingList.map((data) => (
        <tr>
        <td>{data.email}</td>
        <td>{data.roomNumber}</td>
        <td>{data.startTime}</td>
        <td>{data.endTime}</td>
        <td>{data.costPerHour}</td>
        <td>{data.totalPrice}</td>
        <td>{data.active == 1 ? 'Active' : 'Canceled'}</td>
        <td>{data?.refundStatus ? data.refundStatus + ' ( ' + data.refundAmount + ' )' : '-'}</td>
      </tr>
      ))
 }
       
      </tbody>
    </Table>
  );
}

export default BookingRoomList;