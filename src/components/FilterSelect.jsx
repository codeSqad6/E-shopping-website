import Select from 'react-select';
import { getProducts } from '../services/products_services';
import { useEffect, useState } from 'react';
import { getCategories } from '../services/categories_service';




const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "#0f3460",
    color: "white",
    borderRadius: "5px",
    border: "none",
    boxShadow: "none",
    width: "200px",
    height: "40px",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#0f3460" : "white",
    color: state.isSelected ? "white" : "#0f3460",
    "&:hover": {
      backgroundColor: "#0f3460",
      color: "white",
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "white",
  }),
};

const FilterSelect = ({ setFilterList, setCurrentPage, setTotalPages }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resProducts = await getProducts(1, 10000); // get all products
        setAllProducts(resProducts.data.data || []);

        const resCategory = await getCategories();
        setCategories(resCategory.data || []);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  const options = categories.map(category => ({
    value: category.id,
    label: category.name
  }));

  const handleChange = (selectedOption) => {
    const filtered = allProducts.filter(item => item.categoryId === selectedOption.value);
    
    // Reset to first page of filtered results
    setCurrentPage(1);
    setTotalPages(Math.ceil(filtered.length / 10));

    // Only show first 10 products
    setFilterList(filtered);
  };

  return (
    <Select
      options={options}
      defaultValue={{ value: "", label: "Filter By Category" }}
      styles={customStyles}
      onChange={handleChange}
    />
  );
};

export default FilterSelect;
