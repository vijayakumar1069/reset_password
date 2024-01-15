import React from "react";
import { useParams, useNavigate } from "react-router-dom";

export const Verify = () => {
  const { id, token } = useParams();
  console.log(id, token);
  const navigate = useNavigate();

  const handleclick = async () => {
    const res = await fetch(`/api/admin/verify/${id}/${token}`);
    const data = await res.json();
    if (data.success === false) {
      console.log("user not found");
      return;
    }
    console.log("user found verified succesfully");
    navigate("/login");
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
        Welcome to Vijay's Site
      </h1>

      <p className="text-lg mb-8 text-gray-600">
        Thank you for joining us! To get started, please verify your account.
      </p>

      <button
        onClick={handleclick}
        className="px-6 py-3 font-semibold bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-md shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
      >
        Please Verify
      </button>
    </div>
  );
};
