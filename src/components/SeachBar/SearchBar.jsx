import { useEffect, useState } from "react";
import "./searchbar.css";
import { getProducts } from "../../services/products_services";

const SearchBar = ({ setFilterList, setCurrentPage, setTotalPages }) => {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resProducts = await getProducts(1, 10000); // get all products
        setAllProducts(resProducts.data.data || []);
        // initialize full list
        setFilterList(resProducts.data.data.slice(0, 10));
        setTotalPages(Math.ceil(resProducts.data.data.length / 10));
        setCurrentPage(1);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, [setFilterList, setTotalPages, setCurrentPage]);

  const handleChange = (e) => {
    const value = e.target.value.toLowerCase();

    const filtered = allProducts.filter(item =>
      item.name?.toLowerCase().includes(value)
    );

    setCurrentPage(1);
    setTotalPages(Math.ceil(filtered.length / 10));
    setFilterList(filtered);
  };

  return (
    <div className="search-container">
      <input type="text" placeholder="Search..." onChange={handleChange} />
      <ion-icon name="search-outline" className="search-icon"></ion-icon>
    </div>
  );
};

export default SearchBar;
