import React from 'react'

const ReservationCard = ({ className, onClick, id, room, start, end }) => {
  return (
    <div className={className}>
        <h2 className='flex justify-center items-center'>Reservation {id} <button className='bg-pink-800 ml-20 h-8 w-8 cursor-pointer p-2 border rounded-[50%] flex items-center justify-center' onClick={onClick}><i class="fa-solid fa-x text-white"></i></button></h2>
        <p>Room {room}</p>
        <p>Time start: {start}</p>
        <p>Time end: {end}</p>
    </div>
  )
}

export default ReservationCard