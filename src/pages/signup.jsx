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
import bgImg from '../assets/hero3.jpeg';

const signupSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  phone: z.string().min(5, 'Enter a valid phone number'),
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
    <div className="h-screen flex">
      {/* Left Panel */}
      <aside className="hidden lg:flex w-1/2 bg-cover bg-center relative" style={{ backgroundImage: `url(${bgImg})` }}>
        <div className="absolute inset-0 bg-black opacity-70" />
        <div className="relative z-10 m-auto text-center px-12 space-y-6">
          
          
          <h2 className="text-3xl font-bold text-[#fada25]">Smart Farming Revolution with Agrostrings</h2>
          <p className="text-gray-400">
  Join thousands of farmers leveraging cutting-edge technology to boost yields and farm smarter. From optimizing irrigation schedules and analyzing crop health to predicting harvest times and managing resources efficiently, our platform empowers you with data-driven insights. Track your fields, monitor soil moisture and weather patterns, receive real-time alerts on crop stress, collaborate with agronomy experts, and streamline record-keeping—all in one unified dashboard.
</p>
        </div>
      </aside>

      {/* Form Panel */}
      <main className="flex-1 flex items-center justify-center p-8 bg-gradient-to-b from-[#1a281f] to-[#111]">
        <div className="w-full max-w-md space-y-8 text-white">
          {/* Logo & Title */}
          <div className="flex flex-col items-center space-y-2">
            <img src={logo} alt="Farmer" className="h-12" />
            <div className="flex items-center space-x-2 text-2xl font-bold italic text-yellow-400">
              <FaLeaf />
              <span>Farmer</span>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Username */}
            <div>
              <label htmlFor="username" className="block mb-1 text-sm">Username</label>
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    id="username"
                    placeholder="Enter username"
                    className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600 focus:outline-none"
                  />
                )}
              />
              {errors.username && <p className="mt-1 text-xs text-red-500">{errors.username.message}</p>}
            </div>

            {/* Phone Input */}
            <div>
              <label htmlFor="phone" className="block mb-1 text-sm">Phone number</label>
              <PhoneInput
                defaultCountry="ug"
                value={phoneValue}
                onChange={(value, { country }) => {
                  setPhoneValue(value);
                  setSelectedCountry(country.iso2);
                }}
                inputClassName="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600 focus:outline-none"
              />
              {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
            </div>

            {/* Location Autocomplete */}
            <div>
              <label htmlFor="location" className="block mb-1 text-sm">Location</label>
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
                      className="w-full px-4 py-2 rounded bg-gray-800	border border-gray-600 focus:outline-none"
                    />
                    {loading && <span className="absolute right-3 top-3 animate-spin text-yellow-400">⏳</span>}
                    {!loading && suggestions.length > 0 && (
                      <ul className="absolute z-10 w-full mt-1 bg-gray-800 rounded shadow-lg max-h-40 overflow-auto">
                        {suggestions.map((item) => (
                          <li
                            key={item.place_id}
                            onClick={() => handleLocationSelect(item.display_name, field.onChange)}
                            className="px-3 py-2 text-sm hover:bg-yellow-400 hover:text-black cursor-pointer"
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
              className="w-full py-3 rounded bg-yellow-400 font-semibold text-black hover:bg-yellow-300 transition"
            >
              {isSubmitting ? 'Signing Up...' : 'Get Started'}
            </button>
          </form>

          <p className="text-center text-gray-400 text-xs">
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