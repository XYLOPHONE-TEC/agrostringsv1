// src/components/MyProduce.jsx
import React from 'react';
import { Grid, Box, Image, VStack, HStack, Text, Badge } from '@chakra-ui/react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
// Example unit prices per kg in UGX
  const unitPrices = {
    'Fresh Lettuce': 'UGX 4,250/kg',
    'Organic Tomatoes': 'UGX 4,000/kg',
    'Carrots': 'UGX 4,000/kg',
  };


export default function MyProduce({ items, onEdit, onDelete }) {
  if (items.length === 0) {
    return <Text color="gray.400">You have no produce listed.</Text>;
  }

  return (
    <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={4}>
      {items.map(item => (
        <Box
          key={item.id}
          p={4}
          rounded="md"
          shadow="md"
         
          color="white"
          _hover={{ bg: 'gray.800' }}
        >
          <Image src={item.image} alt={item.name} borderRadius="md" w="100%" h="120px" objectFit="cover" mb={2} />
          <VStack align="start" spacing={0}>
            <HStack justify="space-between" w="100%">
              <Text fontSize="md" fontWeight="semibold">{item.name}</Text>
              <Badge fontSize="0.7em" colorScheme="green">{item.quantity}</Badge>
            </HStack>
            <Text fontSize="xs" color="white" mt={1}>
                         {unitPrices[item.name] || 'UGX --/kg'}
                       </Text>
            <HStack spacing={4} pt={2}>
              <HStack
                spacing={1}
                color="yellow.300"
                fontSize="xs"
                fontWeight="medium"
                cursor="pointer"
                _hover={{ textDecoration: 'underline' }}
                onClick={() => onEdit(item)}
              >
                <FiEdit /><Text>Edit</Text>
              </HStack>
              <HStack
                spacing={1}
                color="red.300"
                fontSize="xs"
                fontWeight="medium"
                cursor="pointer"
                _hover={{ textDecoration: 'underline' }}
                onClick={() => onDelete(item)}
              >
                <FiTrash2 /><Text>Delete</Text>
              </HStack>
            </HStack>
          </VStack>
        </Box>
      ))}
    </Grid>
  );
}
