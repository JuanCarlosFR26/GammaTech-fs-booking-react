import React, { useEffect, useState } from 'react'
import { getData } from '../functions/functions';
import Room from '../components/Room';

const Rooms = () => {

  const [rooms, setRooms] = useState(null);


  useEffect(() => {
    getData(`http://localhost:8001/rooms`).then(res => setRooms(res.result))
  }, [])

  return (
    <div className='h-auto flex flex-col gap-6 items-center mt-8'>
    <h1 className='font-bold text-3xl'>Rooms</h1>
      {
        rooms ? rooms.map((room, i) => (
          <div className='w-3/4 rounded-2xl p-4 flex items-center justify-center bg-teal-400 gap-6' key={i}>
            <Room id={room.room_id} name={room.name} tv={room.tv ? 'With TV' : 'Without TV'} air={room.air_conditioning ? 'With air conditioning' : 'Without air conditioning'}/>
          </div>
        )) : <div>No rooms</div>
      }
    </div>
  )
}

export default Rooms