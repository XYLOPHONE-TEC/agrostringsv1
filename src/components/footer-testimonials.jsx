import React, { useState } from 'react';
import testimonialImage from '../assets/testmonial.jpeg';
import logo from '../assets/logo.png'; // replace with actual logo asset
import { FaTwitter, FaLinkedin, FaInstagram, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';

const testimonials = [
  { name: 'Jonad', role: 'Agrostring Farmer', location: 'Masaka, Uganda', text: `I have mastered vital skills in storage, pest control, and seed sowing through Agrostrings Tv, leading to enhanced results. With Agrostrings assistance, he has scaled up his operations, overcoming issues like low market prices and accessing reliable buyers.`, image: testimonialImage },
  { name: 'Sarah', role: 'Grain Farmer', location: 'Mbale, Uganda', text: `Thanks to Agrostrings, I found consistent markets and learned modern harvesting methods. My yield and income have both doubled!`, image: testimonialImage },
  { name: 'Michael', role: 'Rice Grower', location: 'Lira, Uganda', text: `Before joining Agrostrings, I struggled with post-harvest losses. Now, I use proper storage and connect directly with buyers.`, image: testimonialImage },
  { name: 'Amina', role: 'Coffee Farmer', location: 'Fort Portal, Uganda', text: `Agrostrings has connected me to new markets abroad. I’ve grown from a smallholder to a recognized exporter.`, image: testimonialImage },
];

function TestimonialSection() {
  const [selected, setSelected] = useState(null);
  return (
    <section className="py-10 bg-gradient-to-b from-[#1a281f] to-[#333]">
      <div className="text-center mb-10 text-white max-w-xl mx-auto px-4">
        <p className="text-xs uppercase text-gray-400 tracking-widest">Testimonials</p>
        <h2 className="text-gray-300 text-xl sm:text-2xl md:text-3xl font-bold mt-1 leading-tight">Trusted by Personnel from various regions</h2>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, idx) => {
            const isActive = selected === idx;
            return (
              <div
                key={idx}
                onClick={() => setSelected(isActive ? null : idx)}
                className={`relative cursor-pointer bg-black/30 rounded-lg overflow-visible shadow-lg transition-transform transform hover:scale-105 animate-floating hover:opacity-90 ${isActive ? 'opacity-100 ring ring-gray-500 bg-black/20' : 'opacity-70'}`}
              >
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 sm:w-24 h-20 sm:h-24 rounded-full overflow-hidden border-4 border-white bg-white z-20">
                  <img src={t.image} alt={`${t.name} - ${t.role}`} className="w-full h-full object-cover" />
                </div>
                <div className="pt-16 sm:pt-20 px-4 pb-4 text-white text-center flex flex-col items-center h-full">
                  <h3 className="font-semibold text-yellow-400 mb-1 text-sm sm:text-base">{t.name} - {t.role}</h3>
                  <p className="text-gray-300 text-xs sm:text-sm mb-2">{t.location}</p>
                  <hr className="w-12 sm:w-10 border-gray-500 mb-2" />
                  <p className="text-gray-100 text-xs leading-snug md:text-sm">{t.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <style>{`@keyframes float {0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}} .animate-floating{animation:float 4s ease-in-out infinite}`}</style>
    </section>
  );
}

function Footer() {
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

export default function HomePage() {
  return (
    <>  
      <TestimonialSection />
      <Footer />
    </>
  );
}
