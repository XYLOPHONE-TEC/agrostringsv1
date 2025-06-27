// src/components/GetStarted.jsx
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaUser, FaShoppingCart, FaUsers } from 'react-icons/fa'
import logo from '../assets/logo.png'

const roles = [
  {
    key: 'farmer',
    label: 'Farmer',
    description: 'Sell your produce and manage your farm',
    icon: <FaUser size={24} className="text-green-600" />,
  },
  {
    key: 'buyer',
    label: 'Buyer',
    description: 'Source quality agricultural products',
    icon: <FaShoppingCart size={24} className="text-green-600" />,
  },
  {
    key: 'agroteam',
    label: 'AgroTeam',
    description: 'Manage and oversee operations',
    icon: <FaUsers size={24} className="text-green-600" />,
  },
]

export default function GetStarted() {
  const [selectedRole, setSelectedRole] = useState(null)
  const navigate = useNavigate()

  const handleSelect = roleKey => setSelectedRole(roleKey)
  const handleContinue = () => {
    if (selectedRole) navigate(`/signup?role=${selectedRole}`)
  }

  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col relative">
      {/* Abstract Circles */}
      <div className="absolute -top-16 -left-16 w-72 h-72 bg-green-100 rounded-full opacity-50" />
      <div className="absolute top-32 right-0 w-48 h-48 bg-green-100 rounded-full opacity-50" />
      <div className="absolute bottom-10 left-1/4 w-56 h-56 bg-green-100 rounded-full opacity-30" />

      {/* Header */}
      <nav className="w-full max-w-5xl mx-auto flex justify-between items-center py-6 px-4 z-10">
        <img src={logo} alt="AgroStrings Logo" className="h-12 w-auto" />
        <ul className="flex items-center space-x-6 text-sm">
          <li>
            <Link to="/login" className="text-gray-700 hover:text-green-600 transition">
              Login
            </Link>
          </li>
          <li>
            <Link to="/signup" className="text-white bg-green-600 px-3 py-1 rounded-full hover:bg-green-500 transition">
              Signup
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="mt-6 flex-grow flex flex-col items-center justify-center px-4 z-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-center">
          Welcome to <span className="text-green-600">AgroStrings</span>
        </h1>
        <p className="text-gray-600 mb-8 text-center max-w-xl">
          Choose your role and dive into a modern agricultural experience tailored just for you.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl mb-8">
          {roles.map(({ key, label, description, icon }) => (
            <button
              key={key}
              onClick={() => handleSelect(key)}
              className={`flex items-center p-6 rounded-lg border-2 transition-colors w-full
                ${selectedRole === key ? 'border-green-600 bg-green-50' : 'border-gray-200 bg-white hover:border-green-600'}
              `}
            >
              <div className="p-3 bg-green-100 rounded-full mr-4">
                {icon}
              </div>
              <div className="text-left">
                <h2 className="text-lg font-semibold mb-1 text-gray-900">{label}</h2>
                <p className="text-gray-600 text-sm">{description}</p>
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={handleContinue}
          disabled={!selectedRole}
          className={`px-8 py-3 rounded-lg font-medium transition-opacity disabled:opacity-50
            ${selectedRole ? 'bg-green-600 text-white hover:bg-green-500' : 'bg-gray-300 text-gray-500'}
          `}
        >
          Continue
        </button>

        <p className="text-gray-600 text-sm mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-green-600 hover:underline">
            Login
          </Link>
        </p>
      </main>
    </div>
  )
}
