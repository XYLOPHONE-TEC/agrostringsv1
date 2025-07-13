"use client";

import React, { useState } from "react";
import {
  Box,
  Text,
  AspectRatio,
  Button,
  HStack,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";

export default function TvFarmer() {
  const [showAll, setShowAll] = useState(false);

  const videoIds = [
    "dQw4w9WgXcQ",
    "eX2qFMC8cFo",
    "sNPnbI1arSE",
    "3JZ_D3ELwOQ",
    "L_jWHffIx5E",
  ];

  const stringsTvIds = [
    "3JZ_D3ELwOQ",
    "Zi_XLOBDo_Y",
    "2vjPBrBU-TM",
    "RgKAFK5djSk",
  ];

  // Responsive video card width
  const videoWidth = useBreakpointValue({
    base: "100%",
    sm: "280px",
    md: "240px",
  });

  return (
    <Box p={{ base: 2, md: 4 }} bg="gray.800" color="white">
      <Text fontSize={{ base: "md", md: "lg" }} fontWeight="semibold" mb={4}>
        TV Dashboard
      </Text>

      {/* Main Featured Video */}
      <AspectRatio
        ratio={16 / 9}
        w="100%"
        borderRadius="md"
        overflow="hidden"
        mb={8}
      >
        <iframe
          title="Farm TV Stream"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          allowFullScreen
        />
      </AspectRatio>

      {/* My Videos Section */}
      <VStack align="start" spacing={4} mb={8}>
        <HStack justify="space-between" w="100%" align="center">
          <Text fontSize={{ base: "md", md: "lg" }} fontWeight="semibold">
            My Videos
          </Text>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowAll((prev) => !prev)}
          >
            {showAll ? "Show Less" : "See All"}
          </Button>
        </HStack>

        <Box
          w="100%"
          overflowX="auto"
          whiteSpace="nowrap"
          py={2}
          sx={{
            "&::-webkit-scrollbar": { height: "6px" },
            "&::-webkit-scrollbar-thumb": {
              bg: "gray.600",
              borderRadius: "3px",
            },
          }}
        >
          {(showAll ? videoIds : videoIds.slice(0, 3)).map((id) => (
            <AspectRatio
              ratio={16 / 9}
              width={videoWidth}
              display="inline-block"
              mr={4}
              key={id}
              borderRadius="md"
              overflow="hidden"
            >
              <iframe
                title={`video-${id}`}
                src={`https://www.youtube.com/embed/${id}`}
                allowFullScreen
              />
            </AspectRatio>
          ))}
        </Box>
      </VStack>

      {/* Strings TV Section */}
      <Box>
        <Text fontSize={{ base: "md", md: "lg" }} fontWeight="semibold" mb={4}>
          Strings TV
        </Text>
        <Box
          w="100%"
          overflowX="auto"
          whiteSpace="nowrap"
          py={2}
          sx={{
            "&::-webkit-scrollbar": { height: "6px" },
            "&::-webkit-scrollbar-thumb": {
              bg: "gray.600",
              borderRadius: "3px",
            },
          }}
        >
          {stringsTvIds.map((id) => (
            <AspectRatio
              ratio={16 / 9}
              width={videoWidth}
              display="inline-block"
              mr={4}
              key={id}
              borderRadius="md"
              overflow="hidden"
            >
              <iframe
                title={`strings-tv-${id}`}
                src={`https://www.youtube.com/embed/${id}`}
                allowFullScreen
              />
            </AspectRatio>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
