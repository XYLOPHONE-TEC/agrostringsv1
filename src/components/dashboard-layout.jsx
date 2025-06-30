// DashboardLayout.jsx
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
import SignInModal from '../modals/sign-in';

const products = [
  { id: 1, img: Product, title: 'Product One', desc: 'Short lorem ipsum.', price: 'UGX 49,000' },
  { id: 2, img: Product, title: 'Product Two', desc: 'Another lorem ipsum.', price: 'UGX 7,900' },
  { id: 3, img: Product, title: 'Product Three', desc: 'More lorem ipsum.', price: 'UGX 12,500' },
   { id: 4, img: Product, title: 'Product One', desc: 'Short lorem ipsum.', price: 'UGX 49,000' },
  { id: 5, img: Product, title: 'Product Two', desc: 'Another lorem ipsum.', price: 'UGX 7,900' },
  { id: 6, img: Product, title: 'Product Three', desc: 'More lorem ipsum.', price: 'UGX 12,500' },
   { id: 7, img: Product, title: 'Product One', desc: 'Short lorem ipsum.', price: 'UGX 49,000' },
  { id: 8, img: Product, title: 'Product Two', desc: 'Another lorem ipsum.', price: 'UGX 7,900' },
  { id: 9, img: Product, title: 'Product Three', desc: 'More lorem ipsum.', price: 'UGX 12,500' },
   { id: 10, img: Product, title: 'Product One', desc: 'Short lorem ipsum.', price: 'UGX 49,000' },
  { id: 11, img: Product, title: 'Product Two', desc: 'Another lorem ipsum.', price: 'UGX 7,900' },
  { id: 12, img: Product, title: 'Product Three', desc: 'More lorem ipsum.', price: 'UGX 12,500' },
 
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
  const [isSignInOpen, setSignInOpen] = useState(false);

  const openSignIn = () => setSignInOpen(true);
  const handleSignIn = ({ phone, password }) => {
    console.log('Signing in:', phone, password);
    setSignInOpen(false);
  };

  return (
    <Flex h="100vh" bg="#111" color="white" fontSize="sm">
      {/* Sidebar */}
      <VStack w="180px" bg="#000" p={2} align="start" spacing={2} minH="0">
        <Image src={logo} alt="Logo" boxSize="32px" mb={1} />
        <Separator borderColor="gray.700" />
        {[...Array(7)].map((_, idx) => (
          <React.Fragment key={idx}>
            <HStack
              w="full"
              px={2}
              py={1}
              _hover={{ bg: 'gray.800', cursor: 'pointer' }}
              borderRadius="md"
            >
              <Home size={16} color="#fada25" />
              <Text fontSize="xs">Home {idx + 1}</Text>
            </HStack>
            {idx < 6 && <Separator borderColor="gray.700" />}
          </React.Fragment>
        ))}
      </VStack>

      {/* Main content */}
      <Flex flex="1" flexDir="column" p={4} minH="0">
        {/* Top Bar */}
        <Flex mb={4} align="center" justify="space-between" flexShrink={0}>
          <Box position="relative" w="45%" bg="gray.700" borderRadius="sm" overflow="hidden">
            <Icon
              as={Search}
              boxSize={4}
              color="gray.300"
              position="absolute"
              left="8px"
              top="50%"
              transform="translateY(-50%)"
            />
            <Input
              pl="32px"
              placeholder="Search…"
              bg="transparent"
              border="none"
              fontSize="xs"
              _placeholder={{ color: 'gray.400', fontSize: 'xs' }}
              _focus={{ boxShadow: 'none' }}
              py={1}
            />
          </Box>
          <HStack spacing={2} fontSize="xs">
            <Box
              border="2px dashed gray.500"
              borderRadius="sm"
              p={1}
              _hover={{ borderColor: 'gray.400', cursor: 'pointer' }}
            >
              <HStack spacing={1} p={1} _hover={{ bg: 'gray.800', cursor: 'pointer' }}>
                <PlusCircle size={18} color="white" />
                <Text>Video</Text>
              </HStack>
            </Box>
            <Button size="xs" bg="yellow.400" color="black" _hover={{ bg: 'yellow.300' }} onClick={openSignIn}>
              Sign In
            </Button>
            <Button size="xs" bg="gray.700" _hover={{ bg: 'gray.600' }}>EN</Button>
            <Button size="xs" bg="gray.700" _hover={{ bg: 'gray.600' }}>Mode</Button>
          </HStack>
        </Flex>

        {/* Content Area */}
        <Flex flex="1" bg="#222" p={3} borderRadius="sm" overflow="hidden">
          {showAll ? (
            <ProductListing products={products} onBack={() => setShowAll(false)} />
          ) : (
            <>
              <Box flex="1" mr={4} overflowY="auto" css={scrollbarCss}>
                <VideoBox compact /> {/* maybe accept a compact prop */}
              </Box>
              <Box w="260px" bg="#1a1a1a" p={2} borderRadius="sm" overflowY="auto" css={scrollbarCss}>
                <HStack justify="space-between">
                  <Text fontWeight="bold" fontSize="sm">Recently Added</Text>
                </HStack>
                <VStack spacing={3} mt={2}>
                  {products.slice(0, 5).map((p) => (
                    <Box key={p.id} bg="gray.700" borderRadius="sm" w="full" overflow="hidden">
                      <Image src={p.img} alt={p.title} w="100%" h="100px" objectFit="cover" />
                      <Stack p={2} spacing={1} fontSize="sm">
                        <Text fontWeight="semibold">{p.title}</Text>
                        <Text color="gray.300">{p.desc}</Text>
                        <Text fontWeight="bold" color="green.300">{p.price}</Text>
                      </Stack>
                    </Box>
                  ))}
                  <Button w="full" size="xs" bg="white" color="black" _hover={{ bg: 'gray.100' }} onClick={() => setShowAll(true)}>
                    View All
                  </Button>
                </VStack>
              </Box>
            </>
          )}
        </Flex>
      </Flex>

      <SignInModal open={isSignInOpen} onOpenChange={setSignInOpen} onSubmit={handleSignIn} />
    </Flex>
  );
};

export default DashboardLayout;