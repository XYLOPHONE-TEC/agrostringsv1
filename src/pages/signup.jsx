import React, { useState, useEffect, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import logo from '../assets/logo.png';
import debounce from 'lodash.debounce';
import { FaLeaf } from 'react-icons/fa';

const signupSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  phone: z.string().min(5, 'Enter a valid phone number'),
  location: z.string().nonempty('Please select your location'),
});

export default function Signup() {
  const navigate = useNavigate();
  const [phoneValue, setPhoneValue] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('ug'); // Default to Uganda
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
  const cache = useRef(new Map()).current; // Cache for location suggestions

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
    <div className="h-screen flex flex-col bg-gradient-to-b from-[#111] to-[#1a281f] text-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-2">
          
          <img src={logo} alt="Farmer" className="h-5 w-auto" />
          <span className="text-2xl font-bold italic text-[#fada25]">Farmer</span>
            <FaLeaf classNmae />
        </div>
        {/* <Link
          to="/login"
          className="border border-yellow-400 px-5 py-2 rounded-lg hover:bg-yellow-400 hover:text-black transition"
        >
          Login
        </Link> */}
      </nav>

      <main className="flex flex-1 overflow-hidden">
        {/* Decorative Side */}
        <div className="hidden lg:flex flex-1 relative p-10">
          <div className="absolute inset-0 opacity-20 bg-[url('../assets/fields.jpg')] bg-cover bg-center" />
          <div className="relative z-10 text-white flex items-center justify-center h-full">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">Smart Farming Revolution</h2>
              <p className="opacity-75">
                Join thousands of farmers using technology to impro...
              </p>
            </div>
            <div className="absolute top-1/4 left-10 w-32 h-32 bg-gray-700 rounded-full opacity-50"></div>
            <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-gray-700 rounded-full opacity-50"></div>
          </div>
        </div>

        {/* Form Side */}
        <div className="flex-1 flex flex-col justify-center items-center p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md space-y-6">
            <h2 className="text-2xl font-bold text-center mb-6">Get Started</h2>
            <p className="text-center text-gray-400 mb-6">Join the future of smart farming</p>
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm mb-1">Username</label>
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    id="username"
                    placeholder="Enter username"
                    className="w-full bg-gray-800 rounded py-2 px-4 placeholder-gray-400 focus:outline-none text-white border border-gray-600"
                  />
                )}
              />
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>
              )}
            </div>

            {/* Phone Input */}
            <div>
              <label htmlFor="phone" className="block text-sm mb-1">Phone number</label>
              <PhoneInput
                defaultCountry="ug"
                value={phoneValue}
                onChange={(value, { country }) => {
                  setPhoneValue(value);
                  setSelectedCountry(country.iso2);
                }}
                inputClassName="w-full bg-gray-800 rounded py-2 px-4 placeholder-gray-400 text-white focus:outline-none border border-gray-600"
                className="w-full"
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
            </div>

            {/* Location Autocomplete */}
            <div>
              <label htmlFor="location" className="block text-sm mb-1">Location</label>
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
                      className="w-full bg-gray-800 rounded py-2 px-4 placeholder-gray-400 focus:outline-none text-white border border-gray-600 appearance-none"
                    />
                    {loading && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <div
                          className="w-5 h-5 border-2 border-t-transparent border-yellow-400 rounded-full animate-spin"
                          role="status"
                          aria-label="Loading locations"
                        />
                      </div>
                    )}
                    {!loading && suggestions.length > 0 && (
                      <ul className="absolute z-20 bg-gray-800 text-white w-full mt-1 rounded-md shadow-lg max-h-60 overflow-auto border border-yellow-400">
                        {suggestions.map(item => (
                          <li
                            key={item.place_id}
                            onClick={() => handleLocationSelect(item.display_name, field.onChange)}
                            className="cursor-pointer p-2 hover:bg-yellow-400 hover:text-black text-sm transition"
                          >
                            {item.display_name}
                          </li>
                        ))}
                      </ul>
                    )}
                    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                  </div>
                )}
              />
              {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-yellow-400 text-black font-semibold rounded-lg py-3 hover:bg-yellow-300 transition"
            >
              {isSubmitting ? 'Signing Up...' : 'Get Started'}
            </button>
          </form>

          <p className="text-gray-400 text-xs mt-4 text-center">
            By continuing you agree to our{' '}
            <Link to="/terms" className="underline text-yellow-400">Terms of Service</Link> and{' '}
            <Link to="/privacy" className="underline text-yellow-400">Privacy Policy</Link>.
          </p>
        </div>
      </main>
    </div>
  );
}