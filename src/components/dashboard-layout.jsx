import React, { useState } from 'react';
import {
  Box,
  Flex,
  VStack,
  HStack,
  Input,
  Icon,
  Button,
  Text,
  Stack,
  Image,
  Separator,
} from '@chakra-ui/react';
import { Home, Search, PlusCircle } from 'lucide-react';
import logo from '../assets/images/logo.png';
import Product from '../assets/images/product1.jpeg';
import VideoBox from './videobox';
import ProductListing from './product-listing';

const products = [
  { id: 1, img: Product, title: 'Product One', desc: 'Short lorem ipsum.', price: 'UGX 49,000' },
  { id: 2, img: Product, title: 'Product Two', desc: 'Another lorem ipsum.', price: 'UGX 7,900' },
  { id: 3, img: Product, title: 'Product Three', desc: 'More lorem ipsum.', price: 'UGX 12,500' },
  { id: 4, img: Product, title: 'Product Four', desc: 'Even more lorem ipsum.', price: 'UGX 22,000' },
  { id: 5, img: Product, title: 'Product Five', desc: 'Yet more lorem ipsum.', price: 'UGX 18,300' },
  { id: 6, img: Product, title: 'Product Four', desc: 'Even more lorem ipsum.', price: 'UGX 22,000' },
  { id: 7, img: Product, title: 'Product Five', desc: 'Yet more lorem ipsum.', price: 'UGX 18,300' },
  { id: 8, img: Product, title: 'Product Four', desc: 'Even more lorem ipsum.', price: 'UGX 22,000' },
  { id: 9, img: Product, title: 'Product Five', desc: 'Yet more lorem ipsum.', price: 'UGX 18,300' },
  { id: 10, img: Product, title: 'Product Four', desc: 'Even more lorem ipsum.', price: 'UGX 22,000' },
  { id: 11, img: Product, title: 'Product Five', desc: 'Yet more lorem ipsum.', price: 'UGX 18,300' },
    { id: 12, img: Product, title: 'Product Five', desc: 'Yet more lorem ipsum.', price: 'UGX 18,300' },
  // …more products
];

const scrollbarCss = {
  scrollbarWidth: 'thin',
  scrollbarColor: 'transparent transparent',
  '&::-webkit-scrollbar': { width: '4px' },
  '&::-webkit-scrollbar-track': { background: 'transparent' },
  '&::-webkit-scrollbar-thumb': {
    background: 'transparent',
    borderRadius: '2px',
    transition: 'background-color 0.2s',
  },
  '&:hover::-webkit-scrollbar-thumb, &::-webkit-scrollbar-thumb:window-inactive': {
    background: 'yellow',
  },
};

const DashboardLayout = () => {
  const [showAll, setShowAll] = useState(false);

  return (
    <Flex h="100vh" bg="#111" color="white">
      {/* Sidebar */}
      <VStack w="200px" bg="#000" p={4} align="start" spacing={4} minH="0">
        <Image src={logo} alt="Logo" boxSize="40px" objectFit="contain" mb={2} />
        <Separator borderColor="gray.700" />
        {[...Array(7)].map((_, idx) => (
          <React.Fragment key={idx}>
            <HStack
              w="full"
              spacing={2}
              px={2}
              py={2}
              _hover={{ bg: 'gray.800', cursor: 'pointer' }}
              borderRadius="md"
            >
              <Home size={18} color="#fada25" />
              <Text fontSize="sm">Menu Item {idx + 1}</Text>
            </HStack>
            {idx < 6 && <Separator borderColor="gray.700" />}
          </React.Fragment>
        ))}
      </VStack>

      {/* Main Content */}
      <Flex flex="1" flexDir="column" p={6} minH="0">
        {/* Top Bar */}
        <Flex mb={6} align="center" justify="space-between" flexShrink={0}>
          {/* custom search box with overlaid icon */}
          <Box
            position="relative"
            w="50%"
            bg="gray.700"
            borderRadius="md"
            overflow="hidden"
          >
            <Icon
              as={Search}
              boxSize={5}
              color="gray.300"
              position="absolute"
              left="12px"
              top="50%"
              transform="translateY(-50%)"
            />
            <Input
              pl="38px"                // space for the icon
              placeholder="Search..."
              bg="transparent"
              border="none"
              _placeholder={{ color: 'gray.400' }}
              _focus={{ boxShadow: 'none' }}
            />
          </Box>

          <HStack spacing={4}>
            <Box
              as="div"
              border="2px dashed gray.500"
              borderRadius="md"
              p={2}
              _hover={{ borderColor: 'gray.400', cursor: 'pointer' }}
            >
             
<HStack
  as={Box}
  spacing={2}
  p={2}
  borderRadius="md"
  _hover={{ bg: 'gray.800', cursor: 'pointer' }}
>
  <PlusCircle size={20} color="white" />
  <Text fontSize="sm">Video</Text>
</HStack>
            </Box>
            <Button size="sm" bg="yellow.400" color="black" _hover={{ bg: 'yellow.300' }}>
              Sign In
            </Button>
            <Button size="sm" bg="gray.700" _hover={{ bg: 'gray.600' }}>
              EN
            </Button>
            <Button size="sm" bg="gray.700" _hover={{ bg: 'gray.600' }}>
              Mode
            </Button>
          </HStack>
        </Flex>

        {/* Conditional Content Area */}
        <Flex flex="1" bg="#222" p={4} borderRadius="md" overflow="hidden">
          {showAll ? (
            <ProductListing products={products} onBack={() => setShowAll(false)} />
          ) : (
            <>
              {/* Video Section */}
              <Box flex="1" mr={6} overflowY="auto" css={scrollbarCss}>
                <VideoBox />
              </Box>

              {/* Recently Added Products */}
              <Box
                w="300px"
                bg="#1a1a1a"
                p={4}
                borderRadius="md"
                overflowY="auto"
                css={scrollbarCss}
              >
                <HStack justify="space-between">
                  <Text fontWeight="bold">Recently Added</Text>
                </HStack>
                <VStack spacing={4} mt={3}>
                  {products.slice(0, 5).map((p) => (
                    <Box
                      key={p.id}
                      bg="gray.700"
                      borderRadius="md"
                      w="full"
                      overflow="hidden"
                    >
                      <Image
                        src={p.img}
                        alt={p.title}
                        w="100%"
                        h="120px"
                        objectFit="cover"
                      />
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
                  <Button
                    w="full"
                    bg="white"
                    color="black"
                    _hover={{ bg: 'gray.100' }}
                    onClick={() => setShowAll(true)}
                  >
                    View All
                  </Button>
                </VStack>
              </Box>
            </>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DashboardLayout;
