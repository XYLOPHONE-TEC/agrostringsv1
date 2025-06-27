// src/components/Header.jsx
import React, { useState } from 'react'
import Logo from '../assets/logo.png'
import hero from '../assets/green.jpeg'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import MiddleImg from '../assets/hand-plant.png' // central image

const navItems = [
  { name: 'Home', to: '/' },
  { name: 'Partners', to: '/partners' },
  { name: 'Products', to: '/products' },
  { name: 'Contact Us', to: '/contact' },
]

// Static Circular Leaf Arrangement (emoji)
function CircularLeafCircle({ count = 20, radius = 150 }) {
  const angleStep = 360 / count
  const leaves = Array.from({ length: count }).map((_, i) => {
    const angle = i * angleStep
    return (
      <span
        key={i}
        className="absolute text-green-500"
        style={{
          fontSize: '24px',
          top: '50%',
          left: '50%',
          transform: `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)`,
          transformOrigin: 'center',
        }}
      >
        🌿
      </span>
    )
  })
  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
      {leaves}
    </div>
  )
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const bgStyle = {
    backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url(${hero})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }

  return (
    <div className="relative font-sans bg-white text-gray-800" style={bgStyle}>
      {/* Header */}
      <header className="bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <img src={Logo} alt="AgroStrings Logo" className="h-14 sm:h-20 w-auto" />

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-8">
              {navItems.map(item => (
                <a
                  key={item.name}
                  href={item.to}
                  className="text-sm font-bold uppercase text-gray-700 hover:text-green-600 transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center space-x-4">
              <a
                href="/login"
                className="px-4 py-1 rounded-full bg-green-600 text-white text-sm font-medium hover:opacity-90 transition"
              >
                Login
              </a>
              <a
                href="/signup"
                className="px-4 py-1 rounded-full border border-gray-700 text-gray-700 text-sm font-medium hover:bg-green-600 hover:text-white transition"
              >
                Signup
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-gray-700 focus:outline-none"
            >
              {menuOpen ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden mt-4 space-y-4 px-4 bg-white">
              <nav className="flex flex-col space-y-2">
                {navItems.map(item => (
                  <a
                    key={item.name}
                    href={item.to}
                    className="text-base font-semibold text-gray-700 hover:text-green-600"
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
              <div className="flex flex-col space-y-2 mt-4">
                <a
                  href="/login"
                  className="px-4 py-2 rounded-full bg-green-600 text-white text-base font-medium text-center hover:opacity-90"
                >
                  Login
                </a>
                <a
                  href="/signup"
                  className="px-4 py-2 rounded-full border border-gray-700 text-gray-700 text-base font-medium text-center hover:bg-green-600 hover:text-white"
                >
                  Signup
                </a>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-24">
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-8">
          {/* Left Text */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-gray-800 mb-4">
              We Connect Farmers And Buyers Instantly
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Join AgroStrings to trade farm produce, access market insights, and educational resources on our exclusive AgroStrings TV.
            </p>
            <a
              href="/get-started"
              className="inline-block px-6 py-2 bg-green-600 text-white text-base font-medium rounded-full hover:opacity-90 transition"
            >
              Get Started
            </a>
          </div>

          {/* Decorative Middle Image + Static Circle of Leaves */}
          <div className="hidden lg:flex lg:w-1/2 justify-center relative">
            <img src={MiddleImg} alt="Decorative" className="w-48 h-48" />
            <CircularLeafCircle count={10} radius={120} />
          </div>
        </div>
      </section>
    </div>
  )
}