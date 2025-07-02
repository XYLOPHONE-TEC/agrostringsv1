import React from 'react';
import {
  Box,
  Text,
  HStack,
  Image,
  Badge,
  Spacer,
  Flex,
  Icon,
  SimpleGrid,
} from '@chakra-ui/react';
import { FiCheckCircle, FiTruck, FiMoreHorizontal } from 'react-icons/fi';

export default function MyOrders({ orders }) {
  if (!orders?.length) {
    return <Text color="gray.400">You have no orders yet.</Text>;
  }

  const statusIcons = {
    'Order Placed': <Icon as={FiCheckCircle} color="green.400" />,
    'In Transit': <Icon as={FiTruck} color="yellow.400" />,
    Delivered: <Icon as={FiCheckCircle} color="green.400" />,
  };

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} gap={6}>
      {orders.map(order => (
        <Box key={order.id} p={4} bg="gray.800" rounded="md" shadow="sm">
          <HStack spacing={4} mb={3} align="top">
            <Image
              src={order.image}
              alt={order.name}
              boxSize="80px"
              objectFit="cover"
              borderRadius="md"
            />
            <Box flex="1">
              <HStack justify="space-between">
                <Text fontSize="lg" fontWeight="semibold" color="white">
                  {order.name}
                </Text>
                <Icon as={FiMoreHorizontal} cursor="pointer" color="white" />
              </HStack>
              <Text fontSize="sm" color="gray.300">
                {order.weight} • {order.farm}, {order.location}
              </Text>
              <HStack mt={2} fontSize="sm">
                <Badge
                  colorScheme={
                    order.status === 'Delivered'
                      ? 'green'
                      : order.status === 'In Transit'
                      ? 'yellow'
                      : 'blue'
                  }
                >
                  {order.status}
                </Badge>
                <Spacer />
                <Text color="gray.300" fontSize="xs">
                  ETA: {order.eta}
                </Text>
              </HStack>
            </Box>
            <Text fontWeight="bold" color="white">
              UGX {order.price.toLocaleString()}
            </Text>
          </HStack>

          <Flex mt={3} align="center">
            {['Order Placed', 'In Transit', 'Delivered'].map((step, idx) => (
              <React.Fragment key={step}>
                <HStack spacing={2}>
                  {statusIcons[step]}
                  <Text fontSize="xs" color={order.status === step ? 'white' : 'gray.400'}>
                    {step}
                  </Text>
                </HStack>
                {idx < 2 && <Box flex="1" h="1px" bg="gray.600" mx={2} />}
              </React.Fragment>
            ))}
          </Flex>

          <Text mt={2} fontSize="xs" color="gray.400">
            Ref: {order.ref}
          </Text>
        </Box>
      ))}
    </SimpleGrid>
  );
}
