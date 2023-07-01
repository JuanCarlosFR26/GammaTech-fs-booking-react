import React, { useContext, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from "../imgs/logo.png";
import Button from "../components/Button";
import { signOut } from "firebase/auth";
import { auth } from "../.firebase/firebaseConfig";
import { UserState } from "../context/UserProvider";

const Layout = () => {
  const { currentUser, setCurrentUser } = useContext(UserState);

  const navigate = useNavigate();

  const [menu, setMenu] = useState(false);

  const showMenu = () => {
    setMenu((prev) => !prev);
  };

  const logout = async () => {
    signOut(auth)
      .then(() => {
        console.log("closing...");
      })
      .catch((error) => {
        console.log(error);
      });
    setCurrentUser(null);
    navigate("/login");
    sessionStorage.removeItem('reservations')
  };

  return (
    <>
      <nav className="w-screen min-h-[70px] bg-teal-500 flex items-center">
        <ul
          className={`${
            menu ? "translate-x-[5px]" : "translate-x-[-360px]"
          } flex gap-8 font-bold text-white transition-all ease-in-out duration-700`}
        >
          <li>
            <Link className="flex items-center gap-2 hover:text-red-500" to="/">
              <i className="fa-solid fa-house"></i>Home
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center gap-2 hover:text-red-500"
              to="/rooms"
            >
              <i className="fa-solid fa-building-circle-arrow-right"></i>Rooms
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center gap-2 hover:text-red-500"
              to="/reservations"
            >
              <i className="fa-solid fa-calendar-check"></i>Reservations
            </Link>
          </li>
          <li>
            <Button
              onClick={showMenu}
              text={
                <i className={menu ? "fa-solid fa-x" : "fa-solid fa-bars"}></i>
              }
            />
          </li>
          <li>
            <Button
              onClick={() => logout()}
              text={<i className="fa-solid fa-right-from-bracket"></i>}
              className={'relative left-72'}
            />
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Layout;
