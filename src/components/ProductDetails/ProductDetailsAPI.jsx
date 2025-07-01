import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { addToCart } from "../../app/features/cart/cartSlice";
import "./product-details.css";

const ProductDetailsAPI = ({ setRelatedProducts }) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [quantity, setQuantity] = useState(1);

 useEffect(() => {
  const fetchProductDetails = async () => {
    try {
      const res = await axios.get(`http://test.smartsto0re.shop/api/Products/${id}`);
      const fetchedProduct = res.data;

      setProduct(fetchedProduct);

      const categoryRes = await axios.get(
        `http://test.smartsto0re.shop/api/Categories/${fetchedProduct.categoryId}`
      );
      setCategoryName(categoryRes.data.name);

      // ✅ هنا ضيف كود المنتجات المشابهة
      if (fetchedProduct?.categoryId && setRelatedProducts) {
        const allRes = await axios.get("http://test.smartsto0re.shop/api/Products");
        const filtered = allRes.data.data.filter(
          (item) =>
            item.categoryId === fetchedProduct.categoryId && item.id !== fetchedProduct.id
        );
        setRelatedProducts(filtered);
      }

    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  fetchProductDetails();
}, [id, setRelatedProducts]);


  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleAdd = () => {
    dispatch(addToCart({ product, num: quantity }));
    toast.success("Product has been added to cart!");
  };

  if (!product) return <p>Loading...</p>;

  return (
      <section className="product-page">
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <img
              loading="lazy"
              src={`http://test.smartsto0re.shop${product.imageUrls[0]}`}
              alt={product.name}
            />
          </Col>
          <Col md={6}>
            <div className="rate">
              <div className="stars">
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
              </div>
              <span>{product?.avgRating} 4.7ratings</span>
            </div>
            <div className="info">
              <span className="price">${product.price}</span>
              <span>category: {categoryName}</span>
            </div>
            <p>{product.description}</p>
            <input
              className="qty-input"
              type="number"
              placeholder="Qty"
              value={quantity}
              onChange={handleQuantityChange}
            />
            <button
              aria-label="Add"
              type="submit"
              className="add"
              onClick={handleAdd}
            >
              Add To Cart
            </button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ProductDetailsAPI;
