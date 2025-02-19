import React from "react";
import { Link } from "react-router-dom";
import heartIcon from '../assets/icons8-heart-100.png';
import "../styles/Header.css";

function Header() {
  return (
    <header className="header">
      {/* Logo and Brand */}
      <div className="logo-container">
        <Link to="/" className="brand">
          <span className="brand-text-light">my</span>
          <span className="brand-text-accent">Kitchen</span>
        </Link>
      </div>

      {/* Favorite Icon - Always Visible */}
      <div className="wishlist">
        <Link to="/WishList" className="wishlist-icon" aria-label="View favorites">
          <img src={heartIcon} className="wishlist-img" alt="Favorites" />
        </Link>
      </div>
    </header>
  );
}

export default Header;