import React from "react";
import "./footer.css";
import Playstore from "../../images/playstore.png";
import Appstore from "../../images/Appstore.png";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="footer">
          <div className="left-footer">
            <h1>DOWNLOAD OUR APP</h1>
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
            <h1>Follow Us</h1>
            <div className="links">
              <a href="#">Instagram</a>
              <a href="#">Youtube</a>
              <a href="#">Facebook</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
