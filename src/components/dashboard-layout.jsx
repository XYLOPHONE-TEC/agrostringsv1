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
  Circle,
} from '@chakra-ui/react';
import { Home, Search, CirclePlus, Menu, Settings } from 'lucide-react';
import logo from '../assets/images/logo.png';
import VideoBox from './videobox';
import ProductListing from './product-listing';
import SignInModal from '../modals/sign-in';

const products = [
  { id: 1, img: '', title: 'Product One', desc: 'Short lorem ipsum.', price: 'UGX 49,000' },
  { id: 2, img: '', title: 'Product Two', desc: 'Another lorem ipsum.', price: 'UGX 7,900' },
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
  const [activeIndex, setActiveIndex] = useState(0);

  const openSignIn = () => setSignInOpen(true);
  const handleSignIn = ({ phone, password }) => {
    console.log('Signing in:', phone, password);
    setSignInOpen(false);
  };

  const SidebarContent = () => (
    <VStack w="180px" bg="#000" p={2} align="start" spacing={2} minH="0">
      <Image src={logo} alt="Logo" boxSize="32px" mb={1} />
      <Separator borderColor="gray.700" />
      {[
        { icon: Home, label: 'Home' },
        { icon: Search, label: 'Products' },
        { icon: Settings, label: 'Settings' },
      ].map((item, idx) => (
        <HStack
          key={item.label}
          w="full"
          px={2}
          py={1}
          bg={idx === activeIndex ? 'gray.800' : 'transparent'}
          _hover={{ bg: 'gray.800', cursor: 'pointer' }}
          borderRadius="md"
          onClick={() => setActiveIndex(idx)}
        >
          <item.icon size={16} color={idx === activeIndex ? '#fada25' : '#888'} />
          <Text fontSize="xs" color={idx === activeIndex ? 'white' : 'gray.400'}>
            {item.label}
          </Text>
        </HStack>
      ))}
      <Separator borderColor="gray.700" />
      <Button
        size="xs"
        w="full"
        bg="yellow.400"
        color="black"
        _hover={{ bg: 'yellow.300' }}
        onClick={openSignIn}
      >
        Login
      </Button>
    </VStack>
  );

  return (
    <Flex h="100vh" bg="#111" color="white" fontSize="sm" overflow="hidden" position="relative">
      <Box display={{ base: 'none', md: 'block' }}>
        <SidebarContent />
      </Box>

      <Flex flex="1" flexDir="column" p={4} minH="0">
        <Flex mb={4} align="center" justify="space-between" flexShrink={0}>
          <Box position="relative" w={{ base: '60%', md: '45%' }} bg="gray.700" borderRadius="sm">
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
              _placeholder={{ color: 'gray.400' }}
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
              <HStack p={1} _hover={{ bg: 'gray.800', cursor: 'pointer' }}>
                <CirclePlus size={18} color="white" />
                <Text>Video</Text>
              </HStack>
            </Box>
            <Button size="xs" bg="yellow.400" color="black" _hover={{ bg: 'yellow.300' }} onClick={openSignIn}>
              Sign In
            </Button>
            <Button size="xs" bg="gray.700" _hover={{ bg: 'gray.600' }}>
              EN
            </Button>
            <Button size="xs" bg="gray.700" _hover={{ bg: 'gray.600' }}>
              Mode
            </Button>
          </HStack>
        </Flex>

        <Flex flex="1" bg="#222" p={3} borderRadius="sm" overflow="hidden" flexDir="column">
          {showAll ? (
            <ProductListing products={products} onBack={() => setShowAll(false)} />
          ) : (
            <Box flex="1" overflowY="auto" css={scrollbarCss}>
              <VideoBox compact />
            </Box>
          )}
        </Flex>
      </Flex>

      <SignInModal open={isSignInOpen} onOpenChange={setSignInOpen} onSubmit={handleSignIn} />

      <Box
        display={{ base: 'block', md: 'none' }}
        pos="fixed"
        bottom="0"
        left="0"
        right="0"
        h="70px"
        bg="#000"
        borderTop="1px solid #333"
        zIndex="99"
      >
        <Box pos="relative" h="100%">
          <Flex h="100%" align="center">
            <Flex flex="1" direction="column" align="center" justify="center" pt={1}>
              <Icon as={Home} boxSize={6} color="white" />
              <Text fontSize="xs" mt={1} color="white">Home</Text>
            </Flex>
            <Flex flex="1" direction="column" align="center" justify="center" pt={1}>
              <Icon as={Search} boxSize={6} color="white" />
              <Text fontSize="xs" mt={1} color="white">Products</Text>
            </Flex>
            <Flex flex="1" />
            <Flex flex="1" direction="column" align="center" justify="center" pt={1}>
              <Icon as={Menu} boxSize={6} color="white" />
              <Text fontSize="xs" mt={1} color="white">Farmer</Text>
            </Flex>
            <Flex flex="1" direction="column" align="center" justify="center" pt={1}>
              <Icon as={Menu} boxSize={6} color="white" />
              <Text fontSize="xs" mt={1} color="white">My Profile</Text>
            </Flex>
          </Flex>

          <Box pos="absolute" left="50%" top="8" transform="translate(-50%, -50%)" zIndex="100">
            <Circle
              size="64px"
              bg="#fada25"
              border="4px solid #000"
              shadow="lg"
              cursor="pointer"
              onClick={() => console.log('CirclePlus clicked')}
            >
              <Icon as={CirclePlus} boxSize={6} color="black" />
            </Circle>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default DashboardLayout;
