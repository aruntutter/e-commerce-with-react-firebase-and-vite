import React, { useContext } from "react";
import myContext from "../../context/data/myContext";
import Layout from "../../components/layout/Layout";
import HeroSection from "../../components/heroSection/HeroSection";
import Filter from "../../components/filter/Filter";

function Home() {
  return (
    <Layout>
      <HeroSection />
      <Filter />
    </Layout>
  );
}

export default Home;
