import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Col,
  Row,
  Image,
  Container,
  Carousel as CarouselTop,
  Button,
} from "react-bootstrap";
import Game from "../components/Game";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Link } from "react-router-dom";
import { listGames } from "../actions/gameActions";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const HomeScreen = ({ match }) => {
  const dispatch = useDispatch();

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const keyword = match.params.keyword;

  const gameList = useSelector((state) => state.gameList);
  const { loading, error, games } = gameList;
  const discountGames = [];
  games.forEach((game) => (game.price <= 30 ? discountGames.push(game) : null));
  useEffect(() => {
    dispatch(listGames(keyword));
  }, [dispatch, keyword]);

  return (
    <>
      <h2 className="text-center py-lg-3">Games under $30</h2>
      <Container>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            <Row className="justify-content-center">
              <Col xs={30}>
                <CarouselTop responsive={responsive}>
                  {discountGames.map((game) => (
                    <CarouselTop.Item key={game._id}>
                      <Link
                        to={`/game/${game._id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <Image
                          src={game.image}
                          alt={game.title}
                          className="d-block w-100"
                          fluid
                        />
                      </Link>
                    </CarouselTop.Item>
                  ))}
                </CarouselTop>
              </Col>
            </Row>
            <Row
              className="justify-content-center my-lg-3 py-lg-3 my-3 py-3"
              style={{ borderTop: "solid", borderWidth: "0.5px" }}
            >
              <Col style={{ textAlign: "right" }}>
                <Button variant="outline-light" className="btn-sm">
                  View all
                </Button>
                <Carousel
                  className="w-100"
                  responsive={responsive}
                  renderButtonGroupOutside={true}
                  infinite={true}
                  slidesToSlide={4}
                >
                  {games.map((game) => (
                    <Col key={game._id}>
                      <Game game={game} />
                    </Col>
                  ))}
                </Carousel>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </>
  );
};

export default HomeScreen;
