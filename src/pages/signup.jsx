// src/components/Signup.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import logo from '../assets/logo.png';
import debounce from 'lodash.debounce';
import { FaLeaf, FaSeedling, FaTractor, FaChartLine } from 'react-icons/fa';
import bgImg from '../assets/image2.jpeg';

const signupSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
//   phone: z.string().min(10, 'Enter a valid phone number'),
  location: z.string().nonempty('Please select your location'),
});

export default function Signup() {
  const navigate = useNavigate();
  const [phoneValue, setPhoneValue] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('ug');
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: { username: '', phone: '', location: '' },
  });

  const locationInput = watch('location');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const cache = useRef(new Map()).current;

  const debouncedFetch = useRef(
    debounce(async (query, countryCode) => {
      if (query.length < 3) {
        setSuggestions([]);
        setLoading(false);
        setError(null);
        return;
      }
      const cacheKey = `${query}|${countryCode}`;
      if (cache.has(cacheKey)) {
        setSuggestions(cache.get(cacheKey));
        setLoading(false);
        setError(null);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            query
          )}&limit=5&countrycodes=${countryCode}`
        );
        if (!res.ok) throw new Error('Failed to fetch locations');
        const data = await res.json();
        cache.set(cacheKey, data);
        setSuggestions(data);
      } catch {
        setError('Unable to fetch locations. Please try again.');
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 250)
  ).current;

  useEffect(() => {
    debouncedFetch(locationInput, selectedCountry);
    return () => debouncedFetch.cancel();
  }, [locationInput, selectedCountry, debouncedFetch]);

  const handleLocationSelect = (value, onChange) => {
    onChange(value);
    setSuggestions([]);
  };

  const onSubmit = (data) => {
    console.log('Submitting:', { ...data, phone: phoneValue });
    navigate('/dashboard');
  };

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Desktop Left Panel with Shapes */}
      <aside
        className="hidden lg:flex w-1/2 relative bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: `url(${bgImg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-transparent to-black opacity-70 backdrop-blur-sm" />
        {/* Decorative blobs */}
        <div className="absolute -top-10 -right-16 w-64 h-64 bg-yellow-400 rounded-full opacity-30 transform rotate-45" />
        <div className="absolute bottom-20 -left-12 w-48 h-48 bg-yellow-500 rounded-full opacity-20 transform rotate-12" />
        <div className="relative z-10 flex flex-col justify-center items-start h-full px-16 space-y-6">
          <img src={logo} alt="Agrostrings" className="h-16 w-auto mb-4" />
          <h1 className="text-4xl lg:text-4xl font-extrabold text-white leading-snug">
            Modern Agriculture,
            <br />
            <span className="text-yellow-400">Smarter Harvests</span>
          </h1>
          <p className="max-w-sm text-gray-200 text-lg">
            Empower your farm with data-driven insights, buyer connections,
            and yield tracking all on one modern, intuitive platform.
          </p>

          <div className="grid grid-cols-3 gap-4 mt-6">
            {[
              { icon: <FaSeedling />, label: 'Crop Planning' },
              { icon: <FaTractor />, label: 'Asset Management' },
              { icon: <FaChartLine />, label: 'Market Analytics' }
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center p-3 bg-opacity-10 rounded-3xl backdrop-blur-sm border border-white border-opacity-20 hover:bg-opacity-20 transition"
              >
                <div className="p-2 bg-yellow-400 rounded-full mb-2">
                  {item.icon}
                </div>
                <span className="text-white text-xs font-medium text-center">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Form Panel with Accents */}
      <main className="flex-1 flex items-center justify-center p-8 bg-gradient-to-b from-[#1a281f] to-[#111] overflow-auto relative">
        {/* Accent lines */}
        <div className="hidden lg:block absolute top-1/4 left-1/3 w-1/2 h-0.5 bg-yellow-400 opacity-50 transform rotate-2" />
        <div className="hidden lg:block absolute bottom-1/3 right-1/4 w-1/3 h-0.5 bg-yellow-400 opacity-40 transform -rotate-3" />

        <div className="w-full max-w-md space-y-8 text-white  bg-opacity-5 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
          {/* Mobile Header */}
          <div className="lg:hidden flex flex-col items-center space-y-2">
            <img src={logo} alt="Agrostrings" className="h-12" />
            <h2 className="text-2xl font-bold text-yellow-400 text-center">Modern Agriculture, smarter Harvests</h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Username */}
            <div>
              <label htmlFor="username" className="block mb-1 text-sm text-gray-500">
                Username
              </label>
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    id="username"
                    placeholder="Enter username"
                    className="w-full px-4 py-3 rounded bg-opacity-60 border bg-[#e0e0e0] border-gray-700 focus:outline-none focus:ring-2 focus:ring-white text-black text-[14px]"
                  />
                )}
              />
              {errors.username && <p className="mt-1 text-xs text-red-500">{errors.username.message}</p>}
            </div>

            {/* Phone Input */}
            <div>
              <label htmlFor="phone" className="block mb-1 text-sm text-gray-500">
                Phone number
              </label>
              <PhoneInput
                defaultCountry="ug"
                value={phoneValue}
                onChange={(value, { country }) => {
                  setPhoneValue(value);
                  setSelectedCountry(country.iso2);
                }}
                inputClassName="w-full px-4 py-3 bg-gray-900 bg-opacity-60 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
              />
              {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
            </div>

            {/* Location Autocomplete */}
            <div>
              <label htmlFor="location" className="block mb-1 text-sm text-gray-500">
                Location
              </label>
              <Controller
                name="location"
                control={control}
                render={({ field }) => (
                  <div className="relative">
                    <input
                      {...field}
                      id="location"
                      placeholder="Select location"
                      autoComplete="off"
                      className="w-full px-4 py-3 rounded bg-[#e0e0e0] bg-opacity-60 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-white text-black text-[14px]"
                    />
                    {loading && <span className="absolute right-3 top-3 animate-spin text-yellow-400">⏳</span>}
                    {!loading && suggestions.length > 0 && (
                      <ul className="absolute z-10 w-full mt-1 bg-gray-900 bg-opacity-80 rounded-lg shadow-lg max-h-40 overflow-auto">
                        {suggestions.map((item) => (
                          <li
                            key={item.place_id}
                            onClick={() => handleLocationSelect(item.display_name, field.onChange)}
                            className="px-4 py-2 text-sm hover:bg-yellow-400 hover:text-black cursor-pointer"
                          >
                            {item.display_name}
                          </li>
                        ))}
                      </ul>
                    )}
                    {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
                  </div>
                )}
              />
              {errors.location && <p className="mt-1 text-xs text-red-500">{errors.location.message}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-lg bg-yellow-400 font-semibold text-black hover:bg-yellow-300 transition focus:ring-2 focus:ring-yellow-500"
            >
              {isSubmitting ? 'Signing Up...' : 'Get Started'}
            </button>
          </form>

          {/* Progress Dots */}
          <div className="flex items-center justify-center mt-6 space-x-2">
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
            <span className="w-2 h-2 rounded-full bg-gray-600 opacity-75" />
            <span className="w-2 h-2 rounded-full bg-gray-600 opacity-75" />
          </div>

          <p className="text-center text-gray-300 text-xs">
            By continuing, you agree to our{' '}
            <Link to="/terms" className="underline">Terms of Service</Link>{' '}
            and{' '}
            <Link to="/privacy" className="underline">Privacy Policy</Link>.
          </p>
        </div>
      </main>
    </div>
  );
}
