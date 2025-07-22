import React from 'react';
import '../index.css';
import { Box, Text, Button } from '@chakra-ui/react';
import MarketProduce from './market-produce-products';
import product1 from '../assets/images/product.png';
import product2 from '../assets/images/toma.jpeg';
import product3 from '../assets/images/cabb.jpeg';

// Create 12 items, blur from index 6 onward
const allProduceItems = Array.from({ length: 12 }, (_, idx) => {
  const base = idx % 4;
  const images = [product1, product2, product3, product3];
  const names = ['Fresh Lettuce', 'Organic Tomatoes', 'Carrots', 'Broccoli'];
  const farms = ['Alta Farm', 'Green Valley', 'Hillside Farm', 'Hillside Farm'];
  const locations = ['Mubende', 'Wakiso', 'Kabale', 'Kabale'];
  const quantities = ['12 crates', '20 baskets', '15 sacks', '10 crates'];

  return {
    id: idx + 1,
    name: names[base],
    farm: farms[base],
    location: locations[base],
    quantity: quantities[base],
    image: images[base],
    isBlurred: idx >= 6, // Blur last 6 items
  };
});

export default function ProductDashboard() {
  return (
    <Box
      w="100%"
      h="100vh"
      pos="relative"
    >
      <MarketProduce items={allProduceItems} />
      {/* Full-width bottom overlay */}
      <Box
        pos="absolute"
        bottom="-100"
        left="0"
        w="100%"
        py={20}
        bg="rgba(17, 17, 17, 0.96)"
        backdropFilter="auto"
        backdropBlur="20px"
        textAlign="center"
      >
        <Text fontSize="sm" color="gray.300" mb={2}>
          Enjoy full access to the products
        </Text>
        <Button
          size="sm"
          bg="#fada25"
          color="black"
          _hover={{ bg: '#fada25cc' }}
          onClick={() => alert('Create Account')}
        >
          Create Account
        </Button>
      </Box>
    </Box>
  );
}
