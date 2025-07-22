import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/dashboard-layout';
import { Spinner, Flex } from '@chakra-ui/react';

function Home() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);
  if (loading) {
    return (
      <Flex minH="100vh" align="center" justify="center">
        <Spinner size="xl" color="yellow.400" />
      </Flex>
    );
  }
  return <DashboardLayout />;
}

export default Home;
