// src/components/FeaturesSection.jsx
import React from 'react'
import agroString from '../assets/image2.jpeg'
import agrothumbnail from '../assets/hero-5.avif'
import { FaLeaf, FaCloud, FaVideo, FaChevronLeft, FaPlay } from 'react-icons/fa'

const features = [
  {
    icon: FaLeaf,
    title: 'Carbon Tracking',
    description:
      'Monitor produce readiness and ensure sustainable farming practices.',
  },
  {
    icon: FaCloud,
    title: 'Weather Forecast',
    description:
      'Access real-time weather updates to plan planting and harvesting.',
  },
  {
    icon: FaVideo,
    title: 'Video Training',
    description:
      'Learn the best practices and strategies from expert-led sessions.',
  },
]

const videoList = [
  { user: '@Agrostrings', title: 'Soil Science' },
  { user: '@Edward',     title: 'Meet Edward an agroString Farmer' },
  { user: '@Edward',     title: 'Soil Science' },
]

export default function FeaturesSection() {
  return (
    <>
      {/* FEATURES GRID */}
      <section className="py-8 bg-gradient-to-b from-[#1a281f] to-[#333]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-bold text-[#a8e063] mb-8 text-center">
            Grow smarter, source faster<br />with AgroStrings
          </h2>
          <div className="grid grid-cols-3 gap-2 sm:gap-6">
            {features.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="flex flex-col items-center border border-gray-600 rounded-2xl p-4 sm:p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-2 sm:p-3 bg-[#999] rounded-full mb-2 sm:mb-4 transform hover:scale-110 transition-transform duration-300">
                  <Icon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-xs sm:text-sm font-semibold text-white mb-1 sm:mb-2 text-center">
                  {title}
                </h3>
                <p className="hidden sm:block text-gray-300 text-xs leading-snug text-center">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AGROSTRINGS TV SECTION */}
      <section className="py-12 bg-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-1 text-center">
            AgroStrings TV
          </h2>
          <p className="text-gray-400 mb-6 text-center text-sm sm:text-base">
            Delivers video tutorials on farming, market access, climate-smart
            agriculture—broadcasting real-time updates, success stories, and
            government advisories.
          </p>

          <div className="bg-[#111] rounded-xl overflow-hidden">
            {/* channel nav */}
            <div className="px-4 py-2 border-b border-gray-800 flex items-center text-[#fada25] text-sm">
              <FaChevronLeft className="mr-2" /> GreenHouse Farming
            </div>

            <div className="flex flex-col lg:flex-row">
              {/* left: static image */}
              <div className="w-full lg:w-2/3 relative">
                <img
                  src={agroString}
                  alt="Greenhouse Farming"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-yellow-500 bg-opacity-90 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                    <FaPlay className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                </div>
              </div>

             {/* right: list */}
<div className="w-full lg:w-1/3 p-4 sm:p-6 space-y-3 sm:space-y-4">
  <p className="text-[#fada25] text-xs sm:text-sm">2 of 14 videos</p>
  {videoList.map((item, idx) => (
    <div
      key={idx}
      className="bg-[#222] p-2 sm:p-3 rounded-md flex items-center space-x-3"
    >
      <img
        src={agrothumbnail}
        alt={item.title}
        className="w-16 h-10 sm:w-20 sm:h-12 object-cover rounded-md flex-shrink-0"
      />
      <div>
        <p className="text-[#fada25] font-medium text-xs sm:text-sm">
          {item.user}
        </p>
        <p className="text-gray-200 text-xs sm:text-sm">
          {item.title}
        </p>
      </div>
    </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
