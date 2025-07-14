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
  Button,
  HStack,
} from '@chakra-ui/react';
import {

  VideoIcon,
  Undo2 as Undo,
  Redo2 as Redo,
  Trash2 as Trash,
  SkipBack,
  PlayCircle,
  SkipForward,
  Expand,
  Info,
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
  const hiddenVidRef = useRef(null);
  const rafRef = useRef(null);

  const [file, setFile] = useState(null);
  const [src, setSrc] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [thumbnails, setThumbnails] = useState([]);
  const [trimStart, setTrimStart] = useState(0);
  const [trimEnd, setTrimEnd] = useState(0);
  const [dragging, setDragging] = useState(null);

  const iconSize = 16;
  const iconStroke = 1.5;

  useEffect(() => {
    if (!file) {
      setSrc(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setSrc(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const onLoadedMetadata = () => {
    const v = hiddenVidRef.current;
    const dur = v.duration;
    setDuration(dur);
    setTrimEnd(dur);
    generateThumbnails(v, dur);
  };

  const generateThumbnails = (video, dur) => {
    const interval = 1;
    const canvas = document.createElement('canvas');
    canvas.width = 120;
    canvas.height = 68;
    const ctx = canvas.getContext('2d');
    const thumbs = [];
    let t = 0;

    const capture = () => { video.currentTime = t; };
    const onSeeked = () => {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      thumbs.push(canvas.toDataURL());
      t += interval;
      if (t <= dur) capture();
      else {
        video.removeEventListener('seeked', onSeeked);
        setThumbnails(thumbs);
      }
    };

    video.addEventListener('seeked', onSeeked);
    capture();
  };

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.currentTime = trimStart;
      v.play();
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  const onTimeUpdate = () => {
    const v = videoRef.current;
    const t = v.currentTime;
    setCurrentTime(t);
    if (t >= trimEnd) {
      v.pause();
      setIsPlaying(false);
    }
  };

  const skip = (dt) => {
    const v = videoRef.current;
    if (!v) return;
    let t = v.currentTime + dt;
    t = Math.max(trimStart, Math.min(trimEnd, t));
    v.currentTime = t;
  };

  const onMouseMove = useCallback((e) => {
    if (!dragging) return;
    const strip = document.getElementById('thumb-strip');
    if (!strip) return;
    const rect = strip.getBoundingClientRect();
    let pct = (e.clientX - rect.left) / rect.width;
    pct = Math.max(0, Math.min(1, pct));
    const time = pct * duration;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      dragging === 'start'
        ? setTrimStart(prev => Math.min(time, trimEnd - 0.1))
        : setTrimEnd(prev => Math.max(time, trimStart + 0.1));
    });
  }, [dragging, duration, trimStart, trimEnd]);

  useEffect(() => {
    const handleMouseUp = () => {
      rafRef.current && cancelAnimationFrame(rafRef.current);
      setDragging(null);
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [onMouseMove]);

  const startPct = duration ? (trimStart / duration) * 100 : 0;
  const endPct = duration ? (trimEnd / duration) * 100 : 0;
  const playPct = duration ? (currentTime / duration) * 100 : 0;

  const formatTime = t => {
    const mm = String(Math.floor(t / 60)).padStart(2,'0');
    const ss = String(Math.floor(t % 60)).padStart(2,'0');
    return `${mm}:${ss}`;
  };

  const saveAndPost = () => console.log('Save and post clicked');

  return (
    <Flex direction="column" height="80vh" bg="#2B2B2B" color="white">
      {/* Hidden elements */}
      <video ref={hiddenVidRef} src={src} style={{ display: 'none' }} onLoadedMetadata={onLoadedMetadata} />

      {/* Header toolbar */}
      <Flex as="header" px={6} py={2} bg="#3A3A3A" align="center" justify="space-between">
        
        <Stack direction="row" spacing={3} align="center">
          <IconBtn onClick={togglePlay}>
            <VideoIcon color="#F75A3F" size={iconSize} strokeWidth={iconStroke} />
          </IconBtn>
          <IconBtn>
            <FaFont size={iconSize} />
          </IconBtn>
        </Stack>
        <Stack direction="row" spacing={3} align="center">
          {/* Removed music volume control */}
          <Button size="sm" onClick={saveAndPost} bg="#fada25" color="black">Post</Button>
        </Stack>
      </Flex>

      {/* Main display */}
      <Box position="relative" flex={1} overflow="hidden">
        {src ? (
          <video
            ref={videoRef}
            src={src}
            onTimeUpdate={onTimeUpdate}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        ) : (
          <Flex direction="column" align="center" justify="center" height="100%" bg="#1F1F1F">
            <Text mb={4}>Upload a video to begin editing</Text>
            <Input type="file" accept="video/*" onChange={e => e.target.files && setFile(e.target.files[0])} width="auto" />
          </Flex>
        )}
      </Box>

      {/* Controls & trim strip */}
      <Box bg="#3A3A3A">
        <Flex px={6} py={2} align="center">
          <IconBtn><Undo size={iconSize} strokeWidth={iconStroke} /></IconBtn>
          <IconBtn><Redo size={iconSize} strokeWidth={iconStroke} /></IconBtn>
          <IconBtn><Trash size={iconSize} strokeWidth={iconStroke} /></IconBtn>
          <Spacer/>
          <IconBtn onClick={() => skip(-5)}><SkipBack size={iconSize} strokeWidth={iconStroke} /></IconBtn>
          <IconBtn onClick={togglePlay}><PlayCircle size={iconSize} strokeWidth={iconStroke} /></IconBtn>
          <IconBtn onClick={() => skip(5)}><SkipForward size={iconSize} strokeWidth={iconStroke} /></IconBtn>
          <Spacer/>
          <IconBtn><Expand size={iconSize} strokeWidth={iconStroke} /></IconBtn>
          <IconBtn><Info size={iconSize} strokeWidth={iconStroke} /></IconBtn>
        </Flex>

        <Box px={6} py={4}>
          <Box id="thumb-strip" position="relative" h="68px" overflowX="auto" bg="rgba(255,255,255,0.05)" borderRadius="md">
            <Flex w="100%">
              {thumbnails.map((thumb, i) => (
                <Image key={i} src={thumb} flexShrink={0} w={`${100 / thumbnails.length}%`} h="68px" objectFit="cover" />
              ))}
            </Flex>
            <Box position="absolute" top={0} left="0" w={`${startPct}%`} h="100%" bg="rgba(0,0,0,0.6)" />
            <Box position="absolute" top={0} left={`${endPct}%`} w={`${100 - endPct}%`} h="100%" bg="rgba(0,0,0,0.6)" />
            <Box position="absolute" top={0} left={`${startPct}%`} transform="translateX(-50%)" w="8px" h="100%" bg="yellow.400" cursor="ew-resize" onMouseDown={() => setDragging('start')} />
            <Box position="absolute" top={0} left={`${endPct}%`} transform="translateX(-50%)" w="8px" h="100%" bg="yellow.400" cursor="ew-resize" onMouseDown={() => setDragging('end')} />
            <Box position="absolute" top={0} left={`${playPct}%`} transform="translateX(-50%)" w="2px" h="100%" bg="yellow.400" />
          </Box>
          <Text fontSize="xs" color="gray.300" mt={2} textAlign="center">
            Trim: {formatTime(trimStart)} – {formatTime(trimEnd)}
          </Text>
        </Box>
      </Box>
    </Flex>
  );
}
