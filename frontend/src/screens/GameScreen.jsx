import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import Rating from "../components/Rating";
import { listGameDetails } from "../actions/gameActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const GameScreen = ({ match, history }) => {
  const dispatch = useDispatch();

  const gameDetails = useSelector((state) => state.gameDetails);
  const { loading, error, game } = gameDetails;

  useEffect(() => {
    dispatch(listGameDetails(match.params.id));
  }, [dispatch, match]);

  const buyNowHandler = () => {
    history.push(`/overview/${match.params.id}`);
  };

  return (
    <>
      <Link
        className="btn btn-light my-3"
        to="/"
        style={{ textDecoration: "none" }}
      >
        Go back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row className="justify-content-center my-2">
            <Col md={8} lg={7} xs={12}>
              <Image
                src={game.image}
                alt={game.title}
                style={{ height: "100%", width: "100%" }}
                fluid
              />
            </Col>
            <Col md={4} sm={4} lg={3} xs={12} className="mt-2 mt-lg-4 mt-md-0">
              <Card>
                <ListGroup variant="flush" style={{ width: "100%" }}>
                  <ListGroup.Item>
                    <Row style={{ textAlign: "center" }}>
                      <Col as="h5">Price:</Col>
                      <Col as="h5">
                        <strong>${game.price}</strong>
                      </Col>
                    </Row>
                    <Row
                      as="h5"
                      className="mt-3 "
                      style={{ textAlign: "center" }}
                    >
                      <strong>Status:</strong>
                    </Row>
                    <Row as="h4" style={{ textAlign: "center" }}>
                      <strong>
                        {game.numberInStock > 0 ? "In Stock" : "Out Of Stock"}
                      </strong>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Button
                        onClick={buyNowHandler}
                        style={{
                          backgroundColor: "dodgerblue",
                          borderColor: "dodgerblue",
                        }}
                        type="button"
                        disabled={game.numberInStock === 0}
                      >
                        {game.numberInStock > 0 ? "Buy now" : "Out Of Stock"}
                      </Button>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col lg={10}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>{game.title}</h3>
                    <Rating
                      value={game.rating}
                      text={`${game.numReviews} reviews`}
                    />
                  </ListGroup.Item>
                  <ListGroup.Item>{game.description}</ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default GameScreen;
