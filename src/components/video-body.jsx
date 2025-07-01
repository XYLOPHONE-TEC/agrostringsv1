// src/components/VideoBody.jsx
import React from 'react';
import {
  Box,
  Button,
  VStack,
  HStack,
  Text,
  Center,
  Flex,
  Icon,
} from '@chakra-ui/react';
import {
  FaFolderOpen,
  FaVideo,
  FaThLarge,
  FaTextHeight,
  FaUpload,
  FaPlayCircle,
} from 'react-icons/fa';
import { MdOndemandVideo } from 'react-icons/md';

const sidebarItems = [
  { icon: FaFolderOpen, label: 'Your media' },
  { icon: FaVideo, label: 'Record & create' },
  { icon: FaThLarge, label: 'Content library' },
  { icon: FaTextHeight, label: 'Text' },
];

const VideoBody = () => (
  <HStack h="auto" align="stretch" spacing={0} minH="0">
    {/* Sidebar */}
    <VStack
      w="220px"
      bg="gray.900"
      color="gray.200"
      spacing={4}
      py={4}
      minH="0"
    >
      {sidebarItems.map((item) => (
        <VStack
          key={item.label}
          as="button"
          onClick={() => console.log(item.label)}
          cursor="pointer"
          spacing={1}
          align="center"
          _hover={{ bg: 'gray.700', borderRadius: 'md' }}
          p={2}
        >
          <Icon as={item.icon} boxSize={6} />
          <Text fontSize="xs">{item.label}</Text>
        </VStack>
      ))}
    </VStack>

    {/* Main Content Area */}
    <Flex flex="1" direction="column" bg="gray.800" p={2} minH="0">
      {/* Import Media Panel */}
      <Box
        border="2px dashed"
        borderColor="gray.600"
        borderRadius="md"
        p={4}
        mb={4}
      >
        <VStack gap={2}>
          <Button leftIcon={<FaUpload />} colorScheme="purple">
            Import media
          </Button>
          <Text textAlign="center" color="gray.400">
            Drag & drop media from your device to import
          </Text>
          <Text textAlign="center" color="gray.500">
            Videos, audio, images, GIFs
          </Text>
        </VStack>
      </Box>

      {/* Preview & Controls */}
      <Flex flex="1" direction="column" justify="space-between" minH="0">
        {/* Preview Canvas */}
        <Center
          flex="2"
          minH="180px"
          maxH="30vh"
          overflowY="auto"
          bg="black"
          borderRadius="md"
          mb={2}
        >
          {/* Video Preview goes here */}
        </Center>

        {/* Timeline & Controls */}
        <HStack justify="center" spacing={4} pb={2}>
          <Box
            as="span"
            onClick={() => console.log('Rewind 5s')}
            cursor="pointer"
            _hover={{ color: 'white' }}
          >
            <Icon as={MdOndemandVideo} boxSize={6} />
          </Box>
          <Box
            as="span"
            onClick={() => console.log('Play/Pause')}
            cursor="pointer"
            _hover={{ color: 'white' }}
          >
            <Icon as={FaPlayCircle} boxSize={8} />
          </Box>
          <Box
            as="span"
            onClick={() => console.log('Forward 5s')}
            cursor="pointer"
            transform="rotate(180deg)"
            _hover={{ color: 'white' }}
          >
            <Icon as={MdOndemandVideo} boxSize={6} />
          </Box>
          <Text color="gray.400">0:00 / 0:00</Text>
        </HStack>
      </Flex>
    </Flex>
  </HStack>
);

export default VideoBody;
