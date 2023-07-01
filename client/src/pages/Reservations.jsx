import React, { useEffect, useState } from 'react'
import { getData } from '../functions/functions';
import ReservationCard from '../components/ReservationCard';

const Reservations = () => {

  const [reservationList, setReservationList] = useState(null);

  useEffect(() => {
    getData('http://localhost:8001/reservations').then(res => setReservationList(res.result));
  })
  
  return (
    <div className="flex flex-wrap items-center flex-col gap-8 mt-6">
    <h1 className='font-bold text-3xl'>Reservation List</h1>
      {
        reservationList ? reservationList.map((reservation, i) => (
          <div key={i} className="bg-teal-400 rounded-2xl p-4 font-bold">
            <ReservationCard id={reservation.reservation_id} room={reservation.room_id} start={reservation.time_start} end={reservation.time_end}/>
          </div>
        )) : <div>No hay</div>
      }
    </div>
  )
}

export default Reservations