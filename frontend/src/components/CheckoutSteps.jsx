import React from "react";
import { Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  const gameDetails = useSelector((state) => state.gameDetails);
  const cart = useSelector((state) => state.cart);
  const { cartItem } = cart;
  const { game } = gameDetails;
  return (
    <Nav className="justify-content-center mb-4" variant="pills">
      <Nav.Item>
        {step1 ? (
          <LinkContainer
            to={`/login?redirect=overview/${cartItem.game}`}
            className="mx-1"
            style={{ backgroundColor: "limegreen" }}
          >
            <Nav.Link>Sign In</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Sign In</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step2 ? (
          <LinkContainer
            to={`/overview/${game._id}`}
            className="mx-1"
            style={{ backgroundColor: "limegreen" }}
          >
            <Nav.Link>Overview</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Overview</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step3 ? (
          <LinkContainer
            to="/payment"
            className="mx-1"
            style={{ backgroundColor: "limegreen" }}
          >
            <Nav.Link>Payment</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Payment</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step4 ? (
          <LinkContainer
            className="mx-1"
            to="/placeorder"
            style={{ backgroundColor: "limegreen" }}
            rounded
          >
            <Nav.Link>Claim Your Game</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Claim Your Game</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
