// QuickActions.jsx

import React from "react";
import { SimpleGrid, VStack, Text, Icon, Box } from "@chakra-ui/react";
import { FiHeart, FiShoppingCart, FiGrid, FiHelpCircle } from "react-icons/fi";

const tools = [
  { label: "My Favorites", icon: FiHeart, onClick: "onFavorites" },
  { label: "My Orders", icon: FiShoppingCart, onClick: "onOrders" },
  { label: "Shop Now", icon: FiGrid, onClick: "onShop" },
  { label: "Support", icon: FiHelpCircle, onClick: "onSupport" },
];

export default function QuickActions({
  onFavorites,
  onOrders,
  onShop,
  onSupport,
}) {
  const handlers = {
    onFavorites,
    onOrders,
    onShop,
    onSupport,
  };

  return (
    <Box bg="#222" p={0} borderRadius="md" mb="6">
      <SimpleGrid columns={2} gap={3}>
        {tools.map(t => (
          <VStack
            key={t.label}
            as="button"
            onClick={handlers[t.onClick]}
            bg="gray.800"
            _hover={{ bg: "gray.700" }}
            p={3}
            rounded="md"
            gap={2}
          >
            <Icon as={t.icon} boxSize="1em" color="gray.200" />
            <Text fontSize="sm" color="gray.200">{t.label}</Text>
          </VStack>
        ))}
      </SimpleGrid>
    </Box>
  );
}
