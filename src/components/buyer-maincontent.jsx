// ProductSliderWithArrivals.jsx

import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Flex,
  Image,
  Button,
  Badge,
  Spinner,
  Text,
  Heading,
} from "@chakra-ui/react";
import Nearme from './near-me-products'
import QuickActions from './quick-actions'

const containSliderData = [
  { id: "1", title: "",  background: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=600&auto=format&fit=crop&q=60" },
  { id: "2", title: "",  background: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=600&auto=format&fit=crop&q=60" },
  { id: "3", title: "",  background: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=600&auto=format&fit=crop&q=60" },
];

const coverSliderData = [
  { id: "1", title: "",  background: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=600&auto=format&fit=crop&q=60" },
  { id: "2", title: "", background: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=600&auto=format&fit=crop&q=60" },
  { id: "3", title: "",  background: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=600&auto=format&fit=crop&q=60" },
];

const SLIDE_DURATION = 6000;
const FADE_DURATION = 1000;

function CombinedSlider({ containData, coverData }) {
  const [phase, setPhase] = useState("contain");
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentData = phase === "contain" ? containData : coverData;
  const [fade, setFade] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(0);
      setTimeout(() => {
        let nextIdx = currentIndex + 1;
        if (nextIdx >= currentData.length) {
          nextIdx = 0;
          setPhase((p) => (p === "contain" ? "cover" : "contain"));
        }
        setCurrentIndex(nextIdx);
        setFade(1);
      }, FADE_DURATION);
    }, SLIDE_DURATION);
    return () => clearInterval(interval);
  }, [currentIndex, currentData.length, phase]);

  return (
    <Box pos="relative" w="100%" h="220px" overflow="hidden">
      <Box pos="absolute" top="0" left="0" right="0" h="10px" bg="#FADA25" zIndex={2} />
      <Image
        src={currentData[currentIndex].background}
        alt="slide"
        objectFit="cover"
        w="100%"
        h="100%"
        pos="absolute"
        opacity={fade}
        transition={`opacity ${FADE_DURATION}ms`}
      />
      <Box pos="absolute" bottom="30px" left="20px" zIndex={3}>
        <Text color="white" fontSize="lg" fontWeight="600" mb={2}>
          {currentData[currentIndex].title}
        </Text>
        
      </Box>
      <Flex pos="absolute" bottom="10px" w="100%" justify="center" zIndex={3}>
        {currentData.map((_, idx) => (
          <Box
            key={idx}
            boxSize="8px"
            borderRadius="full"
            mx="3px"
            bg={idx === currentIndex ? "#F9622C" : "white"}
            opacity={idx === currentIndex ? 1 : 0.5}
            transition="background 0.3s, opacity 0.3s"
          />
        ))}
      </Flex>
    </Box>
  );
}

function NewArrivals({ onAddToCart }) {
  const mockNewArrivals = [
    { id: 1, name: "Mangoes", price: 25000, product_image_url: "https://images.unsplash.com/photo-1629358821360-500f89a5a907?w=600&auto=format&fit=crop&q=60" },
    { id: 2, name: "Coffee", price: 40000, product_image_url: "https://images.unsplash.com/photo-1629358821360-500f89a5a907?w=600&auto=format&fit=crop&q=60" },
    { id: 3, name: "Bananas", price: 60000, product_image_url: "https://images.unsplash.com/photo-1629358821360-500f89a5a907?w=600&auto=format&fit=crop&q=60" },
    { id: 4, name: "Peas", price: 15000, product_image_url: "https://images.unsplash.com/photo-1629358821360-500f89a5a907?w=600&auto=format&fit=crop&q=60" },
  ];

  const [loading, setLoading] = useState(true);
  const [error] = useState("");
  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setNewArrivals(mockNewArrivals);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading)
    return (
      <Flex align="center" justify="center" h="150px">
        <Spinner color="#Fada25" />
      </Flex>
    );
  if (error)
    return (
      <Flex align="center" justify="center" h="150px">
        <Text color="red.500">Couldn’t load new arrivals. {error}</Text>
      </Flex>
    );
  if (!newArrivals.length)
    return (
      <Flex align="center" justify="center" h="150px">
        <Text color="gray.500">No new arrivals at the moment.</Text>
      </Flex>
    );

  return (
    <Box bg="gray.800" borderRadius="md">
      <Flex align="center" justify="space-between" bg="#Fada25" color="black" px={2} borderRadius="xs" >
        <Heading as="h3" size="sm">Marketplace</Heading>
        <Button variant="link" color="black" fontSize="sm">View All</Button>
      </Flex>
      <Flex overflowX="auto" pb={4}>
        {newArrivals.map((item) => (
          <Box key={item.id} flex="0 0 150px"  borderRadius="md" bg="transparent" p={3} textAlign="center">
            <Box pos="relative">
              <Image src={item.product_image_url} alt={item.name} boxSize="150px" objectFit="cover" borderRadius="md" />
              <Badge pos="absolute" top="2" left="2" bg="yellow.500" color="white" fontSize="xs">New</Badge>
            </Box>
            <Text mt={2} fontWeight="bold" fontSize="sm" color="gray.100" isTruncated>{item.name}</Text>
            <Text fontSize="xs" color="gray.100">UGX {item.price}</Text>
          </Box>
        ))}
      </Flex>
      
    </Box>
  );
}

export default function ProductSliderWithArrivals() {
  const handleAddToCart = (item) => alert(`Added to cart: ${item.name}`);

  return (
    <Container centerContent>
      <CombinedSlider
        containData={containSliderData}
        coverData={coverSliderData}
      />
      <Box w="100%" mt={5}>
   
        <Text  p={3} fontSize="sm" fontWeight="bold" color="gray.200">
          Quick Access
          
        </Text>
        
        
        <QuickActions />
             <NewArrivals onAddToCart={handleAddToCart} />
        <Nearme />
      </Box>
    </Container>
  );
}
