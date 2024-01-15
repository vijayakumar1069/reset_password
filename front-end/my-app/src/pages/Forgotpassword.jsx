import React, { useState } from "react";

const Forgotpassword = () => {
  const [formdata, setFormdata] = useState({ email: "" });
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const handlesubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/admin/forgotpasswordmail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formdata),
    });
    const data = await res.json();
    if (data.success) {
      setError(data.message);
      return;
    }
    setError(false);
    setSuccess(data.result);
  };
  return (
    <form
      onSubmit={handlesubmit}
      className="max-w-md mx-auto p-6 mt-10 bg-gradient-to-br from-[#86A7FC] to-[#FF9BD2] text-white rounded-lg shadow-lg hover:shadow-xl"
    >
      <p className="text-lg font-semibold mb-4 text-black">
        {" "}
        Enter Your Email to Get a Reset Password Link
      </p>
      <div className="mb-4">
        <label className="text-black font-semibold">Email</label>
        <input
          type="email"
          id="email"
          onChange={(e) => setFormdata({ email: e.target.value })}
          placeholder="Email"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none text-black  focus:border-blue-800"
        />
      </div>
      <button className="w-full p-3 font-semibold bg-transparent border uppercase border-white rounded-lg hover:bg-white hover:text-blue-500 transform hover:scale-105 transition-all duration-300">
        Get Reset Link
      </button>
      {error && (
        <p className="p-2 text-white mt-3 bg-red-500 rounded-md text-center font-semibold">
          {error}
        </p>
      )}
      {success && (
        <p className="p-2 text-green-700 font-semibold text-center mt-3 bg-white bg-opacity-40 rounded-md">
          {success}
        </p>
      )}
    </form>
  );
};

export default Forgotpassword;
