// products-component.jsx
import React from 'react';
import {
  Box,
  Grid,
  Image,
  Text,
  VStack,
  HStack,
  Badge,
  Flex,
  Button,
} from '@chakra-ui/react';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';

import product1 from '../assets/images/product.png';
import product2 from '../assets/images/tomatoes.png';
import product3 from '../assets/images/brocoli.png';

const produceItems = [
  { id: 1, name: 'Fresh Lettuce', farm: 'Alta Farm', location: 'Mubende', quantity: '12 crates', image: product1 },
  { id: 2, name: 'Organic Tomatoes', farm: 'Green Valley', location: 'Wakiso', quantity: '20 baskets', image: product2 },
  { id: 3, name: 'Carrots', farm: 'Hillside Farm', location: 'Kabale', quantity: '15 sacks', image: product3 },
   { id: 1, name: 'Fresh Lettuce', farm: 'Alta Farm', location: 'Mubende', quantity: '12 crates', image: product1 },
  { id: 2, name: 'Organic Tomatoes', farm: 'Green Valley', location: 'Wakiso', quantity: '20 baskets', image: product2 },
  { id: 3, name: 'Carrots', farm: 'Hillside Farm', location: 'Kabale', quantity: '15 sacks', image: product3 },
   { id: 1, name: 'Fresh Lettuce', farm: 'Alta Farm', location: 'Mubende', quantity: '12 crates', image: product1 },
  { id: 2, name: 'Organic Tomatoes', farm: 'Green Valley', location: 'Wakiso', quantity: '20 baskets', image: product2 },
  { id: 3, name: 'Carrots', farm: 'Hillside Farm', location: 'Kabale', quantity: '15 sacks', image: product3 },
];

const ProductDashboard = () => {
  return (
    <Box w="100%" h="100%">
      {/* Tabs + Add New button */}
      <Flex mb={4} align="center" justify="space-between" borderBottom="1px solid" borderColor="gray.600">
        <HStack spacing={6}>
          {['MarketPlace', 'My Produce', 'My Orders'].map((label, idx) => (
            <Text
              key={idx}
              pb={2}
              fontSize="sm"
              fontWeight="medium"
              color="white"
              cursor="pointer"
              borderBottom="2px solid"
              borderColor={idx === 0 ? 'yellow.400' : 'transparent'}
              _hover={{ borderColor: 'yellow.400' }}
            >
              {label}
            </Text>
          ))}
        </HStack>
        <Button leftIcon={<FiPlus />} colorScheme="yellow" size="sm">
          Add New Product
        </Button>
      </Flex>

      {/* Product cards */}
      <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={4}>
        {produceItems.map((item) => (
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
              <Text fontSize="xs" color="gray.300">{item.farm} – {item.location}</Text>
              <HStack spacing={4} pt={2}>
                <HStack
                  spacing={1}
                  color="yellow.300"
                  fontSize="xs"
                  fontWeight="medium"
                  cursor="pointer"
                  _hover={{ textDecoration: 'underline' }}
                >
                  <FiEdit />
                  <Text>Edit</Text>
                </HStack>
                <HStack
                  spacing={1}
                  color="red.300"
                  fontSize="xs"
                  fontWeight="medium"
                  cursor="pointer"
                  _hover={{ textDecoration: 'underline' }}
                >
                  <FiTrash2 />
                  <Text>Delete</Text>
                </HStack>
              </HStack>
            </VStack>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductDashboard;
