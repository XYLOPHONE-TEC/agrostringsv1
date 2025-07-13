// src/components/CarbonRightSection.jsx
import React from 'react';
import {
  HStack,
  VStack,
  Box,
  Text,
  Heading,
  Separator,
} from '@chakra-ui/react';
import { FaTree, FaCloud, FaTint } from 'react-icons/fa';

const InfoCard = ({ icon, title, description, bgColor }) => (
  <HStack
    bg={bgColor}
    rounded="md"
    p={5}
    spacing={3}
    align="start"
  >
    <Box fontSize="2xl" mt={1}>
      {icon}
    </Box>
    <VStack align="start" spacing={1}>
      <Heading size="sm">{title}</Heading>
      <Text fontSize="sm">{description}</Text>
    </VStack>
  </HStack>
);

const CarbonRightSection = ({
  weatherAlerts = [],
  soilMoisture = null,
  onTestSoil,
}) => {
  return (
    <VStack gap={4} align="stretch" p={2}>
      {/* Section Header */}
     
      
      {/* Carbon Improvement */}
      <InfoCard
        icon={<FaTree />}
        title="Carbon Improvement"
        description="Plant more trees to increase your carbon score"
        bgColor="green.50"
      />

      {/* Weather Alert */}
      <InfoCard
        icon={<FaCloud />}
        title="Weather Alert"
        description="Drought risk detected - consider early planting"
        bgColor="blue.50"
      />

      {/* Soil Health */}
      <InfoCard
        icon={<FaTint />}
        title="Soil Health"
        description="Low soil moisture levels detected"
        bgColor="yellow.50"
      />
    </VStack>
  );
};

export default CarbonRightSection;
