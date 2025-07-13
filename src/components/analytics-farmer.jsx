'use client';

import React, { useState } from "react";
import {
  Container,
  SimpleGrid,
  Flex,
  Input,
  Button,
} from "@chakra-ui/react";

import EarningsCard from "./earningcard";
import CarbonCard from "./carboncard";
import ContentPerformanceCard from "./contentperformance";
import PopularProductsCard from "./popularproduct";
import CropMarketCard from "./cropmarket";


const earningsData = [
  { month: "Jan", value: 65000 },
  { month: "Feb", value: 72000 },
  { month: "Mar", value: 80000 },
  { month: "Apr", value: 87000 },
  { month: "May", value: 94000 },
  { month: "Jun", value: 102000 },
];

const carbonData = [
  { name: "Emitted", value: 30 },
  { name: "Saved", value: 70 },
];

const videoSamples = [
  { id: 1, thumb: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFybWluZ3xlbnwwfHwwfHx8MA%3D%3D", title: "Farm Tour Q2", views: 2500 },
  { id: 2, thumb: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFybWluZ3xlbnwwfHwwfHx8MA%3D%3D", title: "Planting Innovations", views: 4200 },
  { id: 3, thumb: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFybWluZ3xlbnwwfHwwfHx8MA%3D%3D", title: "Harvest Tips", views: 3100 },
];

const productTrends = [
  { name: "Organic Fertilizer", change: "+23.5%" },
  { name: "Natural Seeds", change: "+18.2%" },
  { name: "Bio Pesticides", change: "+15.7%" },
  { name: "Farm Equipment", change: "+12.3%" },
  { name: "Crop Insurance", change: "+10.8%" },
];

const cropPrices = [
  { crop: "Wheat", price: "$245", change: "+2.3%" },
  { crop: "Corn", price: "$180", change: "+1.8%" },
  { crop: "Soybeans", price: "$320", change: "+3.1%" },
  { crop: "Rice", price: "$195", change: "+1.5%" },
  { crop: "Cotton", price: "$150", change: "+2.7%" },
];



export default function AnalyticsFarmer() {
  const [dateRange, setDateRange] = useState("6m");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleApplyDateRange = () => {
    // Apply logic for filtering based on fromDate & toDate
    console.log("Filtering from:", fromDate, "to:", toDate);
    setDateRange("custom"); // or generate a dynamic label
  };

  return (
    <Container maxW="container.xl" py={4} color='white'>
     
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} mb={6}>
        <EarningsCard
          data={earningsData}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
         
        />
        <CarbonCard data={carbonData} />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 1 }} gap={4} mt={4}>
        <ContentPerformanceCard data={videoSamples} />
      
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} mt={4}>
          <PopularProductsCard data={productTrends} />
        <CropMarketCard data={cropPrices} />
        
        
      </SimpleGrid>
    </Container>
  );
}
