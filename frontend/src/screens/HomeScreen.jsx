import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Carousel, Image, Container } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Link } from "react-router-dom";
import { listGames } from "../actions/gameActions";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const gameList = useSelector((state) => state.gameList);
  const { loading, error, games } = gameList;
  const discountGames = [];
  games.forEach((game) => (game.price <= 10 ? discountGames.push(game) : null));
  useEffect(() => {
    dispatch(listGames());
  }, [dispatch]);

  return (
    <>
      <h1>Latest Games</h1>
      <Container>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            <Row className="justify-content-center">
              <Carousel>
                {discountGames.map((game) => (
                  <Carousel.Item key={game._id}>
                    <Link
                      to={`/product/${game._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Image
                        src={game.image}
                        alt={game.title}
                        className="d-block w-100"
                        fluid
                      />
                    </Link>
                  </Carousel.Item>
                ))}
              </Carousel>
            </Row>
            <Row>
              {games.map((game) => (
                <Col key={game._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={game} />
                </Col>
              ))}
            </Row>
          </>
        )}
      </Container>
    </>
  );
};

export default HomeScreen;
