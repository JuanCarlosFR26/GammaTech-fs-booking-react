import React, { useContext, useEffect } from "react";
import Footer from "../components/Footer";
import Form from "../components/Form";
import { UserState } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../.firebase/firebaseConfig";
import { getData } from "../functions/functions";

const Login = () => {
  const {
    userEmail,
    userPassword,
    setUserEmail,
    setUserPassword,
    setCurrentUser,
    currentUser
  } = useContext(UserState);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signInWithEmailAndPassword(auth, userEmail, userPassword)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
      // const sessionId = sessionStorage.setItem('userId', )

    setCurrentUser(userEmail);
    navigate("/");
  };

  return (
    <div className="w-screen h-screen bg-teal-900 flex justify-between items-center flex-col">
      <Form
        onSubmit={handleSubmit}
        title={"Login"}
        className={
          "mt-20 w-3/4 h-2/4 bg-teal-300 flex flex-col items-center justify-center rounded-2xl shadow-lg shadow-teal-100 gap-8"
        }
        dataEmail={(e) => setUserEmail(e.target.value)}
        dataPassword={(e) => setUserPassword(e.target.value)}
        textLink={"Don't you have an account?"}
        path={"/register"}
        textSubmit={"Login"}
      />
      <Footer
        className={
          "relative w-screen min-h-[50px] pt-5 pl-12 pr-12 pb-5 flex justify-center items-center"
        }
      />
    </div>
  );
};

export default Login;
