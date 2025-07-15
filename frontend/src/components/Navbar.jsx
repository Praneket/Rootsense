import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { GiRootTip } from "react-icons/gi";
import { IoIosPerson } from "react-icons/io";
import { RiLogoutBoxLine } from "react-icons/ri";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
export default function Navbar() {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const logout = async () => {
    await signOut(auth);
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="z-50 sticky top-0 bg-white/30 backdrop-blur-2xl shadow-sm">
      <div className="container mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between">
        <h1
          onClick={() => navigate("/dashboard")}
          className="text-3xl sm:text-4xl font-extrabold tracking-tight text-green-700 drop-shadow-md cursor-pointer hover:text-green-800 transition duration-300"
        >
          <span className="flex">
            <GiRootTip /> RootSense
          </span>
        </h1>

        <ul className="flex justify-center items-center space-x-6 text-sm font-medium">
          <li
            className="cursor-pointer hover:text-green-700"
            onClick={() => navigate("/farmer")}
          >
            Dashboard
          </li>
          <li
            className="cursor-pointer hover:text-green-700"
            onClick={() => navigate("/agribot")}
          >
            AgriBot
          </li>
          <li
            className="cursor-pointer hover:text-green-700"
            onClick={() => navigate("/reviews")}
          >
            Reviews
          </li>

          {/* Profile Dropdown */}
          <li className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-gray-700 hover:text-green-700 focus:outline-none"
            >
              <FaUserCircle className="w-6 h-6" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                <ul className="py-1 text-sm text-gray-700">
                  <li
                    className="px-4 py-2 hover:bg-green-100 cursor-pointer flex"
                    onClick={() => {
                      navigate("/profile");
                      setDropdownOpen(false);
                    }}
                  >
                    <IoIosPerson className="mt-1 mr-1" /> Profile
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-green-100 cursor-pointer flex"
                    onClick={() => {
                      logout();
                      setDropdownOpen(false);
                    }}
                  >
                    <RiLogoutBoxLine className="m-1" /> Logout
                  </li>
                </ul>
              </div>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}
