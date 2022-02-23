import Product from "components/custom/Product";
import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "components/custom/Mesaage";
import Loader from "components/custom/Loader";
import { listProducts } from "store/products/product.actions";
import { RootStore } from "store";
import { useParams } from "react-router-dom";
import Paginate from "components/custom/Paginate";
import ProductCarousel from "components/custom/ProductCarousel";
import MetaHead from "components/custom/MetaHead";
import { Link } from "react-router-dom";
interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  const dispatch = useDispatch();
  const { isLoading, products, error, page: pageCurrent, pages } = useSelector((store: RootStore) => store.produts);
  const { keyword, page } = useParams();
  console.log({ keyword });
  useEffect(() => {
    dispatch(listProducts(keyword as string, page as string));
  }, [dispatch, keyword, page]);
  return (
    <>
      <MetaHead />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      )}
      <h1>Lastet Products</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product, index) => (
              <Col sm={12} md={6} lg={4} xl={3} key={index.toString()}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate page={pageCurrent} pages={pages} />
        </>
      )}
    </>
  );
};

export default HomePage;
