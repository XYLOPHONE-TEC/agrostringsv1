// src/pages/Dashboard.jsx
"use client";
import React from 'react';
import {
  Box,
  Flex,
  HStack,
  Text,
  Button,
  Icon,
} from '@chakra-ui/react';
import { FiHelpCircle } from 'react-icons/fi';
import VideoDialog from '../modals/videp-upload';
import MainContent from '../components/main-content-farmer';

const Dashboard = () => (
  <Flex direction="column" minHeight="100vh" bg="#222222">
    {/* Header */}
    <Flex bg="#1E1E1E" px={8} py={4} align="center" justify="space-between">
      <Text fontSize="sm" fontWeight="bold" color="#FBBF24">Strings Farmer</Text>
      <Text fontSize="sm" color="#FFFFFF">
        Farm ID:{' '}
        <Text as="span" color="#FBBF24" fontWeight="semibold">
          #A5H12K4
        </Text>
      </Text>
      <HStack spacing={2} fontSize="xs">
        <VideoDialog />

        <Button size="xs" bg="gray.700" _hover={{ bg: 'gray.600' }}>
          EN
        </Button>
        <Button size="xs" bg="gray.700" _hover={{ bg: 'gray.600' }}>
          Mode
        </Button>
      </HStack>
    </Flex>

    {/* Main Content */}
    <Box flex="1" px={8} py={6} overflow="auto">
      <MainContent />
    </Box>

    {/* Footer */}
    <Box as="footer" px={8} py={2} borderTop="1px solid" borderColor="gray.700">
      <Flex direction="column" align="center">
        <HStack gap={2} mb={3}>
          <Icon as={FiHelpCircle} color="#FACC15" boxSize="1.5em" />
          <Text fontSize="sm" color="#FFFFFF" fontWeight="300">
            Have Questions or Need Assistance?
          </Text>
        </HStack>
        <Button
          px={12}
          fontSize="sm"
          fontWeight="light"
          color="black"
          bg="yellow.400"
          _hover={{ bg: 'yellow.300' }}
          borderRadius="full"
          size="sm"
        >
          Request Help
        </Button>
      </Flex>
    </Box>
  </Flex>
);

export default Dashboard;
