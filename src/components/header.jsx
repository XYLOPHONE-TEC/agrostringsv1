import React, { useState } from 'react';
import Logo from '../assets/logo.png';
import hero from '../assets/green.jpeg';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import MiddleImg from '../assets/hand-plant.png';

const navItems = [
  { name: 'Home', to: '/' },
  { name: 'Partners', to: '/partners' },
  { name: 'Products', to: '/products' },
  { name: 'Contact Us', to: '/contact' },
];

function CircularLeafCircle({ count = 20, radius = 150 }) {
  const angleStep = 360 / count;
  const leaves = Array.from({ length: count }).map((_, i) => {
    const angle = i * angleStep;
    return (
      <span
        key={i}
        className="absolute text-green-500 animate-pulse"
        style={{
          fontSize: '24px',
          top: '50%',
          left: '50%',
          transform: `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)`,
          transformOrigin: 'center',
          transition: 'transform 0.3s ease',
        }}
      >
        🌿
      </span>
    );
  });
  return <div className="absolute top-0 left-0 w-full h-full pointer-events-none">{leaves}</div>;
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const bgStyle = {
  backgroundImage: `linear-gradient(
    to right,
    rgba(243,244,246,0.95),
    rgba(194, 194, 197, 0.95)
  ), url(${hero})`,
  backgroundSize: '300% 300%',
  backgroundPosition: 'center',
};


  return (
<div
  className="relative text-gray-800 overflow-hidden animate-gradient-x"
  style={bgStyle}
>
      {/* Header */}
      <header className="bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
          <div className="flex h-16 items-center justify-between transition duration-300 ease-in-out">
            <img src={Logo} alt="AgroStrings Logo" className="h-14 sm:h-20 w-auto transition hover:scale-105" />

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-8">
              {navItems.map(item => (
                <a
                  key={item.name}
                  href={item.to}
                  className="text-sm font-bold uppercase text-gray-700 hover:text-green-600 transition-colors duration-200 ease-in-out"
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center space-x-4">
              <a
                href="/login"
                className="px-4 py-1 rounded-full bg-[#fada25] text-black text-sm font-medium hover:scale-105 transition duration-200"
              >
                Login
              </a>
              <a
                href="/signup"
                className="px-4 py-1 rounded-full border border-gray-700 text-gray-700 text-sm font-medium hover:bg-green-600 hover:text-white hover:scale-105 transition duration-200"
              >
                Signup
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-gray-700 focus:outline-none transition-transform duration-200"
            >
              {menuOpen ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden mt-4 space-y-4 px-4 animate-slide-down">
              <nav className="flex flex-col space-y-2">
                {navItems.map(item => (
                  <a
                    key={item.name}
                    href={item.to}
                    className="text-base font-semibold text-gray-700 hover:text-green-600 transition-colors"
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
              <div className="flex flex-col space-y-2 mt-4">
                <a
                  href="/login"
                  className="px-4 py-2 rounded-full bg-[#fada25] text-black text-base font-medium text-center hover:scale-105 transition"
                >
                  Login
                </a>
                <a
                  href="/signup"
                  className="px-4 py-2 rounded-full border border-gray-700 text-gray-700 text-base font-medium text-center hover:bg-green-600 hover:text-white hover:scale-105 transition"
                >
                  Signup
                </a>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-24 animate-fade-in">
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-8">
          {/* Left Text */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-gray-800 mb-4 transition-all duration-500 ease-in-out">
              We Connect Farmers And Buyers Instantly
            </h1>
            <p className="text-lg text-gray-600 mb-6 transition-opacity duration-300">
              Join AgroStrings to trade farm produce, access market insights, and educational resources on our exclusive AgroStrings TV.
            </p>
            <a
              href="/get-started"
              className="inline-block px-6 py-2 bg-[#fada25] text-black text-base font-medium rounded-full hover:scale-105 transition-all duration-300"
            >
              Get Started
            </a>
          </div>

          {/* Decorative Image + Animation */}
          <div className="hidden lg:flex lg:w-1/2 justify-center relative animate-bounce-slow">
            <img src={MiddleImg} alt="Decorative" className="w-48 h-48 transition-transform duration-500 hover:scale-105" />
            <CircularLeafCircle count={10} radius={120} />
          </div>
        </div>
      </section>
    </div>
  );
}
