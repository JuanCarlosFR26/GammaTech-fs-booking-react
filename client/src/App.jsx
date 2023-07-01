import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import UserProvider from "./context/UserProvider";
import Rooms from "./pages/Rooms";
import Reservations from "./pages/Reservations";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="rooms" element={<Rooms />} />
            <Route path="reservations" element={<Reservations />} />
          </Route>
          <Route path={"register"} element={<Register />} />
          <Route path={"login"} element={<Login />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
