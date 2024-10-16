import Link from 'next/link';
import Image from 'next/image';
import { Avatar, Box, Flex, Text } from '@chakra-ui/react';
import { GoVerified } from 'react-icons/go';
import millify from 'millify';
import defaultImage from "../../asset/pexels-frans-van-heerden-201846-1438832.jpg"; // Ensure this path is correct
import { FaBath, FaBed } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';

const Property = ({ property }) => {
  const {
    coverPhoto,
    price,
    rentFrequency,
    externalID,
    rooms,
    title,
    baths,
    area,
    agency,
    isVerified,
  } = property;

  return (
    <Link href={`/property/${externalID}`} passHref>
      <Flex
        flexDirection="column"
        w="300px" // Width for three cards to fit in one line
        h="400px" // Fixed height for consistent card sizes
        p="4"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        transition="transform 0.2s"
        _hover={{ transform: "scale(1.02)" }}
        bg="white" // Background color for the card
        borderColor="gray.200" // Light border color
        marginBottom="4" // Space between rows of cards
      >
        <Box flex="1">
          <Image
            src={coverPhoto ? coverPhoto.url : defaultImage}
            alt='House'
            width={300}
            height={200}
            style={{ borderRadius: '8px' }}
            priority // Optional: If you want to load the image sooner
          />
        </Box>
        <Box mt="2" flex="1">
          <Flex justifyContent="space-between" alignItems="center">
            <Flex alignItems="center">
              <Box paddingRight="2" color="green.400">
                {isVerified && <GoVerified />}
              </Box>
              <Text fontWeight="bold" fontSize="lg" color="gray.700">
                AED {millify(price)}{rentFrequency && `/${rentFrequency}`}
              </Text>
            </Flex>
            <Box>
              <Avatar size="sm" src={agency?.logo?.url} />
            </Box>
          </Flex>
          <Flex alignItems="center" mt="1" color="blue.500">
            <Text fontSize="md">{rooms} <FaBed /></Text>
            <Text fontSize="md" px="2">|</Text>
            <Text fontSize="md">{baths} <FaBath /></Text>
            <Text fontSize="md" px="2">|</Text>
            <Text fontSize="md">{millify(area)} sqft <BsGridFill /></Text>
          </Flex>
          <Text fontSize="lg" fontWeight="semibold" color="black" mt="2">
            {title.length > 30 ? `${title.substring(0, 30)}...` : title}
          </Text>
        </Box>
      </Flex>
    </Link>
  );
};

export default Property;