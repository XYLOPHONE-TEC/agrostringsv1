import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Spinner,
  Text,
  Heading,
  Button,
  Image,
  Badge,
} from "@chakra-ui/react";

const mockNewArrivals = [
  { id: 1, name: "Handmade Necklace", price: 25000, product_image_url: "https://images.unsplash.com/photo-1629358821360-500f89a5a907?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWFuZ29lc3xlbnwwfHwwfHx8MA%3D%3D" },
  { id: 2, name: "Artisan Bag", price: 40000, product_image_url: "https://images.unsplash.com/photo-1629358821360-500f89a5a907?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWFuZ29lc3xlbnwwfHwwfHx8MA%3D%3D" },
  { id: 3, name: "Wooden Sculpture", price: 60000, product_image_url: "https://images.unsplash.com/photo-1629358821360-500f89a5a907?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWFuZ29lc3xlbnwwfHwwfHx8MA%3D%3D" },
  { id: 4, name: "Painted Mug", price: 15000, product_image_url: "https://images.unsplash.com/photo-1629358821360-500f89a5a907?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWFuZ29lc3xlbnwwfHwwfHx8MA%3D%3D" },
];

export default function NewArrivals({ onAddToCart }) {
  const [loading, setLoading] = useState(true);
  const [error] = useState("");
  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setNewArrivals(mockNewArrivals);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <Flex align="center" justify="center" h="150px">
        <Spinner color="#F9622c" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex align="center" justify="center" h="150px">
        <Text color="red.500">Couldn’t load new arrivals. {error}</Text>
      </Flex>
    );
  }

  if (!newArrivals.length) {
    return (
      <Flex align="center" justify="center" h="150px">
        <Text color="gray.500">No new arrivals at the moment.</Text>
      </Flex>
    );
  }

  return (
    <Box bg="white" p={4} borderRadius="md" mt={5}>
      <Flex align="center" justify="space-between" bg="#F9622C" color="white" p={3} borderRadius="md" mb={4}>
        <Heading as="h3" size="sm">New Arrivals</Heading>
        <Button variant="link" color="white" fontSize="sm">
          View All
        </Button>
      </Flex>

      <Flex overflowX="auto" pb={4}>
        {newArrivals.map((item) => (
          <Box key={item.id} flex="0 0 150px" mr={3} bg="white" borderRadius="md" boxShadow="sm" p={3} textAlign="center">
            <Box position="relative">
              <Image src={item.product_image_url} alt={item.name} boxSize="130px" objectFit="cover" borderRadius="md" />
              <Badge position="absolute" top="2" left="2" bg="orange.400" color="white" fontSize="xs">
                New
              </Badge>
            </Box>
            <Text mt={2} fontWeight="bold" fontSize="sm" isTruncated>
              {item.name}
            </Text>
            <Text fontSize="xs" color="gray.600">
              UGX {item.price}
            </Text>
            <Button
              size="sm"
              colorScheme="gray"
              mt={2}
              width="full"
              leftIcon={<span>🛒</span>}
              onClick={() =>
                onAddToCart
                  ? onAddToCart(item)
                  : alert(`Add to cart: ${item.name}`)
              }
            >
              Add to Cart
            </Button>
          </Box>
        ))}
      </Flex>

      <Box height="7px" bg="#B14228" borderRadius="md" mx={-4} />
    </Box>
  );
}
