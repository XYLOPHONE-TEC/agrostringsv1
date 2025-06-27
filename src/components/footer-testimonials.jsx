// src/components/TestimonialFooterSection.jsx
import React, { useState } from 'react'
import testimonialImage from '../assets/testmonial.jpeg'
import logo from '../assets/logo.png' // replace with actual logo asset
import { FaTwitter, FaLinkedin, FaInstagram, FaEnvelope, FaPhoneAlt } from 'react-icons/fa'

const testimonials = [
  { name: 'Jonad', role: 'Agrostring Farmer', location: 'Masaka, Uganda', text: `I have mastered vital skills in storage, pest control, and seed sowing through AgroStrings TV, leading to enhanced results. With AgroStrings assistance, I have scaled up my operations, overcoming issues like low market prices and accessing reliable buyers.`, image: testimonialImage },
  { name: 'Sarah', role: 'Grain Farmer', location: 'Mbale, Uganda', text: `Thanks to AgroStrings, I found consistent markets and learned modern harvesting methods. My yield and income have both doubled!`, image: testimonialImage },
  { name: 'Michael', role: 'Rice Grower', location: 'Lira, Uganda', text: `Before joining AgroStrings, I struggled with post-harvest losses. Now, I use proper storage and connect directly with buyers.`, image: testimonialImage },
  { name: 'Amina', role: 'Coffee Farmer', location: 'Fort Portal, Uganda', text: `AgroStrings has connected me to new markets abroad. I’ve grown from a smallholder to a recognized exporter.`, image: testimonialImage },
]

function TestimonialSection() {
  const [selected, setSelected] = useState(null)
  return (
    <section className="py-10 bg-white">
      <div className="text-center mb-10 max-w-xl mx-auto px-4">
        <p className="text-xs uppercase text-gray-500 tracking-widest">Testimonials</p>
        <h2 className="text-gray-800 text-2xl sm:text-3xl font-bold mt-1 leading-tight">
          Trusted by personnel from various regions
        </h2>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, idx) => {
            const isActive = selected === idx
            return (
              <div
                key={idx}
                onClick={() => setSelected(isActive ? null : idx)}
                className={`relative cursor-pointer bg-gray-50 rounded-lg shadow hover:shadow-lg transition-transform transform hover:scale-105 ${
                  isActive ? 'ring ring-gray-300' : 'opacity-90'
                }`}
              >
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 sm:w-24 h-20 sm:h-24 rounded-full overflow-hidden border-4 border-white bg-white z-20">
                  <img src={t.image} alt={`${t.name} - ${t.role}`} className="w-full h-full object-cover" />
                </div>
                <div className="pt-16 sm:pt-20 px-4 pb-6 text-center flex flex-col items-center h-full">
                  <h3 className="font-semibold text-green-600 mb-1 text-base">
                    {t.name} - {t.role}
                  </h3>
                  <p className="text-gray-500 text-sm mb-2">{t.location}</p>
                  <hr className="w-12 border-gray-300 mb-2" />
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {t.text}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600 py-8">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        <div className="text-center md:text-left">
          <div className="flex justify-center md:justify-start items-center mb-2">
            <img src={logo} alt="AgroStrings" className="h-16 w-16 mr-2" />
          </div>
          <p className="text-sm">Revolutionizing agriculture through digital innovation.</p>
        </div>
        <div className="text-center md:text-left">
          <h4 className="text-gray-800 font-semibold mb-2 text-sm">Quick Links</h4>
          <ul className="space-y-1 text-sm">
            <li><a href="/partners" className="hover:text-green-600">Partners</a></li>
            <li><a href="/products" className="hover:text-green-600">Products</a></li>
            <li><a href="/contact" className="hover:text-green-600">Contact Us</a></li>
          </ul>
        </div>
        <div className="text-center md:text-left">
          <h4 className="text-gray-800 font-semibold mb-2 text-sm">Contact Us</h4>
          <ul className="space-y-1 text-sm">
            <li className="flex items-center justify-center md:justify-start">
              <FaEnvelope className="mr-2 text-sm" />
              <a href="mailto:agrostrings@gmail.com" className="hover:text-green-600">agrostrings@gmail.com</a>
            </li>
            <li className="flex items-center justify-center md:justify-start">
              <FaPhoneAlt className="mr-2 text-sm" />
              <a href="tel:+2568403820" className="hover:text-green-600">+256 840 3820</a>
            </li>
          </ul>
        </div>
        <div className="text-center md:text-left">
          <h4 className="text-gray-800 font-semibold mb-2 text-sm">Follow Us</h4>
          <div className="flex justify-center md:justify-start space-x-3 text-gray-600">
            <a href="https://twitter.com" aria-label="Twitter" className="hover:text-green-600"><FaTwitter size={16} /></a>
            <a href="https://linkedin.com" aria-label="LinkedIn" className="hover:text-green-600"><FaLinkedin size={16} /></a>
            <a href="https://instagram.com" aria-label="Instagram" className="hover:text-green-600"><FaInstagram size={16} /></a>
          </div>
        </div>
      </div>
      <hr className="border-t border-gray-300 w-full mt-4" />
      <div className="mt-6 text-center text-gray-500 text-sm">© 2025 Xylophone Technologies. All rights reserved.</div>
    </footer>
  )
}

export default function HomePage() {
  return (
    <>
      <TestimonialSection />
      <Footer />
    </>
  )
}
