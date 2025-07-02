import { Col } from "react-bootstrap";
import "./Brand-card.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addToCart } from "../../app/features/cart/cartSlice";

const BrandCard = ({ title, BrandItem }) => {
  const dispatch = useDispatch();
  const router = useNavigate();
  const handelClick = () => {
    if (BrandItem.logoUrl) {
      // المنتج جاي من الـ API
      router(`/shop/api/${BrandItem.id}`);
    } else {
      // المنتج من المصفوفة المحلية
      router(`/shop/local/${BrandItem.id}`);
    }
  };

  return (
    <Col lg={3} md={4} sm={6} xs={12} className="Brand mtop">
      {title === "Brands" }

      <img
        loading="lazy"
        onClick={() => handelClick()}
        src={
          BrandItem.logoUrl
            ? `http://test.smartsto0re.shop${BrandItem.logoUrl}`
            : BrandItem.imgUrl
        }
        alt={BrandItem.name}
      />

      <div className="Brand-details">
        <h3 onClick={() => handelClick()}>{BrandItem.name}</h3>
      </div>
    </Col>
  );
};

export default BrandCard;
