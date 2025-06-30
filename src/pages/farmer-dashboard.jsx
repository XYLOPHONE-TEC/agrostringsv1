// Dashboard.jsx
import React from 'react';
import {
  Box,
  Flex,
  HStack,
  Text,
  Button,
  Icon,
} from '@chakra-ui/react';
import {
  FiGlobe,
  FiBell,
  FiHelpCircle,
  FiUser,
} from 'react-icons/fi';
import MainContent from '../components/main-content-farmer'; // ← your content component

const Dashboard = () => (
  <Flex direction="column" minH="100vh" bg="#222222">
    {/* Top nav */}
    <Flex
      bg="#1E1E1E"
      px={8}
      py={4}
      align="center"
      justify="space-between"
    >
      <Text fontSize="sm" fontWeight="bold" color="#FBBF24">
        AgroStrings
      </Text>

      <Text fontSize="sm" color="#FFFFFF">
        Farm ID:{' '}
        <Text as="span" color="#FBBF24" fontWeight="semibold">
          #A5H12K4
        </Text>
      </Text>

      <HStack spacing={6} align="center">
        <HStack spacing={2}>
          <Icon as={FiGlobe} color="#FFFFFF" boxSize="1.2em" />
          <Text color="#FFFFFF" fontSize="sm">English</Text>
        </HStack>
        <HStack spacing={2}>
          <Icon as={FiBell} color="#FFFFFF" boxSize="1.2em" />
          <Text color="#FFFFFF" fontSize="sm">Notifications</Text>
        </HStack>
        <Icon
          as={FiUser}
          color="#FFFFFF"
          boxSize="1.5em"
          border="1px solid"
          borderRadius="full"
        />
      </HStack>
    </Flex>

    {/* Middle content */}
    <Box flex="1" px={8} py={6}>
      <MainContent />
    </Box>

    {/* Footer CTA */}
    <Box
      as="footer"
      bg="#222222"
      px={8}
      py={6}
      mt="auto"
      borderTop="1px solid"
      borderColor="gray.700"
    >
      <Flex direction="column" align="center">
        <HStack spacing={2} mb={4}>
          <Icon as={FiHelpCircle} color="#FACC15" boxSize="1.5em" />
          <Text fontSize="sm" color="#FFFFFF" fontWeight="300">
            Have Questions or Need Assistance?
          </Text>
        </HStack>

        <Button
          px={12}
          py={2}
          fontSize="sm"
          fontWeight="light"
          color="black"
          bg="yellow.400"
          _hover={{ bg: "yellow.300" }}
          borderRadius="full"
        >
          Request Help
        </Button>
      </Flex>
    </Box>
  </Flex>
);

export default Dashboard;
