import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Resetpassword from "./pages/Resetpassword";
import { Verify } from "./pages/Verify";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/rest-password" element={<Resetpassword />} />
          <Route path="/verify/:id/:token" element={<Verify />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
