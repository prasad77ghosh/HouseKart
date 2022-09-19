import React from "react";
import "./footer.css";
import Playstore from "../../images/playstore.png";
import Appstore from "../../images/Appstore.png";
import { AiFillInstagram } from "react-icons/ai";
import { RiYoutubeFill } from "react-icons/ri";
import { IoLogoFacebook } from "react-icons/io";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="left-footer">
          <h2>DOWNLOAD OUR APP</h2>
          <p>Dowload our app on Android and IOS platform</p>
          <div className="store">
            <img src={Playstore} alt="playstore img" />
            <img src={Appstore} alt="appstore img" />
          </div>
        </div>
        <div className="mid-footer">
          <h1>HouseKart</h1>
          <p>High Quality is our first priority</p>
          <p>Copyrights 2021 &copy; MePrasadGhosh</p>
        </div>
        <div className="right-footer">
          <h4>Follow Us</h4>
          <div className="links">
            <a href="#">
              <AiFillInstagram size={34} />
            </a>
            <a href="#">
              <RiYoutubeFill size={36} />
            </a>
            <a href="#">
              <IoLogoFacebook size={34} />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
