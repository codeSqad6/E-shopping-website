import { Col, Container, Row } from "react-bootstrap";
import "./catagory-card.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addToCart } from "../../app/features/cart/cartSlice";

const CatagoryCard = ({ title, productItem }) => {
  const dispatch = useDispatch();
  const router = useNavigate();
  const handelClick = () => {
    router(`/shop/${productItem.id}`);
  };
  const handelAdd = (productItem) => {
    dispatch(addToCart({ product: productItem, num: 1 }));
    toast.success("Product has been added to cart!");
  };
  return (
    <Col lg={3} md={4} sm={6} xs={12} className="catagory mtop">
      <img
        loading="lazy"
        onClick={() => handelClick()}
        src={
          productItem.imageUrl
            ? `http://test.smartsto0re.shop${productItem.imageUrl}`
            : productItem.imgUrl
        }
        alt={productItem.name}
      />
      <h3>{productItem.name}</h3>
    </Col>
  );
};

export default CatagoryCard;
