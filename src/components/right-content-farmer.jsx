// src/components/MarketTips.jsx
import { Box, Text, VStack, Link, HStack, Separator } from '@chakra-ui/react'
import React from 'react'
import { FiHelpCircle } from 'react-icons/fi'

const tips = [
  {
    title: 'MANGO SEASON',
    description: 'The season starts next month – begin pruning and preparing storage.',
  },
  {
    title: 'PRICE ALERT',
    description: 'Commodity prices expected to rise by 15% next week.',
  },
]

export default function MarketTips() {
  return (
    <Box
      bg="gray.800"
      color="white"
      p={4}
      borderRadius="md"
      w="100%"
      maxW="300px"
    >
      {/* Title row with Sell All tip */}
      <HStack justify="space-between" align="center" mb={2}>
        <Text fontWeight="semibold" fontSize="lg">
          Market Tips
        </Text>
        <Link fontSize="sm" color="yellow.300" fontWeight="medium" _hover={{ textDecoration: 'underline' }}>
          Sell All →
        </Link>
      </HStack>

      {/* Separator */}
      <Separator borderColor="gray.600" mb={4} />

      {/* Tips list */}
      <VStack spacing={4} align="stretch">
        {tips.map((tip, index) => (
          <Box
            key={index}
            bg="gray.900"
            p={4}
            borderRadius="md"
            boxShadow="md"
          >
            <Text
              fontWeight="semibold"
              color="yellow.400"
              fontSize="sm"
              mb={1}
            >
              {tip.title}
            </Text>
            <Text fontSize="sm" color="gray.200">
              {tip.description}
            </Text>
          </Box>
        ))}
      </VStack>

      {/* Assistance section */}
      <HStack spacing={2} mt={4} fontSize="xs" color="gray.400">
        <FiHelpCircle />
        <Text>
          Get assistance and advice from agricultural experts.
        </Text>
      </HStack>
    </Box>
  )
}
