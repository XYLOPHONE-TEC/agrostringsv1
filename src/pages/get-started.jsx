import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTractor, FaStore, FaSeedling } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.png'; // Assuming optimized WebP format

const roles = [
  {
    key: 'farmer',
    label: 'Farmer',
    description: 'Sell your produce and manage your farm',
    icon: <FaTractor size={24} className="text-yellow-300" />,
  },
  {
    key: 'buyer',
    label: 'Buyer',
    description: 'Source quality agricultural products',
    icon: <FaStore size={24} className="text-yellow-300" />,
  },
  {
    key: 'agroteam',
    label: 'AgroTeam',
    description: 'Manage and oversee operations',
    icon: <FaSeedling size={24} className="text-yellow-300" />,
  },
];

export default function GetStarted() {
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();

  const handleSelect = useCallback(
    roleKey => setSelectedRole(selectedRole === roleKey ? null : roleKey),
    [selectedRole],
  );
  const handleContinue = useCallback(() => {
    if (selectedRole) navigate(`/signup?role=${selectedRole}`);
  }, [selectedRole, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#111] to-[#2a3a2f] text-white flex flex-col">
      {/* Header */}
      <nav className="w-full max-w-5xl mx-auto flex justify-between items-center py-3 px-4">
        <img src={logo} alt="AgroStrings Logo" className="h-10 sm:h-12 w-auto" loading="lazy" />
        <ul className="flex items-center space-x-4 text-xs sm:text-sm lg:text-base">
          <li>
            <Link
              to="/login"
              className="pb-1 font-medium border-b-2 border-transparent hover:border-yellow-300 transition"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/signup"
              className="pb-1 font-medium border-b-2 border-yellow-300 transition"
            >
              Signup
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="mt-0 flex-grow flex flex-col items-center justify-center px-4 py-6 max-h-[80vh]">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-center leading-relaxed">
          <span className="text-white">Welcome to </span>
          <span className="text-yellow-300">AgroStrings</span>
        </h1>
        <p className="text-gray-400 mb-4 text-center text-xs sm:text-sm leading-relaxed">
          Select your role to get started
        </p>
        <AnimatePresence>
          {!selectedRole && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-gray-400 mb-4 text-xs text-center animate-pulse"
            >
              Choose a role to continue
            </motion.p>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full max-w-3xl lg:max-w-4xl mb-6">
          {roles.map(({ key, label, description, icon }, index) => (
            <motion.button
              key={key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleSelect(key)}
              aria-label={`Select ${label} role: ${description}`}
              className={`
                flex flex-col items-start
                p-4 sm:p-6 rounded-lg border-2 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300 w-full hover:scale-[1.02]
                ${selectedRole === key
                  ? 'border-yellow-300 bg-black shadow-md'
                  : 'border-transparent bg-[#111] hover:border-yellow-300'}
              `}
            >
              <div className="p-2 bg-[#383422] rounded mb-3">{icon}</div>
              <div className="text-left">
                <h2 className="text-lg font-semibold mb-1">{label}</h2>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{description}</p>
              </div>
            </motion.button>
          ))}
        </div>

        <div className="relative w-full max-w-3xl">
          <motion.button
            onClick={handleContinue}
            disabled={!selectedRole}
            aria-disabled={!selectedRole}
            whileHover={selectedRole ? { scale: 1.05 } : {}}
            className={`
              w-full sm:w-auto px-8 py-3 rounded-full font-medium transition-transform disabled:opacity-50 mb-4
              ${selectedRole
                ? 'bg-yellow-300 text-gray-900 hover:bg-yellow-200 fixed bottom-4 left-4 right-4 sm:static'
                : 'bg-gray-600 text-gray-300'}
            `}
          >
            Continue
          </motion.button>
        </div>

        <p className="text-gray-400 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-yellow-300 hover:underline">
            Login
          </Link>
        </p>
      </main>
    </div>
  );
}