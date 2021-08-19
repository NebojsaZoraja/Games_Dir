import React from "react";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-0 rounded">
      <Link to={`/product/${product._id}`} style={{ textDecoration: "none" }}>
        <Card.Img src={product.image} variant="top flush" />
        <Card.Body>
          <Col>
            <Card.Title as="h5" style={{ textAlign: "center" }}>
              <strong>{product.title}</strong>
            </Card.Title>
            <Card.Text as="div" style={{ textAlign: "center" }}>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </Card.Text>
          </Col>
        </Card.Body>
      </Link>
    </Card>
  );
};

export default Product;
