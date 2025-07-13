// VideoEditor.jsx
import React, { useRef, useState, useEffect } from 'react'
import {
  Box, Flex, Stack, Text, Spacer, Input,
} from '@chakra-ui/react'
import {
  Plus, Crop, Cuboid, Mic,
  Undo2 as Undo, Redo2 as Redo, Trash2 as Trash,
  SkipBack, PlayCircle, SkipForward,
  Expand, Info, Circle,
} from 'lucide-react'
import { FaFont } from 'react-icons/fa6' // FontAwesome 6 font icon

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
  )
}

export default function VideoEditor() {
  const videoRef = useRef(null)
  const [file, setFile] = useState(null)
  const [src, setSrc] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [selectedClip, setSelectedClip] = useState(0)

  const timelineMarks = [20, 50, 70, 90]
  const clips = [
    { label: 'Clip 1', icon: Circle },
    { label: 'Clip 2', icon: Circle },
    { label: 'Clip 3', icon: Circle },
  ]

  const iconSize = 16
  const iconStroke = 1.5

  useEffect(() => {
    if (!file) {
      setSrc(null)
      return
    }
    const url = URL.createObjectURL(file)
    setSrc(url)
    return () => URL.revokeObjectURL(url)
  }, [file])

  const togglePlay = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) { v.play(); setIsPlaying(true) }
    else { v.pause(); setIsPlaying(false) }
  }

  const skip = dt => {
    const v = videoRef.current
    if (v) {
      const t = Math.max(0, Math.min(duration, currentTime + dt))
      v.currentTime = t
    }
  }

  const onTimeUpdate = () => setCurrentTime(videoRef.current.currentTime)
  const onLoaded = () => setDuration(videoRef.current.duration)
  const handleSeek = e => {
    videoRef.current.currentTime = parseFloat(e.target.value)
  }

  const formatTime = t => {
    const mm = String(Math.floor(t / 60)).padStart(2, '0')
    const ss = String(Math.floor(t % 60)).padStart(2, '0')
    return `${mm}:${ss}`
  }

  return (
    <Flex direction="column" height="100vh" bg="#2B2B2B" color="white">
      {/* Top toolbar */}
      <Flex as="header" px={6} py={2} bg="#3A3A3A" align="center" justify="space-between">
        <Stack direction="row" spacing={4} align="center">
          <IconBtn><Plus size={iconSize} strokeWidth={iconStroke} /></IconBtn>
          <Text fontSize="xs">Add Music</Text>
        </Stack>
        <Stack direction="row" spacing={3} align="center">
          <IconBtn onClick={togglePlay}><Mic color="#F75A3F" size={iconSize} strokeWidth={iconStroke} /></IconBtn>
          <IconBtn><Crop size={iconSize} strokeWidth={iconStroke} /></IconBtn>
          <IconBtn><FaFont size={iconSize} /></IconBtn>
        </Stack>
        <Stack direction="row" spacing={3}>
          <IconBtn><Cuboid size={iconSize} strokeWidth={iconStroke} /></IconBtn>
        </Stack>
      </Flex>

      {/* Video area */}
      <Box position="relative" flex={1} overflow="hidden">
        {src ? (
          <video
            ref={videoRef}
            src={src}
            onTimeUpdate={onTimeUpdate}
            onLoadedMetadata={onLoaded}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        ) : (
          <Flex direction="column" align="center" justify="center" height="100%" bg="#1F1F1F">
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

      {/* Bottom controls + timeline */}
      <Box bg="#3A3A3A">
        <Flex px={6} py={2} align="center">
          <IconBtn><Undo size={iconSize} strokeWidth={iconStroke} /></IconBtn>
          <IconBtn><Redo size={iconSize} strokeWidth={iconStroke} /></IconBtn>
          <IconBtn><Trash size={iconSize} strokeWidth={iconStroke} /></IconBtn>
          <Spacer />
          <IconBtn onClick={() => skip(-5)}><SkipBack size={iconSize} strokeWidth={iconStroke} /></IconBtn>
          <IconBtn onClick={togglePlay}><PlayCircle size={iconSize} strokeWidth={iconStroke} /></IconBtn>
          <IconBtn onClick={() => skip(5)}><SkipForward size={iconSize} strokeWidth={iconStroke} /></IconBtn>
          <Spacer />
          <IconBtn><Expand size={iconSize} strokeWidth={iconStroke} /></IconBtn>
          <IconBtn><Info size={iconSize} strokeWidth={iconStroke} /></IconBtn>
        </Flex>

        {/* Timeline + clips */}
        <Box px={6} py={4} position="relative">
          <Box position="relative" height="24px" mb={2}>
            {timelineMarks.map((sec, i) => {
              const pct = duration ? (sec / duration) * 100 : 0
              return (
                <Box key={i} position="absolute" left={`${pct}%`} top={0} transform="translateX(-1px)">
                  <Box w="2px" h="8px" bg="white" opacity={0.8} />
                  <Text fontSize="xx-small" pt={2} opacity={0.8}>{formatTime(sec)}</Text>
                </Box>
              )
            })}
            <Box position="absolute" left={`${(currentTime / duration) * 100}%`} top={0} transform="translateX(-1px)">
              <Box w="2px" h="8px" bg="#F9FF66" />
            </Box>
          </Box>

          <Box position="relative">
            <input
              type="range"
              min={0}
              max={duration}
              step="0.01"
              value={currentTime}
              onChange={handleSeek}
              style={{
                width: '100%',
                appearance: 'none',
                background: 'transparent',
                position: 'relative',
                zIndex: 2,
              }}
            />
            <Box position="absolute" top="6px" left={0} right={0} h="4px" bg="rgba(255,255,255,0.3)" />
            <Box position="absolute" top="6px" left={0} w={`${(currentTime / duration) * 100}%`} h="4px" bg="#F9FF66" />
          </Box>

          <Text textAlign="center" fontSize="xs" mt={2}>
            {formatTime(currentTime)} / {formatTime(duration)}
          </Text>

          <Flex gap={3} overflowX="auto" mt={4} px={6}>
            {clips.map((c, idx) => {
              const IconComp = c.icon
              const selected = idx === selectedClip
              return (
                <Flex
                  key={idx}
                  align="center"
                  px={3}
                  py={1}
                  bg={selected ? 'transparent' : '#4A4A4A'}
                  border={selected ? '2px solid #F9FF66' : 'none'}
                  borderRadius="full"
                  onClick={() => setSelectedClip(idx)}
                  cursor="pointer"
                >
                  <IconComp size={iconSize} strokeWidth={iconStroke} opacity={selected ? 1 : 0.8} />
                  <Text fontSize="xs" opacity={selected ? 1 : 0.8} ml={2}>{c.label}</Text>
                </Flex>
              )
            })}
          </Flex>
        </Box>
      </Box>
    </Flex>
  )
}
