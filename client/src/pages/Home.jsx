import React, { useContext, useEffect, useState } from "react";
import { UserState } from "../context/UserProvider";
import { getData } from "../functions/functions";
import ReservationCard from "../components/ReservationCard";

const Home = () => {
  const { currentUser, userReservations, setUserReservations } =
    useContext(UserState);

    const [deleted, setDeleted] = useState(false);

    useEffect(() => {
      const storedReservations = sessionStorage.getItem('reservations');
      if(storedReservations) {
        setUserReservations(JSON.parse(storedReservations))
      } else {
        getData(`http://localhost:8001/reservations/user/${currentUser}`).then((res) => {
        setUserReservations(res.result)
      });
      }
    },  [currentUser]);

  useEffect(() => {
      const userReservations = sessionStorage.getItem('reservations')
      if(userReservations) {
        setUserReservations(JSON.parse(userReservations));
      }
  }, [userReservations]);

  const deleteReservation = (id) => {
    fetch(`http://localhost:8001/reservation/delete/${id}`, {
      method: 'DELETE'
    }).then(res => {
      if(res.ok) {
        console.log('Reserva eliminada')
        setDeleted(true)
        setTimeout(() => {
          setDeleted(false)
        }, 1000)
      }
    })
  }


  return (
    <div className="p-8 flex flex-col items-center justify-center">
      <h1 className="">
        Welcome <span className="font-bold text-teal-500">{currentUser}!</span>
      </h1>
      <div className="flex flex-wrap items-center flex-col gap-8 mt-6">
        <h3 className="font-bold">Your appointments</h3>
        {userReservations ? (
          userReservations.map((reservation, i) => (
            <div key={i} className="bg-teal-400 rounded-2xl p-4 font-bold">
              <ReservationCard
                id={reservation.reservation_id}
                room={reservation.room_id}
                start={reservation.time_start}
                end={reservation.time_end}
                onClick={() => deleteReservation(reservation.reservation_id)}
              />
            </div>
          ))
        ) : (
          <div>There are no reservations</div>
        )}
      </div>
    </div>
  );
};

export default Home;
