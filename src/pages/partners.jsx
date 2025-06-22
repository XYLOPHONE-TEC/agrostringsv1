// src/components/Header.jsx
import React, { useState } from 'react'
import Logo from '../assets/logo.png'
import hero from '../assets/green.jpeg'
import { HiMenuAlt3, HiX } from 'react-icons/hi'

import Footer from '../components/footer'

// Import partner logos
import PartnerA from '../assets/maker-partner.jpeg'
import PartnerB from '../assets/maker-partner.jpeg'
import PartnerC from '../assets/maker-partner.jpeg'
import PartnerD from '../assets/maker-partner.jpeg'
import PartnerE from '../assets/maker-partner.jpeg'

const navItems = [
  { name: 'Home', to: '/' },
  { name: 'Partners', to: '/partners' },
  { name: 'Products', to: '/products' },
  { name: 'Contact Us', to: '/contact' },
]

// List of partner logo imports
const partnerLogos = [
  { src: PartnerA, alt: 'Partner A' },
  { src: PartnerB, alt: 'Partner B' },
 
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
            <img src={Logo} alt="AgroStrings Logo" className="h-10 sm:h-14 w-auto" />

            <nav className="hidden md:flex space-x-6">
              {navItems.map(item => (
                <a
                  key={item.name}
                  href={item.to}
                  className="text-xs sm:text-[12px] font-bold uppercase text-white hover:text-yellow-400 transition"
                >
                  {item.name}
                </a>
              ))}
            </nav>

            <div className="hidden md:flex items-center space-x-3 sm:space-x-4">
              <a
                href="/login"
                className="px-3 py-1 sm:px-4 sm:py-1 rounded-full bg-yellow-400 text-black text-xs sm:text-[12px] font-medium hover:opacity-90 transition"
              >
                Login
              </a>
              <a
                href="/signup"
                className="px-3 py-1 sm:px-4 sm:py-1 rounded-full border border-white text-white text-xs sm:text-[12px] font-medium hover:bg-white hover:text-gray-900 transition"
              >
                Signup
              </a>
            </div>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-white focus:outline-none"
            >
              {menuOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
            </button>
          </div>

          {menuOpen && (
            <div className="md:hidden mt-3 px-4 space-y-3">
              <nav className="flex flex-col space-y-1">
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
              <div className="flex flex-col space-y-2 mt-3">
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
      <section className="py-16 sm:py-20">
        <div className="text-center max-w-2xl mx-auto px-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-200">OUR PARTNERS</h2>
          <div className="w-20 sm:w-24 h-1 bg-yellow-400 mx-auto mt-2" />
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-200">
            Together with our partners, we create smarter solutions, minimize risks, and open doors to premium markets.
          </p>
        </div>

        {/* Responsive flex wrap for packed logos */}
        <div className="mt-8 sm:mt-12 flex flex-wrap justify-center gap-1 sm:gap-2">
          {partnerLogos.map(({ src, alt }) => (
            <div key={alt} className="h-12 w-24 sm:h-16 sm:w-32 flex items-center justify-center">
              <img src={src} alt={alt} className="h-full w-full object-contain" />
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
