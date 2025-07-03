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
  Drawer,
} from '@chakra-ui/react';
import { Home, Search, PlusCircle, Menu } from 'lucide-react';
import logo from '../assets/images/logo.png';
import Product from '../assets/images/product1.jpeg';
import VideoBox from './videobox';
import ProductListing from './product-listing';
import SignInModal from '../modals/sign-in';

const products = [
  { id: 1, img: Product, title: 'Product One', desc: 'Short lorem ipsum.', price: 'UGX 49,000' },
  { id: 2, img: Product, title: 'Product Two', desc: 'Another lorem ipsum.', price: 'UGX 7,900' },
  { id: 3, img: Product, title: 'Product Three', desc: 'More lorem ipsum.', price: 'UGX 12,500' },
  { id: 4, img: Product, title: 'Product Four', desc: 'Short lorem ipsum.', price: 'UGX 30,000' },
  { id: 5, img: Product, title: 'Product Five', desc: 'Another lorem ipsum.', price: 'UGX 15,200' },
];

const videos = [
  { id: 1, title: 'Video One' },
  { id: 2, title: 'Video Two' },
  { id: 3, title: 'Video Three' },
  { id: 4, title: 'Video Four' },
  { id: 5, title: 'Video Five' },
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
  const [isSignInOpen, setSignInOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0); // 0: Videos, 1: Products

  const openSignIn = () => setSignInOpen(true);
  const handleSignIn = ({ phone, password }) => {
    console.log('Signing in:', phone, password);
    setSignInOpen(false);
  };

  const SidebarContent = () => (
    <VStack w="180px" bg="#000" p={2} align="start" spacing={2} minH="0">
      <Image src={logo} alt="Logo" boxSize="32px" mb={1} />
      <Separator borderColor="gray.700" />
      {['Videos', 'Products', 'Home 3', 'Home 4', 'Home 5', 'Home 6', 'Home 7'].map((label, idx) => (
        <React.Fragment key={idx}>
          <HStack
            w="full"
            px={2}
            py={1}
            bg={idx === activeIndex ? 'gray.800' : 'transparent'}
            _hover={{ bg: 'gray.800', cursor: 'pointer' }}
            borderRadius="md"
            onClick={() => setActiveIndex(idx)}
          >
            <Home size={16} color={idx === activeIndex ? '#fada25' : '#888'} />
            <Text fontSize="xs" color={idx === activeIndex ? 'white' : 'gray.400'}>
              {label}
            </Text>
          </HStack>
          {idx < 6 && <Separator borderColor="gray.700" />}
        </React.Fragment>
      ))}
    </VStack>
  );

  return (
    <Flex h="100vh" bg="#111" color="white" fontSize="sm" overflow="hidden">
      {/* Mobile Sidebar */}
      <Drawer.Root>
        <Drawer.Trigger as={Box} display={{ base: 'block', md: 'none' }} p={2}>
          <Icon as={Menu} boxSize={6} cursor="pointer" />
        </Drawer.Trigger>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content bg="#000" w="180px">
            <Drawer.CloseTrigger>
              <Icon as={Menu} boxSize={6} m={2} cursor="pointer" />
            </Drawer.CloseTrigger>
            <Drawer.Header>
              <Text ml={2} fontWeight="bold">Menu</Text>
            </Drawer.Header>
            <Drawer.Body p={0}>
              <SidebarContent />
            </Drawer.Body>
            <Drawer.Footer>
              <Button w="full" size="sm" bg="gray.700" onClick={() => Drawer.CloseTrigger()}>
                Close
              </Button>
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Root>

      {/* Desktop Sidebar */}
      <Box display={{ base: 'none', md: 'block' }}>
        <SidebarContent />
      </Box>

      {/* Main Content */}
      <Flex flex="1" flexDir="column" p={4} minH="0">
        {/* Top Bar */}
        <Flex mb={4} align="center" justify="space-between" flexShrink={0}>
          <Box position="relative" w={{ base: '60%', md: '45%' }} bg="gray.700" borderRadius="sm" overflow="hidden">
            <Icon as={Search} boxSize={4} color="gray.300" position="absolute" left="8px" top="50%" transform="translateY(-50%)" />
            <Input pl="32px" placeholder="Search…" bg="transparent" border="none" fontSize="xs" _placeholder={{ color: 'gray.400', fontSize: 'xs' }} _focus={{ boxShadow: 'none' }} py={1} />
          </Box>
          <HStack spacing={2} fontSize="xs">
            <Box border="2px dashed gray.500" borderRadius="sm" p={1} _hover={{ borderColor: 'gray.400', cursor: 'pointer' }}>
              <HStack spacing={1} p={1} _hover={{ bg: 'gray.800', cursor: 'pointer' }}>
                <PlusCircle size={18} color="white" />
                <Text>Video</Text>
              </HStack>
            </Box>
            <Button size="xs" bg="yellow.400" color="black" _hover={{ bg: 'yellow.300' }} onClick={openSignIn}>Sign In</Button>
            <Button size="xs" bg="gray.700" _hover={{ bg: 'gray.600' }}>EN</Button>
            <Button size="xs" bg="gray.700" _hover={{ bg: 'gray.600' }}>Mode</Button>
          </HStack>
        </Flex>

        {/* Content Area */}
        <Flex flex="1" bg="#222" p={3} borderRadius="sm" overflow="hidden" flexDir={{ base: 'column', md: 'row' }}>
          {activeIndex === 1 ? (
            // Products view
            <>
              <Box flex="1" overflowY="auto" css={scrollbarCss}>
                <ProductListing products={products} />
              </Box>
              <Box w={{ base: '100%', md: '260px' }} bg="#1a1a1a" p={2} borderRadius="sm" overflowY="auto" css={scrollbarCss}>
                <Text fontWeight="bold" fontSize="sm">Recently Added</Text>
                <VStack spacing={3} mt={2}>
                  {products.map((p) => (
                    <Box key={p.id} bg="gray.700" borderRadius="sm" w="full" overflow="hidden">
                      <Image src={p.img} alt={p.title} w="100%" h="100px" objectFit="cover" />
                      <Stack p={2} spacing={1} fontSize="sm">
                        <Text fontWeight="semibold">{p.title}</Text>
                        <Text color="gray.300">{p.desc}</Text>
                        <Text fontWeight="bold" color="green.300">{p.price}</Text>
                      </Stack>
                    </Box>
                  ))}
                </VStack>
              </Box>
            </>
          ) : (
            // Videos view
            <>
              <Box flex="1" overflowY="auto" css={scrollbarCss}>
                {/* Main video display */}
                <VideoBox compact={false} />
              </Box>
              <Box w={{ base: '100%', md: '260px' }} bg="#1a1a1a" p={2} borderRadius="sm" overflowY="auto" css={scrollbarCss}>
                <Text fontWeight="bold" fontSize="sm">Videos</Text>
                <VStack spacing={3} mt={2}>
                  {videos.map((v) => (
                    <VideoBox key={v.id} title={v.title} compact />
                  ))}
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
