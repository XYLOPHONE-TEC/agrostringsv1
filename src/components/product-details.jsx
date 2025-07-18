import React from "react";
import {
  Box,
  Heading,
  Text,
  Image,
  Button,
  SimpleGrid,
  Separator,
} from "@chakra-ui/react";
import { FiArrowLeft } from "react-icons/fi";
import { MdCall, MdWhatsapp } from "react-icons/md";

// Mock data
const productImage = "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmFuYW5hfGVufDB8fDB8fHww";
const productName = "Matooke";
const productQuantity = 40;
const productRate = 120;
const productDescription =
  "Experience the sweet taste of summer with our farm-fresh corn. Plucked at peak ripeness, our golden kernels are perfect for grilling.";

export default function ProductDetails() {
  return (
    <Box w="105%"  bg="gray.800" color="gray.200">
      {/* Image with overlays */}
      <Box position="relative" borderTopRadius="lg" overflow="hidden">
        <Image
          src={productImage}
          alt={productName}
          w="100%"
          h="260px"
          objectFit="cover"
        />
         
        <Button
          position="absolute"
          top={3}
          left={3}
          variant="ghost"
          color="white"
          size="sm"
          borderRadius="full"
          p={1}
          onClick={() => window.history.back()}
          zIndex={2}
        >
          <FiArrowLeft size={32} />
        </Button>
      </Box>

      {/* Product Info */}
      <Box borderBottomRadius="2xl" boxShadow="md" py={6} mt={-2} position="relative" zIndex={1} px={4}>
        <Heading size="md" mb={2} fontWeight="bold">
          {productName}
        </Heading>

        <Box display="flex" justifyContent="space-between" mb={2}>
          <Box>
            <Text fontSize="sm" fontWeight="bold">Quantity</Text>
            <Text fontSize="lg" fontWeight="bold">{productQuantity}{" "}
              <Text as="span" fontSize="12px">Quintals</Text>
            </Text>
          </Box>
          <Box>
            <Text fontSize="sm" fontWeight="bold">Rate</Text>
            <Text fontSize="lg" fontWeight="bold">${productRate}{" "}
              <Text as="span" fontSize="12px">/ Quintal</Text>
            </Text>
          </Box>
        </Box>

      

        <Box mt={4}>
          <Text color="#fada25" fontSize="sm" fontWeight="bold" mb={1}>Description</Text>
          <Text fontSize="sm">{productDescription}</Text>
        </Box>

        <Separator borderColor="gray.600" mt={4} />

        <Box mt={4} borderRadius="lg" py={4} fontSize={'sm'}>
          <Text fontWeight="bold" mb={1} color="#fada25">Farmer Information</Text>
          <Text>Name: Hillside Farms</Text>
          <Text>Phone: +256 774 123 456</Text>
          <Text>Location: Mukono, Uganda</Text>
        </Box>

        <Separator borderColor="gray.600" mt={4} />

        {/* Call and Whatsapp Buttons */}
      <Box mt={3} mb={6}>
  <SimpleGrid columns={2} gap={4}>
    <Text
      as="button"
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      leftIcon={<MdCall />}
      px={4}
      py={2}
      fontWeight="semibold"
      borderRadius="md"
      fontSize={'sm'}
      color="yellow.800"
      bg="yellow.300"
      _hover={{ bg: "yellow.200" }}
      _active={{ bg: "yellow.300" }}
      onClick={() => window.open("tel:+256774123456", "_self")}
    >
      <MdCall style={{ marginRight: 8 }} />
      Call
    </Text>

    <Text
      as="button"
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      px={4}
      py={2}
      fontSize={'sm'}
      fontWeight="semibold"
      borderRadius="md"
      color="green.800"
      bg="green.400"
      _hover={{ bg: "green.200" }}
      _active={{ bg: "green.300" }}
      onClick={() => window.open("https://wa.me/256774123456", "_blank")}
    >
      <MdWhatsapp style={{ marginRight: 8 ,color:'green'}} />
      Whatsapp
    </Text>
  </SimpleGrid>
</Box>

      </Box>

      {/* More Products */}
      <Box px={4} pt={6}>
        <Text fontWeight="700" fontSize="sm" mb={4}>More products from the Farmer</Text>
        <Box display="flex" gap={4} overflowX="auto">
          {[1, 2, 3].map((id) => (
            <Box key={id} borderRadius="md" minW="220px" flexShrink={0}>
              <Image
                src={`https://images.unsplash.com/photo-1643905928687-e2b974e86083?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzJ8fGJhbmFuc3xlbnwwfHwwfHx8MA%3D%3D+${id}`}
                alt={`Related ${id}`}
                borderRadius="sm"
                w="100%"
                h="120px"
                objectFit="cover"
              />
              <Text fontWeight="600"  fontSize="sm" mt={2}>Product {id}</Text>
              <Text  fontSize="sm">UGX {id * 10000}</Text>
            </Box>
          ))}
        </Box>
      </Box>

      <Separator borderColor="gray.600" mt={6} />

      {/* Farmer Videos */}
      <Box px={4} pt={6} pb={8}>
        <Text fontWeight="700" fontSize="sm" mb={4}>Farmer Videos</Text>
        <Box display="flex" gap={4} overflowX="auto">
          {[
            { src: "https://www.youtube.com/embed/iFs1z-au6vc", title: "Banana fibre crafts" },
            { src: "https://www.youtube.com/embed/Cikd447mxxg", title: "Urban farm in Kampala" },
            { src: "https://www.youtube.com/embed/aQsiGmPBHzM", title: "Kampala farm tour" },
          ].map((v) => (
            <Box key={v.src} flexShrink={0} minW="250px">
              <Box
                as="iframe"
                src={v.src}
                title={v.title}
                allowFullScreen
                w="100%"
                h="140px"
                borderRadius="md"
                border="none"
              />
              <Text mt={2} fontSize="sm" textAlign="center">{v.title}</Text>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
