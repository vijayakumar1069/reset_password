import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Resetpassword from "./pages/Resetpassword";
import { Verify } from "./pages/Verify";
import Forgotpassword from "./pages/Forgotpassword";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/reset-password/:id/:token"
            element={<Resetpassword />}
          />
          <Route path="/verify/:id/:token" element={<Verify />} />
          <Route path="/forgot-password" element={<Forgotpassword />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
