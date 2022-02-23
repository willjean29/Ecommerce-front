import { useEffect, useState } from "react";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { RootStore } from "store";
import Modal from "components/custom/Modal";
import Loader from "components/custom/Loader";
import Message from "components/custom/Mesaage";
import { craeteProduct, deleteProductById, listProducts } from "store/products/product.actions";
import { useNavigate, useParams } from "react-router-dom";
import Paginate from "components/custom/Paginate";
interface ProductListPageProps {}

const ProductListPage: React.FC<ProductListPageProps> = () => {
  const { page } = useParams();
  const [isVisible, setiIsVisible] = useState(false);
  const [productId, setProductId] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    isLoading,
    products,
    error,
    success,
    product,
    page: currentPage,
    pages,
  } = useSelector((store: RootStore) => store.produts);
  const { user } = useSelector((store: RootStore) => store.user);
  useEffect(() => {
    if (success) {
      navigate(`/admin/product/${product?._id}/edit`);
    } else {
      dispatch(listProducts("", page));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, success]);

  const openModalHandler = (id: string) => {
    setProductId(id);
    setiIsVisible(true);
  };

  const deleteProductHandler = () => {
    dispatch(deleteProductById(productId));
    setiIsVisible(false);
  };

  const createProductHandler = () => {
    dispatch(craeteProduct());
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i>Create Product
          </Button>
        </Col>
      </Row>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>

                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>

                    <Button variant="danger" className="btn-sm" onClick={() => openModalHandler(product._id)}>
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate page={currentPage} pages={pages} isAdmin={user?.isAdmin} />
        </>
      )}

      <Modal
        isVisible={isVisible}
        setIsVisible={setiIsVisible}
        title="Delete Product"
        description="A deleted product cannot be recovered, are you sure?"
        onSuccess={() => {
          // console.log("eleminar");
          deleteProductHandler();
        }}
      />
    </>
  );
};

export default ProductListPage;
