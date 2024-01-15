import React, { useState } from "react";

function Signup() {
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const handlechange = (e) => {
    setFormdata({ ...formdata, [e.target.id]: e.target.value });
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/admin/signup", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formdata),
    });
    const data = await res.json();
    if (data.success === false) {
      setError(data.message);
      return;
    }
    setSuccess(data.result);
    setError(false);
  };
  console.log(formdata);
  return (
    <form
      onSubmit={handlesubmit}
      className="max-w-md mx-auto p-6 mt-10 bg-gradient-to-br from-[#86A7FC] to-[#FF9BD2] rounded-lg shadow-lg hover:shadow-xl"
    >
      <h1 className="text-5xl font-bold text-white mb-4 text-center ">
        Sign up
      </h1>

      <div className="mb-4">
        <label className="text-white">Name</label>
        <input
          type="name"
          id="name"
          placeholder="name"
          onChange={handlechange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-dashed focus:border-blue-400"
        />
      </div>

      <div className="mb-4">
        <label className="text-white">Email</label>
        <input
          type="email"
          id="email"
          placeholder="email"
          onChange={handlechange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-dashed focus:border-blue-400"
        />
      </div>

      <div className="mb-4">
        <label className="text-white">Password</label>
        <input
          type="password"
          id="password"
          placeholder="password"
          onChange={handlechange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-dashed focus:border-blue-400"
        />
      </div>

      <div className="mb-6">
        <button className="w-full p-3 text-center font-semibold bg-yellow-600 rounded-lg text-white hover:bg-yellow-700">
          Signup
        </button>
      </div>
      {error && (
        <p className="p-2 text-[#11009E] font-semibold text-center">{error}</p>
      )}
      {success && (
        <p className="p-2 text-green-700 font-semibold text-center">
          {success}
        </p>
      )}

      <div className="text-white">
        <span className="text-black">
          If you have an account please{" "}
          <span className="hover:underline text-[#FF004D] cursor-pointer ">
            LOGIN
          </span>{" "}
          here
        </span>
      </div>
    </form>
  );
}

export default Signup;
