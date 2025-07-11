// src/components/CarbonTracker.jsx
import React, { useState } from 'react';
import {
  Grid,
  GridItem,
  Container,
  Button,
  VStack,
  Box,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { FaPlus, FaChevronDown, FaChevronUp } from 'react-icons/fa';

import CarbonLeftSection from './carbon-left-section';
import CarbonMiddleSection from './carbon-right-section';
import CarbonRightSection from './carbon-other-section';

const Panel = ({ title, children }) => (
  <Box bg="gray.800" rounded="lg" overflow="hidden" h="100%">
    {/* Header */}
    <Box bg="gray.700" px={4} py={2}>
      <Text fontSize="sm" fontWeight="semibold" color="white">
        {title}
      </Text>
    </Box>
    {/* Body */}
    <Box p={4} h="calc(100% - 3rem)" overflowY="auto">
      {children}
    </Box>
  </Box>
);

const CarbonTracker = () => {
  const [showForm, setShowForm] = useState(false);
  const isMobile = useBreakpointValue({ base: true, md: false });

  // ——— Mobile layout ———
  if (isMobile) {
    return (
      <Container maxW="container.sm" px={4} py={6}>
        <VStack spacing={6} align="stretch">
          {/* Insights first */}
          <Panel title="Satellite Insights">
            <CarbonMiddleSection />
          </Panel>

          {/* Recommendations */}
          <Panel title="Recommendations">
            <CarbonRightSection />
          </Panel>

          {/* Toggle Farm Form */}
          <Button
            leftIcon={<FaPlus />}
            rightIcon={showForm ? <FaChevronUp /> : <FaChevronDown />}
            size="lg"
            onClick={() => setShowForm((prev) => !prev)}
          >
            Farm Details
          </Button>

          {showForm && (
            <Panel title="Your Farm Details">
              <CarbonLeftSection />
            </Panel>
          )}
        </VStack>
      </Container>
    );
  }

  // ——— Desktop layout: 3 columns ———
  return (
    <Container maxW="container.xl" p={4} h="100vh">
      <Grid
        templateColumns="2fr 4fr 1.5fr"
        gap={6}
        h="full"
      >
        {/* Left: Farm Form */}
        <GridItem maxH="90vh">
          <Panel>
            <CarbonLeftSection />
          </Panel>
        </GridItem>

        {/* Middle: Satellite Insights */}
        <GridItem maxH="90vh">
          <Panel>
            <CarbonMiddleSection />
          </Panel>
        </GridItem>

        {/* Right: Recommendations */}
        <GridItem maxH="90vh">
          <Panel title="Recommendations">
            <CarbonRightSection />
          </Panel>
        </GridItem>
      </Grid>
    </Container>
  );
};

export default CarbonTracker;
