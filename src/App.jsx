import React, { useEffect } from "react";
import Home from "./components/pages/Home/Home";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from './components/pages/Login/Login'
import Player from "./components/pages/Player/Player";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { ToastContainer, toast } from 'react-toastify';

const App = () => {
  
  const navigate = useNavigate();

  useEffect(()=>{
    onAuthStateChanged(auth,async(user)=>{
      if(user){
        console.log('loggged In');
        navigate('/')
      }else{
        console.log('Logged Out');
        navigate('/login')
    }
    })
  },[])

  return (
    <div>
      <ToastContainer theme="dark"/>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/player/:id" element={<Player></Player>}></Route>
      </Routes>
    </div>
  );
};

export default App;
