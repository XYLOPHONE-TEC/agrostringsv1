// src/components/SatelliteInsights.jsx
import React from 'react';
import {
  Box,
  Flex,
  Text,
  Badge,
  SimpleGrid,
  Heading,
} from '@chakra-ui/react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

const data = [
  { date: '01/20', ndvi: 0.60 },
  { date: '01/25', ndvi: 0.65 },
  { date: '01/30', ndvi: 0.70 },
  { date: '02/04', ndvi: 0.75 },
  { date: '02/09', ndvi: 0.78 },
];

export default function SatelliteInsights() {
  return (
    <Box bg="gray.800" p={0} borderRadius="md" color="white" boxShadow="md">
     

      {/* Top stats */}
      <Flex
        bg="gray.700"
        border="1px"
        borderColor="gray.200"
        borderRadius="md"

        p={4}
      
        align="center"
        justify="space-between"
        mb={3}
         mt={3}
      >
        <Box>
          <Text fontSize="xs" color="gray.100">
            NDVI Score
          </Text>
          <Flex align="baseline" mt={1}>
            <Text fontSize="2xl" fontWeight="bold" mr={2} color="gray.100">
              0.78
            </Text>
            <Badge colorScheme="green" fontSize="0.7em">
              Healthy
            </Badge>
          </Flex>
        </Box>
      </Flex>

      {/* Small info cards */}
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={3} mb={3}>
        <Box bg="gray.700" border="1px" borderColor="gray.200" borderRadius="md" p={3}>
          <Text fontSize="xs" color="gray.100">
            Cultivated Area
          </Text>
          <Text fontSize="lg" fontWeight="bold" color="gray.100">
            2.43 ha
          </Text>
        </Box>

        <Box bg="gray.700" border="1px" borderColor="gray.200" borderRadius="md" p={3}>
          <Text fontSize="xs" color="gray.100" mb={1}>
            Low Soil Moisture
          </Text>
          <Text fontSize="lg" fontWeight="bold" color="gray.100">
            24%
          </Text>
        </Box>
      </SimpleGrid>

     
      <Box bg="gray.700" border="1px" borderColor="gray.200" borderRadius="md" p={3} mb={3} height="280px">
        <Text fontSize="xs" color="gray.100" mb={2}>
          Vegetation Trend
        </Text>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="date"   style={{ fontSize: '0.75rem', fill: '#999' }} />
            <YAxis
              domain={[0, 1]}
               style={{ fontSize: '0.75rem', fill: '#999' }}
              tickFormatter={(val) => val.toFixed(2)}
            />
            <Tooltip
              labelFormatter={(label) => `Date: ${label}`}
              formatter={(value) => [`${value}`, 'NDVI']}
                contentStyle={{ fontSize: '0.75rem'}}
            />
            <Line
              type="monotone"
              dataKey="ndvi"
              stroke="#fada25"
              strokeWidth={2}
              dot={{ r: 2 }}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>

    
       {/* <Box bg="blue.50" borderRadius="md" p={3}>
        <Text fontSize="xs" color="gray.700">
         Recommendation
        </Text>
        <Text mt={1} fontSize="sm">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est tempora ea dicta adipisci, fuga sit voluptas officia! Repellat aliquid
        </Text>
      </Box> */}
    </Box>
  );
}
