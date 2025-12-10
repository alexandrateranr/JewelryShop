import { Box, Button, Flex, Grid, Heading, Image, Text } from '@chakra-ui/react'
import React from 'react'
import img1 from "../Pics/Rings.jpg"
import img2 from "../Pics/earing.jpg"
import img3 from "../Pics/necklace.jpg"
import img4 from "../Pics/bracelet.jpg"
import { useNavigate } from 'react-router'

export const NewCollection = () => {
  const navigate = useNavigate();
    return (
        <>
        <Box m="30px">
            <Box w="88%" m="auto">

                <Flex justifyContent={"space-between"} alignItems={"center"} >

                    <Box textAlign={"left"} color={"#171616"} fontWeight={"400"}>
                        <Heading size={"lg"} fontWeight={"400"} textTransform={"uppercase"} color={"black"}>New Collections</Heading>
                        <Text fontSize={"16px"}>Check Out the New Collections of Famous Brands</Text>
                    </Box>
                    <Box>
                    <Button colorScheme='black' fontWeight='light' variant='link' onClick={()=>navigate("/products")}>
                    ALL COLLECTIONS
              </Button>
                    </Box>
                </Flex>
            </Box>
        </Box>

        <Grid  textAlign={"left"} color={"#171616"} w="90%" m={{base : "2% auto", md : "3% auto" , xl : "4% auto"}} gap="20px" justifyContent={"center"}  templateColumns={{base : "repeat(1,1fr)",md : "repeat(2,1fr)",lg : "repeat(3,1fr)",xl : "repeat(4,1fr)"}}>
      <Box boxShadow= "rgba(149, 157, 165, 0.2) 0px 8px 24px" _hover={{transform:"scale(1.05)",transition:"transform 0.4s"}} >
        <Image src={img1} w='285px' m={"auto"}/>
        <Heading m="10px" as="h6" size={"sm"}>Rings Collection.</Heading>
        <Text m="10px" fontSize={"14px"}>Gold and Silver Collection</Text>
      </Box>
      <Box  boxShadow= "rgba(149, 157, 165, 0.2) 0px 8px 24px" _hover={{transform:"scale(1.05)",transition:"transform 0.4s"}} >
        <Image src={img2} w='285px'/>
        <Heading m="10px" as="h6" size={"sm"}>Earrings Collection.</Heading>
        <Text m="10px" fontSize={"14px"}>All Kinds of Earrings</Text>
      </Box>
      <Box  boxShadow= "rgba(149, 157, 165, 0.2) 0px 8px 24px" _hover={{transform:"scale(1.05)",transition:"transform 0.4s"}} >
        <Image src={img3} w='285px'/>
        <Heading m="10px" as="h6" size={"sm"}>Necklaces Collection.</Heading>
        <Text m="10px" fontSize={"14px"}>Gold and Silver Collection</Text>
      </Box>
      <Box  boxShadow= "rgba(149, 157, 165, 0.2) 0px 8px 24px" _hover={{transform:"scale(1.05)",transition:"transform 0.4s"}} >
        <Image src={img4} w='285px'/>
        <Heading m="10px" as="h6" size={"sm"}>Bracelets Collection.</Heading>
        <Text m="10px" fontSize={"14px"}>Gold and Silver Collection</Text>
      </Box>
     </Grid>
        </>
    )
}
