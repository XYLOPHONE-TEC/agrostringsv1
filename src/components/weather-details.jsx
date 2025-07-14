// src/weather-detail.jsx
"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  SimpleGrid,
  Icon,
} from "@chakra-ui/react";
import {
  FiSun,
  FiCloudRain,
  FiCloud,
  FiWind,
  FiThermometer,
} from "react-icons/fi";

const sampleWeather = {
  current: {
    temp: 24,
    feels_like: 22,
    wind_speed: 3.5,
    pop: 0.2,
    weather: [{ description: "Partly cloudy", main: "Clouds" }],
  },
  hourly: Array.from({ length: 12 }).map((_, i) => ({
    dt: Date.now() / 1000 + i * 3600,
    temp: 20 + i % 5,
    weather: [{ main: i % 3 === 0 ? "Rain" : "Clouds" }],
  })),
  daily: Array.from({ length: 7 }).map((_, i) => ({
    dt: Date.now() / 1000 + i * 86400,
    temp: { max: 26 + i, min: 16 + i },
    weather: [{ main: i % 2 === 0 ? "Clouds" : "Clear" }],
  })),
};

export default function WeatherDetail() {
  const [weather] = useState(sampleWeather);
  const bg = "gray.700";

  const { current, hourly, daily } = weather;

  return (
    <Box color="white">
      {/* Current conditions */}
      <VStack bg={bg} p={6} rounded="lg" gap={4} mb={6} backgroundImage="url('https://images.unsplash.com/photo-1498496294664-d9372eb521f3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGNsb3Vkc3xlbnwwfHwwfHx8MA%3D%3D')"
  backgroundSize="cover"
  backgroundPosition="center"
  backgroundRepeat="no-repeat">
        <HStack gap={4}>
          <Icon as={FiSun} boxSize="2em" color="yellow.300" />
          <VStack gap={0} align="start">
            <Text fontSize="4xl" fontWeight="bold">
              {current.temp}°C
            </Text>
            <Text fontSize="sm" color="gray.300">
              {current.weather[0].description}
            </Text>
          </VStack>
        </HStack>
        <HStack gap={8}>
          <HStack gap={2}>
            <Icon as={FiThermometer} />
            <Text fontSize="sm">
              Feels like {current.feels_like}°C
            </Text>
          </HStack>
          <HStack gap={2}>
            <Icon as={FiWind} />
            <Text fontSize="sm">{current.wind_speed} m/s</Text>
          </HStack>
          <HStack gap={2}>
            <Icon as={FiCloudRain} />
            <Text fontSize="sm">{current.pop * 100}% chance rain</Text>
          </HStack>
        </HStack>
      </VStack>

      {/* Hourly forecast */}
      <Box mb={6}>
        <Text fontSize="lg" mb={2}>
          Hourly Forecast
        </Text>
        <SimpleGrid columns={{ base: 3, md: 6 }} gap={4}>
          {hourly.map((h, idx) => (
            <VStack key={idx} bg={bg} p={3} rounded="md">
              <Text fontSize="xs">
                {new Date(h.dt * 1000).getHours()}:00
              </Text>
              <Icon
                as={
                  h.weather[0].main === "Rain"
                    ? FiCloudRain
                    : h.weather[0].main === "Clouds"
                    ? FiCloud
                    : FiSun
                }
                boxSize="1.5em"
                color="yellow.300"
              />
              <Text fontSize="sm">{h.temp}°</Text>
            </VStack>
          ))}
        </SimpleGrid>
      </Box>

      {/* 7-day forecast */}
      <Box>
        <Text fontSize="lg" mb={2}>
          7‑Day Forecast
        </Text>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={4}>
          {daily.map((d, idx) => (
            <HStack
              key={idx}
              bg={bg}
              p={4}
              rounded="md"
              justify="space-between"
            >
              <Text flex="1">
                {new Date(d.dt * 1000).toLocaleDateString(undefined, {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </Text>
              <HStack gap={3}>
                <Icon
                  as={
                    d.weather[0].main === "Rain"
                      ? FiCloudRain
                      : d.weather[0].main === "Clouds"
                      ? FiCloud
                      : FiSun
                  }
                />
                <Text>
                  {d.temp.max}° / {d.temp.min}°
                </Text>
              </HStack>
            </HStack>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
