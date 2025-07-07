// Install dependencies:
// npm install react-swipeable framer-motion

import React, { useRef, useEffect, useCallback, useState } from "react";
import { Box, Flex, VStack, Icon, Input, Button, Text, Center } from "@chakra-ui/react";
import {
  HeartIcon, Star, Share2, MessageSquare,
  Volume2, VolumeX, Play, Pause
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";

// Animation settings
const iconVariants = {
  hidden: { y: 50, opacity: 0, scale: 0.5 },
  visible: i => ({
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.1, type: "spring", stiffness: 100, damping: 10 }
  }),
  exit: { y: 50, opacity: 0, scale: 0.5, transition: { duration: 0.2 } },
};
const clickAnim = { scale: [1, 1.4, 1], transition: { duration: 0.4, ease: "easeInOut" } };

export default function VideoBox({ videos, currentIndex, setCurrentIndex }) {
  const videoRef = useRef();
  const [liked, setLiked] = useState(false);
  const [fav, setFav] = useState(false);
  const [commentsCount, setCommentsCount] = useState(0);
  const [sharesCount, setSharesCount] = useState(0);
  const [soundOn, setSoundOn] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [clickedIcon, setClickedIcon] = useState(null);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [showPlayIcon, setShowPlayIcon] = useState(false);

  // Change video index based on swipe/wheel
  const changeIndex = useCallback(delta => {
    setCurrentIndex(i => (i + delta + videos.length) % videos.length);
    setUserInteracted(true);
  }, [videos.length, setCurrentIndex]);

  // Swipe handlers
  const handlers = useSwipeable({
    onSwipedUp: () => changeIndex(1),
    onSwipedDown: () => changeIndex(-1),
    onTap: () => setUserInteracted(true),
    trackMouse: false,
    preventScrollOnSwipe: true,
  });

  // Start video playback and mute/unmute based on soundOn
  useEffect(() => {
    const vid = videoRef.current;
    if (vid) {
      vid.pause();
      vid.currentTime = 0;
      vid.muted = !soundOn;
      vid.loop = true;
      vid.play().catch(() => {});
    }
  }, [currentIndex, soundOn]);

  // Automatically unmute on first interaction
  useEffect(() => {
    if (userInteracted && !soundOn) {
      setSoundOn(true);
    }
  }, [userInteracted, soundOn]);

  // Mouse wheel navigation
  useEffect(() => {
    const handleWheel = e => {
      e.preventDefault();
      if (e.deltaY > 50) changeIndex(1);
      if (e.deltaY < -50) changeIndex(-1);
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [changeIndex]);

  // Icon config
  const icons = [
    { id: "like", icon: HeartIcon, active: liked, color: "red", onClick: () => setLiked(v => !v), count: liked ? 1 : 0 },
    { id: "favorite", icon: Star, active: fav, color: "yellow.400", onClick: () => setFav(v => !v), count: fav ? 1 : 0 },
    { id: "share", icon: Share2, active: false, color: "white", onClick: () => setSharesCount(c => c + 1), count: sharesCount },
    { id: "comment", icon: MessageSquare, active: false, color: "white", onClick: () => setShowCommentInput(v => !v), count: commentsCount },
    { id: "sound", icon: soundOn ? Volume2 : VolumeX, active: soundOn, color: "white", onClick: () => setSoundOn(s => !s), count: 0 }
  ];

  // Play/Pause toggle with visual feedback
  const handleVideoTap = () => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.paused ? vid.play() : vid.pause();
    setShowPlayIcon(true);
    setTimeout(() => setShowPlayIcon(false), 600);
  };

  return (
    <Box
      {...handlers}
      w="100%"
      h="80vh"
      pos="relative"
    
      overflow="hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setShowCommentInput(false); }}
      onClick={handleVideoTap}
    >
      <Box
        as="video"
        ref={videoRef}
        src={videos[currentIndex].src}
        objectFit="cover"
        w="100%"
        h="100%"
    
        playsInline
        muted={!soundOn}
        onDoubleClick={() => {
          setLiked(true);
          setClickedIcon("like");
          setTimeout(() => setClickedIcon(null), 400);
        }}
      />

      {/* Play/Pause Overlay */}
      <AnimatePresence>
        {showPlayIcon && (
          <Center pos="absolute" top="0" left="0" w="100%" h="100%">
            <motion.div
              key="play-pause"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3 }}
            >
              <Box bg="rgba(0,0,0,0.6)" p="4" borderRadius="full">
                <Icon as={videoRef.current?.paused ? Play : Pause} boxSize={8} color="white" />
              </Box>
            </motion.div>
          </Center>
        )}
      </AnimatePresence>

      {/* Action Icons */}
      <AnimatePresence>
        {hovered && (
          <VStack pos="absolute" right="4" top="50%" spacing="6" transform="translateY(-50%)">
            {icons.map((d, i) => (
              <motion.div
                key={d.id}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={iconVariants}
                custom={i}
              >
                <motion.div animate={clickedIcon === d.id ? clickAnim : { scale: 1 }}>
                  <Flex
                    direction="column"
                    align="center"
                    cursor="pointer"
                    onClick={() => {
                      setClickedIcon(d.id);
                      d.onClick();
                      setTimeout(() => setClickedIcon(null), 400);
                    }}
                  >
                    <Box bg="rgba(0,0,0,0.74)" borderRadius="full" p="2">
                      <Icon as={d.icon} boxSize="3" color={d.active ? d.color : "white"} />
                    </Box>
                    <Text color="white" fontSize="sm">{d.count}</Text>
                  </Flex>
                </motion.div>

                {d.id === "comment" && showCommentInput && (
                  <Box pos="absolute" right="12" p="4" bg="rgba(0,0,0,0.7)" borderRadius="md">
                    <Input
                      value={commentText}
                      onChange={e => setCommentText(e.target.value)}
                      mb="2"
                      bg="white"
                      color="black"
                      size="sm"
                      placeholder="Comment…"
                    />
                    <Button
                      size="sm"
                      w="full"
                      onClick={() => {
                        if (commentText.trim()) {
                          setCommentsCount(c => c + 1);
                          setCommentText("");
                          setShowCommentInput(false);
                        }
                      }}
                    >
                      Submit
                    </Button>
                  </Box>
                )}
              </motion.div>
            ))}
          </VStack>
        )}
      </AnimatePresence>
    </Box>
  );
}
