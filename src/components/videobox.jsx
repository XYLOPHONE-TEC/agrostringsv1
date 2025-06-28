import React, { useRef, useState } from 'react';
import { Box, AspectRatio, VStack } from '@chakra-ui/react';
import demoVideo from '../assets/videos/demo.mp4';

const VideoBox = () => {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      playing ? videoRef.current.pause() : videoRef.current.play();
      setPlaying(!playing);
    }
  };

  return (
    <Box
      w="450px"
      h="450px"
      bg="#000"
      borderRadius="md"
      position="relative"
      mx="auto"
      overflow="hidden"
      onClick={togglePlay}
      cursor="pointer"
    >
      <AspectRatio ratio={16 / 9} w="100%" h="100%">
        <Box pos="relative" w="100%" h="100%">
          <Box
            as="video"
            ref={videoRef}
            src={demoVideo}
            muted
            playsInline
            width="100%"
            height="100%"
            objectFit="cover"
          />
          {!playing && (
            <Box
              pos="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              boxSize="80px"
              rounded="full"
              bg="whiteAlpha.500"
            />
          )}
          <VStack
            pos="absolute"
            right="10px"
            top="50%"
            transform="translateY(-50%)"
            spacing={4}
            align="center"
            zIndex="overlay"
          >
            {/* Three placeholder circles */}
            <Box boxSize="40px" rounded="full" bg="whiteAlpha.700" />
            <Box boxSize="40px" rounded="full" bg="whiteAlpha.700" />
            <Box boxSize="40px" rounded="full" bg="whiteAlpha.700" />
          </VStack>
        </Box>
      </AspectRatio>
    </Box>
  );
};

export default VideoBox;
