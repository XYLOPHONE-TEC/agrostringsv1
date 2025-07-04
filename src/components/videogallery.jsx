import React, { forwardRef } from 'react';
import { VStack, Box } from '@chakra-ui/react';

const VideoGallery = forwardRef(({ videos, currentIndex, onSelect }, ref) => (
  <VStack ref={ref} spacing={4} p={2} h="100%" overflowY="auto" align="stretch"
    css={{
      '&::-webkit-scrollbar': { width: '4px' },
      '&::-webkit-scrollbar-thumb': { background: '#555', borderRadius: '2px' },
    }}
  >
    {videos.map((video, i) => (
      <Box
        key={i}
        onClick={() => onSelect(i)}
        cursor="pointer"
        style={{
          opacity: i === currentIndex ? 1 : 0.5,
          transform: i === currentIndex ? 'scale(1.05)' : 'scale(1)',
          transition: 'opacity 0.2s, transform 0.2s',
        }}
      >
        <Box position="relative" w="full" h="120px" borderRadius="8px" overflow="hidden">
          <video src={video.src} muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          {i === currentIndex && (
            <Box pos="absolute" top="0" left="0" w="100%" h="100%" border="2px solid #fada25" borderRadius="8px" pointerEvents="none" />
          )}
        </Box>
      </Box>
    ))}
  </VStack>
));

export default VideoGallery;
