import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Container,
} from "react-bootstrap";
import Rating from "../components/Rating";
import axios from "axios";

const ProductScreen = ({ match }) => {
  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/games/${match.params.id}`);

      setProduct(data);
    };
    fetchProduct();
  }, [match.params.id]);

  return (
    <Container>
      <Link
        className="btn btn-light my-3"
        to="/"
        style={{ textDecoration: "none" }}
      >
        Go back
      </Link>
      <Row className="justify-content-center my-2">
        <Col md={8} lg={6} xs={12}>
          <Image
            src={product.image}
            alt={product.title}
            style={{ height: "100%", width: "100%" }}
            fluid
          />
        </Col>
        <Col md={4} lg={3} xs={12} className="mt-2">
          <ListGroup variant="flush" style={{ width: "100%" }}>
            <ListGroup.Item>
              <Row style={{ textAlign: "center" }}>
                <Col as="h5">Price:</Col>
                <Col as="h5">
                  <strong>${product.price}</strong>
                </Col>
              </Row>
              <Row as="h5" className="mt-3 " style={{ textAlign: "center" }}>
                <strong>Status:</strong>
              </Row>
              <Row as="h4" style={{ textAlign: "center" }}>
                <strong>
                  {product.numberInStock > 0 ? "In Stock" : "Out Of Stock"}
                </strong>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Button
                  style={{
                    backgroundColor: "dodgerblue",
                    borderColor: "dodgerblue",
                  }}
                  type="button"
                  disabled={product.numberInStock === 0}
                >
                  {product.numberInStock > 0 ? "Buy now" : "Out Of Stock"}
                </Button>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col lg={10}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.title}</h3>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductScreen;
