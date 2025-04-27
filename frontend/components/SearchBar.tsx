import React from "react";
import "./SearchBar.css"; // Make sure to create this CSS file
import { FaSearch } from "react-icons/fa"; // You can install react-icons for the loupe icon
import Form from "next/form";

async function handleSubmit(formData: FormData) {
  const search = formData.get("search");

  const response = await fetch("search", {
    method: "POST",
    body: JSON.stringify({ search }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const data = await response.json();
  if (response.ok) {
    alert("Searched");
    console.log(data);
  } else {
    alert("Search failed: " + data.message);
  }
}

const SearchBar = () => {
  return (
    <>
      <Form action={handleSubmit}>
        <div className="search-bar-container">
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              className="search-input"
              name="search"
              placeholder="Look up a country"
            />
          </div>
        </div>
      </Form>
    </>
  );
};

export default SearchBar;
