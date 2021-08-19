import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
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
    <>
      <Link
        className="btn btn-light my-3"
        to="/"
        style={{ textDecoration: "none" }}
      >
        Go back
      </Link>
      <Row md={2}>
        <Col md={6}>
          <Image src={product.image} alt={product.title} fluid />
        </Col>
        <Card className="w-auto my-3">
          <Col
            md={2}
            className="mx-2 my-3"
            style={{ width: "20em", textAlign: "center" }}
          >
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col as="h4">Price:</Col>
                  <Col as="h4">
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col as="h4">Status:</Col>
                  <Col as="h4">
                    <strong>
                      {product.numberInStock > 0 ? "In Stock" : "Out Of Stock"}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Button
                    className="btn-block"
                    type="button"
                    disabled={product.numberInStock === 0}
                  >
                    {product.numberInStock > 0 ? "Add To Cart" : "Out Of Stock"}
                  </Button>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Card>
      </Row>
      <Row className="py-2">
        <Col lg={10}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.title}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
