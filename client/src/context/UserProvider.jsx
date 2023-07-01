import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../.firebase/firebaseConfig";
import { getData } from "../functions/functions";

export const UserState = createContext(null);

const UserProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState(null);
  const [userPassword, setUserPassword] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [userReservations, setUserReservations] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user.email);
      } else {
        navigate("/login");
      }
    });

    getData(`http://localhost:8001/reservations/user/${currentUser}`).then(
      (res) => {
        console.log(res);
        sessionStorage.setItem('reservations', JSON.stringify(res.result));
      }
    );
  }, []);

  return (
    <UserState.Provider
      value={{
        userEmail,
        setUserEmail,
        userPassword,
        setUserPassword,
        setCurrentUser,
        currentUser,
        userReservations,
        setUserReservations,
      }}
    >
      {children}
    </UserState.Provider>
  );
};

export default UserProvider;
