// src/components/DashboardLayout.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Box,
  Flex,
  VStack,
  HStack,
  Input,
  Icon,
  Button,
  Text,
  Image,
  Circle,
  AspectRatio,
} from '@chakra-ui/react';
import {
  Home,
  Search,
  CirclePlus,
  Menu,
  Settings,
  Tv,
  Volume2,
  VolumeX,
} from 'lucide-react';
import logo from '../assets/images/logo.png';
import demoVideo1 from '../assets/videos/demo.mp4';
import demoVideo2 from '../assets/videos/demo2.mp4';
import SignInModal from '../modals/sign-in';

const videos = [demoVideo1, demoVideo2];

const VideoBox = () => {
  const [index, setIndex] = useState(0);
  const videoRef = useRef(null);
  const [soundOn, setSoundOn] = useState(false);

  const changeIndex = useCallback(delta => {
    setIndex(i => (i + delta + videos.length) % videos.length);
    setSoundOn(false);
  }, []);

  let wheelTimeout = null;
  const handleWheel = e => {
    e.preventDefault();
    if (wheelTimeout) return;
    if (e.deltaY > 50) changeIndex(1);
    if (e.deltaY < -50) changeIndex(-1);
    wheelTimeout = setTimeout(() => (wheelTimeout = null), 800);
  };

  useEffect(() => {
    const vid = videoRef.current;
    if (vid) {
      vid.pause();
      vid.currentTime = 0;
      vid.muted = !soundOn;
      vid.loop = true;
      vid.play().catch(() => {});
    }
  }, [index, soundOn]);

  return (
    <Box
      w="100%"
      h="100%"
      bg="black"
      pos="relative"
      overflow="hidden"
      onWheel={handleWheel}
      userSelect="none"
      touchAction="none"
    >
      {/* portrait 3:4 filling all available space */}
      <Flex flex="1" display="flex" align="center" justify="center">
        <AspectRatio ratio={3 / 4} w="100%" h="100%">
          <video
            ref={videoRef}
            src={videos[index]}
            autoPlay
            loop
            playsInline
            muted={!soundOn}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </AspectRatio>
      </Flex>

      {/* sound toggle */}
      <Box pos="absolute" top="4" right="4">
        <Button size="sm" onClick={() => setSoundOn(on => !on)}>
          <Icon as={soundOn ? Volume2 : VolumeX} />
        </Button>
      </Box>
    </Box>
  );
};

const DashboardLayout = () => {
  const [isSignInOpen, setSignInOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const openSignIn = () => setSignInOpen(true);
  const handleSignIn = creds => { console.log('Signing in:', creds); setSignInOpen(false); };

  const SidebarContent = () => (
    <VStack w="180px" bg="#000" p={2} align="start" spacing={2} minH="0">
      <Image src={logo} boxSize="32px" alt="logo" mb={1} />
      <Box h="1px" w="full" bg="gray.700" />
      {[{ icon: Home, label: 'Home' }, { icon: Search, label: 'Products' }, { icon: Settings, label: 'Settings' }].map((item, idx) => (
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
      <Box h="1px" w="full" bg="gray.700" />
      <Button size="xs" w="full" bg="yellow.400" color="black" _hover={{ bg: 'yellow.300' }} onClick={openSignIn}>
        Login
      </Button>
    </VStack>
  );

  return (
    <Flex h="100vh" bg="#111" color="white" fontSize="sm" overflow="hidden" flexDir="column">
      {/* Header */}
      <Flex flexShrink={0} align="center" justify="space-between" p={4} bg="#111">
        <Box position="relative" w={{ base: '60%', md: '45%' }} bg="gray.700" borderRadius="sm">
          <Icon as={Search} boxSize={4} color="gray.300" pos="absolute" left="8px" top="50%" transform="translateY(-50%)" />
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
          <Box border="2px dashed gray.500" borderRadius="sm" p={1} _hover={{ borderColor: 'gray.400', cursor: 'pointer' }}>
            <HStack p={1} _hover={{ bg: 'gray.800', cursor: 'pointer' }}>
              <CirclePlus size={18} color="white" />
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

      {/* Content */}
      <Flex flex="1" minH="0" overflow="hidden">
        {/* Sidebar desktop */}
        <Box display={{ base: 'none', md: 'block' }}>
          <SidebarContent />
        </Box>
        {/* Video */}
        <Box flex="1" pos="relative" overflow="hidden">
          <VideoBox />
        </Box>
      </Flex>

      {/* Mobile nav */}
      <Box display={{ base: 'block', md: 'none' }} pos="fixed" bottom="0" left="0" right="0" h="70px" bg="#000" borderTop="1px solid #333" zIndex="99">
        <Flex h="100%" align="center">
          {[{ icon: Home, label: 'Home' }, { icon: Search, label: 'Products' }, { icon: Menu, label: 'Farmer' }, { icon: Menu, label: 'Profile' }].map((item, idx) => (
            <Flex key={idx} flex="1" direction="column" align="center" justify="center" pt={1}>
              <Icon as={item.icon} boxSize={6} color="white" />
              <Text fontSize="xs" mt={1}>{item.label}</Text>
            </Flex>
          ))}
        </Flex>
        <Box pos="absolute" left="50%" top="8" transform="translate(-50%, -50%)" zIndex="100">
          <Circle size="64px" bg="#fada25" border="4px solid #000" shadow="lg" cursor="pointer" onClick={openSignIn}>
            <Icon as={CirclePlus} boxSize={6} color="black" />
          </Circle>
        </Box>
      </Box>

      <SignInModal open={isSignInOpen} onOpenChange={setSignInOpen} onSubmit={handleSignIn} />
    </Flex>
  );
};

export default DashboardLayout;
