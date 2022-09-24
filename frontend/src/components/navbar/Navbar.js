import React, { useState } from "react";
import "./navbar.css";
import { ImSearch } from "react-icons/im";
import { FiShoppingBag } from "react-icons/fi";
import { BsPersonCircle } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import { FiX } from "react-icons/fi";
import {Link} from "react-router-dom"

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <nav>
        <div className="main-cont">
          <h1>HouseKart</h1>
          <div className={showMenu ? "right-mobile-cont" : "right-cont"}>
            <div className="list-cont">
              <ul>
                <Link to="/">
                  <li>Home</li>
                </Link>
                <Link to="/products">
                  <li>Products</li>
                </Link>
                <li>Contact</li>
                <li>About</li>
              </ul>
            </div>
            <div className="search-profile-cart-cont">
              <Link to = "/search">
                <ImSearch size={23} />
              </Link>
              <FiShoppingBag size={23} />
              <BsPersonCircle size={23} />
            </div>
          </div>

          <div onClick={() => setShowMenu(!showMenu)} className="menu-icon">
            {showMenu ? <FiX size={25} /> : <FiMenu size={25} />}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
