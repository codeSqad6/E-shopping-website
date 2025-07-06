import { useState } from "react";
import "./searchbar.css";

const SearchBar = ({ allProducts, setFilterList, setCurrentPage }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

  const filtered = Array.isArray(allProducts)
  ? allProducts.filter(item =>
      item.name?.toLowerCase().includes(value)
    )
  : [];


    setCurrentPage(1);
    setFilterList(filtered);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleChange}
      />
      <ion-icon name="search-outline" className="search-icon"></ion-icon>
    </div>
  );
};

export default SearchBar;
