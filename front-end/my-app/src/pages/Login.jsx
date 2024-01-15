import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const [error, setError] = useState(false);

  const handleclick = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formdata),
    });
    const data = await res.json();
    if (data.success === false) {
      setError(data.message);
      return;
    }
    navigate("/dashboard");
  };

  return (
    <form
      onSubmit={handlesubmit}
      className="max-w-md mx-auto p-6 mt-10 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow-md hover:shadow-lg"
    >
      <h1 className="text-3xl font-extrabold mb-4 text-center uppercase">
        Login
      </h1>

      <div className="mb-4">
        <label className="text-gray-300">Email</label>
        <input
          type="email"
          name="email"
          onChange={handleclick}
          placeholder="Email"
          className="w-full px-3 py-2 border text-black font-semibold rounded-lg focus:outline-none focus:border-blue-800"
        />
      </div>

      <div className="mb-4">
        <label className="text-gray-300">Password</label>
        <input
          type="password"
          name="password"
          onChange={handleclick}
          placeholder="Password"
          className="w-full px-3 py-2 border text-black font-semibold rounded-lg focus:outline-none focus:border-blue-800"
        />
      </div>

      <button className="w-full p-3 font-semibold bg-transparent border uppercase border-white rounded-lg hover:bg-white hover:text-blue-500 transition-all duration-300">
        Login
      </button>

      <Link to="/forgot-password" className="block mt-3">
        <button className="w-full p-3 font-semibold bg-transparent border uppercase border-white rounded-lg hover:bg-white hover:text-blue-500 transition-all duration-300">
          Forget Password
        </button>
      </Link>

      {error && (
        <p className="p-2 text-white mt-3 bg-red-500 rounded-md text-center font-semibold">
          {error}
        </p>
      )}

      <div className="mt-4 text-gray-300">
        <span>
          If you don't have an account,{" "}
          <Link to="/" className="text-[#7D0A0A] hover:underline font-bold uppercase">
            Sign Up
          </Link>{" "}
          here
        </span>
      </div>
    </form>
  );
}

export default Login;
