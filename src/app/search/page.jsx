"use client"; // Client Component directive

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Flex, Box, Text, Icon } from '@chakra-ui/react';
import { BsFilter } from 'react-icons/bs';
import Property from '../components/Property';
import SearchFilter from '../components/SearchFilter';
import { baseUrl, fetchApi } from '../utils/fetchApi.js';
import noresult from '../../asset/noresult.jpg'

const Search = ({ searchParams }) => {
  const [properties, setProperties] = useState([]);
  const [searchFilters, setSearchFilters] = useState(false);
  const router = useRouter();

  // Extract query parameters from searchParams
  const {
    purpose = 'for-rent',
    rentFrequency = 'yearly',
    minPrice = '0',
    maxPrice = '1000000',
    roomsMin = '0',
    bathsMin = '0',
    sort = 'price-desc',
    areaMax = '35000',
    locationExternalIDs = '5002',
    categoryExternalID = '4'
  } = searchParams || {}; 



  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`);
        setProperties(data?.hits || []);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, [searchParams]); // Dependency array for useEffect

  return (
    <Box>
      <Flex
        onClick={() => setSearchFilters(!searchFilters)}
        cursor='pointer'
        bg='gray.100'
        borderBottom='1px'
        borderColor='gray.200'
        p='2'
        fontWeight='black'
        fontSize='lg'
        justifyContent='center'
        alignItems='center'
      >
        <Text>Search Property By Filters</Text>
        <Icon paddingLeft='2' w='7' as={BsFilter} />
      </Flex>
      {searchFilters && <SearchFilter router={router}/>}
      <Text fontSize='2xl' p='4' fontWeight='bold'>
        Properties {purpose}
      </Text>
      <Flex flexWrap='wrap'>
        {properties.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>
      {properties.length === 0 && (
        <Flex justifyContent='center' alignItems='center' flexDir='column' marginTop='5' marginBottom='5'>
          <Image src={noresult} alt="No Results" />
          <Text fontSize='xl' marginTop='3'>No Result Found.</Text>
        </Flex>
      )}
    </Box>
  );
};

export default Search;
