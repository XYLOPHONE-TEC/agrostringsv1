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
// Removed VideoDialog import
import VideoDialog from '../modals/videp-upload';
import BuyerMainContent from '../components/buyer-maincontent';

const Dashboard = () => (
  <Flex direction="column" minHeight="100vh" bg="#222222">
    {/* Header */}
    <Flex
      bg="#1E1E1E"
      px={{ base: 2, md: 8 }}
      py={{ base: 3, md: 4 }}
      align="center"
      justify="space-between"
    >
      <Text fontSize={{ base: 'xs', md: 'sm' }} fontWeight="bold" color="#FBBF24">
        Strings Buyer
      </Text>
      <Text fontSize={{ base: 'xs', md: 'sm' }} color="#FFFFFF">
        User ID:{' '}
        <Text as="span" color="#FBBF24" fontWeight="semibold">
          #A5H12K4
        </Text>
      </Text>
      <HStack spacing={2} fontSize="xs">
-       
        <Button size="xs" bg="gray.700" _hover={{ bg: 'gray.600' }}>
          EN
        </Button>
        <Button size="xs" bg="gray.700" _hover={{ bg: 'gray.600' }}>
          Mode
        </Button>
      </HStack>
    </Flex>

    {/* Main Content */}
    <Box flex="1" px={{ base: 2, md: 8 }} py={{ base: 4, md: 6 }} overflow="auto">
  <BuyerMainContent />
    
    </Box>

    {/* Footer */}
    <Box
      as="footer"
      px={{ base: 2, md: 8 }}
      py={{ base: 3, md: 2 }}
      borderTop="1px solid"
      borderColor="gray.700"
    >
      <Flex direction="column" align="center">
        <HStack gap={2} mb={3}>
          <Icon as={FiHelpCircle} color="#FACC15" boxSize="1.5em" />
          <Text fontSize={{ base: 'xs', md: 'sm' }} color="#FFFFFF" fontWeight="300">
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
