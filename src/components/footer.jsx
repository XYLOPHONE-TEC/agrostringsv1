// src/components/Footer.jsx
import React from 'react';
import logo from '../assets/logo.png'; // replace with actual logo asset
import { FaTwitter, FaLinkedin, FaInstagram, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-[#222] text-gray-400 py-8 leading-snug">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        <div className="text-center md:text-left">
          <div className="flex justify-center md:justify-start items-center mb-2">
            <img src={logo} alt="AgroStrings" className="h-16 w-16 mr-2" />
          </div>
          <p className="text-xs sm:text-sm">Revolutionizing agriculture through digital innovation.</p>
        </div>
        <div className="text-center md:text-left">
          <h4 className="text-white font-semibold mb-2 text-sm">Quick Links</h4>
          <ul className="space-y-1 text-xs sm:text-sm">
            <li><a href="/partners" className="hover:text-white">Partners</a></li>
            <li><a href="/products" className="hover:text-white">Products</a></li>
            <li><a href="/contact" className="hover:text-white">Contact Us</a></li>
          </ul>
        </div>
        <div className="text-center md:text-left">
          <h4 className="text-white font-semibold mb-2 text-sm">Contact Us</h4>
          <ul className="space-y-1 text-xs sm:text-sm">
            <li className="flex items-center justify-center md:justify-start">
              <FaEnvelope className="mr-2 text-sm" />
              <a href="mailto:agrostrings@gmail.com" className="hover:text-white">agrostrings@gmail.com</a>
            </li>
            <li className="flex items-center justify-center md:justify-start">
              <FaPhoneAlt className="mr-2 text-sm" />
              <a href="tel:+2568403820" className="hover:text-white">+256 840 3820</a>
            </li>
          </ul>
        </div>
        <div className="text-center md:text-left">
          <h4 className="text-white font-semibold mb-2 text-sm">Follow Us</h4>
          <div className="flex justify-center md:justify-start space-x-3">
            <a href="https://twitter.com" aria-label="Twitter" className="hover:text-white"><FaTwitter size={16} /></a>
            <a href="https://linkedin.com" aria-label="LinkedIn" className="hover:text-white"><FaLinkedin size={16} /></a>
            <a href="https://instagram.com" aria-label="Instagram" className="hover:text-white"><FaInstagram size={16} /></a>
          </div>
        </div>
      </div>
      <hr className="border-t border-gray-700 w-full mt-4" />
      <div className="mt-6 text-center text-gray-500 text-xs">© 2025 Xylophone Technologies. All rights reserved.</div>
    </footer>
  );
}