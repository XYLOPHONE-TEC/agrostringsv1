// src/pages/ContactPage.jsx
import React, { useState } from 'react'
import Logo from '../assets/logo.png'
import hero from '../assets/hero2.avif'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import { FiPhone, FiMail } from 'react-icons/fi'
import Footer from '../components/footer'

const navItems = [
  { name: 'Home', to: '/' },
  { name: 'Partners', to: '/partners' },
  { name: 'Products', to: '/products' },
  { name: 'Contact Us', to: '/contact' },
]

export default function ContactPage() {
  const [menuOpen, setMenuOpen] = useState(false)

  const bgStyle = {
    backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url(${hero})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }

  return (
    <div className="font-sans bg-white text-gray-800">
      {/* ===== HEADER + HERO ===== */}
      <div className="relative" style={bgStyle}>
        <header className="bg-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
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

              {/* Auth buttons */}
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
                      onClick={() => setMenuOpen(false)}
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

        {/* Hero section */}
        <section className="py-12 text-center">
          <h2 className="text-4xl font-semibold text-gray-800">Contact Us</h2>
        </section>
      </div>

      {/* ===== CONTACT US ===== */}
      <section className="w-full bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Info */}
          <div className="space-y-6">
            <p className="text-sm uppercase text-green-600 font-medium">Partner with us</p>
            <h3 className="text-3xl font-bold text-gray-900">Quick Response, Always!</h3>
            <p className="mt-2 text-gray-700 text-sm">
              Interested in partnering, investing, or learning more about the AgroStrings platform? We’re building the future of digital agriculture. Connect with us today to explore how you can be part of it.
            </p>

            <div className="space-y-4">
              <div className="flex items-center">
                <FiPhone className="text-2xl text-green-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-700">Phone</p>
                  <p className="font-medium text-gray-900 text-sm">(+256) 222 123 456</p>
                </div>
              </div>
              <div className="flex items-center">
                <FiMail className="text-2xl text-green-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-700">Email</p>
                  <p className="font-medium text-gray-900 text-sm">agrostrings@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-8 rounded-lg shadow">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Contact us</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Your Name"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-600 text-gray-800"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Your Email"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-600 text-gray-800"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="Your Message"
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-600 text-gray-800"
                />
              </div>
              <button
                type="submit"
                className="w-full inline-flex justify-center items-center bg-green-600 text-white font-medium py-3 rounded-md hover:bg-green-700 transition"
              >
                Send message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <Footer />
    </div>
  )
}