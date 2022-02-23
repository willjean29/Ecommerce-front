import { Carousel, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "components/custom/Loader";
import Message from "components/custom/Mesaage";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "store";
import { useEffect } from "react";
import { getTopProducts } from "store/products/product.actions";

interface ProductCarouselProps {}

const ProductCarousel: React.FC<ProductCarouselProps> = () => {
  const dispatch = useDispatch();
  const { isLoadingTop, error, productsTop } = useSelector((state: RootStore) => state.produts);
  useEffect(() => {
    dispatch(getTopProducts());
  }, [dispatch]);

  return (
    <>
      {isLoadingTop ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Carousel pause="hover" className="bg-dark mb-4">
          {productsTop.map((product) => (
            <Carousel.Item key={product._id}>
              <Link to={`/product/${product._id}`}>
                <Image src={product.image} alt={product.name} fluid />
                <Carousel.Caption className="carousel-caption">
                  {product.name} (${product.price})
                </Carousel.Caption>
              </Link>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </>
  );
};

export default ProductCarousel;
