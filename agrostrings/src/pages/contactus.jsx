// src/pages/ContactPage.jsx
import React, { useState } from 'react'
import Logo from '../assets/logo.png'
import hero from '../assets/hero2.avif'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import { FiPhone, FiMail } from 'react-icons/fi'
import Footer from '../components/footer'   // ← import your footer

const navItems = [
  { name: 'Home', to: '/' },
  { name: 'Partners', to: '/partners' },
  { name: 'Products', to: '/products' },
  { name: 'Contact Us', to: '/contact' },
]

export default function ContactPage() {
  const [menuOpen, setMenuOpen] = useState(false)

  const bgStyle = {
    backgroundImage:
      `linear-gradient(to right, rgb(2, 2, 2), rgba(12, 12, 12, 0.8)), url(${hero})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }

  return (
    <div className="font-sans">
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
                    className="text-[12px] font-bold uppercase text-white hover:text-yellow-400 transition-colors"
                  >
                    {item.name}
                  </a>
                ))}
              </nav>

              {/* Auth buttons */}
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
                      onClick={() => setMenuOpen(false)}
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

        {/* Hero section */}
        <section className="py-2">
          <div className="text-center py-12">
            <h2 className="text-4xl font-semibold text-[#fada25]">Contact Us</h2>
          </div>
        </section>
      </div>

      {/* ===== CONTACT US ===== */}
      <section className="w-full">
        <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Info */}
          <div className="space-y-6">
            <p className="text-sm uppercase text-gray-500 font-medium">Partner with us</p>
            <h3 className="text-3xl font-bold text-gray-900">Quick Response, Always!</h3>
            <p className="mt-2 text-gray-700 font-regular text-sm">
              Interested in partnering, investing, or learning more about the AgroStrings platform?
              We’re building the future of digital agriculture. Connect with us today to explore how you can be part of it.
            </p>

            <div className="space-y-4">
              <div className="flex items-center">
                <FiPhone className="text-2xl text-gray-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium text-gray-900">(+256) 222 123 456</p>
                </div>
              </div>
              <div className="flex items-center">
                <FiMail className="text-2xl text-gray-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-gray-900">agrostrings@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-gray-50 p-8 rounded-lg shadow">
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
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Your Email"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-500"
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
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
              </div>
              <button
                type="submit"
                className="w-full inline-flex justify-center items-center bg-[#fada25] text-black font-medium py-3 rounded-md hover:bg-green-700 transition"
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
