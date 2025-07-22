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
  Flex,
} from '@chakra-ui/react';

export default function MarketProduce({ items, onAddPrice }) {
  if (items.length === 0) return <Text color="gray.400">No products available.</Text>;

  const unitPrices = {
    'Fresh Lettuce': 'UGX 4,250/kg',
    'Organic Tomatoes': 'UGX 4,000/kg',
    'Carrots': 'UGX 4,000/kg',
  };

  const columnCount = useBreakpointValue({ base: 1, sm: 1, md: 2, lg: 3 });

  return (
    <Grid
      templateColumns={`repeat(${columnCount}, 1fr)`}
      gap={{ base: 2, md: 3 }}
      px={{ base: 0, md: 4 }}
      py={{ base: 3, md: 4 }}
    >
      {items.map((item) => {
        const blurred = item.isBlurred;

        return (
          <Box
            key={item.id}
            p={2}
            rounded="md"
            shadow="md"
            color="white"
            bg="gray.800"
            position="relative"
            filter={blurred ? 'blur(4px)' : 'none'}
            opacity={blurred ? 0.6 : 1}
            pointerEvents={blurred ? 'none' : 'auto'}
            _hover={{ bg: blurred ? 'gray.700' : 'gray.900' }}
            transition="0.3s ease"
          >
            <Flex
              direction={{ base: 'column', sm: 'row' }}
              align="center"
              gap={4}
            >
              <Image
                src={item.image}
                alt={item.name}
                borderRadius="md"
                boxSize={{ base: '100%', sm: '120px' }}
                objectFit="cover"
                flexShrink={0}
                
              />
              <VStack align="start" spacing={1} flex="1">
                <HStack justify="space-between" w="100%">
                  <Text fontSize="md" fontWeight="semibold">{item.name}</Text>
                  <Badge fontSize="0.7em" colorScheme="green">{item.quantity}</Badge>
                </HStack>
                <Text fontSize="xs" color="gray.300">
                  {item.farm} – {item.location}
                </Text>
                <Text fontSize="sm" color="#fada25" fontWeight="bold" mt={1}>
                  {unitPrices[item.name] || 'UGX --/kg'}
                </Text>
              </VStack>
            </Flex>

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
