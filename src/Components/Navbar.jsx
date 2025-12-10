// import { Link } from "@chakra-ui/react";
// import React from "react";
// import { NavLink } from "react-router-dom";

// export const Navbar = () => {
//   return (
//     <>
//       <Link to="/" as={NavLink}>
//         Home
//       </Link>
//       <Link to="/contactUs" as={NavLink}>
//         Contact
//       </Link>
//       <Link to="/account" as={NavLink}>
//         Account
//       </Link>
//       <Link to="/bag" as={NavLink}>
//         Bag
//       </Link>
import { Flex, Link, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "../style/navbar.module.css";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
} from "@chakra-ui/react";
import { MydrawerContent } from "./MydrawerContent";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT } from "../Store/actiontype";

export const Navbar = ({setQuery}) => {
  const { isOpen, onClose } = useDisclosure();
   const {isAuth} = useSelector(st=>st);
   const dispatch = useDispatch();
   const navigate = useNavigate();
  return (
    <>
      <Flex
        justify="space-around"
        flexDirection={{base : "column" , md:"row" , lg : "row" , xl : "row"}}
        alignItems="center"
        zIndex={"2"}
        p="4"
        pl="60px"
        pr="60px"
        h={{base : "45px" , md:"45px" , lg : "45px" , xl : "45px"}}
        w="100%"
        className={styles.navbaronly}
      >
        <Link to="/" as={NavLink} p="1" fontFamily="Cormorant Garamond, serif" color="white">
          Home
        </Link>
        <Link to="/contactUs" as={NavLink} p="1" fontFamily="Cormorant Garamond, serif" color="white">
          Contact
        </Link>
        <Link to="/account" as={NavLink} p="1" fontFamily="Cormorant Garamond, serif" color="white">
          Account
        </Link>
        <Link to="/bag" as={NavLink} p="1" fontFamily="Cormorant Garamond, serif" color="white">
          Bag
        </Link>
      </Flex>
      {isAuth ? <Button pos={"fixed"} zIndex={5} right={"12px"} top={"10px"} colorScheme='white' variant='ghost' fontFamily="Cormorant Garamond, serif" color="white" onClick={()=>dispatch({type:LOGOUT})}>
    Logout
  </Button> 
  : <Button pos={"fixed"} right={"12px"} zIndex={5} top={"10px"}  colorScheme='white' variant='ghost' fontFamily="Cormorant Garamond, serif" color="white" onClick={()=>{navigate("/account")}}>
    Login
  </Button>
  }
      <Drawer onClose={onClose} isOpen={isOpen} size="md" placement="left">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{`Gem Garden`}</DrawerHeader>
          <DrawerBody>
            <MydrawerContent setQuery={setQuery}/>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
