import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaShoppingCart, FaUsers } from 'react-icons/fa';
import logo from '../assets/logo.png';

const roles = [
  {
    key: 'farmer',
    label: 'Farmer',
    description: 'Sell your produce and manage your farm operations efficiently',
    icon: <FaUser size={24} className="text-yellow-400" />,
  },
  {
    key: 'buyer',
    label: 'Buyer',
    description: 'Source premium quality agricultural products directly from farmers',
    icon: <FaShoppingCart size={24} className="text-yellow-400" />,
  },
  {
    key: 'agroteam',
    label: 'AgroTeam',
    description: 'Manage and oversee agricultural operations at scale',
    icon: <FaUsers size={24} className="text-yellow-400" />,
  },
];

export default function GetStarted() {
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();

  const handleSelect = (roleKey) => setSelectedRole(roleKey);
  const handleContinue = () => {
    if (selectedRole) navigate(`/signup?role=${selectedRole}`);
  };

  return (
    <div className="min-h-screen bg-[#111f13] text-white flex flex-col">
      {/* Header */}
      <nav className="w-full max-w-6xl mx-auto flex justify-between items-center py-6 px-4">
        <img src={logo} alt="AgroStrings" className="h-12" />
        <ul className="flex items-center space-x-6 text-sm">
          <li>
            <Link to="/login" className="hover:text-yellow-400 transition">
              Login
            </Link>
          </li>
          <li>
            <Link to="/signup" className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-full hover:bg-yellow-300 transition">
              Signup
            </Link>
          </li>
        </ul>
      </nav>

      <main className="flex-grow flex flex-col items-center justify-center px-4">
        <h1 className="text-4xl font-bold mb-2 text-center">
          <span className="text-white">Welcome to </span>
          <span className="text-yellow-400">AgroStrings</span>
        </h1>
        <p className="text-gray-400 mb-8 text-center">Select your role to get started</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl mb-8">
          {roles.map(({ key, label, description, icon }) => (
            <button
              key={key}
              onClick={() => handleSelect(key)}
              className={`flex flex-col items-center text-center p-6 rounded-lg border-2 transition-colors focus:outline-none
                ${selectedRole === key
                  ? 'border-yellow-400 bg-black'
                  : 'border-transparent bg-[#1a281f] hover:border-yellow-400'}
              `}
            >
              <div className="p-4 bg-[#383422] rounded-full mb-4">
                {icon}
              </div>
              <h2 className="text-xl font-semibold mb-2">{label}</h2>
              <p className="text-gray-400 text-sm">{description}</p>
            </button>
          ))}
        </div>

        <button
          onClick={handleContinue}
          disabled={!selectedRole}
          className={`px-8 py-3 rounded-full font-medium transition-opacity disabled:opacity-50 mb-4
            ${selectedRole
              ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-300'
              : 'bg-yellow-700 text-gray-500'}
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
