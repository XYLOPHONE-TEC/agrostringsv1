// src/components/Footer.jsx
import React from 'react'
import logo from '../assets/logo.png' // replace with actual logo asset
import { FaTwitter, FaLinkedin, FaInstagram, FaEnvelope, FaPhoneAlt } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-gray-50 text-gray-700 py-8 leading-snug">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        <div className="text-center md:text-left">
          <div className="flex justify-center md:justify-start items-center mb-2">
            <img src={logo} alt="AgroStrings" className="h-16 w-16 mr-2" />
          </div>
          <p className="text-sm">Revolutionizing agriculture through digital innovation.</p>
        </div>
        <div className="text-center md:text-left">
          <h4 className="text-gray-900 font-semibold mb-2 text-sm">Quick Links</h4>
          <ul className="space-y-1 text-sm">
            <li><a href="/partners" className="hover:text-green-600">Partners</a></li>
            <li><a href="/products" className="hover:text-green-600">Products</a></li>
            <li><a href="/contact" className="hover:text-green-600">Contact Us</a></li>
          </ul>
        </div>
        <div className="text-center md:text-left">
          <h4 className="text-gray-900 font-semibold mb-2 text-sm">Contact Us</h4>
          <ul className="space-y-1 text-sm">
            <li className="flex items-center justify-center md:justify-start">
              <FaEnvelope className="mr-2 text-sm text-gray-700" />
              <a href="mailto:agrostrings@gmail.com" className="hover:text-green-600">agrostrings@gmail.com</a>
            </li>
            <li className="flex items-center justify-center md:justify-start">
              <FaPhoneAlt className="mr-2 text-sm text-gray-700" />
              <a href="tel:+2568403820" className="hover:text-green-600">+256 840 3820</a>
            </li>
          </ul>
        </div>
        <div className="text-center md:text-left">
          <h4 className="text-gray-900 font-semibold mb-2 text-sm">Follow Us</h4>
          <div className="flex justify-center md:justify-start space-x-3 text-gray-700">
            <a href="https://twitter.com" aria-label="Twitter" className="hover:text-green-600"><FaTwitter size={16} /></a>
            <a href="https://linkedin.com" aria-label="LinkedIn" className="hover:text-green-600"><FaLinkedin size={16} /></a>
            <a href="https://instagram.com" aria-label="Instagram" className="hover:text-green-600"><FaInstagram size={16} /></a>
          </div>
        </div>
      </div>
      <hr className="border-t border-gray-200 w-full mt-4" />
      <div className="mt-6 text-center text-gray-500 text-sm">© 2025 Xylophone Technologies. All rights reserved.</div>
    </footer>
  )
}