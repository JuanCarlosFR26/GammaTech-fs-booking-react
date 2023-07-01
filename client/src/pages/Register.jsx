import React, { useContext } from "react";
import Form from "../components/Form";
import Footer from "../components/Footer";
import { UserState } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../.firebase/firebaseConfig.js';
import { addUser } from '../functions/functions.js';

const Register = () => {

    const { userEmail, userPassword, setUserEmail, setUserPassword } = useContext(UserState);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await createUserWithEmailAndPassword(auth, userEmail, userPassword)
        .then((userCredential) => {
            const user = userCredential.user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        })

        addUser('http://localhost:8001/user/create', userEmail)

        navigate('/')
    }


  return (
    <div className="w-screen h-screen bg-teal-900 flex justify-between items-center flex-col">
      <Form
        title={"Register"}
        className={
          "mt-20 w-3/4 h-2/4 bg-teal-300 flex flex-col items-center justify-center rounded-2xl shadow-lg shadow-teal-100 gap-8"
        }
        dataEmail={(e) => setUserEmail(e.target.value)}
        dataPassword={(e) => setUserPassword(e.target.value)}
        textLink={'Already have an account? Click here'}
        path={'/login'}
        textSubmit={'Register'}
        onSubmit={handleSubmit}
      />
      <Footer
        className={
          "relative w-screen min-h-[50px] pt-5 pl-12 pr-12 pb-5 flex justify-center items-center"
        }
      />
    </div>
  );
};

export default Register;
