import React from "react";
import footerImage from "../../assets/images/footer-phone.svg";
import fbIcon from "../../assets/icons/pack/fbIcon.svg";
import instaIcon from "../../assets/icons/pack/instaIcon.svg";
import linkedinIcon from "../../assets/icons/pack/linkIcon.svg";
import twitterIcon from "../../assets/icons/pack/xIcon.svg";
import youtubeIcon from "../../assets/icons/pack/youtubeIcon-v2.svg";
import { Link } from "react-router-dom";
import scrollToTop from "../../utils/scrollToTop";

const Footer = () => {
  return (
    <section className="bg-black text-white pt-24 pb-5 flex lg:px-32 px-5">
      <img src={footerImage} alt="footer" className="w-64 hidden lg:block" />
      <div className="lg:ms-32">
        <div>
          <h5 className="text-xl font-bold">About Learnyfied</h5>
          <p className="font-medium mt-5">
            Learnyfied is India’s fastest growing ed-tech platform which
            believes skills is greater than degree. With 2 lakh+ students and
            200+ mentors, Learnyfied aims to provide the best practical
            knowledge.
          </p>
        </div>
        <div className="flex flex-col gap-20 lg:flex-row flex-wrap my-5">
          <div className="flex gap-5">
            <Link to={"/"}>
              <img
                className="min-h-10 min-w-10 bg-gray-500 p-1 rounded"
                src={fbIcon}
                alt="social-icon"
              />
            </Link>
            <Link to={"/"}>
              <img
                className="min-h-10 min-w-10 bg-gray-500 p-1 rounded"
                src={instaIcon}
                alt="social-icon"
              />
            </Link>
            <Link to={"/"}>
              <img
                className="min-h-10 min-w-10 bg-gray-500 p-1 rounded"
                src={twitterIcon}
                alt="social-icon"
              />
            </Link>
            <Link to={"/"}>
              <img
                className="min-h-10 min-w-10 bg-gray-500 p-1 rounded"
                src={youtubeIcon}
                alt="social-icon"
              />
            </Link>
            <Link to={"/"}>
              <img
                className="min-h-10 min-w-10 bg-gray-500 p-1 rounded"
                src={linkedinIcon}
                alt="social-icon"
              />
            </Link>
          </div>
          <div>
            <p className="font-bold mb-3">Useful Links</p>
            <div className="flex flex-col gap-1">
              <Link to={"/about"} className="w-max" onClick={scrollToTop}>
                About us
              </Link>
              <Link to={"/"} className="w-max">
                Blog
              </Link>
              <Link to={"/"} className="w-max">
                Carrer
              </Link>
              <Link to={"/"} className="w-max">
                Become An Instructor
              </Link>
            </div>
          </div>
          <div>
            <p className="font-bold mb-3">Support</p>
            <div className="flex flex-col gap-1">
              <Link to={"/contact-us"} className="w-max">
                Contact us
              </Link>
              <Link to={"/"} className="w-max">
                Disclaimer
              </Link>
              <Link to={"/"} className="w-max">
                Refund policy
              </Link>
              <Link to={"/"} className="w-max">
                End user liscence agreement
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
