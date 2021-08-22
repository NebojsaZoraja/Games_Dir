import React, { useEffect } from "react";
import {
  Col,
  Container,
  ListGroup,
  Row,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import CheckoutSteps from "../components/CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import { addToCart } from "../actions/cartActions";

const OverviewScreen = ({ match, location, history }) => {
  const productId = match.params.id;

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const { cartItem } = cart;
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId));
    }
  }, [dispatch, productId]);

  return (
    <Container>
      <CheckoutSteps step1 step2 />
      <Row className="justify-content-center">
        <Col lg={7}>
          <Card>
            <Card.Img src={cartItem.image} />
            <Card.Body>
              <Row className="py-2">
                <Card.Text style={{ fontSize: "2rem" }}>
                  Price: ${cartItem.price}
                </Card.Text>
              </Row>
              <Row className="py-2">
                <Card.Text style={{ fontSize: "1.5rem" }}>
                  Important! The activation keys we provide are going to work
                  only on the Steam platform.
                  <br /> You will need a Steam account in order to activate this
                  product.
                </Card.Text>
              </Row>
              <Row className="py-2">
                <Button className="mt-3">Proceed to payment</Button>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OverviewScreen;
