import "./App.css";
import Login from "./Login";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import SignUp from "./SignUp";
import CreateProfile from "./CreateProfile";
import Home from "./Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate replace to='/Home' />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Signup' element={<SignUp />} />
        <Route path='/Home' element={<Home />} />
        <Route path='/CreateProfile' element={<CreateProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
