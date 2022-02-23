import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import Footer from "components/shared/Footer";
import Header from "components/shared/Header";
import HomePage from "pages/HomePage";
import ProductIdPage from "pages/ProductIdPage";
import { RootStore } from "store";
import CartPage from "pages/CartPage";
import LoginPage from "pages/LoginPage";
import RegisterPage from "pages/RegisterPage";
import ProfilePage from "pages/ProfilePage";
import ShippingPage from "pages/ShippingPage";
import PaymentPage from "pages/PaymentPage";
import PlaceOrderPage from "pages/PlaceOrderPage";
import OrderPage from "pages/OrderPage";
import { getCurrentUser } from "store/users/user.actions";
import Loader from "components/custom/Loader";
import UserListPage from "pages/UserListPage";
import UserEditPage from "pages/UserEditPage";
import ProductListPage from "pages/ProductListPage";
import ProductEditPage from "pages/ProductEditPage";
import OrderListPage from "pages/OrderListPage";
function App() {
  const { isLoading } = useSelector((state: RootStore) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  if (isLoading) {
    return (
      <main className="d-flex justify-content-center align-items-center">
        <Loader />
      </main>
    );
  }
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <AllRoutes />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

interface AllRoutesProps {}

const AllRoutes: React.FC<AllRoutesProps> = () => {
  const { isAuthenticated } = useSelector((state: RootStore) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated && !localStorage.getItem("token")) {
      navigate("/login", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);
  return (
    <>
      <Routes>
        <Route path="/search/:keyword" element={<HomePage />} />
        <Route path="/page/:page" element={<HomePage />} />
        <Route path="/search/:keyword/page/:page" element={<HomePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/shipping" element={<ShippingPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/placeorder" element={<PlaceOrderPage />} />
        <Route path="/order/:id" element={<OrderPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/product/:id" element={<ProductIdPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/admin/userlist" element={<UserListPage />} />
        <Route path="/admin/user/:id/edit" element={<UserEditPage />} />
        <Route path="/admin/productlist" element={<ProductListPage />} />
        <Route path="/admin/productlist/:page" element={<ProductListPage />} />
        <Route path="/admin/product/:id/edit" element={<ProductEditPage />} />
        <Route path="/admin/orderlist" element={<OrderListPage />} />
      </Routes>
    </>
  );
};

export default App;
