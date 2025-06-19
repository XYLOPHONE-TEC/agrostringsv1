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
        className="absolute text-yellow-400"
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
    backgroundImage: `linear-gradient(to right, rgb(2, 2, 2), rgba(7, 7, 7, 0.71)), url(${hero})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }

  return (
    <div className="relative font-sans" style={bgStyle}>
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
                  className="text-[12px] font-bold uppercase text-white hover:text-yellow-400 transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center space-x-4">
              <a
                href="/login"
                className="px-4 py-1 rounded-full bg-yellow-400 text-black text-[12px] font-medium hover:opacity-90 transition"
              >
                Login
              </a>
              <a
                href="/signup"
                className="px-4 py-1 rounded-full border border-white text-white text-[12px] font-medium hover:bg-white hover:text-gray-900 transition"
              >
                Signup
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-white focus:outline-none"
            >
              {menuOpen ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden mt-4 space-y-4 px-4">
              <nav className="flex flex-col space-y-2">
                {navItems.map(item => (
                  <a
                    key={item.name}
                    href={item.to}
                    className="text-sm font-semibold text-white hover:text-yellow-400"
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
              <div className="flex flex-col space-y-2 mt-4">
                <a
                  href="/login"
                  className="px-4 py-2 rounded-full bg-yellow-400 text-black text-sm font-medium text-center"
                >
                  Login
                </a>
                <a
                  href="/signup"
                  className="px-4 py-2 rounded-full border border-white text-white text-sm font-medium text-center hover:bg-white hover:text-gray-900"
                >
                  Signup
                </a>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-24 font-sans">
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-8">
          {/* Left Text */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-semibold text-gray-200 mb-4">
              We Connect Farmers And Buyers Instantly
            </h1>
            <p className="text-base sm:text-lg text-[#ccc] mb-6">
              Join AgroStrings to trade farm produce, access market insights, and educational resources on our exclusive AgroStrings TV.
            </p>
            <a
              href="/get-started"
              className="inline-block px-6 py-2 bg-yellow-400 text-sm text-black font-medium rounded-full hover:opacity-90 transition"
            >
              Get Started
            </a>
          </div>

          {/* Decorative Middle Image + Static Circle of Leaves */}
          <div className="hidden lg:flex lg:w-1/2 justify-center relative text-white">
            <img src={MiddleImg} alt="Decorative" className="w-50 h-50" />
            <CircularLeafCircle count={5} radius={150} />
          </div>
        </div>
      </section>
    </div>
  )
}
