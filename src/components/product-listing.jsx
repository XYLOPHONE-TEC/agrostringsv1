import React from 'react';
import {
  Box,
  Grid,
  Image,
  Stack,
  Text,
  Button,
  VStack,
  HStack,
} from '@chakra-ui/react';

const scrollbarCss = {
  scrollbarWidth: 'thin',
  scrollbarColor: 'transparent transparent',
  '&::-webkit-scrollbar': { width: '4px' },
  '&::-webkit-scrollbar-track': { background: 'transparent' },
  '&::-webkit-scrollbar-thumb': {
    background: 'yellow',
    borderRadius: '2px',
  },
};

const ProductListing = ({ products, onBack, onCreateAccount }) => (
  <Box position="relative" w="full" h="full">
    {/* Scrollable main */}
    <VStack
      spacing={4}
      w="full"
      h="full"
      overflowY="auto"
      p={4}
      css={scrollbarCss}
    >
      {/* Back button */}
      <HStack w="full" justify="flex-start">
        <Button size="sm" onClick={onBack}>
          ← Back
        </Button>
      </HStack>

      {/* Products grid */}
      <Grid w="full" flex="1" templateColumns="repeat(5, 1fr)" gap={4} position="relative">
        {products.map((p, idx) => (
          <Box
            key={p.id}
            bg="gray.700"
            borderRadius="md"
            overflow="hidden"
            w="100%"
            // dim last row (last 4 items) by opacity
            opacity={ idx >= products.length - 4 ? 0.4 : 1 }
          >
            {/* Image wrapper with bottom gradient */}
            <Box position="relative" w="100%" h="120px" overflow="hidden">
              <Image
                src={p.img}
                alt={p.title}
                w="100%"
                h="120px"
                objectFit="cover"
              />
              <Box
                position="absolute"
                bottom="0"
                left="0"
                w="100%"
                h="40px"
                bgGradient="linear(to-t, #111, transparent)"
              />
            </Box>

            {/* Product info */}
            <Stack p={3} spacing={1}>
              <Text fontWeight="semibold">{p.title}</Text>
              <Text fontSize="sm" color="gray.300">
                {p.desc}
              </Text>
              <Text fontWeight="bold" color="green.300">
                {p.price}
              </Text>
            </Stack>
          </Box>
        ))}

        {/* Create Account CTA over the dimmed row */}
        <Box
          position="absolute"
          bottom={0}
          left="50%"
          transform="translateX(-50%)"
          w="100%"
          bg="rgba(0,0,0,0.6)"
          borderRadius="md"
          p={20}
          textAlign="center"
        >
          <Text mb={2} fontSize="lg" fontWeight="bold" color="white">
            Enjoy full access to all products!
          </Text>
          <Button colorScheme="yellow" bg='#fada25' color='black' onClick={onCreateAccount}>
            Create Account
          </Button>
        </Box>
      </Grid>
    </VStack>
  </Box>
);

export default ProductListing;
