"use client";

import React, { useState, useRef, useEffect } from 'react';
import {
  Flex,
  Box,
  IconButton,
  Input,
  Button,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { Undo2 as UndoIcon } from 'lucide-react';

export default function TextOverlay({ onClose, onAddText }) {
  const overlayRef = useRef(null);
  const [text, setText] = useState('');
  const [pos, setPos] = useState({ x: 120, y: 120 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, origX: 0, origY: 0 });

  // Add drag event listeners
  useEffect(() => {
    if (dragging) {
      const move = e => {
        const dx = e.clientX - dragStart.current.x;
        const dy = e.clientY - dragStart.current.y;
        setPos({
          x: dragStart.current.origX + dx,
          y: dragStart.current.origY + dy,
        });
      };
      const up = () => setDragging(false);

      window.addEventListener('mousemove', move);
      window.addEventListener('mouseup', up);
      return () => {
        window.removeEventListener('mousemove', move);
        window.removeEventListener('mouseup', up);
      };
    }
  }, [dragging]);

  // Handle drag start
  const startDragging = e => {
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      origX: pos.x,
      origY: pos.y,
    };
    setDragging(true);
    e.stopPropagation();
  };

  // Submit text
  const handleAdd = () => {
    if (text.trim()) {
      onAddText({ text: text.trim(), x: pos.x, y: pos.y });
    }
    onClose();
  };

  return (
    <Flex
      ref={overlayRef}
      position="absolute"
      inset={0}
      direction="column"
      justify="center"
      align="center"
      bg="rgba(0, 0, 0, 0.65)"
      zIndex={50}
      onMouseDown={e => e.stopPropagation()}
    >
      {/* Close Button */}
      <Box position="absolute" top={4} right={4}>
        <IconButton
          icon={<UndoIcon size={24} color="white" />}
          aria-label="Close"
          onClick={onClose}
          variant="ghost"
          _hover={{ bg: 'whiteAlpha.200' }}
        />
      </Box>

      {/* Text Box */}
      <Box
        position="absolute"
        left={pos.x}
        top={pos.y}
        onMouseDown={startDragging}
        cursor="grab"
        p={2}
        bg="whiteAlpha.800"
        border="2px dashed gray"
        borderRadius="md"
        minW="150px"
      >
        <Text fontSize="lg" fontWeight="bold" color="gray.800" textAlign="center">
          {text || 'Your text here'}
        </Text>
      </Box>

      {/* Text Controls */}
      <Flex
        position="absolute"
        bottom={6}
        px={6}
        py={4}
        borderRadius="lg"
        bg="blackAlpha.700"
        gap={3}
      >
        <Input
          placeholder="Enter your text..."
          value={text}
          onChange={e => setText(e.target.value)}
          bg="white"
          color="black"
        />
        <Button onClick={handleAdd} colorScheme="yellow" px={6}>
          Add
        </Button>
      </Flex>
    </Flex>
  );
}