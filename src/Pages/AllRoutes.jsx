import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import { ContactUs } from "./ContactUs";
import { Bag } from "./Bag";
import { Account } from "./Account";
import Product from "./Product";

export const AllRoutes = ({query, setQuery}) => {
  return (
    <Routes>
      <Route path="/" element={<Home setQuery={setQuery} />} />
      <Route path="/contactUs" element={<ContactUs />} />
      <Route path="/account" element={<Account />} />
      <Route path="/products" element={<Product query={query}/>} />
      <Route path="/bag" element={<Bag />} />
    </Routes>
  );
};
