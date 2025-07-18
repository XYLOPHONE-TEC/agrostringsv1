// MarketplaceProducts.jsx
"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Text,
  Spinner,
  Image,
  HStack,
  Heading,
  SimpleGrid,
  Container,
  Button,
} from "@chakra-ui/react";
import { FiPhone } from "react-icons/fi";
import { PiUserCircleLight } from 'react-icons/pi';

export default function MarketplaceProducts({ onSelect }) {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const mockProducts = [
    {
      id: 1,
      name: "Cabbages",
      quantity: '20 baskets',
      rate: 2800,
      unit: "kg",
      seller: {
        name: "George Anderson",
        location: "TMasindi",
      },
      image: "https://images.unsplash.com/photo-1642496184924-84247ad8a10d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGJhbmFuc3xlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 2,
      name: "Corn",
      quantity: 40,
      rate: 1200,
      unit: "kg",
      seller: {
        name: "Amenda Haydon",
        location: "Masaka,Kampala",
      },
      image: "https://images.unsplash.com/photo-1642496184924-84247ad8a10d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGJhbmFuc3xlbnwwfHwwfHx8MA%3D%3D",
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <Flex align="center" justify="center" h="150px">
        <Spinner color="#FADA25" />
      </Flex>
    );
  }

  return (
    <Container px={0}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
        {products.map((product) => (
          <Box
            key={product.id}
            bg="gray.800"
            p={2}
            color="gray.200"
            borderRadius="sm"
            overflow="hidden"
            _hover={{ boxShadow: "lg", transform: "translateY(-4px)", cursor: "pointer" }}
            transition="0.2s"
            onClick={() => onSelect(product.id)}
          >
            <Flex p={4} align="center" justify="space-between">
              <Box>
                <Heading size="sm">{product.name}</Heading>
                <Text fontSize="xs" color="gray.200">
                  Quantity: <b>{product.quantity}</b> {product.unit}
                </Text>
                <Text fontSize="xs" color="gray.200">
                  Rate: <b>${product.rate}</b> / {product.unit}
                </Text>
              </Box>
              <Image
                src={product.image}
                alt={product.name}
                boxSize="120px"
                objectFit="cover"
                borderRadius="md"
              />
            </Flex>

            <Flex
              align="center"
              justify="space-between"
              bg="gray.800"
              py={3}
              borderTop="1px solid #e2e8f0"
            >
              <HStack gap={3}>
                <PiUserCircleLight size={30} color="gray.200" />
                <Box>
                  <Text fontSize="xs" fontWeight="semibold">
                    {product.seller.name}
                  </Text>
                  <Text fontSize="xs" color="gray.200">
                    {product.seller.location}
                  </Text>
                </Box>
              </HStack>

              <Button
                size="xs"
                borderRadius="full"
                bg="#FADA25"
                color="black"
                leftIcon={<FiPhone />}
                onClick={(e) => {
                  e.stopPropagation();
                  alert(`Calling seller: ${product.seller.name}`);
                }}
                _hover={{ bg: "yellow.600" }}
                _active={{ bg: "yellow.700" }}
              >
                Call Farmer
              </Button>
            </Flex>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
}
