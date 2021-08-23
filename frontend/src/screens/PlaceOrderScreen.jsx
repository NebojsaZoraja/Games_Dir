import React, { useEffect, useState } from "react";
import { Button, Col, Card, Row, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";

const PlaceOrderScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { cartItem } = cart;

  const placeOrderHandler = () => {
    console.log("order");
  };

  if (!cartItem.game) {
    history.replace("/empty");
  }

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />

      <Row className="justify-content-center">
        <Col lg={5}>
          <Card>
            <Card>
              <ListGroup variant="flush" className="py-3">
                <ListGroup.Item>
                  <h2>Overview</h2>
                  <h5 style={{ textDecoration: "none" }}>
                    <strong>Title: </strong>
                    {cartItem.title}
                  </h5>
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Payment Method</h2>
                  <h5 style={{ textDecoration: "none" }}>
                    <strong>Method: </strong>
                    {cart.paymentMethod}
                  </h5>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Card>
        </Col>
        <Col lg={3}>
          <Card variant="flush">
            <Card>
              <ListGroup variant="flush" className="py-3">
                <ListGroup.Item>
                  <h2>Order Summary</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row style={{ textAlign: "center" }}>
                    <Col as="h5">Total:</Col>
                    <Col as="h5">${cartItem.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item style={{ textAlign: "center" }}>
                  <Button
                    type="button"
                    className="btn-block"
                    onClick={placeOrderHandler}
                  >
                    Place Order
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
