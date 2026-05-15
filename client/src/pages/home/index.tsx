import React from "react";
import Hero from "./hero";
import Category from "./category";
import Info from "./info";

const Home = () => {
  return (
    <div className="bg-bg-primary min-h-screen">
      <Hero />
      <Category />
      <Info />
    </div>
  );
};

export default Home;