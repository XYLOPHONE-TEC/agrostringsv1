// VideoEditor.jsx
"use client";

import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  Box,
  Flex,
  Stack,
  Text,
  Spacer,
  Input,
  Image,
} from '@chakra-ui/react';
import {
  Plus,
  Crop,
  Cuboid,
  Mic,
  Undo2 as Undo,
  Redo2 as Redo,
  Trash2 as Trash,
  SkipBack,
  PlayCircle,
  SkipForward,
  Expand,
  Info,
  Circle,
} from 'lucide-react';
import { FaFont } from 'react-icons/fa6';

function IconBtn({ children, onClick }) {
  return (
    <Box
      onClick={onClick}
      cursor="pointer"
      p={2}
      borderRadius="md"
      _hover={{ bg: 'rgba(255,255,255,0.1)' }}
    >
      {children}
    </Box>
  );
}

export default function VideoEditor() {
  const videoRef = useRef(null);
  const [file, setFile] = useState(null);
  const [src, setSrc] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Trim UI state
  const [thumbnails, setThumbnails] = useState([]);
  const [trimStart, setTrimStart] = useState(0);
  const [trimEnd, setTrimEnd] = useState(0);
  const [dragging, setDragging] = useState(null);

  const iconSize = 16;
  const iconStroke = 1.5;

  // Load file → blob URL
  useEffect(() => {
    if (!file) {
      setSrc(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setSrc(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  // When metadata loads, init duration, trims, and thumbs
  const onLoadedMetadata = () => {
    const v = videoRef.current;
    setDuration(v.duration);
    setTrimEnd(v.duration);
    generateThumbnails(v);
  };

  // Extract ~12 thumbnails evenly across the video
  const generateThumbnails = async (video) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const count = 12;
    canvas.width = 120;
    canvas.height = 68;

    const thumbs = [];
    for (let i = 0; i < count; i++) {
      const t = (video.duration * i) / (count - 1);
      await new Promise((res) => {
        video.currentTime = t;
        const handler = () => {
          video.removeEventListener('seeked', handler);
          res();
        };
        video.addEventListener('seeked', handler);
      });
      ctx.drawImage(video, 0, 0, 120, 68);
      thumbs.push(canvas.toDataURL());
    }
    setThumbnails(thumbs);
  };

  // Play / Pause toggle
  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  // Update currentTime on playback
  const onTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };

  // Skip forward/backward
  const skip = (dt) => {
    const v = videoRef.current;
    if (!v) return;
    let t = v.currentTime + dt;
    t = Math.max(0, Math.min(duration, t));
    v.currentTime = t;
  };

  // Map global mouse moves to trim handle drags
  const onMouseMove = useCallback(
    (e) => {
      if (!dragging) return;
      const strip = document.getElementById('thumb-strip');
      if (!strip) return;
      const rect = strip.getBoundingClientRect();
      let pct = (e.clientX - rect.left) / rect.width;
      pct = Math.max(0, Math.min(1, pct));
      const time = pct * duration;
      if (dragging === 'start') {
        setTrimStart(Math.min(time, trimEnd - 0.1));
      } else {
        setTrimEnd(Math.max(time, trimStart + 0.1));
      }
    },
    [dragging, duration, trimStart, trimEnd]
  );

  const onMouseUp = () => {
    setDragging(null);
  };

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [onMouseMove]);

  const startPct = duration ? (trimStart / duration) * 100 : 0;
  const endPct = duration ? (trimEnd / duration) * 100 : 0;
  const playPct = duration ? (currentTime / duration) * 100 : 0;

  const formatTime = (t) => {
    const mm = String(Math.floor(t / 60)).padStart(2, '0');
    const ss = String(Math.floor(t % 60)).padStart(2, '0');
    return `${mm}:${ss}`;
  };

  return (
    <Flex direction="column" height="100vh" bg="#2B2B2B" color="white">
      {/* Top toolbar */}
      <Flex
        as="header"
        px={6}
        py={2}
        bg="#3A3A3A"
        align="center"
        justify="space-between"
      >
        <Stack direction="row" spacing={4} align="center">
          <IconBtn>
            <Plus size={iconSize} strokeWidth={iconStroke} />
          </IconBtn>
          <Text fontSize="xs">Add Music</Text>
        </Stack>
        <Stack direction="row" spacing={3} align="center">
          <IconBtn onClick={togglePlay}>
            <Mic color="#F75A3F" size={iconSize} strokeWidth={iconStroke} />
          </IconBtn>
          <IconBtn>
            <Crop size={iconSize} strokeWidth={iconStroke} />
          </IconBtn>
          <IconBtn>
            <FaFont size={iconSize} />
          </IconBtn>
        </Stack>
        <Stack direction="row" spacing={3}>
          <IconBtn>
            <Cuboid size={iconSize} strokeWidth={iconStroke} />
          </IconBtn>
        </Stack>
      </Flex>

      {/* Video display */}
      <Box position="relative" flex={1} overflow="hidden">
        {src ? (
          <video
            ref={videoRef}
            src={src}
            onTimeUpdate={onTimeUpdate}
            onLoadedMetadata={onLoadedMetadata}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        ) : (
          <Flex
            direction="column"
            align="center"
            justify="center"
            height="100%"
            bg="#1F1F1F"
          >
            <Text mb={4}>Upload a video to begin editing</Text>
            <Input
              type="file"
              accept="video/*"
              onChange={(e) =>
                e.target.files && setFile(e.target.files[0])
              }
              width="auto"
            />
          </Flex>
        )}
      </Box>

      {/* Bottom controls + timeline */}
      <Box bg="#3A3A3A">
        <Flex px={6} py={2} align="center">
          <IconBtn>
            <Undo size={iconSize} strokeWidth={iconStroke} />
          </IconBtn>
          <IconBtn>
            <Redo size={iconSize} strokeWidth={iconStroke} />
          </IconBtn>
          <IconBtn>
            <Trash size={iconSize} strokeWidth={iconStroke} />
          </IconBtn>
          <Spacer />
          <IconBtn onClick={() => skip(-5)}>
            <SkipBack size={iconSize} strokeWidth={iconStroke} />
          </IconBtn>
          <IconBtn onClick={togglePlay}>
            <PlayCircle size={iconSize} strokeWidth={iconStroke} />
          </IconBtn>
          <IconBtn onClick={() => skip(5)}>
            <SkipForward size={iconSize} strokeWidth={iconStroke} />
          </IconBtn>
          <Spacer />
          <IconBtn>
            <Expand size={iconSize} strokeWidth={iconStroke} />
          </IconBtn>
          <IconBtn>
            <Info size={iconSize} strokeWidth={iconStroke} />
          </IconBtn>
        </Flex>

        {/* Thumbnail strip + trim handles + playhead */}
        <Box px={6} py={4}>
          <Box
            id="thumb-strip"
            position="relative"
            h="68px"
            overflowX="auto"
            bg="rgba(255,255,255,0.05)"
            borderRadius="md"
          >
            <Flex>
              {thumbnails.map((src, i) => (
                <Image
                  key={i}
                  src={src}
                  w="120px"
                  h="68px"
                  objectFit="cover"
                  flexShrink={0}
                />
              ))}
            </Flex>
            {/* Dimmed overlays */}
            <Box
              position="absolute"
              top={0}
              left="0"
              w={`${startPct}%`}
              h="100%"
              bg="rgba(0,0,0,0.6)"
            />
            <Box
              position="absolute"
              top={0}
              left={`${endPct}%`}
              w={`${100 - endPct}%`}
              h="100%"
              bg="rgba(0,0,0,0.6)"
            />
            {/* Start handle */}
            <Box
              position="absolute"
              top={0}
              left={`${startPct}%`}
              transform="translateX(-50%)"
              w="8px"
              h="100%"
              bg="yellow.400"
              cursor="ew-resize"
              onMouseDown={() => setDragging('start')}
            />
            {/* End handle */}
            <Box
              position="absolute"
              top={0}
              left={`${endPct}%`}
              transform="translateX(-50%)"
              w="8px"
              h="100%"
              bg="yellow.400"
              cursor="ew-resize"
              onMouseDown={() => setDragging('end')}
            />
            {/* Playhead overlay */}
            <Box
              position="absolute"
              top={0}
              left={`${playPct}%`}
              transform="translateX(-50%)"
              w="2px"
              h="100%"
              bg="yellow.400"
            />
          </Box>
          {/* Trim time display */}
          <Text fontSize="xs" color="gray.300" mt={2} textAlign="center">
            Trim: {formatTime(trimStart)} – {formatTime(trimEnd)}
          </Text>
        </Box>
      </Box>
    </Flex>
  );
}
