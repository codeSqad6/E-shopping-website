import { Fragment, useState } from "react";
import Banner from "../components/Banner/Banner";
import { Container } from "react-bootstrap";
import ShopList from "../components/ShopList";
import { useParams } from "react-router-dom";
import ProductDetails from "../components/ProductDetails/ProductDetailsAPI";
import ProductReviews from "../components/ProductReviews/ProductReviews";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";

const Product = () => {
  const { id } = useParams();
  const [productTitle, setProductTitle] = useState("Product Details");
  const [productId, setProductId] = useState("");
  const [category, setCategory] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);

  useWindowScrollToTop();

  return (
    <Fragment>
      <Banner title={productTitle} />
      <ProductDetails
        setTitle={setProductTitle}
        setProductId={setProductId}
        setCategory={setCategory}
        setRelatedProducts={setRelatedProducts}
      />
      <ProductReviews productId={productId} />
      <section className="related-products">
        <Container>
          <h3>You might also like</h3>
        </Container>
        <ShopList productItems={relatedProducts} />
      </section>
    </Fragment>
  );
};

export default Product;
