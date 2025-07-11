// src/components/CarbonTracker.jsx
"use client";

import React, { useState } from 'react';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  TabsIndicator,
  Container,
  VStack,
  Box,
  Text,
  Grid,
  GridItem,
  useBreakpointValue,
} from '@chakra-ui/react';

import CarbonLeftSection from './carbon-left-section';
import CarbonMiddleSection from './carbon-right-section';
import CarbonRightSection from './carbon-other-section';

const Panel = ({ title, children }) => (
  <Box bg="gray.800" rounded="lg" overflow="hidden" h="100%">
    {title && (
      <Box bg="gray.700" px={4} py={2}>
        <Text fontSize="sm" fontWeight="semibold" color="white">
          {title}
        </Text>
      </Box>
    )}
    <Box p={4} h="calc(100% - 3rem)" overflowY="auto">
      {children}
    </Box>
  </Box>
);

const CarbonTracker = () => {
  const [activeTab, setActiveTab] = useState('insights');
  const isMobile = useBreakpointValue({ base: true, md: false });

  if (isMobile) {
    return (
      <Container maxW="container.sm" px={0} py={2} mx={0}>
        <VStack spacing={4} align="stretch">
          {/* Mobile Tabs */}
          <Tabs.Root value={activeTab} onChange={setActiveTab}>
            <TabsList borderBottom="1px solid" borderColor="gray.600">
              <TabsTrigger value="insights">Insights</TabsTrigger>
              <TabsTrigger value="farm">Farm Details</TabsTrigger>
              <TabsIndicator />
            </TabsList>

            <TabsContent value="insights" asChild>
              <Panel title="Satellite Insights">
                <CarbonMiddleSection />
              </Panel>
            </TabsContent>
            <TabsContent value="farm" asChild>
              <Panel title="Your Farm Details">
                <CarbonLeftSection />
              </Panel>
            </TabsContent>
          </Tabs.Root>

          {/* Always-last Recommendations */}
          <Panel title="Recommendations">
            <CarbonRightSection />
          </Panel>
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" p={4} h="100vh">
      <Grid templateColumns="2fr 4fr 1.5fr" gap={6} h="full">
        <GridItem maxH="90vh">
          <Panel title="Your Farm Details">
            <CarbonLeftSection />
          </Panel>
        </GridItem>
        <GridItem maxH="90vh">
          <Panel title="Satellite Insights">
            <CarbonMiddleSection />
          </Panel>
        </GridItem>
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
