import React, { useContext, useEffect, useState } from "react";
import { getData } from "../functions/functions";
import ReservationCard from "../components/ReservationCard";
import ReservationForm from "../components/ReservationForm";
import Footer from "../components/Footer";
import { UserState } from "../context/UserProvider";

const Reservations = () => {
  const { currentUser, setUserReservations } = useContext(UserState);

  const [reservationList, setReservationList] = useState(null);
  const [user_id, setUserId] = useState(null);
  const [room_id, setRoom] = useState(null);
  const [time_start, setTimeStart] = useState(null);
  const [time_end, setTimeEnd] = useState(null);

  useEffect(() => {
    getData("http://localhost:8001/reservations").then((res) =>
      setReservationList(res.result)
    );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await getData(`http://localhost:8001/user/${currentUser}`)
    const [{ user_id }] = user.result;
      if (user_id) {
        setUserId(user_id);
      }

    const formattedUserId = parseInt(user_id);
    const formattedRoomId = parseInt(room_id);
    const formattedStart = time_start.replace("T", " ");
    const formattedEnd = time_end.replace("T", " ");

    const reservationData = {
      user_id: formattedUserId,
      room_id: formattedRoomId,
      time_start: formattedStart,
      time_end: formattedEnd,
    };

    try {
      if (user_id) {
        const response = await fetch(
          `http://localhost:8001/reservation/create`,
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(reservationData),
          }
        );
        if (response.ok) {
          setReservationList((prev) => [...prev, reservationData]);
          setUserReservations((prev) => [...prev, reservationData]);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-wrap items-center flex-col gap-8 bg-lime-200">
      <ReservationForm
        onSubmit={handleSubmit}
        className={
          "flex flex-col items-center mt-8 bg-cyan-500 rounded-3xl p-4"
        }
        title={"Make your reservation"}
        dataRoom={(e) => setRoom(e.target.value)}
        dataStart={(e) => setTimeStart(e.target.value)}
        dataEnd={(e) => setTimeEnd(e.target.value)}
        textSubmit={"Make"}
      />
      <h1 className="font-bold text-3xl">Reservation List</h1>
      {reservationList ? (
        reservationList.map((reservation, i) => (
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
        <div>No hay</div>
      )}
      <Footer
        className={
          "mt-20 relative w-screen min-h-[50px] pt-5 pl-12 pr-12 pb-5 flex justify-center items-center"
        }
      />
    </div>
  );
};

export default Reservations;
