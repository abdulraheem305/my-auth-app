import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.jpg";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="flex justify-between items-center bg-gray-800 text-white p-4">
      <div className="flex items-center gap-4">
        <img
          src={logo}
          alt="Logo"
          className="w-12 h-12 rounded-full border-2 border-white"
        />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-lg font-semibold">
          {`Hey! ${user?.name || "Guest"}`}
        </span>
        {user && (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
