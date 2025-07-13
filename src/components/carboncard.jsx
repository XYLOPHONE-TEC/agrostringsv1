// src/components/CarbonCard.jsx
import { Box, Heading, Flex, Text } from "@chakra-ui/react";
import Donut from "./donutanalytics";
export default function CarbonCard({ data }) {
  return (
    <Box bg="gray.700" p={4} boxShadow="sm" borderRadius="md" color="white">
      <Heading size="md" mb={4}>
        Environmental Impact
      </Heading>
      <Flex align="center" gap={6}>
        <Donut data={data} />
        <Box>
          <Text fontSize="sm">Carbon Footprint</Text>
          <Text color="green.600" fontWeight="bold">
            −15%
          </Text>
          <Text fontSize="sm" mt={4}>
            Sustainability Score
          </Text>
          <Text fontWeight="bold">A+</Text>
          <Text fontSize="sm" mt={4}>
            Environmental Credits
          </Text>
          <Text fontWeight="bold">245</Text>
        </Box>
      </Flex>
    </Box>
  );
}
