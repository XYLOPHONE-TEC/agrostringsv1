// src/main-content-farmer.jsx
"use client";

import React, { useState } from "react";
import {
  Grid,
  GridItem,
  Box,
  VStack,
  HStack,
  Text,
  SimpleGrid,
  Icon,
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
import { motion, AnimatePresence } from "framer-motion";

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

const MotionBox = motion(Box);

export default function MainContent() {
  // Just JS: no TypeScript generics
  const [active, setActive] = useState(null);

  // full‑width when Produce or Carbon Tracker
  const isFull = active === "Produce" || active === "Carbon Tracker";

  // responsive: 1fr or 2fr 3fr 2fr
  const templateColumns = useBreakpointValue({
    base: "1fr",
    md: isFull ? "1fr" : "2fr 3fr 2fr",
  });

  // which middle panel?
  const renderMiddle = () => {
    if (active === "Produce") return <ProductDashboard />;
    if (active === "Carbon Tracker") return <CarbonTracker />;
    return <MiddleContent />;
  };

  return (
    <Box mx={{ base: 0, md: 4 }} my={4}>
      <Grid templateColumns={templateColumns} gap={4}>
        {/* Left sidebar */}
        {!isFull && (
          <GridItem>
            <VStack spacing={4} align="stretch">
              {/* Weather Card */}
              <Box bg="gray.800" p={4} rounded="lg" color="white">
                <HStack justify="space-between" mb={2}>
                  <Text fontSize="md" fontWeight="semibold">
                    Weather
                  </Text>
                  <Text fontSize="xs" color="yellow.300" cursor="pointer">
                    View more
                  </Text>
                </HStack>
                <HStack align="center" spacing={3} mb={2}>
                  <Icon as={FiSun} boxSize="1.6em" color="yellow.300" />
                  <VStack align="start" spacing={0}>
                    <Text fontSize="2xl" fontWeight="bold">
                      24°C
                    </Text>
                    <Text fontSize="xs" color="gray.400">
                      Partly cloudy
                    </Text>
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
                  <Text fontSize="xs" color="gray.400">
                    Rain expected
                  </Text>
                </HStack>
              </Box>

              {/* Tools selector */}
              <Box bg="gray.800" p={4} rounded="lg" color="white">
                <Text mb={2} fontSize="md" fontWeight="semibold">
                  Access Tools
                </Text>
                <SimpleGrid columns={2} gap={3}>
                  {tools.map((t) => (
                    <VStack
                      key={t.label}
                      as="button"
                      onClick={() => setActive(t.label)}
                      bg={active === t.label ? "gray.600" : "gray.700"}
                      _hover={{ bg: "gray.600" }}
                      p={2}
                      rounded="md"
                    >
                      <Icon
                        as={t.icon}
                        boxSize="1.2em"
                        color="yellow.300"
                      />
                      <Text fontSize="xs">{t.label}</Text>
                    </VStack>
                  ))}
                </SimpleGrid>
              </Box>
            </VStack>
          </GridItem>
        )}

        {/* Middle pane */}
        <GridItem colSpan={1}>
          <AnimatePresence mode="wait">
            <MotionBox
              key={active ?? "default"}
              bg="gray.800"
              p={4}
              rounded="lg"
              minH="240px"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderMiddle()}
            </MotionBox>
          </AnimatePresence>
        </GridItem>

        {/* Right sidebar */}
        {!isFull && (
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
