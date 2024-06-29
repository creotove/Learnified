import React from "react";
import { Link } from "react-router-dom";

const BreadCrumbs = ({ title }) => {
  return (
    <section className="relative text-white p-5 backdrop-blur rounded-full border border-purple-500 text-3xl">
      <div className="container mx-auto">
        <div className="flex">
          <div>
            <Link to="/" className="text-white">
              Home
            </Link>
            <span className="mx-2">/</span>
          </div>
          <div>
            <Link to="/packages" className="text-white">
              Packages
            </Link>
            <span className="mx-2">/</span>
          </div>
          <div>
            <Link to="/contact" className="text-purple-500">
              {title}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BreadCrumbs;
