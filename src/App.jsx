import "./App.css";
import React, { useState, useEffect } from "react";
import { supabase } from "./createClient";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Location from "./Pages/Location";
import Errorpage from "./Pages/Errorpage.jsx";

function App() {
  return (

    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/error/404" element={ <Errorpage></Errorpage> } />
        <Route path="*" element={<Navigate to="/error/404" />} />
        <Route path="/location/:location" element={< Location />} />
      </Routes>
    </BrowserRouter>
  </>

  );
}

export default App;
