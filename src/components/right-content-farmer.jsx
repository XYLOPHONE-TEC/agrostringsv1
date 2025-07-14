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
      p={{ base: 2, md: 4 }}
      borderRadius="md"
      w="100%"
      maxW={{ base: '100%', md: '300px' }}
      mx={{ base: 0, md: 2 }}
    >
      {/* Title row with Sell All tip */}
      <HStack justify="space-between" align="center" mb={2}>
        <Text fontWeight="semibold" fontSize={{ base: 'md', md: 'lg' }}>
          Market Tips
        </Text>
        {/* <Link
          fontSize={{ base: 'xs', md: 'sm' }}
          color="yellow.300"
          fontWeight="medium"
          _hover={{ textDecoration: 'underline' }}
        >
          Sell All →
        </Link> */}
      </HStack>

      {/* Separator */}
      <Separator borderColor="gray.600" mb={{ base: 3, md: 4 }} />

      {/* Tips list */}
      <VStack spacing={{ base: 3, md: 4 }} align="stretch">
        {tips.map((tip, index) => (
          <Box
            key={index}
            bg="gray.900"
            p={{ base: 3, md: 4 }}
            borderRadius="md"
            boxShadow="md"
          >
            <Text
              fontWeight="semibold"
              color="yellow.400"
              fontSize={{ base: 'sm', md: 'md' }}
              mb={1}
            >
              {tip.title}
            </Text>
            <Text fontSize={{ base: 'xs', md: 'sm' }} color="gray.200">
              {tip.description}
            </Text>
          </Box>
        ))}
      </VStack>

      {/* Assistance section */}
      <HStack spacing={2} mt={{ base: 3, md: 4 }} fontSize={{ base: 'xs', md: 'sm' }} color="gray.400">
        <FiHelpCircle />
        <Text>
          Get assistance and advice from agricultural experts.
        </Text>
      </HStack>
    </Box>
  )
}
