import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  Box,
  AspectRatio,
  Flex,
  IconButton,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useSwipeable } from "react-swipeable";
import { motion } from "framer-motion";
import { Heart, Star, Share2, MessageSquare } from "lucide-react";
import demoVideo1 from "../assets/videos/demo.mp4";
import demoVideo2 from "../assets/videos/demo2.mp4";
import "../index.css"; // Ensure your CSS is imported

const VideoBox = () => {
  const videos = [demoVideo1, demoVideo2];
  const [index, setIndex] = useState(0);
  const videoRef = useRef(null);

  const [liked, setLiked] = useState(false);
  const [favorites, setFavorites] = useState(false);
  const [commentsCount, setCommentsCount] = useState(0);
  const [sharesCount, setSharesCount] = useState(0);

  const changeIndex = useCallback(
    (delta) => {
      setIndex((i) => (i + delta + videos.length) % videos.length);
      setLiked(false);
      setFavorites(false);
      setCommentsCount(0);
      setSharesCount(0);
    },
    [videos.length]
  );

  useEffect(() => {
    const vid = videoRef.current;
    if (vid) {
      vid.pause();
      vid.currentTime = 0;
      vid.muted = true;
      vid.loop = true;
      vid.play().catch(() => {});
    }
  }, [index]);

  const handlers = useSwipeable({
    onSwipedUp: () => changeIndex(1),
    onSwipedDown: () => changeIndex(-1),
    delta: 50,
    preventDefaultTouchmoveEvent: true,
    trackTouch: true,
    trackMouse: true,
  });

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp") changeIndex(1);
      if (e.key === "ArrowDown") changeIndex(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [changeIndex]);

  return (
    <Box
      {...handlers}
      w="100%"
      h="100%"
      bg="#000"
      pos="relative"
      overflow="hidden"
      touchAction="none"
      userSelect="none"
      zIndex={1}
    >
      <AspectRatio ratio={9 / 16} w="100%" h="100%">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box
            as="video"
            ref={videoRef}
            src={videos[index]}
            objectFit="cover"
            w="100%"
            h="100%"
            playsInline
            muted
            loop
          />
        </motion.div>
      </AspectRatio>

      <VStack
        pos="absolute"
        right="10px"
        top="50%"
        transform="translateY(-50%)"
        spacing={6}
        zIndex={2} // ensures it's above the video
      >
        {/* Like */}
        <Flex direction="column" align="center" cursor="pointer" onClick={() => setLiked((v) => !v)}>
          <IconButton
            aria-label="Like"
            variant="ghost"
            size="lg"
            bg="rgba(0,0,0,0.3)"
            borderRadius="full"
            _hover={{ bg: "rgba(0,0,0,0.5)" }}
            icon={<Icon as={Heart} boxSize={6} color={liked ? "red" : "white"} />}
          />
          <Text fontSize="sm" color="white">
            {liked ? 1 : 0}
          </Text>
        </Flex>

        {/* Favorite */}
        <Flex direction="column" align="center" cursor="pointer" onClick={() => setFavorites((v) => !v)}>
          <IconButton
            aria-label="Favorite"
            variant="ghost"
            size="lg"
            bg="rgba(0,0,0,0.3)"
            borderRadius="full"
            _hover={{ bg: "rgba(0,0,0,0.5)" }}
            icon={<Icon as={Star} boxSize={6} color={favorites ? "yellow" : "white"} />}
          />
          <Text fontSize="sm" color="white">
            {favorites ? 1 : 0}
          </Text>
        </Flex>

        {/* Share */}
        <Flex direction="column" align="center" cursor="pointer" onClick={() => setSharesCount((c) => c + 1)}>
          <IconButton
            aria-label="Share"
            variant="ghost"
            size="lg"
            bg="rgba(0,0,0,0.3)"
            borderRadius="full"
            _hover={{ bg: "rgba(0,0,0,0.5)" }}
            icon={<Icon as={Share2} boxSize={6} color="white" />}
          />
          <Text fontSize="sm" color="white">
            {sharesCount}
          </Text>
        </Flex>

        {/* Comment */}
        <Flex direction="column" align="center" cursor="pointer" onClick={() => setCommentsCount((c) => c + 1)}>
          <IconButton
            aria-label="Comment"
            variant="ghost"
            size="lg"
            bg="rgba(0,0,0,0.3)"
            borderRadius="full"
            _hover={{ bg: "rgba(0,0,0,0.5)" }}
            icon={<Icon as={MessageSquare} boxSize={6} color="white" />}
          />
          <Text fontSize="sm" color="white">
            {commentsCount}
          </Text>
        </Flex>
      </VStack>
    </Box>
  );
};

export default VideoBox;
