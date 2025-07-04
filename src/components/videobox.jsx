import React, { useState } from 'react';
import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import { Tv } from 'lucide-react';
import video from '../assets/videos/demo2.mp4'

const VideoBox = ({ videoSrc }) => {
  const [isHovered, setIsHovered] = useState(true);

  return (
    <Box
      position="relative"
      width="100vw"
      height="100vh"
      overflow="hidden"
      borderRadius="16px"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      tabIndex={0}
      role="button"
      aria-label="Watch in full screen"
      data-e2e="feed-video"
    >
      {/* Video fills entire container */}
      <Box
        as="video"
        src={video}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: '16px',
          userSelect: 'none',
          pointerEvents: 'auto',
        }}
      />

      {/* LIVE label overlay */}
      {isHovered && (
        <Flex
          position="absolute"
          top="16px"
          left="16px"
          bg="rgba(0,0,0,0.6)"
          borderRadius="8px"
          px={3}
          py={1}
          alignItems="center"
          gap={2}
          zIndex={10}
          userSelect="none"
        >
          <Icon as={Tv} color="white" boxSize={5} />
          <Text color="white" fontWeight="bold" fontSize="sm">
            LIVE
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export default VideoBox;
