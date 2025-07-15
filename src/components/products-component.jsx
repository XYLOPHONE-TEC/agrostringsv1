import React, { useState } from 'react';
import { Box, Flex, HStack, Text, Button } from '@chakra-ui/react';
import { FiPlus } from 'react-icons/fi';

import MyProduce from './my-produce-products';
import MarketProduce from './market-produce-products';
import MyOrders from './my-orders-products';
import AddNewProduct from './add-new-product';

import product1 from '../assets/images/product.png';
import product2 from '../assets/images/tomatoes.png';
import product3 from '../assets/images/brocoli.png';

export default function ProductDashboard() {
  const [activeTab, setActiveTab] = useState('Market');
  const [isAdding, setIsAdding] = useState(false);
  const [items, setItems] = useState([
    { id: 1, name: 'Fresh Lettuce', farm: 'Alta Farm', location: 'Mubende', quantity: '12 crates', image: product1, owner: 'me' },
    { id: 2, name: 'Organic Tomatoes', farm: 'Green Valley', location: 'Wakiso', quantity: '20 baskets', image: product2, owner: 'other' },
    { id: 3, name: 'Carrots', farm: 'Hillside Farm', location: 'Kabale', quantity: '15 sacks', image: product3, owner: 'me' },
    { id: 4, name: 'Broccoli', farm: 'Hillside Farm', location: 'Kabale', quantity: '10 crates', image: product3, owner: 'other' },
  ]);
  const [sampleOrders] = useState([
    { id: 1, name: 'Fresh Lettuce', image: product1, weight: '5 kg', farm: 'Alta Farm', location: 'Mubende', status: 'In Transit', eta: '2 days', price: 100000, ref: 'TRK78901' },
    { id: 2, name: 'Organic Cabbage', image: product2, weight: '3 kg', farm: 'Green Valley Farm', location: 'Wakiso', status: 'Delivered', eta: 'Delivered', price: 150000, ref: 'TRK78902' },
    { id: 3, name: 'Carrots', image: product3, weight: '4 kg', farm: 'Hillside Farm', location: 'Kabale', status: 'Processing', eta: '3 days', price: 75000, ref: 'TRK78903' },
  ]);

  const myProduce = items.filter(i => i.owner === 'me');

  const handleSaveNew = newItem => {
    setItems(prev => [
      ...prev,
      {
        id: prev.length + 1,
        image: product1,
        owner: 'me',
        ...newItem
      }
    ]);
    setIsAdding(false);
  };

  return (
    <Box w="100%" h="100%" position="relative">
      <Flex mb={4} align="center" justify="space-between" borderBottom="1px solid" borderColor="gray.600" display={{ base: 'none', md: 'flex' }}>
        <HStack gap={10}>
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
        <Button leftIcon={<FiPlus />} colorScheme="yellow" size="sm" onClick={() => setIsAdding(true)}>
          Add New Product
        </Button>
      </Flex>

      <HStack display={{ base: 'flex', md: 'none' }} gap={10} justify="center" align="center" py={3} borderBottom="1px solid" borderColor="gray.600">
        {['Market', 'My Produce', 'My Orders'].map(label => (
          <Text
            key={label}
            pb={1}
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

      <Button
        display={{ base: 'flex', md: 'none' }}
        position="fixed"
        bottom="4"
        right="4"
        w="40px"
        bg="#fff"
        color="black"
        borderRadius="full"
        boxShadow="lg"
        size="lg"
        onClick={() => setIsAdding(true)}
        zIndex={10}
      >
        <FiPlus />
      </Button>

      {activeTab === 'Market' && <MarketProduce items={items} />}
      {activeTab === 'My Produce' && <MyProduce items={myProduce} />}
      {activeTab === 'My Orders' && <MyOrders orders={sampleOrders} />}

      <AddNewProduct
        isOpen={isAdding}
        onClose={() => setIsAdding(false)}
        onSave={handleSaveNew}
      />
    </Box>
  );
}
