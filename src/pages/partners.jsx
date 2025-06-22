// src/components/Header.jsx
import React, { useState } from 'react'
import Logo from '../assets/logo.png'
import hero from '../assets/green.jpeg'
import { HiMenuAlt3, HiX } from 'react-icons/hi'

import Footer from '../components/footer'

const navItems = [
  { name: 'Home', to: '/' },
  { name: 'Partners', to: '/partners' },
  { name: 'Products', to: '/products' },
  { name: 'Contact Us', to: '/contact' },
]


export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const bgStyle = {
    backgroundImage: `linear-gradient(to right, rgb(2, 2, 2), rgba(7, 7, 7, 0.8)), url(${hero})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }

  return (
    <div className="relative font-sans" style={bgStyle}>
      {/* Header Nav */}
      <header className="bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <img src={Logo} alt="AgroStrings Logo" className="h-14 sm:h-20 w-auto" />

            <nav className="hidden md:flex space-x-8">
              {navItems.map(item => (
                <a
                  key={item.name}
                  href={item.to}
                  className="text-[12px] font-bold uppercase text-white hover:text-yellow-400 transition"
                >
                  {item.name}
                </a>
              ))}
            </nav>

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

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-white focus:outline-none"
            >
              {menuOpen ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
            </button>
          </div>

          {menuOpen && (
            <div className="md:hidden mt-4 px-4 space-y-4">
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

      {/* OUR PARTNERS HERO */}
      <section className="py-20">
        <div className="text-center max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-200">OUR PARTNERS</h2>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mt-2" />
          <p className="mt-4 text-gray-200">
             Together with our partners, we create smarter solutions, minimize risks, and open doors to premium markets.
          </p>
        </div>

        <div className="mt-12 space-y-8">
          <div className="flex justify-center gap-6">
            <div className="h-16 w-32 bg-gray-300 rounded-md" />
            <div className="h-16 w-32 bg-gray-300 rounded-md" />
            <div className="h-16 w-32 bg-gray-300 rounded-md" />
          </div>
          <div className="flex justify-center gap-6">
            <div className="h-16 w-32 bg-gray-300 rounded-md" />
            <div className="h-16 w-32 bg-gray-300 rounded-md" />
          </div>
        </div>
      </section>

      

      <Footer />
    </div>
  )
}
