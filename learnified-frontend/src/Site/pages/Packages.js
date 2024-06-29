import React, { useEffect } from "react";
import Hero from "../packages_components/Hero";
import Content from "../packages_components/Content";

const Packages = () => {
  const getPackageInfo = async () => {};
  useEffect(() => {
    getPackageInfo();
  }, []);
  return (
    <section className="w-full h-full">
      <Hero title={"Contentpreneur Package"} />
      <Content />
    </section>
  );
};

export default Packages;
