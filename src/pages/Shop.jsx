import { Col, Container, Row } from "react-bootstrap";
import { Fragment, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SearchBar from "../components/SeachBar/SearchBar";
import ShopList from "../components/ShopList";
import Banner from "../components/Banner/Banner";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import { getProducts } from "../services/products_services";
import FilterSelect from './../components/FilterSelect';
import Pagination from 'react-bootstrap/Pagination';

const Shop = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const brandId = searchParams.get("brand");
const categoryId = searchParams.get("category");
  const [allproducts, setAllProducts] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProducts(1, 1000);
        const products = res.data.data;
        setAllProducts(products);

        let filtered = products;
        if (brandId) filtered = filtered.filter((p) => p.brandId === brandId);
        if (categoryId) filtered = filtered.filter((p) => p.categoryId === categoryId);
        setFilterList(filtered);
        setTotalPages(Math.ceil(filtered.length / itemsPerPage));
        setCurrentPage(1);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchData();
  }, [brandId]);

  const paginatedList = filterList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useWindowScrollToTop();

  return (
    <div>
      <Fragment>
        <Banner title="products" />
        <section className="filter-bar mt-5">
          <Container className="filter-bar-contianer">
            <Row className="justify-content-center">
              <Col md={4}>
                <FilterSelect
                  setFilterList={setFilterList}
                  setCurrentPage={setCurrentPage}
                  allProducts={allproducts || []}
                  
                />
              </Col>
              <Col md={8}>
                <SearchBar
                  setFilterList={setFilterList}
                  setCurrentPage={setCurrentPage}
                  allProducts={allproducts || []}
                />
              </Col>
            </Row>
          </Container>

          <Container>
            <ShopList productItems={paginatedList} />
          </Container>
        </section>

        <Pagination className="justify-content-center mt-4">
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {[...Array(totalPages)].map((_, idx) => (
            <Pagination.Item
              key={idx + 1}
              active={idx + 1 === currentPage}
              onClick={() => handlePageChange(idx + 1)}
            >
              {idx + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </Fragment>
    </div>
  );
};

export default Shop;
