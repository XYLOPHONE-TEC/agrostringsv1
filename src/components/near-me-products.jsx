// PersonalisedArt.jsx

import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Image,
  Button,
  Spinner,
  Flex,
  SimpleGrid,
} from "@chakra-ui/react";

const mockProducts = [
  {
    id: 1,
    name: "Custom Portrait",
    price: 80000,
    product_image_url:
      "https://images.unsplash.com/photo-1642496184924-84247ad8a10d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGJhbmFuc3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 2,
    name: "Name Calligraphy",
    price: 35000,
    product_image_url:
      "https://images.unsplash.com/photo-1642496184924-84247ad8a10d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGJhbmFuc3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 3,
    name: "Pet Illustration",
    price: 50000,
    product_image_url:
      "https://images.unsplash.com/photo-1642496184924-84247ad8a10d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGJhbmFuc3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 4,
    name: "Family Caricature",
    price: 120000,
    product_image_url:
      "https://images.unsplash.com/photo-1642496184924-84247ad8a10d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGJhbmFuc3xlbnwwfHwwfHx8MA%3D%3D",
  },
];

export default function PersonalisedArt({ onAddToCart }) {
  const [loading, setLoading] = useState(true);
  const [error] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <Flex h="150px" align="center" justify="center">
        <Spinner color="orange.400" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex h="150px" align="center" justify="center">
        <Text color="red.500">Couldn’t load personalized art. {error}</Text>
      </Flex>
    );
  }

  if (!products.length) {
    return (
      <Flex h="150px" align="center" justify="center">
        <Text color="gray.500">No personalized art at the moment.</Text>
      </Flex>
    );
  }

  return (
    <Box bg="gray.800" borderRadius="md" my={6}>
      {/* Header */}
      <Flex
        align="center"
        justify="space-between"
        bg="#fada25"
        px={3}
       
        borderRadius="xs"
        mb={3}
      >
        <Heading as="h3" size="sm" color="gray.900">
          Nearby Me
        </Heading>
        <Button variant="link" color="gray.900" size="sm">
          View All
        </Button>
      </Flex>

      {/* Product Grid with reduced spacing */}
      <SimpleGrid columns={{ base: 2, sm: 3, md: 6 }} gap={5} px={2}>
        {products.map((item) => (
          <Box
            key={item.id}
            p={2}
           
            borderRadius="md"
            shadow="md"
            _hover={{ bg: "gray.600" }}
          >
            <Image
              src={item.product_image_url}
              alt={item.name}
              boxSize="150px"
              objectFit="cover"
              borderRadius="md"
              mx="auto"
            />
            <Box mt={2} textAlign="center">
              <Text fontWeight="bold" fontSize="sm" color="gray.100" noOfLines={1}>
                {item.name}
              </Text>
              <Text fontSize="xs" color="gray.100">
                UGX {item.price}
              </Text>
            </Box>
          </Box>
        ))}
      </SimpleGrid>

      {/* Bottom Separator */}
      <Box h="6px" bg="yellow.500" mt={5} borderRadius="sm" />
    </Box>
  );
}
