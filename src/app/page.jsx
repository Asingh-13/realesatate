import Image from "next/image";
import Link from 'next/link';
import { Flex, Box, Text, Button } from '@chakra-ui/react';
import { baseUrl, fetchApi } from './utils/fetchApi.js';
import Property from "./components/Property";



const Banner = ({ purpose, title, title2, desc1, desc2, buttonText, LinkName, imageUrl }) => (
  <Flex flexWrap="wrap" justifyContent="center" alignItems="center" m="10">
    <Image src={imageUrl} width={500} height={300} alt={`${title} image`} />
    <Box p="5">
      <Text color={"gray.500"} fontSize="sm" fontWeight="medium">{purpose}</Text>
      <Text fontSize="3xl" fontWeight="medium">{title} {title2}</Text>
      <Text fontSize="lg" paddingTop="3" paddingBottom="3" color="gray.700">{desc1}<br />{desc2}</Text>
      <Button fontSize="xl">
        <Link href={LinkName}>{buttonText}</Link>
      </Button>
    </Box>
  </Flex>
);

export default async function Home() {
  let propSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=8`);
  let propRent =  await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=8`);

  const propertiesForSale = propSale?.hits;
  const propertiesForRent = propRent?.hits;

  return (
    <div>
      <Banner 
        purpose="Rent A Home"
        title="Rental Homes For"
        title2="Everyone"
        desc1="Explore Apartments, Villas, Homes"
        desc2="and more"
        buttonText="Explore Renting"
        LinkName="/search?purpose=for-rent"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
      />

      <Flex flexWrap="wrap">
        {propertiesForRent.map((property)=><Property property = {property} key={property.id}/>)}
      </Flex>

      <Banner     
        purpose="Buy A Home"
        title="Buy Homes For"
        title2="Everyone"
        desc1="Explore Apartments, Villas, Homes"
        desc2="and more"
        buttonText="Explore Buying"
        LinkName="/search?purpose=for-sale"
        imageUrl='https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008'
      />

      <Flex flexWrap="wrap">
      {propertiesForSale.map((property)=><Property property = {property} key={property.id}/>)}
      </Flex>
      
    </div>
  );
}
