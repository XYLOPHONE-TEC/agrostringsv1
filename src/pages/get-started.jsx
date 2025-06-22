// src/components/GetStarted.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaShoppingCart, FaUsers } from 'react-icons/fa';
import logo from '../assets/logo.png';

const roles = [
  { key: 'farmer',    label: 'Farmer',    description: 'Sell your produce and manage your farm',    icon: <FaUser size={20} className="text-yellow-400" /> },
  { key: 'buyer',     label: 'Buyer',     description: 'Source quality agricultural products',        icon: <FaShoppingCart size={20} className="text-yellow-400" /> },
  { key: 'agroteam',  label: 'AgroTeam',  description: 'Manage and oversee operations',                 icon: <FaUsers size={20} className="text-yellow-400" /> },
];

export default function GetStarted() {
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-gradient-to-b from-[#1a281f] to-[#333] text-white flex flex-col">
      {/* Header: shrink padding on mobile */}
      <nav className="w-full max-w-5xl mx-auto flex justify-between items-center py-2 px-2 sm:py-4 sm:px-4">
        <img src={logo} alt="AgroStrings Logo" className="h-8 sm:h-10" />
        <ul className="flex items-center space-x-3 sm:space-x-6 text-xs sm:text-sm">
          <li><Link to="/login" className="pb-1 font-medium border-b-2 border-transparent hover:border-yellow-400">Login</Link></li>
          <li><Link to="/signup" className="pb-1 font-medium border-b-2 border-yellow-400">Signup</Link></li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center px-2 sm:px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 text-center">
          <span className="text-white">Welcome to </span>
          <span className="text-yellow-400">AgroStrings</span>
        </h1>
        <p className="text-gray-400 mb-4 text-center text-[0.85rem]">Select your role to get started</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 w-full max-w-3xl mb-4">
          {roles.map(({ key, label, description, icon }) => (
            <button
              key={key}
              onClick={() => setSelectedRole(key)}
              className={`
                flex flex-row sm:flex-col items-center sm:items-start
                p-2 sm:p-4 rounded-lg border-2 transition-colors w-full
                ${selectedRole === key
                  ? 'border-yellow-400 bg-black'
                  : 'border-transparent bg-[#111] hover:border-yellow-400'}
              `}
            >
              <div className="p-1 sm:p-2 bg-[#383422] rounded mr-2 sm:mr-0 sm:mb-2">
                {icon}
              </div>
              <div className="text-left">
                <h2 className="text-base sm:text-lg font-semibold mb-0.5">{label}</h2>
                <p className="text-gray-400 text-[0.75rem] sm:text-xs">{description}</p>
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={() => selectedRole && navigate(`/signup?role=${selectedRole}`)}
          disabled={!selectedRole}
          className={`
            w-full sm:w-auto px-4 py-1.5 sm:px-6 sm:py-2 rounded-full font-medium transition-opacity disabled:opacity-50 mb-2
            ${selectedRole ? 'bg-yellow-400 text-gray-900' : 'bg-yellow-700 text-gray-500'}
          `}
        >
          Continue
        </button>

        <p className="text-gray-400 text-[0.8rem]">
          Already have an account?{' '}
          <Link to="/login" className="text-yellow-400 hover:underline">Login</Link>
        </p>
      </main>
    </div>
  );
}
