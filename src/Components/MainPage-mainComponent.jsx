import React from 'react'
import styles from '../style/mainPage.module.css'
import { Box, Flex, Heading, Text, VStack, Button, Divider } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

export const MainPagemainComponent = ({setQuery}) => {
  const navigate = useNavigate();
  
  const handleCategoryClick = (category) => {
    if (setQuery) {
      setQuery(category);
    }
    navigate('/products');
  };
  
  return (
    <Flex className={styles.stopmostcontainer} flexDirection="column" w="100%" h="100vh" px="8%" py="2%">
      {/* Top Section - Collection Title */}
      <Flex justifyContent="center" alignItems="center" h="15%" mb="2%">
        <Heading 
          as="h1" 
          fontSize={{ base: "5xl", md: "7xl", lg: "9xl" }} 
          color="white" 
          fontWeight="400"
          letterSpacing="4px"
          fontFamily="Didot, serif"
          textAlign="center"
        >
          COLLECTION 2025
        </Heading>
      </Flex>

      {/* Middle Section - Hand Image with Side Text */}
      <Flex justifyContent="space-between" alignItems="center" h="65%" mb="2%">
        {/* Left Content Block */}
        <VStack alignItems="flex-start" spacing={4} w="25%" maxW="300px">
          <Text 
            fontSize={{ base: "md", md: "lg", lg: "xl" }} 
            color="white" 
            lineHeight="1.6"
            fontFamily="Playfair Display, serif"
            fontWeight="300"
          >
            Discover exquisite jewelry inspired by the beauty of the heavens. Each piece is crafted to bring elegance and grace to your most cherished occasions.
          </Text>
          
          <Button 
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
            transition="all 0.3s ease"
          >
            DISCOVER →
          </Button>
        </VStack>

        {/* Center - Hand Image */}
        <Box className={styles.mainhands} w="27%" h="100%" />

        {/* Right Content Block */}
        <VStack alignItems="flex-start" spacing={3} w="25%" maxW="300px">
          <Text 
            fontSize={{ base: "sm", md: "md", lg: "lg" }} 
            color="white" 
            fontWeight="300"
            letterSpacing="1px"
            fontFamily="Playfair Display, serif"
            textAlign="left"
            lineHeight="1.4"
          >
            A CELESTIAL TOUCH FOR TIMELESS MOMENTS
          </Text>
          
          <VStack spacing={1} alignItems="flex-start" w="100%">
            <Box w="100%" py={1} _hover={{ cursor: "pointer" }} onClick={() => handleCategoryClick("Rings")}>
              <Text color="white" fontSize={{ base: "sm", md: "md" }} letterSpacing="1px" fontFamily="Playfair Display, serif" fontWeight="300">
                RINGS →
              </Text>
              <Divider borderColor="white" opacity="0.3" mt={1} />
            </Box>
            
            <Box w="100%" py={1} _hover={{ cursor: "pointer" }} onClick={() => handleCategoryClick("Earrings")}>
              <Text color="white" fontSize={{ base: "sm", md: "md" }} letterSpacing="1px" fontFamily="Playfair Display, serif" fontWeight="300">
                EARRINGS →
              </Text>
              <Divider borderColor="white" opacity="0.3" mt={1} />
            </Box>
            
            <Box w="100%" py={1} _hover={{ cursor: "pointer" }} onClick={() => handleCategoryClick("Necklaces")}>
              <Text color="white" fontSize={{ base: "sm", md: "md" }} letterSpacing="1px" fontFamily="Playfair Display, serif" fontWeight="300">
                NECKLACES →
              </Text>
              <Divider borderColor="white" opacity="0.3" mt={1} />
            </Box>
            
            <Box w="100%" py={1} _hover={{ cursor: "pointer" }} onClick={() => handleCategoryClick("Bracelets")}>
              <Text color="white" fontSize={{ base: "sm", md: "md" }} letterSpacing="1px" fontFamily="Playfair Display, serif" fontWeight="300">
                BRACELETS →
              </Text>
              <Divider borderColor="white" opacity="0.3" mt={1} />
            </Box>
          </VStack>
        </VStack>
      </Flex>
    </Flex>
  )
}
