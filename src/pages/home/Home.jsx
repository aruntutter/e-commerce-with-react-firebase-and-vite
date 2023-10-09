import React, { useContext } from "react";
import myContext from "../../context/data/myContext";
import Layout from "../../components/layout/Layout";
import HeroSection from "../../components/heroSection/HeroSection";
import Filter from "../../components/filter/Filter";
import ProductCard from "../../components/productCard/ProductCard";
import Track from "../../components/track/Track";

function Home() {
  return (
    <Layout>
      <HeroSection />
      <Filter />
      <ProductCard />
      <Track />
    </Layout>
  );
}

export default Home;
