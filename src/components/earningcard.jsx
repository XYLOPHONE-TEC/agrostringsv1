import { Box, Flex, Heading, Text, SimpleGrid } from "@chakra-ui/react";
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

export default function EarningsCard({ data }) {
  return (
    <Box bg="gray.700" color="white" p={4} boxShadow="sm" borderRadius="md"  fontSize= '12px'>
      <Flex justify="space-between" align="center" mb={2}>
        <Heading size="sm">Earnings Overview</Heading>
      </Flex>
      <SimpleGrid columns={3} gap={2} mb={3}>
        {["Total Revenue", "Monthly Growth", "YTD"].map((label, i) => (
          <Box key={i} bg="gray.600" p={2} borderRadius="md">
            <Text fontSize="xs" color="textSecondary">{label}</Text>
            <Text fontSize="lg" fontWeight="semibold" color="white">
              {label === "Monthly Growth" ? "+12.5%" : i === 2 ? "UGX 1.2M" : "UGX 124,563"}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
      <Box h="150px">
  <ResponsiveContainer>
    <BarChart data={data} >
      <CartesianGrid stroke="gray.100" strokeDasharray="3 3"  />
      <XAxis stroke="#ffffff"  tick={{ fill: '#ffffff' }} dataKey="month" />
      <YAxis stroke="#ffffff" tick={{ fill: '#ffffff' }}    />
      <Tooltip
        contentStyle={{
          backgroundColor: '#2D2D2D',
          border: '1px solid #ffffff',
          fontSize: '12px',
        }}
        itemStyle={{ color: '#fff' }}
        labelStyle={{ color: '#fff' }}
        
      />
      <Bar
        dataKey="value"
        fill="#fada25"       // ⚠️ Bars now white
        stroke="#ffffff"
        strokeWidth={1}
        barSize={40}
        
      />
    </BarChart>
  </ResponsiveContainer>
</Box>

    </Box>
  );
}
