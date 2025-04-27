import React from "react";
import "./SearchBar.css"; // Make sure to create this CSS file
import { FaSearch } from "react-icons/fa"; // You can install react-icons for the loupe icon

const SearchBar = () => {
  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Look up a country"
        />
      </div>
    </div>
  );
};

export default SearchBar;
