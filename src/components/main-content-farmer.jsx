// src/main-content-farmer.jsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Grid,
  GridItem,
  Box,
  VStack,
  HStack,
  Text,
  SimpleGrid,
  Icon,
  Spinner,
  useBreakpointValue,
} from "@chakra-ui/react";
import {
  FiSun,
  FiThermometer,
  FiCloudRain,
  FiTv,
  FiGlobe,
  FiBarChart2,
} from "react-icons/fi";
import { MdEco } from "react-icons/md";

import TvFarmer from "./tv-farmer";
import AnalyticsFarmer from "./analytics-farmer";
import MiddleContent from "./middle-content-farmer";
import ProductDashboard from "./products-component";
import CarbonTracker from "./carbon-tracker-farmer";
import RightContent from "./right-content-farmer";
import WeatherDetail from "./weather-details";      // ← your detailed weather view

const tools = [
   // ← NEW
  { icon: MdEco,    label: "Produce"      },
  { icon: FiTv,     label: "TV"           },
  { icon: FiGlobe,  label: "Carbon Tracker"},
  { icon: FiBarChart2, label: "Analytics" }
];

export default function MainContent() {
  // initialize from hash or default
  const [active, setActive] = useState(() => {
    if (typeof window === "undefined") return null;
    const h = window.location.hash.replace(/^#/, "");
    return tools.some(t => t.label === h) ? h : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  // handle back/forward browser buttons
  useEffect(() => {
    const onPop = (e) => {
      const tool = e.state?.tool
        ?? window.location.hash.replace(/^#/, "")
        ?? null;
      setActive(tools.some(t => t.label === tool) ? tool : null);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // select tool, push history, and show loader
  const selectTool = useCallback((label) => {
    window.history.pushState({ tool: label }, "", `#${label}`);
    // show loader for any “full” view
    if (["Weather","Produce","Carbon Tracker","TV","Analytics"].includes(label)) {
      setIsLoading(true);
      setTimeout(() => {
        setActive(label);
        setIsLoading(false);
      }, 300);
    } else {
      setActive(label);
    }
  }, []);

  // any of these labels should go “full width”
  const isFull = ["Weather","Produce","Carbon Tracker","TV","Analytics"].includes(active);
  const showSides = !isFull;
  const templateColumns = useBreakpointValue({
    base: "1fr",
    md: isFull ? "1fr" : "2fr 3fr 2fr",
  });

  // decide which center to render
  const renderMiddle = () => {
    switch(active) {
      case "Weather":
        return <WeatherDetail />;
      case "Produce":
        return <ProductDashboard />;
      case "Carbon Tracker":
        return <CarbonTracker />;
      case "TV":
        return <TvFarmer />;
      case "Analytics":
        return <AnalyticsFarmer />;
      default:
        return <MiddleContent />;
    }
  };

  return (
    <Box mx={{ base: 0, md: 4 }} my={4}>
      <Grid templateColumns={templateColumns} gap={4}>
        {/* Left sidebar */}
        {showSides && (
          <GridItem>
            <VStack spacing={4} align="stretch">
              {/* Weather Card */}
              <Box
                p={4}
                rounded="lg"
                color="white"
                bg="gray.800"
                position="relative"
                overflow="hidden"
                _before={{
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  bgImage:
                    "url('https://images.unsplash.com/photo-1542349314-b0ceb4d90f2d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xvdWRzfGVufDB8fDB8fHww')",
                  bgSize: "cover",
                  bgPosition: "center",
                  opacity: 0.3,
                  zIndex: 0,
                }}
              >
                <Box position="relative" zIndex={1}>
                  <HStack justify="space-between" mb={2}>
                    <Text fontSize="md" fontWeight="semibold">Weather</Text>
                    <Text
                      fontSize="xs"
                      color="yellow.300"
                      cursor="pointer"
                      onClick={() => selectTool("Weather")}       // ← hooked up
                    >
                      View more
                    </Text>
                  </HStack>
                  <HStack align="center" spacing={3} mb={2}>
                    <Icon as={FiSun} boxSize="1.6em" color="yellow.300" />
                    <VStack align="start" spacing={0}>
                      <Text fontSize="2xl" fontWeight="bold">24°C</Text>
                      <Text fontSize="xs" color="gray.300">Partly cloudy</Text>
                    </VStack>
                  </HStack>
                  <HStack justify="space-between" mb={1}>
                    <HStack spacing={1}>
                      <Icon as={FiThermometer} boxSize="1em" color="blue.300" />
                      <Text fontSize="xs">Low: 14°C</Text>
                    </HStack>
                    <HStack spacing={1}>
                      <Icon as={FiThermometer} boxSize="1em" color="yellow.300" />
                      <Text fontSize="xs">High: 34°C</Text>
                    </HStack>
                  </HStack>
                  <HStack spacing={1}>
                    <Icon as={FiCloudRain} boxSize="1em" color="gray.400" />
                    <Text fontSize="xs" color="gray.400">Rain expected</Text>
                  </HStack>
                </Box>
              </Box>

              {/* Tools selector */}
              <Box bg="gray.800" p={4} rounded="lg" color="white">
                <Text mb={2} fontSize="md" fontWeight="semibold">Access Tools</Text>
                <SimpleGrid columns={2} gap={3}>
                  {tools.map(t => (
                    <VStack
                      key={t.label}
                      as="button"
                      onClick={() => selectTool(t.label)}
                      bg={active === t.label ? "gray.600" : "gray.700"}
                      _hover={{ bg: "gray.600" }}
                      p={2}
                      rounded="md"
                    >
                      <Icon as={t.icon} boxSize="1.2em" color="yellow.300" />
                      <Text fontSize="xs">{t.label}</Text>
                    </VStack>
                  ))}
                </SimpleGrid>
              </Box>
            </VStack>
          </GridItem>
        )}

        {/* Middle pane */}
        <GridItem colSpan={1} position="relative">
          {isLoading && (
            <Box
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              zIndex={1}
            >
              <Spinner size="xl" color="yellow.300" />
            </Box>
          )}
          <Box
            bg="gray.800"
            p={4}
            rounded="lg"
            minH="240px"
            opacity={isLoading ? 0.3 : 1}
          >
            {renderMiddle()}
          </Box>
        </GridItem>

        {/* Right sidebar */}
        {showSides && (
          <GridItem>
            <Box bg="gray.800" p={4} rounded="lg" minH="160px">
              <RightContent />
            </Box>
          </GridItem>
        )}
      </Grid>
    </Box>
  );
}
