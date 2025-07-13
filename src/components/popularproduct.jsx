// src/components/ReceivedInputsCard.jsx
import {
  Box,
  Heading,
  Grid,
  GridItem,
  Flex,
  Text,
  Badge,
  Image,
} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";

const data = [
  {
    name: "Maize Hybrid 303",
    type: "seed",
    image: "https://images.unsplash.com/photo-1650223154483-ccdef5d0e19d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHNlZWRsaW5nc3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Hand Sprayer",
    type: "equipment",
    image: "https://images.unsplash.com/photo-1650223154483-ccdef5d0e19d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHNlZWRsaW5nc3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Bean NABE 15",
    type: "seed",
    image: "https://images.unsplash.com/photo-1650223154483-ccdef5d0e19d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHNlZWRsaW5nc3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Watering Can",
    type: "equipment",
    image: "https://images.unsplash.com/photo-1650223154483-ccdef5d0e19d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHNlZWRsaW5nc3xlbnwwfHwwfHx8MA%3D%3D",
  },
];

export default function ReceivedInputsCard() {
  return (
    <Box boxShadow="md" borderRadius="md" p={4} px={0}>
      <Heading size="sm" mb={4}>
        Received Farm Inputs
      </Heading>
      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(2, 1fr)" }} gap={4}>
        {data.map((item) => (
          <GridItem
            key={item.name}
            border="1px solid"
            borderColor="gray.700"
            borderRadius="md"
            overflow="hidden"
            bg="gray.600"
            _hover={{ boxShadow: "lg", transform: "scale(1.02)" }}
            transition="all 0.2s ease-in-out"
          >
            <Image
              src={item.image}
              alt={item.name}
              objectFit="cover"
              w="100%"
              h="100px"
            />
            <Box p={4}>
              <Flex justify="space-between" align="center" mb={2}>
                <Text fontWeight="semibold" fontSize="md">
                  {item.name}
                </Text>
                <Flex align="center">
                  <FaCheckCircle color="#2f855a" style={{ marginRight: 4 }} />
                  <Badge colorScheme="green" variant="solid">
                    Received
                  </Badge>
                </Flex>
              </Flex>
              <Text fontSize="sm" color="gray.300">
                {item.type === "seed" ? "Seed Variety" : "Equipment"}
              </Text>
            </Box>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
}
