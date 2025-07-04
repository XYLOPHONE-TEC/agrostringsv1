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
import thumb1 from '../assets/images/farmer.png';
import thumb2 from '../assets/images/farmer.png';

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
];

export default function FarmerChannel() {
  return (
    <Box p={4} bg="black">
      <Text fontSize="lg" fontWeight="bold" mb={4}>
        Farmer Channel Videos
      </Text>

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
            {/* Thumbnail */}
            <Image
              src={video.thumbnail}
              alt={video.title}
              objectFit="cover"
              w="100%"
              h="180px"
            />

            {/* Top-left "TV" badge */}
            <Badge
              position="absolute"
              top="2"
              left="2"
              bg="transparent"
              color="#fada25"
              px={2}
              py={1}
              borderRadius="md"
              display="flex"
              alignItems="center"
            >
              <Tv size={14} />
              <Text as="span" ml={1} fontSize="10px" fontWeight="bold">
                STRINGS<Text as="sup" fontSize="6px">tv</Text>
              </Text>
            </Badge>

            {/* Centered Play Icon */}
            <Box
              position="absolute"
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

            {/* Duration badge at bottom-left of the image */}
            <Badge
              position="absolute"
              bottom="130px"
              right="2"
              bg="rgba(0,0,0,0.6)"
              color="white"
              fontSize="xs"
              px={2}
              py={1}
              borderRadius="sm"
            >
              {video.duration}
            </Badge>

            {/* Details below thumbnail */}
            <VStack align="start" p={4} spacing={2}>
              <Text fontWeight="semibold" color="white">
                {video.title}
              </Text>
              <HStack spacing={2} color="gray.400" fontSize="sm">
                <Text>{video.channel}</Text>
                <Text>•</Text>
                <Text>{video.date}</Text>
                <Text>•</Text>
                <ViewIcon size={14} />
                <Text>{video.views}</Text>
              </HStack>
              <Text fontSize="sm" color="gray.300" noOfLines={2}>
                {video.description}
              </Text>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}
