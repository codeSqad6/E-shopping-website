import { Container, Row } from "react-bootstrap";
import ProductCard from "./ProductCard/ProductCard";
import ShowMoreButton from "../utils/ShowMoreButton/ShowMoreButton";

const Section = ({ title, bgColor, productItems }) => {
  return (
    <section style={{ background: bgColor }}>
      <Container>
        <div className="heading">
          <h1>{title}</h1>
        </div>
        <Row className="g-3">
          {productItems.map((productItem) => {
            return (
              <ProductCard
                key={productItem.id}
                title={title}
                productItem={productItem}
              />
            );
          })}
          <ShowMoreButton to="/shop" />

        </Row>
      </Container>
    </section>
  );
};

export default Section;
