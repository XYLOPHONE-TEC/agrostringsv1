// src/components/BuyersSection.jsx
import React from 'react'
import hero from '../assets/products-seller.jpeg'
import small1 from '../assets/agro-string-tv.jpeg'
import small2 from '../assets/products-buyer2.jpeg'
import { FaBriefcase } from 'react-icons/fa'

export default function BuyersSection() {
  const features = [
    {
      title: 'Seamless Purchasing\nand Bidding',
      text: 'Get tailored produce\noptions and place bids\neffortlessly through our platform.',
    },
    {
      title: 'Verified Listings\nat Your Fingertips',
      text: 'Browse real-time produce\nlistings from trusted farmers.',
    },
    {
      title: 'Instant Notifications\n& Alerts',
      text: 'Receive updates on new\nlistings, bids, and orders.',
    },
    {
      title: 'Secure Transactions\n& Payments',
      text: 'Pay safely through integrated\npayment gateways.',
    },
  ]

  return (
    <>
      {/* Buyers Section - Light Theme */}
      <section className="bg-white text-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12">
          {/* Left: Overlapping images */}
          <div className="relative w-full lg:w-1/2 flex justify-center lg:justify-start">
            <div className="w-80 sm:w-96 border-4 border-gray-200 overflow-hidden rounded-lg">
              <img
                src={hero}
                alt="Buyer harvesting produce"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden lg:block absolute -top-4 -right-4 w-28 h-28 border border-gray-200 overflow-hidden rounded-lg">
              <img
                src={small1}
                alt="Seedling close-up"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden lg:block absolute -bottom-4 -left-4 w-24 h-24 border border-gray-200 overflow-hidden rounded-lg">
              <img
                src={small2}
                alt="Buyer portrait"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right: Text & CTA */}
          <div className="relative w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">
            {/* Mobile-only: bg accents */}
            <div className="lg:hidden absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/3 w-32 h-20 opacity-20 overflow-hidden transform -translate-x-1/2 -translate-y-1/2">
                <img
                  src={small1}
                  alt="Seedling bg"
                  className="w-full h-full object-cover filter brightness-90"
                />
              </div>
              <div className="absolute bottom-0 right-1/3 w-28 h-16 opacity-20 overflow-hidden transform translate-x-1/2 translate-y-1/2">
                <img
                  src={small2}
                  alt="Portrait bg"
                  className="w-full h-full object-cover filter brightness-90"
                />
              </div>
            </div>

            <h2 className="z-10 text-3xl lg:text-4xl font-bold text-gray-900">For Buyers</h2>
            <p className="z-10 text-sm sm:text-base text-gray-600 max-w-md">
              Connect with trusted farmers, explore quality produce listings, and
              make secure purchases—all in one place.
            </p>
            <a
              href="/buyers"
              className="z-10 mt-4 inline-block bg-green-600 text-white font-semibold text-sm lg:text-base px-6 py-3 rounded-full shadow hover:opacity-90 transition"
            >
              Quality-assured farm produce →
            </a>
          </div>
        </div>
      </section>

      {/* Real-Time Sourcing Section - Light Theme */}
      <section className="py-8 sm:py-12 bg-gray-50">
        <div className="text-center mb-4 px-2 sm:mb-6 sm:px-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Real-Time Sourcing for Modern<br className="block sm:hidden" /> Buyers
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2 leading-snug">
            Access verified produce listings and connect with reliable farmers<br className="block sm:hidden" /> all through your personalized dashboard.
          </p>
        </div>

        <div className="relative">
          <img
            src={hero}
            alt="Farm background"
            className="absolute inset-0 w-full h-full object-cover opacity-10"
          />

          {/* 2×2 grid */}
          <div className="relative bg-white max-w-3xl mx-auto grid grid-cols-2 p-4 sm:p-6 gap-4">
            {features.map((feat, idx) => (
              <FeatureItem
                key={idx}
                title={feat.title}
                text={feat.text}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

// Reusable Feature Item
function FeatureItem({ title, text }) {
  return (
    <div className="border border-gray-200 rounded flex flex-col items-center justify-center space-y-2 text-gray-800 p-4">
      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-200 flex items-center justify-center mx-auto">
        <FaBriefcase size={18} className="text-gray-600" />
      </div>
      <h4 className="whitespace-pre-line text-base font-semibold leading-snug">
        {title}
      </h4>
      <p className="whitespace-pre-line text-sm text-gray-600 leading-tight mt-0.5">
        {text}
      </p>
    </div>
  )
}
