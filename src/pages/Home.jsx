import { Fragment, useEffect, useState } from "react";
import Wrapper from "../components/wrapper/Wrapper";
import Section from "../components/Section";
import { products } from "../utils/products"; // مفيش داعي لاستدعاء discoutProducts
import SliderHome from "../components/Slider";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import axios from "axios";
import Categories from "../components/Catagories/Catagory";

const Home = () => {
  const [productsFromApi, setProductsFromApi] = useState([]);

  // const newArrivalData = products.filter(
  //   (item) => item.category === "mobile" || item.category === "wireless"
  // );

  const [CatagoriesItem, setCatagoriesItem] = useState([]);

  const bestSales = products.filter((item) => item.category === "sofa");

  useWindowScrollToTop();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "http://test.smartsto0re.shop/api/Products"
        );
        setProductsFromApi(res.data.data); // حسب شكل الـ API عندك
      } catch (error) {
        console.error("❌ Error fetching products:", error);
      }
    };

    fetchProducts();
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

      <Section title="Best Sales" bgColor="#f6f9fc" productItems={bestSales} />
    </Fragment>
  );
};

export default Home;
