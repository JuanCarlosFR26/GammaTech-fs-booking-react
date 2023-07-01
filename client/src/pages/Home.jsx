import React, { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import { UserState } from "../context/UserProvider";
import { getData } from "../functions/functions";
import ReservationCard from "../components/ReservationCard";

const Home = () => {
  const { currentUser, userReservations, setUserReservations } =
    useContext(UserState);

    useEffect(() => {
      // const storedReservations = localStorage.getItem('reservations');
      // if(storedReservations) {
      //   setUserReservations(JSON.parse(storedReservations))
      // } else {
      //   getData(`http://localhost:8001/reservations/user/${currentUser}`).then((res) => {
      //   setUserReservations(res.result)
      // });
      // }
    }, []);

  useEffect(() => {
      const userReservations = localStorage.getItem('reservations')
      if(userReservations) {
        setUserReservations(JSON.parse(userReservations));
      }
  }, [userReservations]);

  console.log(userReservations);

  return (
    <div className="p-8 w-screen h-auto flex flex-col items-center justify-center">
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
              />
            </div>
          ))
        ) : (
          <div>There are no reservations</div>
        )}
      </div>
      {/* <Footer
        className={
          "w-screen relative top-[680px] pt-5 pl-12 pr-12 pb-5 flex justify-center items-center"
        }
      /> */}
    </div>
  );
};

export default Home;
