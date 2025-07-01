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
  FaShapes,
  FaFilm,
  FaPalette,
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
  <HStack height="100vh" spacing={0} align="stretch">
    {/* Sidebar */}
    <VStack
      width="220px"
      bg="gray.900"
      color="gray.200"
      spacing={6}
      paddingY={6}
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
    <Flex flex="1" direction="column" bg="gray.800" p={6}>
      {/* Import Media Panel */}
      <Box
        border="2px dashed"
        borderColor="gray.600"
        borderRadius="md"
        p={8}
        mb={6}
      >
        <VStack spacing={4}>
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
      <Flex flex="1" direction="column" justify="space-between">
        {/* Preview Canvas */}
        <Center flex="1" bg="black" borderRadius="md" mb={4}>
          {/* Video Preview goes here */}
        </Center>

        {/* Timeline & Controls */}
        <HStack justify="center" spacing={6}>
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