// src/components/tv‑farmer.jsx
"use client";

import React from "react";
import { Box, Text, AspectRatio } from "@chakra-ui/react";

export default function TvFarmer() {
  return (
    <Box>
      <Text fontSize="lg" fontWeight="semibold" mb={4} color="white">
        TV Dashboard
      </Text>
      {/* Example: embed a live stream or video feed */}
      <AspectRatio ratio={16 / 9} w="100%" borderRadius="md" overflow="hidden">
        <iframe
          title="Farm TV Stream"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          allowFullScreen
        />
      </AspectRatio>
    </Box>
  );
}
