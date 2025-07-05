// src/components/FarmerChannel.jsx
import React from 'react';
import {
  Box,
  SimpleGrid,
  VStack,
  HStack,
  Image,
  Text,
  Badge,
} from '@chakra-ui/react';
import { ViewIcon, Tv } from 'lucide-react';
import { motion } from 'framer-motion';
import thumb1 from '../assets/images/farmer.png';
import thumb2 from '../assets/images/farmer.png';

// Wrap Chakra Box with animation capabilities
const MotionBox = motion(Box);

// Define swing animation
const swing = {
  rotate: [-10, 10, -10],
  transition: { duration: 2, ease: 'easeInOut', repeat: Infinity },
};

const sampleVideos = [
  {
    id: 1,
    thumbnail: thumb1,
    title: "Green Thumb at Axel’s place",
    channel: "Yahaya Farm",
    date: "June 13, 2025",
    views: 60,
    duration: "12:34",
    description:
      "Axel NIKIEMA is a Master’s student in agronomy with a passion for gardening..."
  },
  {
    id: 2,
    thumbnail: thumb2,
    title: "Agri Actu: The Boulmiougou dam",
    channel: "Yahaya Farm",
    date: "May 26, 2025",
    views: 1111,
    duration: "08:20",
    description:
      "The Boulmiougou dam in Ouagadougou plays an important role..."
  },

   {
    id: 2,
    thumbnail: thumb2,
    title: "Agri Actu: The Boulmiougou dam",
    channel: "Yahaya Farm",
    date: "May 26, 2025",
    views: 1111,
    duration: "08:20",
    description:
      "The Boulmiougou dam in Ouagadougou plays an important role..."
  },
   {
    id: 2,
    thumbnail: thumb2,
    title: "Agri Actu: The Boulmiougou dam",
    channel: "Yahaya Farm",
    date: "May 26, 2025",
    views: 1111,
    duration: "08:20",
    description:
      "The Boulmiougou dam in Ouagadougou plays an important role..."
  },
];

export default function FarmerChannel() {
  return (
    <Box p={4} h="100%" display="flex" flexDirection="column">
      <Text fontSize="lg" fontWeight="bold" mb={4} color="white">
        Farmer Channel Videos
      </Text>

      <Box flex="1" overflowY="auto" maxH="calc(100vh - 80px)">
        <SimpleGrid columns={[1, 2, 3]} gap={6}>
          {sampleVideos.map((video) => (
            <Box
              key={video.id}
              position="relative"
              bg="gray.800"
              borderRadius="md"
              overflow="hidden"
              boxShadow="sm"
              _hover={{ boxShadow: 'md' }}
            >
              <Image src={video.thumbnail} alt={video.title} objectFit="cover" w="100%" h="180px" />

              {/* Badge container */}
              <Box
                pos="absolute"
                top="2"
                left="2"
                bg="transparent"
                px={2}
                py={1}
                borderRadius="md"
                display="flex"
                alignItems="center"
                color="#fada25"
              >
                {/* Animated TV icon */}
                <MotionBox
                  animate={swing}
                  transformOrigin="center center"
                  display="flex"
                  alignItems="center"
                >
                  <Tv size={14} />
                </MotionBox>

                {/* Static label */}
                <Text as="span" ml={1} fontSize="10px" fontWeight="bold" color="#fada25">
                  STRINGS<Text as="sup" fontSize="6px">tv</Text>
                </Text>
              </Box>

              <Box
                pos="absolute"
                top="30%"
                left="50%"
                transform="translate(-50%, -40%)"
                w="60px"
                h="60px"
                border="3px solid #fada25"
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Box
                  as="span"
                  borderLeft="16px solid #fada25"
                  borderTop="10px solid transparent"
                  borderBottom="10px solid transparent"
                  ml="6px"
                />
              </Box>

              <Badge pos="absolute" bottom="130px" right="2" bg="rgba(0,0,0,0.6)" color="white" fontSize="xs" px={2} py={1} borderRadius="sm">
                {video.duration}
              </Badge>

              <VStack align="start" p={4} spacing={2}>
                <Text fontWeight="semibold" color="white">{video.title}</Text>
                <HStack spacing={2} color="gray.400" fontSize="sm">
                  <Text>{video.channel}</Text><Text>•</Text><Text>{video.date}</Text><Text>•</Text><ViewIcon size={14} /><Text>{video.views}</Text>
                </HStack>
                <Text fontSize="sm" color="gray.300" noOfLines={2}>{video.description}</Text>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
