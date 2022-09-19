import React, { useState } from "react";
import "./navbar.css";
import { ImSearch } from "react-icons/im";
import { FiShoppingBag } from "react-icons/fi";
import { BsPersonCircle } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import { FiX } from "react-icons/fi";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <div className="main-cont">
        <div className="brand-cont">
          <h1>HouseKart</h1>
        </div>
        <div className={showMenu ? "right-mobile-cont" : " right-cont"}>
          <div className="list-cont">
            <ul>
              <li>Home</li>
              <li>Products</li>
              <li>Contact</li>
              <li>About</li>
            </ul>
          </div>
          <div className="search-profile-cart-cont">
            <ImSearch size={20} />
            <FiShoppingBag size={20} />
            <BsPersonCircle size={20} />
          </div>
        </div>

        <div onClick={() => setShowMenu(!showMenu)} className="menu-icon">
          {showMenu ? <FiX size={25} /> : <FiMenu size={25} />}
        </div>
      </div>
    </>
  );
};

export default Navbar;
