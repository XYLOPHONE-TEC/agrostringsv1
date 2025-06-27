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
  { user: '@Edward',     title: 'Meet Edward an AgroStrings Farmer' },
  { user: '@Edward',     title: 'Soil Science' },
]

export default function FeaturesSection() {
  return (
    <>
      {/* FEATURES GRID - LIGHT THEME */}
      <section className="py-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-8 text-center">
            Grow smarter, source faster<br />with AgroStrings
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {features.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="flex flex-col items-center border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300 bg-white"
              >
                <div className="p-3 bg-green-100 rounded-full mb-4 transform hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2 text-center">
                  {title}
                </h3>
                <p className="text-gray-600 text-sm leading-snug text-center">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AGROSTRINGS TV SECTION - LIGHT THEME */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 text-center">
            AgroStrings TV
          </h2>
          <p className="text-gray-700 mb-6 text-center text-base">
            Delivers video tutorials on farming, market access, climate-smart
            agriculture—broadcasting real-time updates, success stories, and
            government advisories.
          </p>

          <div className="bg-white rounded-xl overflow-hidden shadow-md">
            {/* channel nav */}
            <div className="px-4 py-2 border-b border-gray-200 flex items-center text-green-700 text-sm">
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
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-600 bg-opacity-90 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                    <FaPlay className="text-white w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                </div>
              </div>

              {/* right: list */}
              <div className="w-full lg:w-1/3 p-6 space-y-4">
                <p className="text-green-700 text-sm">2 of 14 videos</p>
                {videoList.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-50 p-3 rounded-md flex items-center space-x-3 border border-gray-200"
                  >
                    <img
                      src={agrothumbnail}
                      alt={item.title}
                      className="w-20 h-12 object-cover rounded-md flex-shrink-0"
                    />
                    <div>
                      <p className="text-green-700 font-medium text-sm">
                        {item.user}
                      </p>
                      <p className="text-gray-700 text-sm">
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