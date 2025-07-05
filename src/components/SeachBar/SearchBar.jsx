import { useEffect, useState } from "react";
import "./searchbar.css";
// import { products } from "../../utils/products";
import { getProducts } from "../../services/products_services";
// import useDebounce from "../../hooks/useDebounce";
const SearchBar = ({ setFilterList }) => {
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const resProducts = await getProducts();
          setProducts(resProducts.data); 
        
        } catch (error) {
          console.error('Failed to fetch data:', error);
        }
      };
  
      fetchData();
    }, []);
  const [searchWord, setSearchWord] = useState(null);
  // const debounceSearchWord = useDebounce(searchWord, 300);
  const handelChange = (input) => {
    setSearchWord(input.target.value);
    setFilterList(
      products.filter((item) =>
        item.name?.toLowerCase().includes(searchWord?.toLowerCase())
      )
    );
  };
  return (
    <div className="search-container">
      <input type="text" placeholder="Search..." onChange={handelChange} />
      <ion-icon name="search-outline" className="search-icon"></ion-icon>
    </div>
  );
};

export default SearchBar;
