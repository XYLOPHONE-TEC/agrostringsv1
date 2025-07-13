// src/components/CropMarketCard.jsx
import { Box, Heading, VStack, Text, Flex } from "@chakra-ui/react";
export default function CropMarketCard({ data }) {
  return (
    <Box boxShadow="md" borderRadius="md" p={6} px={0}>
      <Heading size="sm" mb={4} color={"gray.200"}>
        National Crop Market
      </Heading>
      <VStack gap={3} align="stretch">
        {data.map((c) => (
          <Flex
            key={c.crop}
            justify="space-between"
            align="center"
            bg="gray.700"
            p={4}
            borderRadius="md"
          >
            <Box>
              <Text fontSize="sm" fontWeight="semibold">{c.crop}</Text>
              <Text fontSize="sm" color="gray.400">
                Current market price
              </Text>
            </Box>
            <Flex align="baseline" color="gray.200" fontWeight="bold">
              <Text fontSize="sm" mr={2}>{c.price}/ton</Text>
              <Text fontSize="sm">{c.change}</Text>
            </Flex>
          </Flex>
        ))}
      </VStack>
    </Box>
  );
}
