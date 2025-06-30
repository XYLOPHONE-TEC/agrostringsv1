import React from 'react';
import { VStack, Box, Text, Button, Icon, SimpleGrid, AspectRatio } from '@chakra-ui/react';
import { FiPlay } from 'react-icons/fi';
import video1 from '../assets/videos/demo.mp4';
import video2 from '../assets/videos/demo2.mp4';
import video3 from '../assets/videos/demo3.mp4';

const videoData = [
  {
    title: 'Meet Edward an agroString Farmer',
    alt: 'Sunset over farmland',
    duration: '2 hours',
    videoSrc: video1,
  },
  {
    title: 'Modern Farming Techniques',
    alt: 'Green crops close-up',
    duration: '1.5 hours',
    videoSrc: video2,
  },
  {
    title: 'Sustainable Planting Tips',
    alt: 'Planting seeds in soil',
    duration: '2.5 hours',
    videoSrc: video3,
  },
];

const MiddleContent = () => (
  <VStack spacing={6} align="stretch" w="100%">
    {/* AgroStrings TV header */}
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Text fontSize="lg" fontWeight="semibold" color="white">
        Agrostrings TV
      </Text>
      <Button variant="link" color="yellow.400" size="sm">
        See all →
      </Button>
    </Box>

    {/* Featured video spanning full width */}
    <Box
      position="relative"
      w="100%"
      h="140px"
      bg="gray.700"
      rounded="md"
      overflow="hidden"
    >
      <AspectRatio ratio={16 / 9}>
        <video
          src={videoData[0].videoSrc}
          alt={videoData[0].alt}
          autoPlay
          loop
          muted
          style={{ objectFit: 'cover' }}
        />
      </AspectRatio>
      {/* <Icon
        as={FiPlay}
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        boxSize="4em"
        color="whiteAlpha.900"
      /> */}
      <Box
        position="absolute"
        bottom="4px"
        left="4px"
        bg="blackAlpha.600"
        px={2}
        py={1}
        rounded="sm"
      >
        <Text fontSize="sm" color="white" noOfLines={1}>
          {videoData[0].title}
        </Text>
        <Text fontSize="2xs" color="gray.300">
          {videoData[0].duration}
        </Text>
      </Box>
    </Box>

    {/* Two smaller videos side by side below */}
    <SimpleGrid columns={2} gap={2}>
      {[videoData[1], videoData[2]].map((video, idx) => (
        <Box
          key={idx}
          position="relative"
          w="100%"
          h="140px"
          bg="gray.700"
          rounded="md"
          overflow="hidden"
        >
          <AspectRatio ratio={16 / 9}>
            <video
              src={video.videoSrc}
              alt={video.alt}
              autoPlay
              loop
              muted
              style={{ objectFit: 'cover' }}
            />
          </AspectRatio>
          {/* <Icon
            as={FiPlay}
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            boxSize="2.5em"
            color="whiteAlpha.900"
          /> */}
          <Box
            position="absolute"
            bottom="4px"
            left="4px"
            bg="blackAlpha.600"
            px={2}
            py={1}
            rounded="sm"
          >
            <Text fontSize="xs" color="white" noOfLines={1}>
              {video.title}
            </Text>
            <Text fontSize="2xs" color="gray.300">
              {video.duration}
            </Text>
          </Box>
        </Box>
      ))}
    </SimpleGrid>
  </VStack>
);

export default MiddleContent;
