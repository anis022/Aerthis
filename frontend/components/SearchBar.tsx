"use client";

import React from "react";
import "./SearchBar.css";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ handleSearch }: any) => {
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Prevents page reload

    const formData = new FormData(event.currentTarget);
    const search = formData.get("search");

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-coordinates`, {
      method: "POST",
      body: JSON.stringify({ search }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();
    console.log(data.lat)
    if (response.ok) {
      console.log("Searched :", data);
      handleSearch(data);
    } else {
      alert("Search failed: " + data.message);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="search-bar-container">
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              className="search-input"
              name="search"
              placeholder="Look up a country"
              required
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default SearchBar;
