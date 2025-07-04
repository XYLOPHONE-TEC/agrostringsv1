// src/components/VideoBox.jsx
import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  Box,
  Flex,
  Text,
  VStack,
  Input,
  Button,
  Icon,
  AspectRatio,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Star,
  Share2,
  MessageSquare,
  Volume2,
  VolumeX,
  Tv,
} from "lucide-react";
import demoVideo1 from "../assets/videos/demo.mp4";
import demoVideo2 from "../assets/videos/demo2.mp4";

// Motion animation variants
const iconVariants = {
  hidden: { y: 50, opacity: 0, scale: 0.5 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.1, type: "spring", stiffness: 100, damping: 10 }
  }),
  exit: { y: 50, opacity: 0, scale: 0.5, transition: { duration: 0.2 } },
};
const clickAnimation = { scale: [1, 1.4, 1], transition: { duration: 0.4, ease: "easeInOut" } };

const videos = [demoVideo1, demoVideo2];

const VideoBox = () => {
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
  const [soundOn, setSoundOn] = useState(false);

  const changeIndex = useCallback((delta) => {
    setIndex(i => (i + delta + videos.length) % videos.length);
    setLiked(false);
    setFavorites(false);
    setCommentsCount(0);
    setSharesCount(0);
    setShowCommentInput(false);
    setCommentText("");
    setSoundOn(false);
  }, []);

  let wheelTimeout = null;
  const handleWheel = e => {
    e.preventDefault();
    if (wheelTimeout) return;
    if (e.deltaY > 50) changeIndex(1);
    if (e.deltaY < -50) changeIndex(-1);
    wheelTimeout = setTimeout(() => (wheelTimeout = null), 800);
  };

  useEffect(() => {
    const vid = videoRef.current;
    if (vid) {
      vid.pause();
      vid.currentTime = 0;
      vid.muted = !soundOn;
      vid.loop = true;
      vid.play().catch(() => {});
    }
  }, [index, soundOn]);

  const handleIconClick = (id, onClick) => {
    setClickedIcon(id);
    if (id === "comment") setShowCommentInput(true);
    onClick();
    setTimeout(() => setClickedIcon(null), 400);
  };

  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      setCommentsCount(c => c + 1);
      setCommentText("");
      setShowCommentInput(false);
    }
  };

  const iconsData = [
    { id: "like", icon: Heart, colorActive: "red", active: liked, onClick: () => setLiked(v => !v), count: liked ? 1 : 0 },
    { id: "favorite", icon: Star, colorActive: "yellow.400", active: favorites, onClick: () => setFavorites(v => !v), count: favorites ? 1 : 0 },
    { id: "share", icon: Share2, colorActive: "white", active: false, onClick: () => setSharesCount(c => c + 1), count: sharesCount },
    { id: "comment", icon: MessageSquare, colorActive: "white", active: false, onClick: () => {}, count: commentsCount },
    { id: "sound", icon: soundOn ? Volume2 : VolumeX, colorActive: "white", active: soundOn, onClick: () => setSoundOn(s => !s), count: 0 },
  ];

  return (
    <Box
      w="100vw"
      h="100vh"
      bg="black"
      pos="relative"
      overflow="hidden"
      onWheel={handleWheel}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AspectRatio ratio={9/16} w="100%" h="100%">
        <Box
          as="video"
          ref={videoRef}
          src={videos[index]}
          objectFit="cover"
          w="100%"
          h="100%"
          playsInline
          muted={!soundOn}
          onDoubleClick={() => handleIconClick("like", () => setLiked(true))}
        />
      </AspectRatio>

      {/* LIVE Label */}
      <AnimatePresence>
        {isHovered && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            <Flex pos="absolute" top="4" left="4" bg="rgba(0,0,0,0.6)" p={2} borderRadius="md">
              <Icon as={Tv} color="white" mr={1} />
              <Text color="white" fontWeight="bold">LIVE</Text>
            </Flex>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Icons */}
      <AnimatePresence>
        {isHovered && (
          <VStack pos="absolute" right="4" top="50%" transform="translateY(-50%)" spacing={6}>
            {iconsData.map((d, i) => (
              <Flex key={d.id} align="center">
                {showCommentInput && d.id === "comment" && (
                  <Box pos="absolute" right="60" p={4} bg="rgba(0,0,0,0.7)" borderRadius="md">
                    <Input
                      placeholder="Write comment..."
                      bg="white"
                      color="black"
                      size="sm"
                      value={commentText}
                      onChange={e => setCommentText(e.target.value)}
                      mb={2}
                    />
                    <Button size="sm" w="full" onClick={handleCommentSubmit} isDisabled={!commentText.trim()}>
                      Submit
                    </Button>
                  </Box>
                )}
                <motion.div custom={i} initial="hidden" animate="visible" exit="exit" variants={iconVariants}>
                  <motion.div animate={clickedIcon === d.id ? clickAnimation : { scale: 1 }}>
                    <Flex direction="column" align="center" cursor="pointer" onClick={() => handleIconClick(d.id, d.onClick)}>
                      <Box p={2} bg="rgba(0,0,0,0.4)" borderRadius="full">
                        <Icon as={d.icon} boxSize={6} color={d.active ? d.colorActive : "white"} />
                      </Box>
                      <Text color="white" fontSize="sm" mt={1}>{d.count}</Text>
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
