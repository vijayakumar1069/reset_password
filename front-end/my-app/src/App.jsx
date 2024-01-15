import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Resetpassword from "./pages/Resetpassword";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/rest-password" element={<Resetpassword />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
