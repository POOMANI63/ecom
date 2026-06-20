import React from "react";

import Hero from "./Hero";
import Header from "../../components/common/Header";
import Products from "../Products/Products";

export default function Home() {
  return (
    <>
      <Hero />
      <Products/>
    </>
  );
}