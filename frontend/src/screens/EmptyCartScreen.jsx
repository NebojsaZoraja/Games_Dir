import React from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const EmptyCartScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { cartItem } = cart;

  if (cartItem.game) {
    history.replace(`/overview/${cartItem.game}`);
  }
  const handleBack = () => {
    history.push("/");
  };
  return (
    <Container style={{ textAlign: "center" }}>
      <Row lg={1} className="mt-3 pt-3">
        <Col>
          <Image src="/images/empty.png" />
        </Col>
      </Row>
      <Row className="mt-3 justify-content-center">
        <Col lg={4}>
          <Button variant="info" className="w-75" onClick={handleBack}>
            Back to homepage
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default EmptyCartScreen;
