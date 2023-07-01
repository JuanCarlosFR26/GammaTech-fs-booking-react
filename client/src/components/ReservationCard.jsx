import React from 'react'

const ReservationCard = ({ className, id, room, start, end }) => {
  return (
    <div className={className}>
        <h2>Reservation {id}</h2>
        <p>Room {room}</p>
        <p>Time start: {start}</p>
        <p>Time end: {end}</p>
    </div>
  )
}

export default ReservationCard