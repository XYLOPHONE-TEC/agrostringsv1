// src/components/MarketProduce.jsx
import React from 'react';
import {
  Grid,
  Box,
  Image,
  VStack,
  HStack,
  Text,
  Badge,
  useBreakpointValue,
} from '@chakra-ui/react';

export default function MarketProduce({ items, onAddPrice }) {
  if (items.length === 0) return <Text color="gray.400">No products available.</Text>;

  // Example unit prices per kg in UGX
  const unitPrices = {
    'Fresh Lettuce': 'UGX 4,250/kg',
    'Organic Tomatoes': 'UGX 4,000/kg',
    'Carrots': 'UGX 4,000/kg',
  };
  const columnCount = useBreakpointValue({ base: 2, sm: 2, md: 3, lg: 4 });


  return (
    <Grid
      templateColumns={`repeat(${columnCount}, 1fr)`}
      gap={{ base: 3, md: 4 }}
      px={{ base: 3, md: 6 }}
      py={{ base: 4, md: 6 }}
    >
      {items.map((item) => {
        const blurred = item.isBlurred;

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
            transition="0.3s ease"
          >
            <Image
              src={item.image}
              alt={item.name}
              borderRadius="md"
              w="100%"
              h={{ base: '120px', sm: '140px', md: '150px' }}
              objectFit="cover"
              mb={2}
            />
            <VStack align="start" spacing={0}>
              <HStack justify="space-between" w="100%">
                <Text fontSize="md" fontWeight="semibold">{item.name}</Text>
                <Badge fontSize="0.7em" colorScheme="green">{item.quantity}</Badge>
              </HStack>
              <Text fontSize="xs" color="gray.300">
                {item.farm} – {item.location}
              </Text>
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
                px={2}
                textAlign="center"
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
