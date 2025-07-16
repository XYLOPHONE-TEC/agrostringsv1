import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  Button,
  Spinner,
  Badge,
  VStack,
  HStack,
  AspectRatio,
} from "@chakra-ui/react";
import { FiArrowLeft, FiShare2, FiHeart } from "react-icons/fi";
import { MdCall, MdWhatsapp } from "react-icons/md";

const mockProduct = {
  id: 1,
  name: "Handmade Necklace",
  price: 25000,
  product_image_url:
    "https://images.unsplash.com/photo-1642496184924-84247ad8a10d?w=600&auto=format&fit=crop&q=60",
  size: "Medium",
  color: "Gold",
  country_of_origin: "Uganda",
  description: "A beautiful handmade necklace crafted with love and care.",
  seller: {
    name: "Hillside Farms",
    phone: "+256 774 123 456",
    location: "Mukono, Uganda",
  },
};

export default function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setProduct(mockProduct);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (successMsg) {
      const timer = setTimeout(() => setSuccessMsg(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [successMsg]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    setSuccessMsg(
      isFavorite
        ? `${product.name} removed from favorites`
        : `${product.name} added to favorites`
    );
  };

  if (loading) {
    return (
      <Flex h="full" align="center" justify="center" py={20}>
        <Spinner color="orange.400" size="xl" />
      </Flex>
    );
  }
  if (!product) {
    return (
      <Flex h="full" align="center" justify="center" py={20}>
        <Text>No product found</Text>
      </Flex>
    );
  }

  const videos = [
    { src: "https://www.youtube.com/embed/iFs1z-au6vc", title: "Banana fibre crafts" },
    { src: "https://www.youtube.com/embed/Cikd447mxxg", title: "Urban farm in Kampala" },
    { src: "https://www.youtube.com/embed/aQsiGmPBHzM", title: "Kampala farm tour" },
  ];

  return (
    <Box px={4} bg="gray.800" borderRadius="sm" color="white" w="full">
      {/* Header */}
      <Flex mb={4} align="center" justify="space-between">
        <Button aria-label="Go back" variant="link" color="white" onClick={() => window.history.back()}>
          <FiArrowLeft />
        </Button>
        
      </Flex>

      {/* Main Product Content */}
      <Flex direction={["column", "row"]} gap={6}>
        <Box flex="1">
          <Image
            src={product.product_image_url}
            alt={product.name}
            borderRadius="md"
            objectFit="cover"
            w="100%"
            maxH="250px"
          />
        </Box>

        <VStack flex="1" spacing={4} align="stretch">
          <HStack spacing={4}>
            <Badge>{`Size: ${product.size}`}</Badge>
            <Button
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              variant="link"
              color={isFavorite ? "red.500" : "gray.100"}
              ml="auto"
              onClick={toggleFavorite}
            >
              <FiHeart />
            </Button>
          </HStack>

          <Flex justify="space-between" align="center">
            <Heading size="sm">{product.name}</Heading>
            <Heading size="sm" color="yellow.500">
              UGX {product.price}
            </Heading>
          </Flex>

          <Text color="orange.400" fontSize="sm">
            {product.country_of_origin}
          </Text>

          <Text color="gray.300" fontSize="sm">
            {product.description}
          </Text>

          <Box bg="gray.700" p={3} borderRadius="md" color="gray.200" fontSize="sm" mb={2}>
            <Text fontWeight="bold" mb={1}>
              Seller Information
            </Text>
            <Text>Name: {product.seller.name}</Text>
            <Text>Phone: {product.seller.phone}</Text>
            <Text>Location: {product.seller.location}</Text>
          </Box>

          <HStack spacing={4}>
            <Button flex="1" variant="outline" leftIcon={<MdCall />} bg="yellow.400">
              Call
            </Button>
            <Button flex="1" variant="outline" leftIcon={<MdWhatsapp />} bg="green.400">
              Whatsapp
            </Button>
          </HStack>
        </VStack>
      </Flex>

      <Box my={6}>
        <Text fontWeight="700" fontSize="sm" mb={4}>
          More products from the Farmer
        </Text>
        <HStack spacing={4} overflowX="auto">
          {[1, 2, 3].map((id) => (
            <Box key={id} px={3} bg="gray.800" borderRadius="md" minW="250px" flexShrink={0} fontSize={'sm'}>
              <Image
                src={`https://images.unsplash.com/photo-1643905928687-e2b974e86083?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzJ8fGJhbmFuc3xlbnwwfHwwfHx8MA%3D%3D+${id}`}
                alt={`Related ${id}`}
                borderRadius="sm"
                w="100%"
                h="150px"
                objectFit="cover"
              />
              <Text fontWeight="600" mt={2}>
                Product {id}
              </Text>
              <Text color="gray.300" >UGX {id * 10000}</Text>
            </Box>
          ))}
        </HStack>
      </Box>

      {/* Farmer Videos — Now Horizontal */}
      <Box>
        <Text fontWeight="700" fontSize="sm" mb={4}>
          Farmer Videos
        </Text>
        <HStack
          gap={4}
          overflowX="auto"
          scrollSnapType="x mandatory"
          css={{
            '&::-webkit-scrollbar': { display: 'none' },
            '-msOverflowStyle': 'none',
            scrollbarWidth: 'none',
          }}
          pb={2}
        >
          {videos.map((v) => (
            <Box key={v.src} flexShrink={0} minW="250px" scrollSnapAlign="center">
              <AspectRatio ratio={16 / 9} w="100%">
                <iframe src={v.src} title={v.title} allowFullScreen />
              </AspectRatio>
              <Text mt={2} fontSize="sm" textAlign="center">
                {v.title}
              </Text>
            </Box>
          ))}
        </HStack>
      </Box>

      {/* Optional: Show success notification */}
      {successMsg && (
        <Box position="fixed" bottom="4" left="50%" transform="translateX(-50%)" bg="green.500" px={4} py={2} borderRadius="md">
          <Text>{successMsg}</Text>
        </Box>
      )}
    </Box>
  );
}
