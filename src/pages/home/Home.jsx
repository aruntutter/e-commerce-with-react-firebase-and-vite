import React, { useContext, useState } from "react";
import myContext from "../../context/data/myContext";
import Layout from "../../components/layout/Layout";
import HeroSection from "../../components/heroSection/HeroSection";
import Filter from "../../components/filter/Filter";
import ProductCard from "../../components/productCard/ProductCard";
import Track from "../../components/track/Track";
import { Link } from "react-router-dom";

function Home() {
  const [showAllProducts, setShowAllProducts] = useState(false);

  const toggleAllProducts = () => {
    setShowAllProducts(!showAllProducts);
  };

  return (
    <Layout>
      <HeroSection />
      <Filter />
      <ProductCard showAll={showAllProducts} /> {/* Pass the showAll prop */}
      <div className="flex justify-center -mt-13 mb-4">
        <button
          onClick={toggleAllProducts}
          className="bg-blue-300 px-5 py-2 rounded-xl"
        >
          {showAllProducts ? "Show Less" : "Show More"}
        </button>
      </div>
      <Track />
    </Layout>
  );
}

export default Home;
