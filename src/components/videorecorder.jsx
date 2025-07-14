// VideoRecorder.jsx
"use client";

import React, { useState, useEffect, useRef } from 'react';
import {
  Flex,
  Box,
  Text,
} from '@chakra-ui/react';
import { StopCircle, Undo2 as UndoIcon } from 'lucide-react';
import { RiRecordCircleLine } from 'react-icons/ri';

function ClickableLabel({ onClick, children, ...rest }) {
  return (
    <Box
      as="label"
      onClick={onClick}
      cursor="pointer"
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      p={2}
      borderRadius="full"
      bg="gray.700"
      _hover={{ bg: 'gray.600' }}
      {...rest}
    >
      {children}
    </Box>
  );
}

function ButtonLabel({ onClick, children, ...rest }) {
  return (
    <Box
      as="label"
      onClick={onClick}
      cursor="pointer"
      px={4}
      py={2}
      borderRadius="md"
      bg="yellow.400"
      color="black"
      fontWeight="semibold"
      _hover={{ bg: 'yellow.300' }}
      {...rest}
    >
      {children}
    </Box>
  );
}

export default function VideoRecorder({ onClose, onRecorded }) {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const [stream, setStream] = useState(null);
  const [recording, setRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    async function startStream() {
      try {
        const s = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setStream(s);
        if (videoRef.current) videoRef.current.srcObject = s;
      } catch (err) {
        console.error("Could not start media stream:", err);
        onClose();
      }
    }
    startStream();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
      if (stream) stream.getTracks().forEach(t => t.stop());
    };
  }, []);

  const startRecording = () => {
    if (!stream) return;
    chunksRef.current = [];
    const mr = new MediaRecorder(stream, { mimeType: 'video/webm; codecs=vp8,opus' });
    mediaRecorderRef.current = mr;
    mr.ondataavailable = e => {
      if (e.data && e.data.size > 0) chunksRef.current.push(e.data);
    };
    mr.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' });
      onRecorded?.(blob);
    };
    mr.start();
    setRecording(true);
    setDuration(0);
    intervalRef.current = setInterval(() => setDuration(d => d + 1), 1000);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    setRecording(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const formatTime = secs => {
    const mm = String(Math.floor(secs / 60)).padStart(2, '0');
    const ss = String(secs % 60).padStart(2, '0');
    return `${mm}:${ss}`;
  };

  return (
    <Flex
      direction="column"
      position="absolute"
      inset={0}
      bg="rgba(0,0,0,0.8)"
      align="center"
      justify="center"
      zIndex={50}
    >
      {/* Back/Undo */}
      <Box position="absolute" top={4} left={4}>
        <ClickableLabel onClick={onClose}>
          <UndoIcon size={15} color="white" />
        </ClickableLabel>
      </Box>
      <Box position="absolute" top={4} right={4}>
  <ClickableLabel>
    <Text fontSize="xs"  color="white">
      Save
    </Text>
  </ClickableLabel>
</Box>

      <Box border="2px solid white" borderRadius="md" overflow="hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          style={{ width: 480, height: 360, background: 'black' }}
        />
      </Box>

      <Flex mt={4} align="center" gap={4}>
        {recording ? (
          <ClickableLabel onClick={stopRecording} bg="red.500" _hover={{ bg: 'red.600' }}>
            <StopCircle size={24} color="white" />
          </ClickableLabel>
        ) : (
          <ClickableLabel onClick={startRecording} bg="green.500" _hover={{ bg: 'green.600' }}>
            <RiRecordCircleLine size={24} color="white" />
          </ClickableLabel>
        )}
        <Text fontSize="lg" color="white">
          {formatTime(duration)}
        </Text>
        {onRecorded && !recording && duration > 0 && (
          <ClickableLabel onClick={onClose}>
            Done
          </ClickableLabel>
        )}
      </Flex>
    </Flex>
  );
}
