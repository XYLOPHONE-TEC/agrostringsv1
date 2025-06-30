// MainContent.jsx
import React from 'react';
import {
  Grid,
  Box,
  VStack,
  HStack,
  Text,
  SimpleGrid,
  Icon,
  Link,
} from '@chakra-ui/react';
import {
  FiSun,
  FiThermometer,
  FiCloudRain,
  FiTv,
  FiGlobe,
  FiBarChart2,
} from 'react-icons/fi';
import { MdEco } from 'react-icons/md';
import MiddleContent from './middle-content-farmer';
import RightContent from './right-content-farmer'

const MainContent = () => (
  <Grid templateColumns="2fr 3fr 2fr" gap={4} px={8} py={4}>
    {/* Left section (weather + tools) */}
    <VStack spacing={4} align="stretch">
      {/* Weather Card */}
      <Box bg="gray.800" p={3} rounded="lg" color="white">
        <HStack justify="space-between" mb={2}>
          <Text fontSize="md" fontWeight="semibold">Weather</Text>
          <Link fontSize="xs" color="yellow.300">View more</Link>
        </HStack>

        <HStack align="center" spacing={3} mb={2}>
          <Icon as={FiSun} boxSize="1.6em" color="yellow.300" />
          <VStack align="start" spacing={0}>
            <Text fontSize="2xl" fontWeight="bold">24°C</Text>
            <Text fontSize="xs" color="gray.400">partly cloudy</Text>
          </VStack>
        </HStack>

        <HStack justify="space-between" mb={1}>
          <HStack spacing={1}>
            <Icon as={FiThermometer} color="blue.300" boxSize="1em" />
            <Text fontSize="xs">Low: 14°C</Text>
          </HStack>
          <HStack spacing={1}>
            <Icon as={FiThermometer} color="yellow.300" boxSize="1em" />
            <Text fontSize="xs">High: 34°C</Text>
          </HStack>
        </HStack>

        <HStack spacing={1}>
          <Icon as={FiCloudRain} color="gray.400" boxSize="1em" />
          <Text fontSize="xs" color="gray.400">Rain expected</Text>
        </HStack>
      </Box>

      {/* Access Tools Card */}
      <Box bg="gray.800" p={3} rounded="lg" color="white">
        <Text fontSize="md" fontWeight="semibold" mb={2}>
          Access Tools
        </Text>
        <SimpleGrid columns={2} gapX={4} gapY={4}>
          {[
            { icon: MdEco, label: 'Produce' },
            { icon: FiTv, label: 'TV' },
            { icon: FiGlobe, label: 'Carbon Tracker' },
            { icon: FiBarChart2, label: 'Analytics' },
          ].map((item, i) => (
            <VStack
              key={i}
              bg="gray.700"
              p={2}
              rounded="md"
              gap={2}
              align="center"
            >
              <Icon as={item.icon} boxSize="1.2em" color="yellow.300" />
              <Text fontSize="xs">{item.label}</Text>
            </VStack>
          ))}
        </SimpleGrid>
      </Box>
    </VStack>

    {/* Middle section (now wider) */}
    <Box bg="gray.800" rounded="lg" p={3} minH="240px">
      <MiddleContent />
    </Box>

    {/* Right placeholder */}
    <Box bg="gray.800" rounded="lg" p={3} minH="160px" >     <RightContent /></Box>

  </Grid>
);

export default MainContent;
