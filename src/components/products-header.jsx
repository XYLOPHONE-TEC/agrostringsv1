// src/components/Header.jsx
import React, { useState, useMemo } from 'react'
import Logo from '../assets/logo.png'
import hero from '../assets/hero-4.webp'
import MiddleImg from '../assets/hero-4.webp'
import { HiMenuAlt3, HiX } from 'react-icons/hi'

const navItems = [
  { name: 'Home', to: '/' },
  { name: 'Partners', to: '/partners' },
  { name: 'Products', to: '/products' },
  { name: 'Contact Us', to: '/contact' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  // Generate circle data: position, size, opacity
  const circles = useMemo(
    () =>
      Array.from({ length: 12 }).map((_, i) => ({
        size: 60 + i * 10,
        opacity: 0.1 + (i % 5) * 0.15,
        top: `${10 + (i * 8) % 60}%`,
        left: `${5 + (i * 15) % 70}%`,
      })),
    []
  )

  const bgStyle = {
    backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url(${hero})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }

  return (
    <div className="relative font-sans text-gray-800 bg-white" style={bgStyle}>
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

            {/* Desktop Auth Buttons */}
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

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden focus:outline-none text-gray-700"
            >
              {menuOpen ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
            </button>
          </div>

          {/* Mobile Menu Items */}
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

      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-8 relative">
          {/* Hero Text with mobile circles behind */}
          <div className="relative lg:w-1/2 text-center lg:text-left z-10">
            {/* Mobile-only small circles */}
            <div className="absolute inset-0 lg:hidden">
              {circles.map((c, idx) => (
                <img
                  key={idx}
                  src={MiddleImg}
                  alt="Decorative circle"
                  className="absolute rounded-full border border-gray-300 object-cover"
                  style={{
                    width: `${c.size / 2}px`,
                    height: `${c.size / 2}px`,
                    opacity: 0.04,
                    top: c.top,
                    left: c.left,
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              ))}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium text-green-600 mb-4">
              Grow smart and scale production with experts
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Whether you're a smallholder or large-scale farmer, get the support you need to grow smarter, reduce losses and reach premium markets.
            </p>
          </div>

          {/* Desktop circle collage */}
          <div className="hidden lg:block lg:w-1/2 relative h-80">
            {circles.map((c, idx) => (
              <img
                key={idx}
                src={MiddleImg}
                alt="Decorative circle"
                className="absolute rounded-full border border-gray-300 object-cover"
                style={{
                  width: `${c.size}px`,
                  height: `${c.size}px`,
                  opacity: c.opacity,
                  top: c.top,
                  left: c.left,
                  transform: 'translate(-50%, -50%)',
                }}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
