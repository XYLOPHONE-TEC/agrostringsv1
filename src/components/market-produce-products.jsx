// src/components/MarketProduce.jsx
import React from 'react';
import { Grid, Box, Image, VStack, HStack, Text, Badge } from '@chakra-ui/react';
import { FiTag } from 'react-icons/fi';

export default function MarketProduce({ items, onAddPrice }) {
  if (items.length === 0) return <Text color="gray.400">No products available.</Text>;

  // Example unit prices per kg in UGX
  const unitPrices = {
    'Fresh Lettuce': 'UGX 4,250/kg',
    'Organic Tomatoes': 'UGX 4,000/kg',
    'Carrots': 'UGX 4,000/kg',
  };

  return (
    <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={4} p={4}>
      {items.map((item, idx) => {
        const blurred = item.isBlurred;  // Expect `isBlurred` flag on each item
        return (
          <Box
            key={item.id}
            p={4}
            rounded="md"
            shadow="md"
            color="white"
         
            position="relative"
            filter={blurred ? 'blur(4px)' : 'none'}
            opacity={blurred ? 0.6 : 1}
            pointerEvents={blurred ? 'none' : 'auto'}
            _hover={{ bg: blurred ? 'gray.700' : 'gray.800' }}
          >
            <Image
              src={item.image}
              alt={item.name}
              borderRadius="md"
              w="100%"
              h="120px"
              objectFit="cover"
              mb={2}
            />
            <VStack align="start" spacing={0}>
              <HStack justify="space-between" w="100%">
                <Text fontSize="md" fontWeight="semibold">{item.name}</Text>
                <Badge fontSize="0.7em" colorScheme="green">{item.quantity}</Badge>
              </HStack>
              <Text fontSize="xs" color="gray.300">{item.farm} – {item.location}</Text>
              <Text fontSize="sm" color="#fada25" mt={1} fontWeight="bold">
                {unitPrices[item.name] || 'UGX --/kg'}
              </Text>
            </VStack>

            {blurred && (
              <Box
                position="absolute"
                inset="0"
                bg="rgba(0, 0, 0, 0.5)"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Text fontSize="sm" color="white">
                  More products available after signup
                </Text>
              </Box>
            )}
          </Box>
        );
      })}
    </Grid>
  );
}
