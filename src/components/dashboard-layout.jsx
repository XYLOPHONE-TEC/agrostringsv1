// src/components/DashboardLayout.jsx
// Install dependencies:
// npm install react-swipeable react-icons @chakra-ui/react lucide-react

import React, { useState, useRef, useEffect } from 'react';
import {
  Box, Flex, VStack, HStack, Input,
  Icon, Button, Image, Circle, Text, Spacer, Link
} from '@chakra-ui/react';
import {
  Home, Video, Upload, Settings, TvIcon,
  Search, ShoppingCart, CirclePlus, Sun, Moon
} from 'lucide-react';
import { useSwipeable } from 'react-swipeable';
import { TbMenu4 } from 'react-icons/tb';
import SignInModal from '../modals/sign-in';
import VideoGallery from './videogallery';
import VideoBox from './videobox';
import ProductListing from './product-listing';
import FarmerChannel from './farmer-channel';
import Live from './live';

import logo from '../assets/images/logo2.png';
import demoVideo1 from '../assets/videos/demo4.mp4';
import demoVideo2 from '../assets/videos/demo2.mp4';

const videos = [
  { src: demoVideo1, title: 'Lorem ipsum dolor', subtitle: 'Consectetur adipiscing elit' },
  { src: demoVideo2, title: 'Sed do eiusmod', subtitle: 'Incididunt ut labore' }
];

// Theme helper
const getInitialTheme = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const stored = window.localStorage.getItem('theme');
    if (stored) return stored;
    const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefers ? 'dark' : 'light';
  }
  return 'light';
};

export default function DashboardLayout() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [isSignInOpen, setSignInOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const galleryRef = useRef();

  // Apply theme to <html>
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const sidebarItems = [
    { label: 'Home', icon: Home },
    { label: 'Live (0)', icon: TvIcon },
    { label: 'Farm Channel Videos', icon: Video },
    { label: 'Upload Video', icon: Upload },
    { label: 'Products', icon: Settings },
    { label: 'Settings', icon: Settings }
  ];

  const mobileTabs = [
    { label: 'Home', icon: Home, index: 0 },
    { label: 'Products', icon: ShoppingCart, index: 4 },
    { label: 'Upload', icon: Upload, index: 3 },
    { label: 'Videos', icon: Video, index: 2 },
    { label: 'Settings', icon: Settings, index: 5 }
  ];

  const handlers = useSwipeable({
    onSwipedLeft: () => setActiveIndex(i => Math.min(i + 1, sidebarItems.length - 1)),
    onSwipedRight: () => setActiveIndex(i => Math.max(i - 1, 0)),
    trackMouse: true,
    preventScrollOnSwipe: true
  });

  const openSignIn = () => setSignInOpen(true);
  const handleSignIn = data => setSignInOpen(false);

  useEffect(() => {
    const node = galleryRef.current?.children[currentIndex];
    node?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [currentIndex]);

  return (
    <Flex h="100vh" bg={theme === 'light' ? '#f9f9f9' : '#111'} color={theme === 'light' ? 'black' : 'white'} fontSize="sm" overflow="hidden">
      {/* Desktop Sidebar */}
      <Box display={{ base: 'none', md: 'block' }}>
        <VStack w="220px" bg={theme === 'light' ? '#fff' : '#000'} p={2} spacing={2} minH="100vh">
          <Image src={logo} alt="Logo" boxSize="32px" mb={2} />
          {sidebarItems.map(({ label, icon }, i) => (
            <HStack
              key={i}
              w="full"
              px={3}
              py={2}
              onClick={() => setActiveIndex(i)}
              bg={activeIndex === i ? 'gray.700' : 'transparent'}
              _hover={{ bg: 'gray.800', cursor: 'pointer' }}
              borderRadius="md"
            >
              <Icon as={icon} color={activeIndex === i ? 'yellow.400' : 'gray.400'} />
              <Text fontSize="xs" color={activeIndex === i ? 'yellow.400' : 'gray.400'}>
                {label}
              </Text>
            </HStack>
          ))}
          <Box h="1px" w="full" bg="gray.700" mt={4} />
          <Spacer />
          <Link fontSize="xs" color="gray.400">Company</Link>
          <Link fontSize="xs" color="gray.400">Terms & Conditions</Link>
          <Text fontSize="xs" color="gray.600">@XylophoneTechnologies Uganda</Text>
        </VStack>
      </Box>

      {/* Main Content */}
      <Flex {...handlers} flex="1" flexDir="column" overflow="hidden">
        {/* Mobile Header */}
        <Flex
          display={{ base: 'flex', md: 'none' }}
          align="center"
          justify="space-between"
          px={4}
          py={3}
          bg={theme === 'light' ? '#fff' : '#111'}
          borderBottom="1px solid"
          borderColor="gray.700"
          zIndex="10"
        >
          <HStack>
            <Image src={logo} alt="Logo" boxSize="40px" />
            <VStack align="start" gap={0}>
              <Text fontSize="xs" fontWeight="bold">
                <Text as="span" color="green.400">Agro</Text>
                <Text as="span" color="blue.400">Strings</Text>
              </Text>
              <Text fontSize="5px" color="gray.300">XYLOPHONE TECHNOLOGIES</Text>
            </VStack>
          </HStack>
          <HStack spacing={2}>
            <Button size="xs" color="#fada25" bg="transparent" border="1px solid" onClick={openSignIn}>
              Create Account
            </Button>
            <Icon as={TbMenu4} boxSize={6} />
          </HStack>
        </Flex>

        {/* Desktop Top Bar */}
        <Flex display={{ base: 'none', md: 'flex' }} mb={4} px={4} pt={4} align="center" justify="space-between">
          <Box pos="relative" w="45%" bg="gray.700" borderRadius="sm">
            <Icon as={Search} boxSize={4} color="gray.300" pos="absolute" left="8px" top="50%" transform="translateY(-50%)" />
            <Input pl="32px" placeholder="Search…" bg="transparent" border="none" fontSize="xs" _placeholder={{ color: 'gray.400' }} />
          </Box>
          <HStack spacing={2} fontSize="xs">
            <CirclePlus size={18} color="white" />
            <Button size="xs" bg="yellow.400" color="black" onClick={openSignIn}>Sign In</Button>
            <Button size="xs" bg="gray.700">EN</Button>
            <Button size="xs" bg="gray.700" onClick={toggleTheme}>
              {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
            </Button>
          </HStack>
        </Flex>

        {/* Main Sections */}
        {activeIndex === 0 && (
          <Flex flex="1" overflow="hidden">
            <VideoBox videos={videos} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />
            <Box w="200px" display={{ base: 'none', md: 'block' }} bg="#111">
              <VideoGallery ref={galleryRef} videos={videos} currentIndex={currentIndex} onSelect={setCurrentIndex} />
            </Box>
          </Flex>
        )}
        {activeIndex === 1 && <Box flex="1" p={4}><Live /></Box>}
        {activeIndex === 2 && <Box flex="1" p={4}><FarmerChannel /></Box>}
        {activeIndex === 3 && <Box flex="1" p={4}><Text>Upload Video UI placeholder.</Text></Box>}
        {activeIndex === 4 && <Box flex="1" p={4} overflowY="auto" bg="#222"><ProductListing /></Box>}
        {activeIndex === 5 && <Box flex="1" p={4}><Text fontSize="lg" color="gray.300">Settings (Coming soon).</Text></Box>}
      </Flex>

      {/* Sign In Modal */}
      <SignInModal open={isSignInOpen} onOpenChange={setSignInOpen} onSubmit={handleSignIn} />

      {/* Mobile Bottom Navigation */}
      <Box display={{ base: 'block', md: 'none' }} pos="fixed" bottom="0" left="0" right="0" h="70px" bg="#000" borderTop="1px solid #333" zIndex="99">
        <Flex h="100%" align="center">
          {mobileTabs.map(({ label, icon, index }) => (
            <Flex
              key={index}
              flex="1"
              direction="column"
              align="center"
              justify="center"
              cursor="pointer"
              onClick={() => setActiveIndex(index)}
              color={activeIndex === index ? 'yellow.400' : 'white'}
            >
              <Icon as={icon} boxSize={5} />
              <Text fontSize="xs" mt={1}>{label}</Text>
            </Flex>
          ))}
        </Flex>
        <Box pos="absolute" left="50%" top="8" transform="translate(-50%,-50%)">
          <Circle size="54px" bg="#fada25" border="4px solid #000" cursor="pointer" onClick={() => setActiveIndex(3)}>
            <Icon as={CirclePlus} boxSize={4} color="black" />
          </Circle>
        </Box>
      </Box>
    </Flex>
  );
}
