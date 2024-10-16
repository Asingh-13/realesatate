"use client"; 
import React, { useEffect, useState } from 'react';
import { Box, Text, Flex, Spacer, Avatar } from '@chakra-ui/react';
import { fetchApi, baseUrl } from '@/app/utils/fetchApi';
import ImageScrollBar from '../../components/ImageScrollBar';
import { GoVerified } from 'react-icons/go';
import { FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import millify from 'millify';

const PropertyDetails = ({ id }) => {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      if (id) {
        try {
          const data = await fetchApi(`${baseUrl}/properties/detail?externalID=${id}`);
          if (data) {
            setProperty(data);
          } else {
            setProperty(null);
          }
        } catch (error) {
          console.error("Error fetching properties:", error.message);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProperties();
  }, [id]);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text color="red.500">{error}</Text>;
  if (!property) return <Text>No property found.</Text>;

  // Destructure properties from the fetched property
  const {
    price,
    type,
    description,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    agency,
    isVerified,
    amenities,
    photos,
    purpose,
    furnishingStatus
  } = property;

  return (
    <Box maxWidth='1000px' margin="auto" p='4'>
      {photos && <ImageScrollBar data={photos} />}
      <Text fontSize="2xl" fontWeight="bold">{title}</Text>
      
      <Flex paddingTop='2' alignItems='center'>
        <Box paddingRight='3' color='green.400'>{isVerified && <GoVerified />}</Box>
        <Text fontWeight='bold' fontSize='lg'>
          AED {price} {rentFrequency && `/${rentFrequency}`}
        </Text>
        <Spacer />
        <Avatar size='sm' src={agency?.logo?.url} />
      </Flex>

      
      
      <Flex alignItems='center' p='1' justifyContent='space-between' w='250px' color='blue.400'>
        {rooms} <FaBed /> | {baths} <FaBath /> | {millify(area)} sqft <BsGridFill />
      </Flex>


    <Box marginTop='2'>
      <Text fontSize='lg' marginBottom='2' fontWeight='bold'>{title}</Text>
      <Text lineHeight='2' color='gray.600'>{description}</Text>
    </Box>
    <Flex flexWrap='wrap' textTransform='uppercase' justifyContent='space-between'>
      <Flex justifyContent='space-between' w='400px' borderBottom='1px' borderColor='gray.100' p='3'>
        <Text>Type</Text>
        <Text fontWeight='bold'>{type}</Text>
      </Flex>
      <Flex justifyContent='space-between' w='400px' borderBottom='1px' borderColor='gray.100' p='3'>
        <Text>Purpose</Text>
        <Text fontWeight='bold'>{purpose}</Text>
      </Flex>
      {furnishingStatus && (
        <Flex justifyContent='space-between' w='400px' borderBottom='1px' borderColor='gray.100' p='3' >
          <Text>Furnishing Status</Text>
          <Text fontWeight='bold'>{furnishingStatus}</Text>
        </Flex>
      )}
    </Flex>
    <Box>
      {amenities.length && <Text fontSize='2xl' fontWeight='black' marginTop='5'>Facilites:</Text>}
        <Flex flexWrap='wrap'>
          {amenities?.map((item) => (
              item?.amenities?.map((amenity) => (
                <Text key={amenity.text} fontWeight='bold' color='blue.400' fontSize='l' p='2' bg='gray.200' m='1' borderRadius='5'>
                  {amenity.text}
                </Text>
              ))
          ))}
        </Flex>
    </Box>
  </Box>

  );
};

export default PropertyDetails;
