import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header>
      <h1>
        <Link to="/">Naruto's Character Wiki </Link>
      </h1>
    </header>
  );
}

export default Header;
