"use client";

import React, { useState } from "react";
import {
  Box,
  Text,
  
  Flex,
  Stack,
  Input,
  Button,
  useBreakpointValue,
  Separator,
} from "@chakra-ui/react";
import { RiMedalLine } from "react-icons/ri";
import toast from "react-hot-toast";
import { Select, createListCollection } from "@chakra-ui/react";

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

  const handleChange = (key) => (e) => {
    setValues((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleSelectChange = (key) => (val) => {
    setValues((prev) => ({ ...prev, [key]: val }));
  };

  const handleSubmit = () => {
    console.log("Form values:", values);
    toast.success("Practices updated successfully!", { duration: 3000 });
  };

  const score = 75;
  const radius = 15.9155;

  const renderSelect = (label, key, collection) => (
    <Box w="100%">
      <Text mb={1} fontSize="xs" color="white">
        {label}
      </Text>
      <Select.Root
        collection={collection}
        selectedItem={collection.items.find((i) => i.value === values[key])}
        onValueChange={(item) => handleSelectChange(key)(item.value)}
        bg={"gray.700"}
        color={"white"}
      >
        <Select.HiddenSelect />
        <Select.Control>
          <Select.Trigger minH="30px" fontSize="sm" px={1} py={2}  borderColor="gray.600" color= "whiteAlpha.400">
            <Select.ValueText placeholder={`Select ${label.toLowerCase()}`} />
            <Select.IndicatorGroup>
              <Select.Indicator />
            </Select.IndicatorGroup>
          </Select.Trigger>
        </Select.Control>
        <Select.Positioner>
          <Select.Content maxH="160px" fontSize="sm">
            {collection.items.map((item) => (
              <Select.Item item={item} key={item.value} px={2} py={1} bg="gray.800" >
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
    <Box  borderRadius="xl" mt={-1} >
       
     
      <Flex justify="center" mb={1}>
        
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
          <Flex
            position="absolute"
            top="0"
            left="0"
            w="100%"
            h="100%"
            align="center"
            justify="center"
          >
            <Text fontSize="xl" fontWeight="bold" color="yellow.400" lineHeight={1}>
              {score}
              <Text as="span" fontSize="xs" color="gray.300" ml={1}>
                /100
              </Text>
            </Text>
          </Flex>
        </Box>
      </Flex>

      <Stack direction="row" spacing={4} justify="center" mb={-5}>
        {["Tree Planter"].map((label) => (
          <Box
            key={label}
            display="flex"
            flexDirection="column"
            alignItems="center"
            p={0.5}
            borderRadius="full"
            boxShadow="md"
            w={badgeSize === "md" ? 70 : 60}
            h={badgeSize === "md" ? 70 : 50}
            cursor="default"
            userSelect="none"
          >
            <RiMedalLine size={badgeSize === "md" ? 24 : 20} color="#a7b80bff" />
            <Text
              mt={1}
              fontWeight="bold"
              fontSize="9px"
              textAlign="center"
              color="white"
              lineHeight={2}
            >
              {label}
            </Text>
          </Box>
        ))}
      </Stack>
 
        <Separator orientation="horizontal" borderColor="gray.600" my={3} />
      <Stack spacing={3} align="stretch">
       
        <Box mb={3}>
          <Text mb={1} fontSize="xs" color="white">
            Land Size (ha)
          </Text>
          <Input
            placeholder="e.g. 2.5"
            value={values.landSize}
            onChange={handleChange("landSize")}
            color="white"
            _placeholder={{ color: "whiteAlpha.700" }}
            bg="gray.700"
            borderColor="gray.600"
            _focus={{
              borderColor: "yellow.400",
              boxShadow: "0 0 0 1px yellow.400",
            }}
            size="sm"
          />
        </Box>


        {renderSelect("Fertilizer Type", "fertilizerType", fertilizerOptions)}

        <Stack direction="row" spacing={3} w="100%" mt={2} >
          {renderSelect("Machinery Usage", "machineryUsage", machineryOptions)}
          {renderSelect("Irrigation Method", "irrigationMethod", irrigationOptions)}
        </Stack>

        <Stack direction="row" spacing={3} w="100%" mt={2}>
  {/* Trees Planted input takes equal space */}
  <Box flex={1}>
    <Text mb={1} fontSize="xs" color="white">
      Trees Planted
    </Text>
    <Input
      placeholder="e.g. 10"
      value={values.treesPlanted}
      onChange={handleChange("treesPlanted")}
      color="white"
      _placeholder={{ color: "whiteAlpha.700" }}
      bg="gray.700"
      borderColor="gray.600"
      _focus={{
        borderColor: "yellow.400",
        boxShadow: "0 0 0 1px yellow.400",
      }}
      size="sm"
      width="100%"       // Ensure it fills parent
      minW="0"           // Allow shrinking if needed
    />
  </Box>

  {/* Composting select also takes equal space */}
  <Box flex={1} minW="0">
    {renderSelect("Composting Used", "composting", compostingOptions)}
  </Box>
</Stack>


        <Button
          bg="#fada25"
          color="gray.800"
          variant="solid"
          onClick={handleSubmit}
          isFullWidth
          size="sm"
          mt={4}
        >
          Submit
        </Button>
      </Stack>
    </Box>
  );
};

export default CarbonLeftSection;
