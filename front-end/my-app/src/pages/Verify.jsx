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
    <div className="flex items-center justify-center h-screen">
      <button
        onClick={handleclick}
        className="px-6 py-3 font-semibold bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-md shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
      >
        Verify
      </button>
    </div>
  );
};
