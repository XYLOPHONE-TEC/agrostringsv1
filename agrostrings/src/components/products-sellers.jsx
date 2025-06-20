// src/components/BuyersSection.jsx
import React from 'react'
import hero from '../assets/products-seller.jpeg'
import small1 from '../assets/agro-string-tv.jpeg'
import small2 from '../assets/products-buyer2.jpeg'

export default function BuyersSection() {
  return (
    <section className="bg-[#111] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12">
        {/* Left: Overlapping images on desktop */}
        <div className="relative w-full lg:w-1/2 flex justify-center lg:justify-start">
          <div className="w-80 sm:w-96 border-4 border-gray-400 overflow-hidden">
            <img
              src={hero}
              alt="Buyer harvesting produce"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="hidden lg:block absolute -top-4 -right-4 w-28 h-28 border-1 border-white overflow-hidden">
            <img
              src={small1}
              alt="Seedling close-up"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="hidden lg:block absolute -bottom-4 -left-4 w-24 h-24 border-1 border-white overflow-hidden">
            <img
              src={small2}
              alt="Buyer portrait"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right: Text & button, with mobile-only background rectangles */}
        <div className="relative w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">
          {/* mobile-only: small images behind text */}
          <div className="lg:hidden absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-32 h-20 opacity-40 overflow-hidden transform -translate-x-1/2 -translate-y-1/2">
              <img src={small1} alt="Seedling bg" className="w-full h-full object-cover filter brightness-90" />
            </div>
            <div className="absolute bottom-0 right-1/4 w-28 h-16 opacity-40 overflow-hidden transform translate-x-1/2 translate-y-1/2">
              <img src={small2} alt="Portrait bg" className="w-full h-full object-cover filter brightness-90" />
            </div>
          </div>

          <h2 className="z-10 text-3xl lg:text-4xl font-bold">For Buyers</h2>
          {/* Responsive text size */}
          <p className="z-10 text-base lg:text-lg text-gray-300 max-w-md">
            Whether you’re a smallholder or large‑scale farmer, get the support you need to grow smarter, reduce losses and reach premium markets.
          </p>
          <a
            href="/buyers"
            className="z-10 mt-4 inline-block bg-yellow-400 text-black font-semibold text-sm lg:text-base px-6 py-3 rounded-full shadow hover:opacity-90 transition"
          >
            Quality‑assured farm produce →
          </a>
        </div>
      </div>
    </section>
  )
}
