// src/components/CarbonTracker.jsx
import React, { useState } from 'react';
import {
  Grid,
  Box,
  Container,
  Button,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react';
import { FaPlus, FaChevronDown, FaChevronUp } from 'react-icons/fa';

import CarbonLeftSection from './carbon-left-section';
import CarbonRightSection from './carbon-right-section';

const CarbonTracker = () => {
  const [showDetails, setShowDetails] = useState(false);
  const isMobile = useBreakpointValue({ base: true, md: false });

  // Mobile layout: always show right section first with button on top
  if (isMobile) {
    return (
      <Container maxW="container.sm" px={1} py={4} m="0">
        <VStack spacing={4} align="stretch">
          {/* Toggle button */}
          <Button
            leftIcon={<FaPlus />}
            rightIcon={showDetails ? <FaChevronUp /> : <FaChevronDown />}
            size="lg"
            onClick={() => setShowDetails(prev => !prev)}
          >
            Add Farm Details
          </Button>

          {/* Right Section (dominant) */}
          <Box bg="gray.800" rounded="lg" px={-1} py={4} boxShadow="base">
            <CarbonRightSection />
          </Box>

          {/* Left Section (conditionally shown) */}
          {showDetails && (
            <Box bg="gray.800" rounded="sm" px={4} py={6} mt={2}>
              <CarbonLeftSection />
            </Box>
          )}
        </VStack>
      </Container>
    );
  }

  // Desktop layout: two-column grid
  return (
    <Container maxW="container.xl" p={0} h="100vh" overflowY="hidden">
      <Grid
        templateColumns="2fr 3fr"
        templateRows="1fr auto"
        h="100%"
        overflow="hidden"
        gap={4}
        p={4}
      >
        {/* Left Section */}
        <Box bg="gray.800" rounded="sm" p={6} gridColumn="1" gridRow="1">
          <CarbonLeftSection />
        </Box>

        {/* Right Section */}
        <Box bg="gray.800" rounded="lg" p={4} boxShadow="base" gridColumn="2" gridRow="1">
          <CarbonRightSection />
        </Box>
      </Grid>
    </Container>
  );
};

export default CarbonTracker;
