import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Home from "./pages/home/Home";
import Messager from "./pages/messager/Messager";
import { Routes, Route, Navigate } from "react-router-dom";

// const user = Cookies.get("user");
const user = window.sessionStorage.getItem("user");

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Home /> : <Navigate to="/login" />}
      ></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/profile/:user_id" element={<Profile />}></Route>
      <Route path="/chat" element={<Messager />}></Route>
    </Routes>
  );
}

export default App;
