import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Resetpassword = () => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formdata, setFormdata] = useState({
    password1: "",
    password2: "",
  });
  const { id, token } = useParams();
  const navigate = useNavigate();
  const handlechange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    if (formdata.password1 != formdata.password2) {
      setError("Both Passwords Must Be Same");
      return;
    }
    const res = await fetch(`/api/admin/reset-password/${id}/${token}`, {
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
    setError("");
    setSuccess(data.result);
   
  };
 
  useEffect(() => {
    let timeout;
    if (success) {
      timeout = setTimeout(() => {
        navigate("/login");
      }, 10000); // 10 seconds
    }

    return () => clearTimeout(timeout);
  }, [success, navigate]);

  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-gradient-to-br from-[#86A7FC] to-[#FF9BD2] text-white rounded-lg shadow-lg hover:shadow-xl">
      <h1 className="text-3xl text-black font-bold mb-4">
        Reset Your Password Here
      </h1>
      <div className="mb-4">
        <label className="text-black">New Password</label>
        <input
          type="password"
          name="password1"
          onChange={handlechange}
          placeholder="New Password"
          className="w-full px-3 py-2 rounded-lg border text-black  focus:outline-none focus:border-blue-800"
        />
      </div>
      <div className="mb-4">
        <label className="text-black">Confirm Password</label>
        <input
          type="password"
          name="password2"
          onChange={handlechange}
          placeholder="Confirm Password"
          className="w-full px-3 py-2 rounded-lg border text-black focus:outline-none focus:border-blue-800"
        />
      </div>
      <button
        onClick={handlesubmit}
        className="w-full p-3 font-semibold bg-transparent border uppercase border-white rounded-lg hover:bg-white hover:text-blue-500 transform hover:scale-105 transition-all duration-300"
      >
        Reset Password
      </button>
      {error && (
        <p className="p-2 text-white font-semibold text-center bg-red-600 bg-opacity-85 rounded-md">
          {error}
        </p>
      )}
      {success && (
        <p className="p-2 text-green-700 font-semibold mt-3 text-center bg-white bg-opacity-20 rounded-md">
          {success}
        </p>
      )}
    </div>
  );
};

export default Resetpassword;
