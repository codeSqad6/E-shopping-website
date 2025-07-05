import { Col, Container, Row } from "react-bootstrap";
// import FilterSelect from "../components/FilterSelect";
import SearchBar from "../components/SeachBar/SearchBar";
import { Fragment, useEffect, useState } from "react";
import ShopList from "../components/ShopList";
import Banner from "../components/Banner/Banner";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import { getProducts } from "./../services/products_services";
import FilterSelect from './../components/FilterSelect';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filterList, setFilterList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProducts();
        setProducts(res.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchData();
  }, []);

  // Sync filter list with products
  useEffect(() => {
    console.log("products", products);

    setFilterList(products);
    console.log(filterList, "filterlist");
  }, [products]);

  useWindowScrollToTop();

  return (
    <Fragment>
      <Banner title="products" />
      <section className="filter-bar mt-5">
        <Container className="filter-bar-contianer">
          <Row className="justify-content-center">
            <Col md={4}>
              <FilterSelect setFilterList={setFilterList} />
            </Col>
             <Col md={8}>
              <SearchBar setFilterList={setFilterList} />
            </Col>
          
         
     
          </Row>
        </Container>
        <Container>
          <ShopList productItems={filterList} />
        </Container>
      </section>
    </Fragment>
  );
};

export default Shop;
