// ProductSliderWithArrivals.jsx
import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Text,
  Flex,
  Image,
  Button,
} from "@chakra-ui/react";
import QuickActions from "./quick-actions";
import MarketplaceProducts from "./marketplace-buyer";
import Nearme from "./near-me-products";
import ProductDetails from "./product-details";

const SLIDE_DURATION = 6000;
const FADE_DURATION = 1000;

function CombinedSlider({ containData, coverData }) {
  const [phase, setPhase] = useState("contain");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(1);
  const currentData = phase === "contain" ? containData : coverData;

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
      <Box pos="absolute" top="0" left="0" w="100%" h="6px" bg="#FADA25" zIndex={2} />
      <Image
        src={currentData[currentIndex].background}
        alt="slide"
        objectFit="cover"
        w="100%"
        h="100%"
        pos="absolute"
        opacity={fade}
        transition={`opacity ${FADE_DURATION}ms ease-in-out`}
        filter="brightness(0.6)"
      />
      <Box pos="absolute" bottom="30px" left="20px" zIndex={3}>
        <Text color="white" fontSize="lg" fontWeight="600">
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

export default function ProductSliderWithArrivals() {
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [viewMode, setViewMode] = useState("marketplace"); // or "nearby"

  const handleBack = () => setSelectedProductId(null);

  return (
    <Container centerContent maxW="container.lg" py={4}>
      {!selectedProductId ? (
        <>
          <CombinedSlider
            containData={[
              { id: "1", title: "Fresh Picks", background: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=600&auto=format&fit=crop&q=60" },
              { id: "2", title: "Seasonal Harvest", background: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=600&auto=format&fit=crop&q=60" },
              { id: "3", title: "Weekly Specials", background: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=600&auto=format&fit=crop&q=60" },
            ]}
            coverData={[
              { id: "1", title: "Organic Favorites", background: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=600&auto=format&fit=crop&q=60" },
              { id: "2", title: "Farm to Table", background: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=600&auto=format&fit=crop&q=60" },
              { id: "3", title: "Fresh & Local", background: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=600&auto=format&fit=crop&q=60" },
            ]}
          />

          <Box w="100%" mt={5}>
            <QuickActions />

            <Flex mt={4} mb={2} justify="center">
              <Button
                onClick={() => setViewMode("marketplace")}
                variant="unstyled"
                borderBottomWidth={viewMode === "marketplace" ? "2px" : "0px"}
                borderBottomColor="#fada25"
                borderRadius="0"
                px={6}
                py={2}
                color={viewMode === "marketplace" ? "#fada25" : "white"}
              >
                Marketplace
              </Button>
              <Button
                onClick={() => setViewMode("nearby")}
                variant="unstyled"
                borderBottomWidth={viewMode === "nearby" ? "2px" : "0px"}
                borderBottomColor="#fada25"
                borderRadius="0"
                px={10}
                py={2}
                color={viewMode === "nearby" ? "#fada25" : "white"}
              >
                Nearby Me
              </Button>
            </Flex>

            {viewMode === "marketplace" ? (
              <MarketplaceProducts onSelect={setSelectedProductId} />
            ) : (
              <Nearme onSelect={setSelectedProductId} />
            )}
          </Box>
        </>
      ) : (
        <ProductDetails productId={selectedProductId} onBack={handleBack} />
      )}
    </Container>
  );
}
