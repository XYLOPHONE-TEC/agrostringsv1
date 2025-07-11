// src/components/CarbonLeftSection.jsx
"use client";

import React, { useState } from "react";
import {
  Box,
  HStack,
  VStack,
  Stack,
  Text,
  Input,
  Button,
  Separator,
  useBreakpointValue,
} from "@chakra-ui/react";
import { RiMedalLine } from "react-icons/ri";
import toast from "react-hot-toast";
import { Select, createListCollection } from "@chakra-ui/react";

// Select collections
const fertilizerOptions = createListCollection({
  items: [
    { label: "Organic", value: "Organic" },
    { label: "Inorganic", value: "Inorganic" },
  ],
});
const machineryOptions = createListCollection({
  items: [
    { label: "Low", value: "Low" },
    { label: "Medium", value: "Medium" },
    { label: "High", value: "High" },
  ],
});
const irrigationOptions = createListCollection({
  items: [
    { label: "Traditional", value: "Traditional" },
    { label: "Drip", value: "Drip" },
    { label: "Sprinkler", value: "Sprinkler" },
  ],
});
const compostingOptions = createListCollection({
  items: [
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
  ],
});

const CarbonLeftSection = () => {
  const badgeSize = useBreakpointValue({ base: "sm", md: "md" });
  const [values, setValues] = useState({
    landSize: "",
    fertilizerType: "",
    machineryUsage: "",
    irrigationMethod: "",
    treesPlanted: "",
    composting: "",
  });

  const handleChange = (key) => (e) =>
    setValues((prev) => ({ ...prev, [key]: e.target.value }));
  const handleSelectChange = (key) => (val) =>
    setValues((prev) => ({ ...prev, [key]: val }));

  const handleSubmit = () => {
    console.log("Form values:", values);
    toast.success("Practices updated successfully!", { duration: 3000 });
  };

  // Score graphic values
  const score = 75;
  const radius = 15.9155;

  // Helper to render a select control
  const renderSelect = (label, key, collection) => (
    <Box w="100%">
      <Text mb={1} fontSize="xs" color="white">
        {label}
      </Text>
      <Select.Root
        collection={collection}
        selectedItem={collection.items.find((i) => i.value === values[key])}
        onValueChange={(item) => handleSelectChange(key)(item.value)}
        bg="gray.700"
        color="white"
      >
        <Select.HiddenSelect />
        <Select.Control>
          <Select.Trigger
            minH="30px"
            fontSize="sm"
            px={2}
            py={2}
            borderColor="gray.600"
          >
            <Select.ValueText placeholder={`Select ${label.toLowerCase()}`} />
            <Select.IndicatorGroup>
              <Select.Indicator />
            </Select.IndicatorGroup>
          </Select.Trigger>
        </Select.Control>
        <Select.Positioner>
          <Select.Content maxH="160px" fontSize="sm">
            {collection.items.map((item) => (
              <Select.Item
                item={item}
                key={item.value}
                px={2}
                py={1}
                bg="gray.800"
              >
                {item.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Select.Root>
    </Box>
  );

  return (
    <Box bg="gray.800" rounded="xl" p={4} border="2px solid" borderColor="gray.700">
      {/* Top row: progress circle, score details, badge */}
      <HStack spacing={4} align="center" mb={4}>
        {/* 1) Progress circle */}
        <Box position="relative" w="80px" h="80px">
          
          <svg viewBox="0 0 36 36" width="100%" height="100%">
            
            <circle
              cx="18"
              cy="18"
              r={radius}
              fill="none"
              stroke="#fff"
              strokeWidth="3"
            />
            <circle
              cx="18"
              cy="18"
              r={radius}
              fill="none"
              stroke="#fada25"
              strokeWidth="3"
              strokeDasharray={`${score},100`}
              transform="rotate(-90 18 18)"
            />
          </svg>
          
        </Box>

        {/* 2) Score details */}
        <VStack align="start" spacing={0}>
          <Text fontSize="2xl" fontWeight="bold" color="yellow.400" lineHeight={1}>
            {score}
            <Text as="span" fontSize="sm" color="gray.300" ml={1}>
              /100
            </Text>
          </Text>
          <Text fontSize="sm" color="gray.300">
            Your Carbon Score
          </Text>
        </VStack>

        {/* 3) Badge */}
        <VStack spacing={1} align="center">
          <RiMedalLine
            size={badgeSize === "md" ? 28 : 24}
            color="#a7b80bff"
          />
          <Text fontSize="xs" fontWeight="bold" color="white">
            Tree Planter
          </Text>
        </VStack>
      </HStack>

      <Separator borderColor="gray.600" mb={4} />

      {/* Form inputs */}
      <Stack spacing={3} align="stretch">
        <Box>
          <Text fontSize="xs" color="white" mb={1}>
            Land Size (ha)
          </Text>
          <Input
            placeholder="e.g. 2.5"
            value={values.landSize}
            onChange={handleChange("landSize")}
            bg="gray.700"
            color="white"
            size="sm"
            borderColor="gray.600" 
            _placeholder={{ color: "whiteAlpha.700" }}
            _focus={{ borderColor: "yellow.400", boxShadow: "0 0 0 1px yellow.400" }}
          />
        </Box>

        {renderSelect("Fertilizer Type", "fertilizerType", fertilizerOptions)}

        <Stack direction="row" spacing={3}>
          {renderSelect("Machinery Usage", "machineryUsage", machineryOptions)}
          {renderSelect("Irrigation Method", "irrigationMethod", irrigationOptions)}
        </Stack>

        <Stack direction="row" spacing={3}>
          <Box flex={1}>
            <Text fontSize="xs" color="white" mb={1} >
              Trees Planted
            </Text>
            <Input
              placeholder="e.g. 10"
              value={values.treesPlanted}
              onChange={handleChange("treesPlanted")}
              bg="gray.700"
              color="white"
              size="sm"
              borderColor="gray.600" 
              _placeholder={{ color: "whiteAlpha.700" }}
              _focus={{ borderColor: "yellow.400", boxShadow: "0 0 0 1px yellow.400" }}
            />
          </Box>
          <Box flex={1}>
            {renderSelect("Composting Used", "composting", compostingOptions)}
          </Box>
        </Stack>

        <Button
          bg="#fada25"
          color="gray.800"
          size="sm"
          isFullWidth
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Stack>
    </Box>
  );
};

export default CarbonLeftSection;
