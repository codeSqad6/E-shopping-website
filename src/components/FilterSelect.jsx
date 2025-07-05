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

const FilterSelect = ({ setFilterList }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resProducts = await getProducts();
        setProducts(resProducts.data); 
        const resCategory = await getCategories();
        setCategories(resCategory.data); 
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
    const filtered = products.filter(item => item.categoryId === selectedOption.value);
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
