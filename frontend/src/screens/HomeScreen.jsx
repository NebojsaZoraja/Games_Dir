import React, { useState, useEffect } from "react";
import { Col, Row, Carousel, Image } from "react-bootstrap";
import Product from "../components/Product";
import axios from "axios";
import { Link } from "react-router-dom";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("/api/games");

      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        <Carousel>
          {products.map((product) => (
            <Carousel.Item key={product._id}>
              <Link
                to={`/product/${product._id}`}
                style={{ textDecoration: "none" }}
              >
                <Image
                  src={product.image}
                  alt={product.title}
                  className="d-block w-100"
                />
              </Link>
            </Carousel.Item>
          ))}
        </Carousel>
      </Row>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
