
// Don't forget: npm install react-swipeable

import React, { useState, useRef, useEffect } from 'react';
import {
  Box, Flex, VStack, HStack, Input,
  Icon, Button, Image, Circle, Text, Spacer, Link
} from '@chakra-ui/react';
import {
  Home, Video, Upload, Settings, TvIcon,
  Search, Menu, CirclePlus
} from 'lucide-react';
import { useSwipeable } from 'react-swipeable';

import SignInModal from '../modals/sign-in';
import VideoGallery from './videogallery';
import VideoBox from './videobox';
import ProductListing from './product-listing';
import FarmerChannel from './farmer-channel';
import logo from '../assets/images/logo.png';
import demoVideo1 from '../assets/videos/demo.mp4';
import demoVideo2 from '../assets/videos/demo2.mp4';

const videos = [
  { src: demoVideo1, title: 'Lorem ipsum dolor', subtitle: 'Consectetur adipiscing elit' },
  { src: demoVideo2, title: 'Sed do eiusmod', subtitle: 'Incididunt ut labore' },
];

export default function DashboardLayout() {
  const [isSignInOpen, setSignInOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const galleryRef = useRef();

  const sidebarItems = [
    { label: 'Home', icon: Home },
    { label: 'Live (0)', icon: TvIcon },
    { label: 'Farm Channel Videos', icon: Video },
    { label: 'Upload Video', icon: Upload },
    { label: 'Products', icon: Settings },
    { label: 'Settings', icon: Settings },
  ];

  const handlers = useSwipeable({
    onSwipedLeft: () => setActiveIndex(i => Math.min(i + 1, sidebarItems.length - 1)),
    onSwipedRight: () => setActiveIndex(i => Math.max(i - 1, 0)),
    trackMouse: true,
    preventScrollOnSwipe: true,
  });

  const openSignIn = () => setSignInOpen(true);
  const handleSignIn = data => {
    console.log('Signing in:', data);
    setSignInOpen(false);
  };

  useEffect(() => {
    const node = galleryRef.current?.children[currentIndex];
    node?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [currentIndex]);

  return (
    <Flex h="100vh" bg="#111" color="white" fontSize="sm" overflow="hidden">
      {/* Desktop Sidebar */}
      <Box display={{ base: 'none', md: 'block' }}>
        <VStack w="220px" bg="#000" p={2} spacing={2} minH="100vh" align="start">
          <Image src={logo} alt="Logo" boxSize="32px" mb={2} />
          {sidebarItems.map(({ label, icon }, i) => (
            <HStack
              key={i}
              w="full" px={3} py={2}
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
          <Link fontSize="xs" color="gray.400" mb={1}>Company</Link>
          <Link fontSize="xs" color="gray.400" mb={1}>Terms & Conditions</Link>
          <Text fontSize="xs" color="gray.600">@XylophoneTechnologies Uganda</Text>
        </VStack>
      </Box>

      {/* Main Content Area */}
      <Flex {...handlers} flex="1" flexDir="column">
        {/* Desktop Top Bar */}
        <Flex display={{ base: 'none', md: 'flex' }} mb={4} px={4} pt={4} align="center" justify="space-between">
          <Box pos="relative" w="45%" bg="gray.700" borderRadius="sm">
            <Icon as={Search} boxSize={4} color="gray.300" pos="absolute" left="8px" top="50%" transform="translateY(-50%)" />
            <Input pl="32px" placeholder="Search…" bg="transparent" border="none" fontSize="xs" _placeholder={{ color: 'gray.400' }} />
          </Box>
          <HStack spacing={2} fontSize="xs">
            <Box border="2px dashed gray.500" borderRadius="sm" p={1}><CirclePlus size={18} /></Box>
            <Button size="xs" bg="yellow.400" color="black" onClick={openSignIn}>Sign In</Button>
            <Button size="xs" bg="gray.700">EN</Button>
            <Button size="xs" bg="gray.700">Mode</Button>
          </HStack>
        </Flex>

        {/* Section Content */}
        {activeIndex === 0 && (
          <Flex flex="1" overflow="hidden">
            <Box flex="1" h="100%">
              <VideoBox videos={videos} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />
            </Box>
            <Box w="200px" display={{ base: 'none', md: 'block' }} bg="#111">
              <VideoGallery ref={galleryRef} videos={videos} currentIndex={currentIndex} onSelect={setCurrentIndex} />
            </Box>
          </Flex>
        )}
        {activeIndex === 1 && <Box flex="1" p={4}><Text>Live channel coming soon.</Text></Box>}
        {activeIndex === 2 && <Box flex="1" p={4}><FarmerChannel /></Box>}
        {activeIndex === 3 && <Box flex="1" p={4}><Text>Upload Video UI placeholder.</Text></Box>}
        {activeIndex === 4 && <Box flex="1" p={4} overflowY="auto" bg="#222"><ProductListing /></Box>}
        {activeIndex === 5 && <Box flex="1" p={4}><Text fontSize="lg" color="gray.300">Settings (Coming soon).</Text></Box>}
      </Flex>

      <SignInModal open={isSignInOpen} onOpenChange={setSignInOpen} onSubmit={handleSignIn} />

      <Box display={{ base: 'block', md: 'none' }} pos="fixed" bottom="0" left="0" right="0" h="70px" bg="#000" borderTop="1px solid #333" zIndex="99">
        <Flex h="100%" align="center">
          {['Home','Live','Farm','Products','Profile'].map((label,i) => (
            <Flex key={i} flex="1" direction="column" align="center" justify="center">
              <Icon as={Menu} boxSize={4} color="white" />
              <Text fontSize="xs" mt={1}>{label}</Text>
            </Flex>
          ))}
        </Flex>
        <Box pos="absolute" left="50%" top="8" transform="translate(-50%,-50%)">
          <Circle size="54px" bg="#fada25" border="4px solid #000" cursor="pointer" onClick={openSignIn}>
            <Icon as={CirclePlus} boxSize={4} color="black" />
          </Circle>
        </Box>
      </Box>
    </Flex>
  );
}


 