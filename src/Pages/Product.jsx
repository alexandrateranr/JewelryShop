import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Grid,
  Heading,
  Image,
  Button,
  Text,
  Spinner,
  Center,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useDispatch } from "react-redux";
import { ADD_CART } from "../Store/actiontype";
import ringsImage from "../Pics/Rings.jpg";
import earringsImage from "../Pics/earing.jpg";
import necklacesImage from "../Pics/necklace.jpg";
import braceletsImage from "../Pics/bracelet.jpg";

function Product({query}) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [Loading,setLoading] = useState(false);
  const [Err,setErr] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast()

  // Get the appropriate image based on category
  const getCategoryImage = (category) => {
    const categoryLower = category?.toLowerCase();
    if (categoryLower === "rings") return ringsImage;
    if (categoryLower === "earrings") return earringsImage;
    if (categoryLower === "necklaces") return necklacesImage;
    if (categoryLower === "bracelets") return braceletsImage;
    return null;
  };

  const categoryImage = getCategoryImage(query);

  useEffect(() => {
    const fetchrender = async () => {
      setLoading(true);
      try {
        let res = await fetch(
          `https://traveller-jt36.onrender.com/jewellery?_page=${page}&_limit=12${query ? "&category="+query : ""}`
        );
        let data = await res.json();
        setLoading(false);
        setData(data);
      } catch (err) {
        setLoading(false);
        setErr(true);
      }
    };
    fetchrender();
  }, [page, query]);

  if (Loading) {
    return <Center p={"150px"}>
      <Spinner
  thickness='4px'
  speed='0.65s'
  emptyColor='gray.200'
  color='black.500'
  size='xl'
/>
    </Center>;
  }

  if (Err) {
    return  toast({
      title: `Try Again`,
      status: "error",
      isClosable: true,
    });
  }

  const handclick = (val) => {
    setPage(page + val);
  };

  return (
    <Box 
      bg="#fafafa" 
      minH="100vh" 
      pt="100px" 
      pb="80px"
      px={{ base: 4, md: 8, lg: 12 }}
    >
      {query && (
        <Heading
          fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
          fontFamily="Didot, serif"
          fontWeight="400"
          color="black"
          letterSpacing="3px"
          textAlign="center"
          mb={12}
          textTransform="uppercase"
        >
          {query}
        </Heading>
      )}
      <Grid
        textAlign={"left"}
        color={"#171616"}
        maxW="1400px"
        m="auto"
        gap={{base : "20px", md : "24px" , xl : "32px"}}
        justifyContent={"center"}
        templateColumns={{base : "repeat(1,1fr)",md : "repeat(2,1fr)",lg : "repeat(3,1fr)",xl : "repeat(4,1fr)"}}
      >
        {data.map((ele,i) => (
          // <Box
          //   textAlign="center"
          //   boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px"
          //   _hover={{
          //     transform: "scale(1.05)",
          //     transition: "transform 0.4s",
          //     border: "1px double black",
          //   }}
          // >
          //   <Image src={ele.avatar} w="250px" />
          //   <Heading m="10px" as="h6" size={"sm"} color="green">
          //     {ele.about}
          //   </Heading>
          //   <Heading m="10px" as="h6" size={"sm"}>
          //     {ele.brand}
          //   </Heading>
          //   <Heading m="10px" as="h6" size={"sm"} color="gold">
          //     ₹ {ele.price}
          //   </Heading>
          //   <ButtonGroup variant="outline" spacing="45" mb="18px">
          //     <Button bg="blue" color="white" borderRadius="8px" p="2px">
          //       ADD CARD
          //     </Button>
          //     <Button bg="red" color="white" borderRadius="8px" p="2px">
          //       Read More
          //     </Button>
          //   </ButtonGroup>
          // </Box>
          <Box
            boxShadow="0 4px 16px rgba(0, 0, 0, 0.1)"
            display={"flex"}
            p={"20px"}
            flexDir={"column"}
            bg="white"
            borderRadius="0"
            border="1px solid #f0f0f0"
            _hover={{ 
              transform: "translateY(-4px)", 
              transition: "all 0.3s ease",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
            }}
            minH={"450px"}
            key={i}
            position="relative"
            overflow="hidden"
          >
            <Box 
              w="100%" 
              h="280px" 
              mb="16px"
              overflow="hidden"
              bg="#fafafa"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Image 
                src={categoryImage || ele.avatar} 
                w="100%" 
                h="100%"
                objectFit="cover"
                m={"auto"}
                transition="transform 0.3s ease"
                _hover={{ transform: "scale(1.05)" }}
              />
            </Box>
            <Flex 
              justifyContent={"space-between"} 
              alignItems={"flex-start"}
              flex="1"
              direction="column"
              gap="12px"
            >
              <Box flex="1">
                <Heading 
                  as="h6" 
                  size={"md"} 
                  textAlign="left"
                  fontFamily="Playfair Display, serif"
                  fontWeight="500"
                  mb="8px"
                  color="black"
                >
                  {ele.brand}
                </Heading>
                <Text
                  fontSize={"14px"}
                  color="#666"
                  lineHeight="1.5"
                  mb="12px"
                  fontFamily="Playfair Display, serif"
                  fontWeight="300"
                  noOfLines={2}
                >
                  {ele.about}
                </Text>
                <Text 
                  fontSize={"18px"} 
                  color="black"
                  fontFamily="Playfair Display, serif"
                  fontWeight="500"
                  letterSpacing="0.5px"
                >
                  ${ele.price}
                </Text>
              </Box>
              <Flex
                direction="row"
                justifyContent={"space-between"}
                alignItems={"center"}
                w="100%"
                gap="8px"
                mt="auto"
              >
                <Button 
                  variant="outline" 
                  color={"black"} 
                  fontSize={"13px"}
                  borderRadius="0"
                  borderColor="#ddd"
                  fontFamily="Playfair Display, serif"
                  fontWeight="300"
                  _hover={{ 
                    borderColor: "black",
                    bg: "#fafafa"
                  }}
                  flex="1"
                >
                  Details
                </Button>
                <Button
                  color="white"
                  bg="black"
                  borderRadius="0"
                  _hover={{ 
                    bg: "#333",
                    transform: "scale(1.02)"
                  }}
                  fontSize={"13px"}
                  fontFamily="Playfair Display, serif"
                  fontWeight="400"
                  letterSpacing="1px"
                  px="24px"
                  transition="all 0.3s ease"
                  onClick={()=>{
                    const itemToAdd = categoryImage ? { 
                      ...ele, 
                      avatar: categoryImage, 
                      category: query 
                    } : ele;
                    dispatch({type : ADD_CART , payload : itemToAdd});
                    toast({
                      title : `Item Added to Cart`,
                      status: "success",
                      duration : 2000,
                      isClosable: true,
                    });
                  }}
                >
                  ADD
                </Button>
              </Flex>
            </Flex>
          </Box>
        ))}
      </Grid>
      <Flex 
        justifyContent="center" 
        alignItems="center" 
        gap={6} 
        mt={12}
        maxW="1400px"
        m="auto"
      >
        <Button 
          onClick={() => handclick(-1)} 
          isDisabled={page === 1}
          bg="black"
          color="white"
          borderRadius="0"
          px={8}
          py={5}
          fontSize="sm"
          fontWeight="400"
          letterSpacing="1px"
          fontFamily="Playfair Display, serif"
          _hover={{ bg: "#333" }}
          _disabled={{ bg: "#ccc", cursor: "not-allowed" }}
        >
          Previous
        </Button>
        <Text 
          fontSize="lg"
          fontFamily="Playfair Display, serif"
          fontWeight="400"
          px={4}
        >
          Page {page}
        </Text>
        <Button 
          onClick={() => handclick(1)}
          bg="black"
          color="white"
          borderRadius="0"
          px={8}
          py={5}
          fontSize="sm"
          fontWeight="400"
          letterSpacing="1px"
          fontFamily="Playfair Display, serif"
          _hover={{ bg: "#333" }}
        >
          Next
        </Button>
      </Flex>
    </Box>
  );
}

export default Product;
