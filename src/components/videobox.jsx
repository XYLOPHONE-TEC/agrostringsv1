import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  Box,
  AspectRatio,
  Flex,
  Icon,
  Text,
  VStack,
  Input,
  Button,
} from "@chakra-ui/react";
import { useSwipeable } from "react-swipeable";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Star, Share2, MessageSquare } from "lucide-react";
import demoVideo1 from "../assets/videos/demo.mp4";
import demoVideo2 from "../assets/videos/demo2.mp4";
import "../index.css";

const iconVariants = {
  hidden: { y: 50, opacity: 0, scale: 0.5 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.1,
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  }),
  exit: { y: 50, opacity: 0, scale: 0.5, transition: { duration: 0.2 } },
};

const clickAnimation = {
  scale: [1, 1.4, 1],
  rotate: [0, 15, -15, 0],
  transition: { duration: 0.4, ease: "easeInOut" },
};

const closeIconVariants = {
  initial: { scale: 1, opacity: 1 },
  hover: { scale: 1.2, opacity: 0.8 },
  tap: { scale: 0.9, opacity: 1 },
  pulse: {
    scale: [1, 1.1, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeInOut",
    },
  },
};

const VideoBox = () => {
  const videos = [demoVideo1, demoVideo2];
  const [index, setIndex] = useState(0);
  const videoRef = useRef(null);

  const [liked, setLiked] = useState(false);
  const [favorites, setFavorites] = useState(false);
  const [commentsCount, setCommentsCount] = useState(0);
  const [sharesCount, setSharesCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [clickedIcon, setClickedIcon] = useState(null);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [commentText, setCommentText] = useState("");

  const changeIndex = useCallback(
    (delta) => {
      setIndex((i) => (i + delta + videos.length) % videos.length);
      setLiked(false);
      setFavorites(false);
      setCommentsCount(0);
      setSharesCount(0);
      setShowCommentInput(false);
      setCommentText("");
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

  const handleIconClick = (id, onClick) => {
    setClickedIcon(id);
    if (id === "comment") {
      setShowCommentInput(true);
    } else {
      setShowCommentInput(false);
    }
    onClick();
    setTimeout(() => setClickedIcon(null), 400);
  };

  const handleCommentSubmit = () => {
    if (commentText.trim() !== "") {
      setCommentsCount((c) => c + 1);
      setCommentText("");
      setShowCommentInput(false);
    }
  };

  const iconsData = [
    {
      id: "like",
      icon: Heart,
      colorActive: "red",
      active: liked,
      onClick: () => setLiked((v) => !v),
      count: liked ? 1 : 0,
    },
    {
      id: "favorite",
      icon: Star,
      colorActive: "yellow.400",
      active: favorites,
      onClick: () => setFavorites((v) => !v),
      count: favorites ? 1 : 0,
    },
    {
      id: "share",
      icon: Share2,
      colorActive: "white",
      active: false,
      onClick: () => setSharesCount((c) => c + 1),
      count: sharesCount,
    },
    {
      id: "comment",
      icon: MessageSquare,
      colorActive: "white",
      active: false,
      onClick: () => {}, // handled in handleIconClick
      count: commentsCount,
    },
  ];

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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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

      <AnimatePresence>
        {isHovered && (
          <VStack
            pos="absolute"
            right="10px"
            top="50%"
            transform="translateY(-50%)"
            spacing={6}
            zIndex={2}
            align="flex-end"
          >
            {iconsData.map(({ id, icon, colorActive, active, onClick, count }, i) => (
              <Flex key={id} align="center">
                {showCommentInput && id === "comment" && (
                  <Box
                    p={3}
                    bg="rgba(0,0,0,0.7)"
                    borderRadius="md"
                    w="500px"
                    mr={3}
                    color="white"
                    position="relative"
                  >
                    <motion.div
                      variants={closeIconVariants}
                      initial="initial"
                      animate="pulse"
                      whileHover="hover"
                      whileTap="tap"
                      style={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        backgroundColor: "rgba(255, 0, 0, 0.7)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        userSelect: "none",
                      }}
                      onClick={() => setShowCommentInput(false)}
                      tabIndex={0}
                      role="button"
                      aria-label="Close comment input"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          setShowCommentInput(false);
                        }
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </motion.div>
                    <Input
                      placeholder="Write a comment..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      mb={2}
                      size="sm"
                      bg="white"
                      color="black"
                      pr="40px"
                    />
                    <Button
                      size="sm"
                      colorScheme="blue"
                      onClick={handleCommentSubmit}
                      isDisabled={commentText.trim() === ""}
                      w="100%"
                    >
                      Submit
                    </Button>
                  </Box>
                )}
                <motion.div
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={iconVariants}
                >
                  <motion.div
                    animate={clickedIcon === id ? clickAnimation : { scale: 1, rotate: 0 }}
                    style={{ display: "inline-block" }}
                  >
                    <Flex
                      direction="column"
                      align="center"
                      cursor="pointer"
                      onClick={() => handleIconClick(id, onClick)}
                      userSelect="none"
                    >
                      <Box
                        p={2}
                        borderRadius="full"
                        bg="rgba(0,0,0,0.3)"
                        _hover={{ bg: "rgba(0,0,0,0.5)" }}
                        transition="background-color 0.3s"
                      >
                        <Icon as={icon} boxSize={6} color={active ? colorActive : "white"} />
                      </Box>
                      <Text fontSize="sm" color="white" mt={1}>
                        {count}
                      </Text>
                    </Flex>
                  </motion.div>
                </motion.div>
              </Flex>
            ))}
          </VStack>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default VideoBox;
