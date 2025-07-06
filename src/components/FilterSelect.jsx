import Select from 'react-select';
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

const FilterSelect = ({ allProducts, setFilterList, setCurrentPage }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        setCategories(res.data || []);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const options = [
    { value: "", label: "All Categories" },
    ...categories.map(category => ({
      value: category.id,
      label: category.name
    }))
  ];

  const handleChange = (selectedOption) => {
    const selectedCategoryId = selectedOption.value;
   const filtered = selectedCategoryId
  ? Array.isArray(allProducts)
    ? allProducts.filter(item => item.categoryId === selectedCategoryId)
    : []
  : allProducts || [];


    setCurrentPage(1);
    setFilterList(filtered);
  };

  return (
    <Select
      options={options}
      defaultValue={options[0]}
      styles={customStyles}
      onChange={handleChange}
    />
  );
};

export default FilterSelect;
