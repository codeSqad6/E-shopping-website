import { Col } from "react-bootstrap";
import {  useEffect, useState } from "react";
import "./product-card.css";
import { useNavigate,useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  addToCart,
  addToCartAPI,
  fetchCart,
} from "../../app/features/cart/cartSlice";
import axios from "axios";
import { useSelector } from "react-redux";
const ProductCard = ({ title, productItem }) => {
  const [avgRating, setAvgRating] = useState(null);
// const { id } = useParams();
  const dispatch = useDispatch();
   const router = useNavigate();
  // const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const handelClick = () => {
    if (productItem.imageUrls) {
      router(`/shop/api/${productItem.id}`);
    } else {
      router(`/shop/local/${productItem.id}`);
    }
  };

  const handelAdd = (productItem) => {
    dispatch(addToCartAPI({ productId: productItem.id, quantity: 1 }))
      .then(() => {
        dispatch(fetchCart()); // ✅ إعادة تحميل الكارت بعد الإضافة
      })
      .catch((err) => {
        toast.error("Something went wrong!");
        console.error(err);
      });
  };
useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewRes = await axios.get(`http://test.smartsto0re.shop/api/Review`);
        const reviews = reviewRes.data;
        const productReviews = reviews.filter((r) => r.productId === productItem.id);

        if (productReviews.length > 0) {
          const total = productReviews.reduce((sum, r) => sum + r.rating, 0);
          setAvgRating(total / productReviews.length);
        } else {
          setAvgRating(0);
        }
      } catch (err) {
        console.error("Failed to fetch reviews", err);
      }
    };

    fetchReviews();
  }, [productItem.id]);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;

    return [
      ...Array(fullStars).fill(<i className="fa fa-star text-warning"></i>),
      ...Array(emptyStars).fill(<i className="fa fa-star text-secondary"></i>),
    ];
  };


  return (
     <Col lg={3} md={4} sm={6} xs={12} className="product mtop mb-5">
      {title === "Products" && <span className="discount">20% Off</span>}

      <img
        loading="lazy"
        onClick={handelClick}
        src={
          productItem.imageUrls
            ? `http://test.smartsto0re.shop${productItem.imageUrls[0]}`
            : productItem.imgUrl
        }
        alt={productItem.name}
      />

      <div className="product-like">
        <ion-icon name="heart-outline"></ion-icon>
      </div>
      <div className="product-details">
        <h3 onClick={handelClick}>{productItem.name}</h3>
        <div className="rate">
  <div className="stars">
    {renderStars(avgRating ?? 0)}
  </div>
  {/* <span>{avgRating !== null ? avgRating.toFixed(1) + " ratings" : "No ratings yet"}</span> */}
</div>
        <div className="price">
          <h4>${productItem.price}</h4>
          <button
            aria-label="Add"
            type="button"
            className="add"
            onClick={() => handelAdd(productItem)}
          >
            <ion-icon name="add"></ion-icon>
          </button>
        </div>
      </div>
    </Col>
  );

};

export default ProductCard;
