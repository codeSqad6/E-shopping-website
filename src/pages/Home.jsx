import { Fragment, useEffect, useState } from "react";
import Wrapper from "../components/wrapper/Wrapper";
import Section from "../components/Section";
import SliderHome from "../components/Slider";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import axios from "axios";
import Categories from "../components/Catagories/Catagory";
import { getProducts } from "./../services/products_services";
const Home = () => {
  const [productsFromApi, setProductsFromApi] = useState([]);
  const [CatagoriesItem, setCatagoriesItem] = useState([]);

 const [BrandsFromApi, setBrandsFromApi] = useState([]);
  useWindowScrollToTop();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts(1, 10);
        setProductsFromApi(res.data.data); // حسب شكل الـ API عندك
      } catch (error) {
        console.error("❌ Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await axios.get(
          "http://test.smartsto0re.shop/api/Brands"
        );
        setBrandsFromApi(res.data.data); // حسب شكل الـ API عندك
      } catch (error) {
        console.error("❌ Error fetching Brands:", error);
      }
    };

    fetchBrands();
  }, []);
  useEffect(() => {
    const fetchCatagories = async () => {
      try {
        const res = await axios.get(
          "http://test.smartsto0re.shop/api/Categories"
        );
        setCatagoriesItem(res.data.data); // حسب شكل الـ API عندك
      } catch (error) {
        console.error("❌ Error fetching products:", error);
      }
    };

    fetchCatagories();
  }, []);

  return (
    <Fragment>
      <SliderHome />
      <Wrapper />
      <Section
        title="Products"
        bgColor="#f6f9fc"
        productItems={productsFromApi}
      />
      <Categories
      // title="Categories"
      // bgColor="white"
      // productItems={CatagoriesItem}
      />

      <Section title="Brands" bgColor="#f6f9fc" BrandItems={BrandsFromApi} />
    </Fragment>
  );
};

export default Home;
