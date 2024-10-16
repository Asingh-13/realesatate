"use client"; // Ensure this is a client component

import React, { useState } from 'react';
import { Flex, Select, Box, Button } from '@chakra-ui/react';
import { filterData, getFilterValues } from '../utils/filterData';

const SearchFilter = () => {
  const [filters] = useState(filterData);
  const [selectedFilters, setSelectedFilters] = useState({});

  // Get the current URL's search parameters
  const currentSearchParams = new URLSearchParams(window.location.search);
  const path = currentSearchParams.get('path') || '/search'; // Default path if not set

  const handleFilterChange = (filterName, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterName]: value || '', // Set to empty if cleared
    }));
  };

  const handleSearch = () => {
    // Construct search parameters
    const currentQuery = new URLSearchParams(currentSearchParams);

    Object.entries(selectedFilters).forEach(([name, value]) => {
      if (value) {
        currentQuery.set(name, value); // Add or update the filter in search params
      } else {
        currentQuery.delete(name); // Remove item if value is empty
      }
    });

    // Navigate to the updated path with search parameters
    window.location.href = `${path}?${currentQuery.toString()}`;
  };

  const handleClearSearch = ()=>{
    setSelectedFilters({});
    window.location.href = `${path}`;
  }

  return (
    <Flex 
      bg="gray.100" 
      p={4} 
      justifyContent="center" 
      flexWrap="wrap" 
      borderRadius="md" 
      boxShadow="md"
    >
      {filters.map((filter) => (
        <Box key={filter.queryName} mx={2} my={2}>
          <Select 
            color="gray.800"
            placeholder={filter.placeholder}
            borderColor="gray.300"
            bg="white"
            borderRadius="md"
            _hover={{ borderColor: "blue.400" }}
            _focus={{ borderColor: "blue.600", boxShadow: "0 0 0 1px rgba(66, 153, 225, 0.6)" }}
            onChange={(e) => handleFilterChange(filter.queryName, e.target.value)}
          >
            {filter?.items?.map((item) => (
              <option value={item.value} key={item.value}>
                {item.name}
              </option>
            ))}
          </Select>
        </Box>
      ))}
      <Box mx={2} my={2}>
        <Button 
          colorScheme="blue" 
          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>
      <Box mx={2} my={2}>
        <Button 
          colorScheme="red" 
          onClick={handleClearSearch}
        >
          Clear Filter
        </Button>
      </Box>
    </Flex>
  );
};

export default SearchFilter;
