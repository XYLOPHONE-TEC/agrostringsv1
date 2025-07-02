import React, { useState } from 'react';
import { Box, Flex, HStack, Text, Button } from '@chakra-ui/react';
import { FiPlus } from 'react-icons/fi';

import MyProduce from './my-produce-products';
import MarketProduce from './market-produce-products';
import MyOrders from './my-orders-products';

import product1 from '../assets/images/product.png';
import product2 from '../assets/images/tomatoes.png';
import product3 from '../assets/images/brocoli.png';

const allProduceItems = [
  { id: 1, name: 'Fresh Lettuce', farm: 'Alta Farm', location: 'Mubende', quantity: '12 crates', image: product1, owner: 'me' },
  { id: 2, name: 'Organic Tomatoes', farm: 'Green Valley', location: 'Wakiso', quantity: '20 baskets', image: product2, owner: 'other' },
  { id: 3, name: 'Carrots', farm: 'Hillside Farm', location: 'Kabale', quantity: '15 sacks', image: product3, owner: 'me' },
  { id: 4, name: 'Broccoli', farm: 'Hillside Farm', location: 'Kabale', quantity: '10 crates', image: product3, owner: 'other' },
];

const sampleOrders = [
  {
    id: 1,
    name: 'Fresh Lettuce',
    image: product1,
    weight: '5 kg',
    farm: 'Alta Farm',
    location: 'Mubende',
    status: 'In Transit',
    eta: '2 days',
    price: 100000,
    ref: 'TRK78901',
  },
  {
    id: 2,
    name: 'Organic Cabbage',
    image: product2,
    weight: '3 kg',
    farm: 'Green Valley Farm',
    location: 'Wakiso',
    status: 'Delivered',
    eta: 'Delivered',
    price: 150000,
    ref: 'TRK78902',
  },
  {
    id: 3,
    name: 'Carrots',
    image: product3,
    weight: '4 kg',
    farm: 'Hillside Farm',
    location: 'Kabale',
    status: 'Processing',
    eta: '3 days',
    price: 75000,
    ref: 'TRK78903',
  },
];

export default function ProductDashboard() {
  const [activeTab, setActiveTab] = useState('Market');

  const myProduce = allProduceItems.filter(item => item.owner === 'me');
  const market = allProduceItems;

  const handleEdit = item => alert(`Edit ${item.name}`);
  const handleDelete = item => alert(`Delete ${item.name}`);
  const handleAddPrice = item => alert(`Add price for ${item.name}`);

  return (
    <Box w="100%" h="100%">
      {/* Tabs + Add Button */}
      <Flex mb={4} align="center" justify="space-between" borderBottom="1px solid" borderColor="gray.600">
        <HStack spacing={10}>
          {['Market', 'My Produce', 'My Orders'].map(label => (
            <Text
              key={label}
              pb={2}
              fontSize="sm"
              fontWeight="medium"
              color="white"
              cursor="pointer"
              borderBottom="2px solid"
              borderColor={activeTab === label ? 'yellow.400' : 'transparent'}
              _hover={{ borderColor: 'yellow.400' }}
              onClick={() => setActiveTab(label)}
            >
              {label}
            </Text>
          ))}
        </HStack>
        <Button leftIcon={<FiPlus />} colorScheme="yellow" size="sm" onClick={() => alert('Add')}>
          Add New Product
        </Button>
      </Flex>

      {/* Tab Panels */}
      {activeTab === 'Market' && (
        <MarketProduce items={market} onAddPrice={handleAddPrice} />
      )}

      {activeTab === 'My Produce' && (
        <MyProduce items={myProduce} onEdit={handleEdit} onDelete={handleDelete} />
      )}

      {activeTab === 'My Orders' && (
        <MyOrders orders={sampleOrders} />
      )}
    </Box>
  );
}
