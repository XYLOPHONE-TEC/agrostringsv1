// src/components/GetStarted.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaShoppingCart, FaUsers } from 'react-icons/fa';
import logo from '../assets/logo.png';

const roles = [
  {
    key: 'farmer',
    label: 'Farmer',
    description: 'Sell your produce and manage your farm',
    icon: <FaUser size={24} className="text-yellow-400" />,
  },
  {
    key: 'buyer',
    label: 'Buyer',
    description: 'Source quality agricultural products',
    icon: <FaShoppingCart size={24} className="text-yellow-400" />,
  },
  {
    key: 'agroteam',
    label: 'AgroTeam',
    description: 'Manage and oversee operations',
    icon: <FaUsers size={24} className="text-yellow-400" />,
  },
];

export default function GetStarted() {
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();

  const handleSelect = roleKey => setSelectedRole(roleKey);
  const handleContinue = () => {
    if (selectedRole) navigate(`/signup?role=${selectedRole}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a281f] to-[#333] text-white flex flex-col">
      {/* Header */}
      <nav className="w-full max-w-5xl mx-auto flex justify-between items-center py-4 px-4 md:py-6">
        <img src={logo} alt="AgroStrings Logo" className="h-15 sm:h-15 w-auto" />
        <ul className="flex items-center space-x-4 text-xs sm:space-x-6 sm:text-sm">
          <li>
            <Link
              to="/login"
              className="pb-1 font-medium border-b-2 border-transparent hover:border-yellow-400 transition"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/signup"
              className="pb-1 font-medium border-b-2 border-yellow-400 transition"
            >
              Signup
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold mb-2 text-center">
          <span className="text-white">Welcome to </span>
          <span className="text-yellow-400">AgroStrings</span>
        </h1>
        <p className="text-gray-400 mb-6 text-center">Select your role to get started</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full max-w-3xl lg:max-w-4xl mb-6">
          {roles.map(({ key, label, description, icon }) => (
            <button
              key={key}
              onClick={() => handleSelect(key)}
              className={`
                flex flex-row sm:flex-col items-center sm:items-start
                p-4 sm:p-6 rounded-lg border-2 transition-colors focus:outline-none w-full
                ${selectedRole === key
                  ? 'border-yellow-400 bg-black'
                  : 'border-transparent bg-[#111] hover:border-yellow-400'}
              `}
            >
              {/* Icon container: right margin on mobile, bottom margin on desktop */}
              <div className="p-2 bg-[#383422] rounded mr-4 sm:mr-0 sm:mb-3">
                {icon}
              </div>
              <div className="flex-1 text-left">
                <h2 className="text-lg sm:text-xl font-semibold mb-1">{label}</h2>
                <p className="text-gray-400 text-xs sm:text-sm">{description}</p>
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={handleContinue}
          disabled={!selectedRole}
          className={`
            w-full sm:w-auto px-6 py-2 rounded-full font-medium transition-opacity disabled:opacity-50 mb-4
            ${selectedRole ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-300' : 'bg-yellow-700 text-gray-500'}
          `}
        >
          Continue
        </button>

        <p className="text-gray-400 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-yellow-400 hover:underline">
            Login
          </Link>
        </p>
      </main>
    </div>
  );
}
