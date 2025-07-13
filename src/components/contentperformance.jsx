// src/components/ContentPerformanceCard.jsx
import { Box, Heading, SimpleGrid, Text } from "@chakra-ui/react";
export default function ContentPerformanceCard({ data }) {
  return (
    <Box boxShadow="md" borderRadius="md" p={4}>
      <Heading size="sm" mb={2}>
        Content Performance
      </Heading>
      <SimpleGrid columns={3} gap={2} mb={3}>
        {["45.2K", "4:32", "8.2%"].map((v, i) => (
          <Box key={i} bg="gray.700" p={4} borderRadius="md">
            <Text fontSize="sm">
              {["Total Views", "Avg Watch Time", "Engagement Rate"][i]}
            </Text>
            <Text fontSize="xl" fontWeight="bold">
              {v}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
      <SimpleGrid columns={3} gap={2}>
        {data.map((v) => (
          <Box key={v.id} borderRadius="md" overflow="hidden" boxShadow="sm"  bg="gray.600">
            <img
              src={v.thumb}
              alt={v.title}
              style={{ width: "100%", height: "auto", filter: "brightness(0.9)" }}
            />
            <Box p={3}>
              <Text fontWeight="semibold" fontSize="sm">{v.title}</Text>
              <Text fontSize="xs" color="gray.300">
                {v.views.toLocaleString()} views
              </Text>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}
