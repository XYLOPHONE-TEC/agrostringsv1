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
          <Image
            src={item.image}
            alt={item.name}
            borderRadius="md"
            w="100%"
            h="120px"
            objectFit="cover"
            mb={2}
          />
          <VStack align="start" spacing={1}>
            <HStack justify="space-between" w="100%">
              <Text fontSize="md" fontWeight="semibold">
                {item.name}
              </Text>
              <Badge fontSize="0.7em" colorScheme="green">
                {item.quantity}
              </Badge>
            </HStack>
            <Text fontSize="xs" color="white">
              {unitPrices[item.name] || 'UGX --/kg'}
            </Text>
            <HStack spacing={2} pt={2}>
              {/* Edit label styled as button */}
              <Text
                as="label"
                display="inline-flex"
                alignItems="center"
                px={2}
                py={1}
                bg="yellow.600"
                rounded="md"
                fontSize="xs"
                fontWeight="medium"
                cursor="pointer"
                _hover={{ bg: 'yellow.500' }}
                onClick={() => onEdit(item)}
              >
                <FiEdit style={{ marginRight: '4px' }} />
                Edit
              </Text>

              {/* Delete label styled as button */}
              <Text
                as="label"
                display="inline-flex"
                alignItems="center"
                px={2}
                py={1}
                bg="red.600"
                rounded="md"
                fontSize="xs"
                fontWeight="medium"
                cursor="pointer"
                _hover={{ bg: 'red.500' }}
                onClick={() => onDelete(item)}
              >
                <FiTrash2 style={{ marginRight: '4px' }} />
                Delete
              </Text>
            </HStack>
          </VStack>
        </Box>
      ))}
    </Grid>
  );
}
