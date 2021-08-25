import React, { useEffect } from "react";
import { Button, Col, Card, Row, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import { createOrder } from "../actions/orderActions";
import { ORDER_DETAILS_REQUEST } from "../constatns/orderConstants";

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItem } = cart;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_DETAILS_REQUEST });
    }
  }, [history, success, order, dispatch]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItem: cartItem,
        paymentMethod: cart.paymentMethod,
        totalPrice: cartItem.price,
      })
    );
  };

  if (!cartItem.game) {
    history.replace("/empty");
  }

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />

      <Row className="justify-content-center">
        <Col lg={5}>
          <Card variant="flush">
            <Card>
              <ListGroup variant="flush" className="">
                <ListGroup.Item
                  style={{ borderBottom: "solid", borderWidth: "0.5px" }}
                >
                  <h2>Overview</h2>
                  <h5>
                    <strong>Title: </strong>
                    {cartItem.title}
                  </h5>
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Payment Method</h2>
                  <h5>
                    <strong>Method: </strong>
                    {cart.paymentMethod}
                  </h5>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Card>
        </Col>
        <Col lg={4}>
          <Card variant="flush">
            <Card>
              <ListGroup variant="flush" className="">
                <ListGroup.Item
                  style={{
                    borderBottom: "solid",
                    borderWidth: "0.5px",
                    textAlign: "center",
                  }}
                >
                  <h2>Order Summary</h2>
                </ListGroup.Item>
                <ListGroup.Item
                  style={{ borderBottom: "solid", borderWidth: "0.5px" }}
                >
                  <Row style={{ textAlign: "center" }}>
                    <Col as="h4">Total:</Col>
                    <Col as="h4">${cartItem.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  {error && <Message variant="danger">{error}</Message>}
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
