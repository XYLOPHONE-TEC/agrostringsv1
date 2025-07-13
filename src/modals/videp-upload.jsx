// src/components/VideoDialog.jsx
"use client";
import React from 'react';
import {
  Box,
  HStack,
  Text,
  Button,
  Dialog,
  Portal,
  CloseButton,
} from '@chakra-ui/react';
import { PlusCircle } from 'lucide-react';

// Import the VideoBody component
import VideoBody from '../components/video-body';

const VideoDialog = () => (
  <Dialog.Root size="xl" placement="center" motionPreset="slide-in-bottom">
    <Dialog.Trigger asChild>
      <Box
        border="2px dashed gray.500"
        borderRadius="sm"
        p={1}
        _hover={{
          borderColor: 'gray.400',
          cursor: 'pointer',
          bg: 'gray.800',
        }}
      >
        <HStack spacing={1} p={1}>
          <PlusCircle size={18} color="white" />
          <Text color="white">Video</Text>
        </HStack>
      </Box>
    </Dialog.Trigger>

    <Portal>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content bg="#222222" color="white" p={0} m={0} borderRadius="none">
          <Dialog.Header display="flex" justifyContent="space-between" px={4} py={4}>
            
            <Dialog.CloseTrigger asChild>
              <CloseButton color="white" border="none" _hover={{ color: 'yellow.400', bg: 'transparent' }} />
            </Dialog.CloseTrigger>
          </Dialog.Header>

          <Dialog.Body flex="1" p={4} overflow="auto">
            {/* Render the VideoBody component here */}
            <VideoBody />
          </Dialog.Body>

        
        </Dialog.Content>
      </Dialog.Positioner>
    </Portal>
  </Dialog.Root>
);

export default VideoDialog;