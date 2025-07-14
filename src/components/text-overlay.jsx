"use client";

import React, { useState, useRef, useEffect } from 'react';
import {
  Flex,
  Box,
  IconButton,
  Input,
  Button,
  Text,
} from '@chakra-ui/react';
import { Undo2 as UndoIcon } from 'lucide-react';

export default function TextOverlay({ onClose, onAddText }) {
  const overlayRef = useRef(null);
  const [text, setText] = useState('');
  const [pos, setPos] = useState({ x: 120, y: 120 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, origX: 0, origY: 0 });

  // Drag behavior
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
      bg="rgba(0, 0, 0, 0.5)"
      zIndex={999}
      onMouseDown={e => e.stopPropagation()}
    >
      {/* Close Icon */}
      <Box position="absolute" top={4} right={4}>
        <IconButton
          icon={<UndoIcon size={20} />}
          aria-label="Close"
          onClick={onClose}
          variant="ghost"
          colorScheme="whiteAlpha"
          _hover={{ bg: 'whiteAlpha.300' }}
        />
      </Box>

      {/* Draggable Text Box */}
      <Box
        position="absolute"
        left={pos.x}
        top={pos.y}
        onMouseDown={startDragging}
        cursor="move"
        px={4}
        py={2}
        bg="white"
        borderRadius="md"
        boxShadow="lg"
        border="1px solid #ddd"
        minW="180px"
        textAlign="center"
      >
        <Text fontSize="lg" fontWeight="semibold" color="gray.700">
          {text || 'Type your text'}
        </Text>
      </Box>

      {/* Bottom Control Panel */}
      <Flex
        position="absolute"
        bottom={10}
        bg="white"
        px={5}
        py={4}
        borderRadius="xl"
        boxShadow="lg"
        gap={4}
        align="center"
      >
        <Input
          placeholder="Enter text..."
          value={text}
          onChange={e => setText(e.target.value)}
          bg="gray.100"
          color="black"
          borderRadius="md"
        />
        <Button onClick={handleAdd} colorScheme="yellow" px={6}>
          Add Text
        </Button>
      </Flex>
    </Flex>
  );
}