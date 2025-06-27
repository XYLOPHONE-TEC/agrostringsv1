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

// List of partner logo objects
const partnerLogos = [
  { src: PartnerA, alt: 'Partner A' },
  { src: PartnerB, alt: 'Partner B' },
  { src: PartnerC, alt: 'Partner C' },
  { src: PartnerD, alt: 'Partner D' },
  { src: PartnerE, alt: 'Partner E' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const bgStyle = {
    backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url(${hero})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }

  return (
    <div className="relative font-sans bg-white text-gray-800" style={bgStyle}>
      {/* Navigation */}
      <header className="bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <img src={Logo} alt="AgroStrings Logo" className="h-10 sm:h-14 w-auto" />
            <nav className="hidden md:flex space-x-6">
              {navItems.map(item => (
                <a
                  key={item.name}
                  href={item.to}
                  className="text-sm font-bold uppercase text-gray-700 hover:text-green-600 transition"
                >
                  {item.name}
                </a>
              ))}
            </nav>
            <div className="hidden md:flex items-center space-x-4">
              <a href="/login" className="px-4 py-1 rounded-full bg-green-600 text-white text-sm font-medium hover:opacity-90 transition">
                Login
              </a>
              <a href="/signup" className="px-4 py-1 rounded-full border border-gray-700 text-gray-700 text-sm font-medium hover:bg-green-600 hover:text-white transition">
                Signup
              </a>
            </div>
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-gray-700 focus:outline-none">
              {menuOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
            </button>
          </div>
          {menuOpen && (
            <div className="md:hidden mt-3 space-y-3 px-4 bg-white">
              <nav className="flex flex-col space-y-2">
                {navItems.map(item => (
                  <a key={item.name} href={item.to} className="text-base font-semibold text-gray-700 hover:text-green-600">
                    {item.name}
                  </a>
                ))}
              </nav>
              <div className="flex flex-col space-y-2 mt-3">
                <a href="/login" className="px-4 py-2 rounded-full bg-green-600 text-white text-base font-medium text-center hover:opacity-90">
                  Login
                </a>
                <a href="/signup" className="px-4 py-2 rounded-full border border-gray-700 text-gray-700 text-base font-medium text-center hover:bg-green-600 hover:text-white">
                  Signup
                </a>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Our Partners Hero Section */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="text-center max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900">OUR PARTNERS</h2>
          <div className="w-20 h-1 bg-green-600 mx-auto mt-2" />
          <p className="mt-4 text-base text-gray-700">
            Together with our partners, we create smarter solutions, minimize risks, and open doors to premium markets.
          </p>
        </div>
        <div className="mt-8 sm:mt-12 flex flex-wrap justify-center gap-6 px-4">
          {partnerLogos.map(({ src, alt }, idx) => (
            <div key={idx} className="h-16 w-32 flex items-center justify-center bg-white rounded-lg shadow">
              <img src={src} alt={alt} className="h-auto max-w-full object-contain" />
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}