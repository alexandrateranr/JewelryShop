import React, { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  Button,
  VStack,
  HStack,
  Divider,
  IconButton,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { DELETE_CART } from '../Store/actiontype';
import { useNavigate } from 'react-router-dom';
import styles from '../style/bagpage.module.css';
import ringsImage from '../Pics/Rings.jpg';
import earringsImage from '../Pics/earing.jpg';
import necklacesImage from '../Pics/necklace.jpg';
import braceletsImage from '../Pics/bracelet.jpg';

export const Bag = () => {
  const { cartArray } = useSelector(store => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    landmark: '',
    city: '',
    state: '',
    pinCode: '',
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });

  const subtotal = cartArray.reduce((total, product) => total + (product.price || 0), 0);
  const taxRate = 0.02;
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  // Get the appropriate image based on category
  const getCategoryImage = (category) => {
    if (!category) return null;
    const categoryLower = category.toLowerCase();
    if (categoryLower === "rings") return ringsImage;
    if (categoryLower === "earrings") return earringsImage;
    if (categoryLower === "necklaces") return necklacesImage;
    if (categoryLower === "bracelets") return braceletsImage;
    return null;
  };

  const handleRemove = (product) => {
    dispatch({ type: DELETE_CART, payload: product });
    toast({
      title: 'Item Removed',
      description: 'Product removed from cart',
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    setShowAddressForm(false);
    setShowPaymentForm(true);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setShowPaymentForm(false);
    setShowSuccessModal(true);
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    navigate('/');
  };

  if (cartArray.length === 0) {
    return (
      <Box className={styles.cartContainer} minH="80vh" display="flex" alignItems="center" justifyContent="center">
        <VStack spacing={6}>
          <Heading
            fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
            fontFamily="Didot, serif"
            fontWeight="400"
            color="#bcab97"
            letterSpacing="2px"
          >
            Your Cart is Empty
          </Heading>
          <Text
            fontSize={{ base: "md", md: "lg" }}
            fontFamily="Playfair Display, serif"
            color="#666"
            fontWeight="300"
          >
            Discover our exquisite collection
          </Text>
          <Button
            bg="black"
            color="white"
            borderRadius="0"
            px={8}
            py={6}
            fontSize="sm"
            fontWeight="400"
            letterSpacing="1px"
            fontFamily="Playfair Display, serif"
            _hover={{ bg: "#333" }}
            onClick={() => navigate('/products')}
          >
            SHOP NOW →
          </Button>
        </VStack>
      </Box>
    );
  }

  return (
    <Box className={styles.cartContainer}>
      <Box maxW="1400px" mx="auto" px={{ base: 4, md: 8, lg: 12 }} py={12}>
        <Heading
          fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
          fontFamily="Didot, serif"
          fontWeight="400"
          color="black"
          letterSpacing="3px"
          mb={8}
          textAlign="center"
        >
          YOUR CART
        </Heading>

        <Flex
          direction={{ base: 'column', lg: 'row' }}
          gap={8}
          alignItems="flex-start"
        >
          {/* Cart Items Section */}
          <Box flex="1" w={{ base: '100%', lg: '65%' }}>
            <VStack spacing={6} alignItems="stretch">
              {cartArray.map((item) => (
                <Box
                  key={item.id}
                  className={styles.cartItem}
                  p={6}
                  bg="white"
                  boxShadow="0 2px 8px rgba(0,0,0,0.08)"
                  borderRadius="0"
                  border="1px solid #f0f0f0"
                >
                  <Flex direction={{ base: 'column', md: 'row' }} gap={6}>
                    <Image
                      src={getCategoryImage(item.category) || item.avatar}
                      alt={item.brand}
                      w={{ base: '100%', md: '250px' }}
                      h="250px"
                      objectFit="cover"
                      borderRadius="0"
                    />
                    <Flex flex="1" direction="column" justifyContent="space-between">
                      <Box>
                        <Heading
                          as="h3"
                          fontSize={{ base: "lg", md: "xl" }}
                          fontFamily="Playfair Display, serif"
                          fontWeight="400"
                          color="black"
                          mb={2}
                        >
                          {item.brand}
                        </Heading>
                        <Text
                          fontSize={{ base: "sm", md: "md" }}
                          fontFamily="Playfair Display, serif"
                          color="#666"
                          fontWeight="300"
                          mb={4}
                          lineHeight="1.6"
                        >
                          {item.about}
                        </Text>
                        <Text
                          fontSize={{ base: "lg", md: "xl" }}
                          fontFamily="Playfair Display, serif"
                          color="black"
                          fontWeight="500"
                          letterSpacing="1px"
                        >
                          ${item.price}
                        </Text>
                      </Box>
                      <Flex justifyContent="flex-end" mt={4}>
                        <IconButton
                          aria-label="Remove item"
                          icon={<Text fontSize="xl">×</Text>}
                          onClick={() => handleRemove(item)}
                          bg="transparent"
                          color="#999"
                          _hover={{ color: "black", bg: "#f5f5f5" }}
                          borderRadius="0"
                          size="md"
                          fontFamily="Playfair Display, serif"
                        />
                      </Flex>
                    </Flex>
                  </Flex>
                </Box>
              ))}
            </VStack>
          </Box>

          {/* Order Summary Section */}
          <Box w={{ base: '100%', lg: '35%' }} position={{ lg: 'sticky' }} top="100px">
            <Box
              className={styles.orderSummary}
              p={8}
              bg="#bcab97"
              color="white"
              borderRadius="0"
            >
              <Heading
                as="h2"
                fontSize="2xl"
                fontFamily="Didot, serif"
                fontWeight="400"
                letterSpacing="2px"
                mb={6}
              >
                ORDER SUMMARY
              </Heading>

              <VStack spacing={4} alignItems="stretch" mb={6}>
                <Flex justifyContent="space-between" fontFamily="Playfair Display, serif">
                  <Text fontWeight="300">Subtotal</Text>
                  <Text fontWeight="400">${subtotal.toFixed(2)}</Text>
                </Flex>
                <Flex justifyContent="space-between" fontFamily="Playfair Display, serif">
                  <Text fontWeight="300">Tax (2%)</Text>
                  <Text fontWeight="400">${tax.toFixed(2)}</Text>
                </Flex>
                <Divider borderColor="white" opacity="0.3" />
                <Flex justifyContent="space-between" fontFamily="Playfair Display, serif">
                  <Text fontWeight="500" fontSize="lg">Total</Text>
                  <Text fontWeight="500" fontSize="lg">${total.toFixed(2)}</Text>
                </Flex>
              </VStack>

              <Button
                w="100%"
                bg="black"
                color="white"
                borderRadius="0"
                py={6}
                fontSize="sm"
                fontWeight="400"
                letterSpacing="2px"
                fontFamily="Playfair Display, serif"
                _hover={{ bg: "#333" }}
                onClick={() => setShowAddressForm(true)}
                textTransform="uppercase"
              >
                PROCEED TO CHECKOUT
              </Button>
            </Box>
          </Box>
        </Flex>
      </Box>

      {/* Address Form Modal */}
      <Modal isOpen={showAddressForm} onClose={() => setShowAddressForm(false)} size="xl">
        <ModalOverlay bg="blackAlpha.700" />
        <ModalContent borderRadius="0" bg="#bcab97" color="white">
          <ModalHeader
            fontFamily="Didot, serif"
            fontSize="2xl"
            letterSpacing="2px"
            fontWeight="400"
          >
            SHIPPING ADDRESS
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody pb={8}>
            <form onSubmit={handleAddressSubmit}>
              <VStack spacing={4}>
                <FormControl>
                  <FormLabel fontFamily="Playfair Display, serif" fontWeight="300">
                    Full Name
                  </FormLabel>
                  <Input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                  required
                    bg="white"
                    color="black"
                    borderRadius="0"
                    border="none"
                    fontFamily="Playfair Display, serif"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontFamily="Playfair Display, serif" fontWeight="300">
                    Landmark
                  </FormLabel>
                  <Input
                    name="landmark"
                    value={formData.landmark}
                    onChange={handleInputChange}
                  required
                    bg="white"
                    color="black"
                    borderRadius="0"
                    border="none"
                    fontFamily="Playfair Display, serif"
                  />
                </FormControl>
                <HStack spacing={4} w="100%">
                  <FormControl>
                    <FormLabel fontFamily="Playfair Display, serif" fontWeight="300">
                      City
                    </FormLabel>
                    <Input
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                  required
                      bg="white"
                      color="black"
                      borderRadius="0"
                      border="none"
                      fontFamily="Playfair Display, serif"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontFamily="Playfair Display, serif" fontWeight="300">
                      State
                    </FormLabel>
                    <Input
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                  required
                      bg="white"
                      color="black"
                      borderRadius="0"
                      border="none"
                      fontFamily="Playfair Display, serif"
                    />
                  </FormControl>
                </HStack>
                <FormControl>
                  <FormLabel fontFamily="Playfair Display, serif" fontWeight="300">
                    Pin Code
                  </FormLabel>
                  <Input
                    name="pinCode"
                  type="number"
                    value={formData.pinCode}
                    onChange={handleInputChange}
                  required
                    bg="white"
                    color="black"
                    borderRadius="0"
                    border="none"
                    fontFamily="Playfair Display, serif"
                  />
                </FormControl>
                <Button
                  type="submit"
                  w="100%"
                  bg="black"
                  color="white"
                  borderRadius="0"
                  py={6}
                  fontSize="sm"
                  fontWeight="400"
                  letterSpacing="2px"
                  fontFamily="Playfair Display, serif"
                  _hover={{ bg: "#333" }}
                  textTransform="uppercase"
                  mt={4}
                >
                  CONTINUE TO PAYMENT
                </Button>
              </VStack>
          </form>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Payment Form Modal */}
      <Modal isOpen={showPaymentForm} onClose={() => setShowPaymentForm(false)} size="xl">
        <ModalOverlay bg="blackAlpha.700" />
        <ModalContent borderRadius="0" bg="#bcab97" color="white">
          <ModalHeader
            fontFamily="Didot, serif"
            fontSize="2xl"
            letterSpacing="2px"
            fontWeight="400"
          >
            PAYMENT DETAILS
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody pb={8}>
            <form onSubmit={handlePaymentSubmit}>
              <VStack spacing={4}>
                <FormControl>
                  <FormLabel fontFamily="Playfair Display, serif" fontWeight="300">
                    Amount
                  </FormLabel>
                  <Input
                    value={`$${total.toFixed(2)}`}
                    readOnly
                    bg="white"
                    color="black"
                    borderRadius="0"
                    border="none"
                    fontFamily="Playfair Display, serif"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontFamily="Playfair Display, serif" fontWeight="300">
                    Card Number
                  </FormLabel>
                  <Input
                    name="cardNumber"
                type="number"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                required
                    placeholder="1234 5678 9012 3456"
                    bg="white"
                    color="black"
                    borderRadius="0"
                    border="none"
                    fontFamily="Playfair Display, serif"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontFamily="Playfair Display, serif" fontWeight="300">
                    Card Holder Name
                  </FormLabel>
                  <Input
                name="cardHolder"
                    value={formData.cardHolder}
                    onChange={handleInputChange}
                required
                    bg="white"
                    color="black"
                    borderRadius="0"
                    border="none"
                    fontFamily="Playfair Display, serif"
                  />
                </FormControl>
                <HStack spacing={4} w="100%">
                  <FormControl>
                    <FormLabel fontFamily="Playfair Display, serif" fontWeight="300">
                      Expiry Date
                    </FormLabel>
                    <Input
                name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      required
                placeholder="MM/YY"
                      bg="white"
                      color="black"
                      borderRadius="0"
                      border="none"
                      fontFamily="Playfair Display, serif"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontFamily="Playfair Display, serif" fontWeight="300">
                      CVV
                    </FormLabel>
                    <Input
                      name="cvv"
                type="number"
                      value={formData.cvv}
                      onChange={handleInputChange}
                required
                      bg="white"
                      color="black"
                      borderRadius="0"
                      border="none"
                      fontFamily="Playfair Display, serif"
                    />
                  </FormControl>
                </HStack>
                <Button
                  type="submit"
                  w="100%"
                  bg="black"
                  color="white"
                  borderRadius="0"
                  py={6}
                  fontSize="sm"
                  fontWeight="400"
                  letterSpacing="2px"
                  fontFamily="Playfair Display, serif"
                  _hover={{ bg: "#333" }}
                  textTransform="uppercase"
                  mt={4}
                >
                  PAY NOW
                </Button>
              </VStack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Success Modal */}
      <Modal isOpen={showSuccessModal} onClose={handleSuccessClose} isCentered>
        <ModalOverlay bg="blackAlpha.700" />
        <ModalContent borderRadius="0" bg="white" p={8}>
                  <Alert
            status="success"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            bg="transparent"
            py={8}
          >
            <AlertIcon boxSize="60px" color="green.500" />
            <AlertTitle
              mt={4}
              mb={2}
              fontSize="2xl"
              fontFamily="Didot, serif"
              fontWeight="400"
              letterSpacing="2px"
            >
              Payment Successful
                    </AlertTitle>
            <AlertDescription
              fontSize="md"
              fontFamily="Playfair Display, serif"
              fontWeight="300"
              maxWidth="sm"
            >
              Thank you for your purchase! Your order has been confirmed.
                    </AlertDescription>
            <Button
              mt={6}
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
              onClick={handleSuccessClose}
            >
              CONTINUE SHOPPING →
            </Button>
                  </Alert>
        </ModalContent>
      </Modal>
    </Box>
  );
};
