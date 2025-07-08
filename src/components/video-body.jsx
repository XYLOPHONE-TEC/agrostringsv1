// src/components/VideoBody.jsx
import React, { useState, useRef } from 'react';
import {
  Box, Button, VStack, HStack, Text,
  Center, Flex, Icon, Drawer, Portal,
  CloseButton, useDisclosure
} from '@chakra-ui/react';
import {
  FaFolderOpen, FaVideo, FaThLarge, FaTextHeight,
  FaUpload, FaPlayCircle, FaMusic
} from 'react-icons/fa';
import { MdOndemandVideo } from 'react-icons/md';
import { toaster } from '../components/ui/toaster';

const sidebarItems = [
  { icon: FaFolderOpen, label: 'Your media' },
  { icon: FaVideo, label: 'Record & create' },
  { icon: FaThLarge, label: 'Content library' },
  { icon: FaTextHeight, label: 'Text' },
];

export default function VideoBody() {
  const [activeTab, setActiveTab] = useState(sidebarItems[0].label);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstPlayRef = useRef();

  const handleRecordClick = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      toaster.create({ title: 'Camera access granted.', type: 'success' });
    } catch (err) {
      toaster.create({ title: 'Camera access denied.', description: err.message, type: 'error' });
    }
  };

  const handleTabClick = (label) => {
    setActiveTab(label);
    if (label === 'Content library') onOpen();
  };

  const sounds = ['Piano Loop', 'Ambient Beat', 'Podcast Intro', 'Nature Sounds'];

  return (
    <>
      <HStack
        h="80vh"
        align="stretch"
        spacing={0}
        w="100%"
        overflow="hidden"
      >
        <VStack
          w="220px"
          bg="gray.900"
          spacing={2}
          py={4}
          overflowY="auto"
        >
          {sidebarItems.map(item => {
            const isActive = item.label === activeTab;
            return (
              <HStack
                as="button"
                key={item.label}
                onClick={() => handleTabClick(item.label)}
                px={4}
                py={3}
                spacing={3}
                align="center"
                w="100%"
                bg={isActive ? 'gray.700' : 'transparent'}
                _hover={{ bg: 'gray.700' }}
                borderRadius="md"
              >
                <Box w="4px" h="full" bg={isActive ? 'yellow.400' : 'transparent'} borderRadius="full" />
                <Icon as={item.icon} boxSize={5} color={isActive ? 'yellow.400' : 'gray.200'} />
                <Text fontSize="sm" fontWeight="medium" color={isActive ? 'yellow.400' : 'gray.200'}>
                  {item.label}
                </Text>
              </HStack>
            );
          })}
        </VStack>

        <Flex flex="1" direction="column" bg="gray.800" p={4} minH="0" overflow="hidden">
          {activeTab === 'Your media' && (
            <>
              <Box border="2px dashed" borderColor="gray.600" borderRadius="md" p={4} mb={4}>
                <VStack spacing={2}>
                  <Button leftIcon={<FaUpload />} colorScheme="yellow" fontSize="xs">
                    Import media
                  </Button>
                  <Text textAlign="center" color="gray.400">Drag & drop media…</Text>
                  <Text textAlign="center" color="gray.500">Videos, audio, images, GIFs</Text>
                </VStack>
              </Box>
              <Flex flex="1" direction="column" justify="space-between">
                <Center flex="2" minH="150px" maxH="30vh" bg="black" borderRadius="md" mb={2} />
                <HStack justify="center" spacing={4} pb={2}>
                  <Box onClick={() => toaster.create({ title: 'Rewind 5s' })} cursor="pointer">
                    <Icon as={MdOndemandVideo} boxSize={6} />
                  </Box>
                  <Box onClick={() => toaster.create({ title: 'Play/Pause' })} cursor="pointer">
                    <Icon as={FaPlayCircle} boxSize={8} />
                  </Box>
                  <Box onClick={() => toaster.create({ title: 'Forward 5s' })} cursor="pointer" transform="rotate(180deg)">
                    <Icon as={MdOndemandVideo} boxSize={6} />
                  </Box>
                  <Text color="gray.400">0:00 / 0:00</Text>
                </HStack>
              </Flex>
            </>
          )}

          {activeTab === 'Record & create' && (
            <Center flex="1" flexDir="column" color="gray.200" py={20}>
              <Text mb={4}>To record, we need access to camera & mic.</Text>
              <Button colorScheme="yellow" onClick={handleRecordClick}>
                Enable Camera & Microphone
              </Button>
            </Center>
          )}

          {activeTab === 'Text' && (
            <Center flex="1"><Text color="gray.400">“Text” view not implemented yet.</Text></Center>
          )}
        </Flex>
      </HStack>

      <Drawer.Root
        open={isOpen}
        onOpenChange={(o) => !o && onClose()}
        placement="right"
        size="md"
        initialFocusEl={() => firstPlayRef.current}
      >
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner padding={{ base: 0, md: 4 }}>
            <Drawer.Content bg="gray.800" color="white" rounded="md">
              <Drawer.CloseTrigger asChild>
                <CloseButton pos="absolute" top="1rem" right="1rem" />
              </Drawer.CloseTrigger>
              <Drawer.Header>
                <Drawer.Title>Content Library</Drawer.Title>
              </Drawer.Header>
              <Drawer.Body>
                <VStack spacing={4} mt={4}>
                  {sounds.map((sound, idx) => (
                    <HStack key={sound} justify="space-between">
                      <HStack spacing={2}>
                        <Icon as={FaMusic} boxSize={5} />
                        <Text>{sound}</Text>
                      </HStack>
                      <Icon
                        as={FaPlayCircle}
                        boxSize={6}
                        cursor="pointer"
                        ref={idx === 0 ? firstPlayRef : null}
                        onClick={() => toaster.create({ title: `Playing: ${sound}`, type: 'info' })}
                      />
                    </HStack>
                  ))}
                </VStack>
              </Drawer.Body>
              <Drawer.Footer>
                <Drawer.ActionTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </Drawer.ActionTrigger>
                <Button colorScheme="yellow">Insert</Button>
              </Drawer.Footer>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </>
  );
}
