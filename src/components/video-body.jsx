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
  Button,
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

import VideoRecorder from './Videorecorder';
import TextOverlay from './text-overlay';

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

  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const [showRecorder, setShowRecorder] = useState(false);
  const [showTextOverlay, setShowTextOverlay] = useState(false);
  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const iconSize = 16, iconStroke = 1.5;

  useEffect(() => {
    if (!file) {
      setSrc(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setSrc(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const pushHistory = (s, e) => {
    const h = history.slice(0, historyIndex + 1);
    h.push({ s, e });
    setHistory(h);
    setHistoryIndex(h.length - 1);
  };

  const onLoadedMetadata = () => {
    const dur = hiddenVidRef.current.duration;
    setDuration(dur);
    setTrimEnd(dur);
    generateThumbnails(hiddenVidRef.current, dur);
    pushHistory(0, dur);
  };

  const generateThumbnails = (video, dur) => {
    const count = Math.floor(dur) + 1;
    const c = document.createElement('canvas');
    c.width = 120; c.height = 68;
    const ctx = c.getContext('2d');
    const onSeek = () => {
      ctx.drawImage(video, 0, 0, 120, 68);
      const d = c.toDataURL();
      setThumbnails(Array(count).fill(d));
      video.removeEventListener('seeked', onSeek);
    };
    video.addEventListener('seeked', onSeek);
    video.currentTime = 0;
  };

  const formatTime = t => {
    const mm = String(Math.floor(t / 60)).padStart(2, '0');
    const ss = String(Math.floor(t % 60)).padStart(2, '0');
    return `${mm}:${ss}`;
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const { s, e } = history[historyIndex - 1];
      setTrimStart(s); setTrimEnd(e); setHistoryIndex(historyIndex - 1);
    }
  };
  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const { s, e } = history[historyIndex + 1];
      setTrimStart(s); setTrimEnd(e); setHistoryIndex(historyIndex + 1);
    }
  };
  const handleDelete = () => {
    setTrimStart(0); setTrimEnd(duration); pushHistory(0, duration);
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
    const t = videoRef.current.currentTime;
    setCurrentTime(t);
    if (t >= trimEnd) togglePlay();
  };
  const skip = dt => {
    const v = videoRef.current; if (!v) return;
    let t = v.currentTime + dt;
    t = Math.max(trimStart, Math.min(trimEnd, t));
    v.currentTime = t;
  };

  const handleTrim = (s, e) => { setTrimStart(s); setTrimEnd(e); pushHistory(s, e); };
  const onMouseMove = useCallback(e => {
    if (!dragging) return;
    const r = document.getElementById('thumb-strip').getBoundingClientRect();
    let pct = (e.clientX - r.left) / r.width;
    pct = Math.max(0, Math.min(1, pct));
    const tm = pct * duration;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (dragging === 'start') {
        const s = Math.min(tm, trimEnd - 0.1);
        handleTrim(s, trimEnd);
      } else {
        const ee = Math.max(tm, trimStart + 0.1);
        handleTrim(trimStart, ee);
      }
    });
  }, [dragging, trimStart, trimEnd, duration]);

  useEffect(() => {
    const up = () => { rafRef.current && cancelAnimationFrame(rafRef.current); setDragging(null); };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', up);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', up);
    };
  }, [onMouseMove]);

  const handleFullscreen = () => {
    const el = videoRef.current;
    if (!isFullscreen) el.requestFullscreen?.(); else document.exitFullscreen?.();
    setIsFullscreen(!isFullscreen);
  };

  return (
    <Flex direction="column" h="80vh" bg="#2B2B2B" color="white">
      <video ref={hiddenVidRef} src={src} style={{ display: 'none' }} onLoadedMetadata={onLoadedMetadata} />

      {/* Header */}
      <Flex as="header" px={6} py={2} bg="#3A3A3A" align="center" justify="space-between">
        <Stack direction="row" spacing={3} align="center">
          <IconBtn onClick={() => setShowRecorder(true)}>
            <VideoIcon color="#F75A3F" size={iconSize} strokeWidth={iconStroke} />
          </IconBtn>
          <IconBtn onClick={() => setShowTextOverlay(true)}>
            <FaFont size={iconSize} />
          </IconBtn>
        </Stack>
        <Button size="sm" bg="#fada25" color="black" onClick={() => console.log('Post')}>
          Post
        </Button>
      </Flex>

      {/* Video Display */}
      <Box flex={1} pos="relative" overflow="hidden">
        {src ? (
          <video
            ref={videoRef}
            src={src}
            onTimeUpdate={onTimeUpdate}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        ) : (
          <Flex h="100%" align="center" justify="center" bg="#1F1F1F" direction="column">
            <Text mb={4}>Upload a video to begin editing</Text>
            <Input
              type="file"
              accept="video/*"
              onChange={e => e.target.files && setFile(e.target.files[0])}
              width="auto"
            />
          </Flex>
        )}
      </Box>

      {/* Controls & Thumbnails */}
      <Box bg="#3A3A3A">
        <Flex px={6} py={2} align="center">
          <IconBtn onClick={handleUndo}>
            <Undo size={iconSize} strokeWidth={iconStroke} />
          </IconBtn>
          <IconBtn onClick={handleRedo}>
            <Redo size={iconSize} strokeWidth={iconStroke} />
          </IconBtn>
          <IconBtn onClick={handleDelete}>
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
          <IconBtn onClick={handleFullscreen}>
            <Expand size={iconSize} strokeWidth={iconStroke} />
          </IconBtn>

          {/** Info button + small tooltip panel **/}
          <Box position="relative" display="inline-block">
            <IconBtn onClick={() => setShowInfoPanel(!showInfoPanel)}>
              <Info size={iconSize} strokeWidth={iconStroke} />
            </IconBtn>
            {showInfoPanel && (
              <Box
                position="absolute"
                bottom="100%"
                right={0}
                mb={2}
               
                bg="rgba(28, 27, 27, 0.85)"
                color="white"
                p={2}
                borderRadius="md"
                boxShadow="lg"
                zIndex={10}
                minW="100px"
              >
                <Text fontSize="xs"><b>Name:</b> {file?.name || '—'}</Text>
                <Text fontSize="xs"><b>Size:</b> {file ? `${(file.size / 1024**2).toFixed(2)} MB` : '—'}</Text>
                <Text fontSize="xs"><b>Duration:</b> {formatTime(duration)}</Text>
              </Box>
            )}
          </Box>
        </Flex>

        <Box px={6} py={4}>
          <Box
            id="thumb-strip"
            pos="relative"
            h="68px"
            overflowX="auto"
            bg="rgba(255,255,255,0.05)"
            borderRadius="md"
          >
            <Flex w="100%">
              {thumbnails.map((t, i) => (
                <Box key={i} flexShrink={0} w={`${100 / thumbnails.length}%`} h="68px" bg="black" mx="0.5px">
                  <Image src={t} w="100%" h="100%" objectFit="cover" />
                </Box>
              ))}
            </Flex>
            <Box
              pos="absolute"
              top={0}
              left={`${(trimStart / duration) * 100}%`}
              w={`${((trimEnd - trimStart) / duration) * 100}%`}
              h="100%"
              bg="rgba(0,0,0,0.6)"
            />
          </Box>
          <Text fontSize="xs" color="gray.300" mt={2} textAlign="center">
            Trim: {formatTime(trimStart)} – {formatTime(trimEnd)}
          </Text>
        </Box>
      </Box>

      {/* Overlays */}
      {showRecorder && (
        <VideoRecorder
          onClose={() => setShowRecorder(false)}
          onRecorded={blob => {
            setFile(new File([blob], 'recorded.webm', { type: blob.type }));
            setShowRecorder(false);
          }}
        />
      )}
      {showTextOverlay && (
        <TextOverlay
          onClose={() => setShowTextOverlay(false)}
          onAddText={item => {
            console.log('Add text:', item);
            setShowTextOverlay(false);
          }}
        />
      )}
    </Flex>
  );
}
