import { Container, Row } from "react-bootstrap";
// import "./catagory-card.css";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { useDispatch } from "react-redux";
// import { addToCart } from "../../app/features/cart/cartSlice";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import CatagoryCard from "../CatagoryCard/CatagoryCard";

const Categories = () => {
  const [CatagoriesItem, setCatagoriesItem] = useState([]);

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
    <>
      <section className="text-center">
        <Container>
          <Row className="g-3">
            <h2 className="pb-2">Catagories</h2>
            {CatagoriesItem.map((category) => (
              <CatagoryCard
                key={category.id}
                // title={category.title}
                productItem={category}
              />
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
};
export default Categories;
