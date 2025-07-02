import { Container, Row } from "react-bootstrap";
import ProductCard from "./ProductCard/ProductCard";
import BrandCard from "./BrandCard/BrandCard";
import ShowMoreButton from "../utils/ShowMoreButton/ShowMoreButton";

const Section = ({ title, bgColor, productItems, BrandItems }) => {
  const products = Array.isArray(productItems) ? productItems : [];
  const brands = Array.isArray(BrandItems) ? BrandItems : [];

  return (
    <section style={{ background: bgColor }}>
      <Container>
        <div className="heading">
          <h1>{title}</h1>
        </div>

        {products.length > 0 && (
          <Row className="g-3">
            {products.map((productItem) => (
              <ProductCard
                key={productItem.id}
                title={title}
                productItem={productItem}
              />
            ))}
            <ShowMoreButton to="/shop" />
          </Row>
        )}

        {brands.length > 0 && (
          <Row className="g-3">
            {brands.map((BrandItem) => (
              <BrandCard
                key={BrandItem.id}
                title={title}
                BrandItem={BrandItem}
              />
            ))}
          </Row>
        )}
      </Container>
    </section>
  );
};

export default Section;
