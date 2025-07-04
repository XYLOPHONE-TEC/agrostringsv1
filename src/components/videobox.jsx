import React, { useRef, useEffect, useCallback } from "react";
import { Box, Flex, VStack, Icon, Input, Button, Text } from "@chakra-ui/react";
import { HeartIcon, Star, Share2, MessageSquare, Volume2, VolumeX, Tv } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const iconVariants = {
  hidden: { y: 50, opacity: 0, scale: 0.5 },
  visible: i => ({ y:0, opacity:1, scale:1, transition: { delay:i*0.1, type:"spring", stiffness:100, damping:10 } }),
  exit: { y:50, opacity:0, scale:0.5, transition: { duration:0.2 } },
};
const clickAnim = { scale:[1,1.4,1], transition:{ duration:0.4, ease:"easeInOut" } };

const VideoBox = ({ videos, currentIndex, setCurrentIndex }) => {
  const videoRef = useRef();
  const [liked, setLiked] = React.useState(false);
  const [fav, setFav] = React.useState(false);
  const [commentsCount, setCommentsCount] = React.useState(0);
  const [sharesCount, setSharesCount] = React.useState(0);
  const [soundOn, setSoundOn] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);
  const [clickedIcon, setClickedIcon] = React.useState(null);
  const [showCommentInput, setShowCommentInput] = React.useState(false);
  const [commentText, setCommentText] = React.useState("");

  const changeIndex = useCallback(delta => {
    setCurrentIndex(i => (i + delta + videos.length) % videos.length);
  }, [videos.length, setCurrentIndex]);

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

  useEffect(() => {
    const handleWheel = e => {
      e.preventDefault();
      if (e.deltaY > 50) changeIndex(1);
      if (e.deltaY < -50) changeIndex(-1);
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [changeIndex]);

  const icons = [
    { id:"like", icon:HeartIcon, active:liked, color:"red", onClick:() => setLiked(v=>!v), count: liked?1:0 },
    { id:"favorite", icon:Star, active:fav, color:"yellow.400", onClick:() => setFav(v=>!v), count: fav?1:0 },
    { id:"share", icon:Share2, active:false, color:"white", onClick:() => setSharesCount(c=>c+1), count: sharesCount },
    { id:"comment", icon:MessageSquare, active:false, color:"white", onClick:() => setShowCommentInput(v=>!v), count: commentsCount },
    { id:"sound", icon: soundOn? Volume2:VolumeX, active:soundOn, color:"white", onClick:() => setSoundOn(s=>!s), count:0 },
  ];

  return (
    <Box w="100%" h="100vh" pos="relative" bg="#000" overflow="hidden"
      onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>{setHovered(false); setShowCommentInput(false);}}
    >
      <Box as="video" ref={videoRef} src={videos[currentIndex].src}
        objectFit="cover" w="100%" h="100%" playsInline muted={!soundOn}
        onDoubleClick={() => { setLiked(true); setClickedIcon("like"); setTimeout(()=>setClickedIcon(null),400); }}
      />

      

      <AnimatePresence>
        {hovered && (
          <VStack pos="absolute" right="4" top="50%" transform="translateY(-50%)" spacing="6">
            {icons.map((d,i) => (
              <motion.div key={d.id} initial="hidden" animate="visible" exit="exit" variants={iconVariants} custom={i}>
                <motion.div animate={clickedIcon === d.id ? clickAnim : { scale:1 }}>
                  <Flex direction="column" align="center" cursor="pointer" onClick={() => { setClickedIcon(d.id); d.onClick(); setTimeout(()=>setClickedIcon(null),400); }}>
                    <Box bg="rgba(0, 0, 0, 0.74)" borderRadius="full" p="2">
                      <Icon as={d.icon} boxSize="4" color={d.active ? d.color : "white"} />
                    </Box>
                    <Text color="white" fontSize="sm">{d.count}</Text>
                  </Flex>
                </motion.div>
                {d.id==="comment" && showCommentInput && (
                  <Box pos="absolute" right="12" p="4" bg="rgba(0,0,0,0.7)" borderRadius="md">
                    <Input value={commentText} onChange={e=>setCommentText(e.target.value)} mb="2" bg="white" color="black" size="sm" placeholder="Comment…" />
                    <Button size="sm" w="full" onClick={() => { if(commentText.trim()){ setCommentsCount(c=>c+1); setCommentText(""); setShowCommentInput(false); }}}>Submit</Button>
                  </Box>
                )}
              </motion.div>
            ))}
          </VStack>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default VideoBox;
