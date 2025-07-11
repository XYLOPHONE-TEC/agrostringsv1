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

import MiddleContent from "./middle-content-farmer";
import ProductDashboard from "./products-component";
import CarbonTracker from "./carbon-tracker-farmer";
import RightContent from "./right-content-farmer";

const tools = [
  { icon: MdEco,       label: "Produce"        },
  { icon: FiTv,        label: "TV"             },
  { icon: FiGlobe,     label: "Carbon Tracker" },
  { icon: FiBarChart2, label: "Analytics"      },
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
    // push history entry
    window.history.pushState({ tool: label }, "", `#${label}`);
    // if navigating to Produce or Carbon Tracker, show loader
    if (label === "Produce" || label === "Carbon Tracker") {
      setIsLoading(true);
      setTimeout(() => {
        setActive(label);
        setIsLoading(false);
      }, 300);
    } else {
      setActive(label);
    }
  }, []);

  const isFull = active === "Produce" || active === "Carbon Tracker";
  const showSides = !isFull;
  const templateColumns = useBreakpointValue({
    base: "1fr",
    md: isFull ? "1fr" : "2fr 3fr 2fr",
  });

  // decide which center to render
  const renderMiddle = () => {
    if (active === "Produce") return <ProductDashboard />;
    if (active === "Carbon Tracker") return <CarbonTracker />;
    return <MiddleContent />;
  };

  return (
    <Box mx={{ base: 0, md: 4 }} my={4}>
      <Grid templateColumns={templateColumns} gap={4}>
        {/* Left sidebar */}
        {showSides && (
          <GridItem>
            <VStack spacing={4} align="stretch">
              {/* Weather Card */}
              <Box bg="gray.800" p={4} rounded="lg" color="white">
                <HStack justify="space-between" mb={2}>
                  <Text fontSize="md" fontWeight="semibold">Weather</Text>
                  <Text fontSize="xs" color="yellow.300" cursor="pointer">
                    View more
                  </Text>
                </HStack>
                <HStack align="center" spacing={3} mb={2}>
                  <Icon as={FiSun} boxSize="1.6em" color="yellow.300" />
                  <VStack align="start" spacing={0}>
                    <Text fontSize="2xl" fontWeight="bold">24°C</Text>
                    <Text fontSize="xs" color="gray.400">Partly cloudy</Text>
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
