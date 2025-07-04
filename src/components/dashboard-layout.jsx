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
} from '@chakra-ui/react';
import {
  Home,
  Search,
  CirclePlus,
  Menu,
  Settings,
  Tv,
  Heart,
  Star,
  Share2,
  MessageSquare,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/images/logo.png';
import demoVideo1 from '../assets/videos/demo4.mp4';
import demoVideo2 from '../assets/videos/demo2.mp4';
import SignInModal from '../modals/sign-in';

const iconVariants = {
  hidden: { y: 50, opacity: 0, scale: 0.5 },
  visible: i => ({
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.1, type: 'spring', stiffness: 100, damping: 10 },
  }),
  exit: { y: 50, opacity: 0, scale: 0.5, transition: { duration: 0.2 } },
};
const clickAnimation = { scale: [1, 1.4, 1], transition: { duration: 0.4, ease: 'easeInOut' } };

const videos = [demoVideo1, demoVideo2];

const VideoBox = () => {
  const [index, setIndex] = useState(0);
  const videoRef = useRef(null);
  const [liked, setLiked] = useState(false);
  const [favorites, setFavorites] = useState(false);
  const [commentsCount, setCommentsCount] = useState(0);
  const [sharesCount, setSharesCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [clickedIcon, setClickedIcon] = useState(null);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [soundOn, setSoundOn] = useState(false); // Start muted like TikTok
  const [hasInteracted, setHasInteracted] = useState(false); // Track user interaction

  const changeIndex = useCallback(delta => {
    setIndex(i => (i + delta + videos.length) % videos.length);
    setLiked(false);
    setFavorites(false);
    setCommentsCount(0);
    setSharesCount(0);
    setShowCommentInput(false);
    setCommentText('');
    // If user has interacted, keep sound on for next video
    setSoundOn(prev => hasInteracted ? true : false);
  }, [hasInteracted]);

  let wheelTimeout = null;
  const handleWheel = e => {
    e.preventDefault();
    if (wheelTimeout) return;
    if (e.deltaY > 50) changeIndex(1);
    if (e.deltaY < -50) changeIndex(-1);
    wheelTimeout = setTimeout(() => (wheelTimeout = null), 800);
  };

  // Handle user interaction to enable sound
  const handleUserInteraction = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
      setSoundOn(true);
    }
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

  const handleIconClick = (id, onClick) => {
    setClickedIcon(id);
    if (id === 'comment') setShowCommentInput(true);
    onClick();
    setTimeout(() => setClickedIcon(null), 400);
  };

  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      setCommentsCount(c => c + 1);
      setCommentText('');
      setShowCommentInput(false);
    }
  };

  const iconsData = [
    { id: 'like', icon: Heart, colorActive: 'red', active: liked, onClick: () => setLiked(v => !v), count: liked ? 1 : 0 },
    { id: 'favorite', icon: Star, colorActive: 'yellow.400', active: favorites, onClick: () => setFavorites(v => !v), count: favorites ? 1 : 0 },
    { id: 'share', icon: Share2, colorActive: 'white', active: false, onClick: () => setSharesCount(c => c + 1), count: sharesCount },
    { id: 'comment', icon: MessageSquare, colorActive: 'white', active: false, onClick: () => {}, count: commentsCount },
    { id: 'sound', icon: soundOn ? Volume2 : VolumeX, colorActive: 'white', active: soundOn, onClick: () => setSoundOn(s => !s), count: 0 },
  ];

  return (
    <Box
      w="100%"
      h="100%"
      bg="black"
      pos="relative"
      overflow="hidden"
      onWheel={handleWheel}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      userSelect="none"
      touchAction="none"
      onClick={handleUserInteraction} // Enable sound on first click/tap
    >
      <Box
        as="video"
        ref={videoRef}
        src={videos[index]}
        autoPlay
        muted={!soundOn}
        loop
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />

      {/* LIVE badge always visible */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
        <Flex pos="absolute" top="4" left="4" bg="red" p={2} borderRadius="md" align="center" gap={1}>
          <Icon as={Tv} color="white" />
          <Text color="white" fontWeight="bold" fontSize="sm">LIVE</Text>
        </Flex>
      </motion.div>

      {/* Icons always visible */}
      <VStack pos="absolute" right="4" top="50%" transform="translateY(-50%)" spacing={6} zIndex={10}>
        {iconsData.map((d, i) => (
          <Flex key={d.id} align="center" pos="relative">
            {showCommentInput && d.id === 'comment' && (
              <Box pos="absolute" right="60" p={4} bg="rgba(0,0,0,0.7)" borderRadius="md" zIndex={20}>
                <Input
                  placeholder="Write comment..."
                  bg="white"
                  color="black"
                  size="sm"
                  value={commentText}
                  onChange={e => setCommentText(e.target.value)}
                  mb={2}
                  autoFocus
                />
                <Button size="sm" w="full" onClick={handleCommentSubmit} isDisabled={!commentText.trim()}>Submit</Button>
              </Box>
            )}
            <motion.div custom={i} initial="hidden" animate="visible" exit="exit" variants={iconVariants}>
              <motion.div animate={clickedIcon === d.id ? clickAnimation : { scale: 1 }}>
                <Flex direction="column" align="center" cursor="pointer" onClick={() => handleIconClick(d.id, d.onClick)}>
                  <Box p={2} bg="white" borderRadius="full">
                    <Icon as={d.icon} boxSize={6} color={d.active ? d.colorActive : 'black'} />
                  </Box>
                  <Text color="white" fontSize="sm" mt={1}>{d.count}</Text>
                </Flex>
              </motion.div>
            </motion.div>
          </Flex>
        ))}
      </VStack>
    </Box>
  );
};

const DashboardLayout = () => {
  const [isSignInOpen, setSignInOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const openSignIn = () => setSignInOpen(true);
  const handleSignIn = ({ phone, password }) => {
    console.log('Signing in:', phone, password);
    setSignInOpen(false);
  };

  const SidebarContent = () => (
    <VStack w="180px" bg="#000" p={2} align="start" spacing={2} minH="100vh">
      <Image src={logo} alt="Logo" boxSize="32px" mb={1} />
      <Box h="1px" w="full" bg="gray.700" />
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
      <Box h="1px" w="full" bg="gray.700" />
      <Button size="xs" w="full" bg="yellow.400" color="black" _hover={{ bg: 'yellow.300' }} onClick={openSignIn}>
        Login
      </Button>
    </VStack>
  );

  return (
    <Flex h="100vh" bg="#111" color="white" fontSize="sm" overflow="hidden">
      {/* Sidebar for desktop */}
      <Box display={{ base: 'none', md: 'block' }}>
        <SidebarContent />
      </Box>

      <Flex flex="1" flexDir="column" h="100%">
        {/* Top bar */}
        <Flex
          display={{ base: 'none', md: 'flex' }}
          mb={4}
          align="center"
          justify="space-between"
          flexShrink={0}
          px={4}
          pt={4}
        >
          <Box position="relative" w={{ base: '60%', md: '45%' }} bg="gray.700" borderRadius="sm">
            <Icon as={Search} boxSize={4} color="gray.300" position="absolute" left="8px" top="50%" transform="translateY(-50%)" />
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
            <Box border="2px dashed gray.500" borderRadius="sm" p={1} _hover={{ bg: 'gray.800', cursor: 'pointer' }}>
              <HStack p={1}>
                <CirclePlus size={18} color="white" />
                <Text>Video</Text>
              </HStack>
            </Box>
            <Button size="xs" bg="yellow.400" color="black" _hover={{ bg: 'yellow.300' }} onClick={openSignIn}>Sign In</Button>
            <Button size="xs" bg="gray.700" _hover={{ bg: 'gray.600' }}>EN</Button>
            <Button size="xs" bg="gray.700" _hover={{ bg: 'gray.600' }}>Mode</Button>
          </HStack>
        </Flex>

        {/* Video Area */}
        <Box flex="1" w="100%" h="100%" overflow="hidden">
          <VideoBox />
        </Box>
      </Flex>

      <SignInModal open={isSignInOpen} onOpenChange={setSignInOpen} onSubmit={handleSignIn} />

      {/* Mobile bottom nav */}
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
        <Flex h="100%" align="center">
          {[
            { icon: Home, label: 'Home' },
            { icon: Search, label: 'Products' },
            { icon: Menu, label: 'Farmer' },
            { icon: Menu, label: 'My Profile' },
          ].map((item, idx) => (
            <Flex key={idx} flex="1" direction="column" align="center" justify="center" pt={1}>
              <Icon as={item.icon} boxSize={6} color="white" />
              <Text fontSize="xs" mt={1}>{item.label}</Text>
            </Flex>
          ))}
        </Flex>
        <Box pos="absolute" left="50%" top="8" transform="translate(-50%, -50%)" zIndex="100">
          <Circle size="64px" bg="#fada25" border="4px solid #000" shadow="lg" cursor="pointer" onClick={() => console.log('CirclePlus clicked')}>
            <Icon as={CirclePlus} boxSize={6} color="black" />
          </Circle>
        </Box>
      </Box>
    </Flex>
  );
};

export default DashboardLayout;