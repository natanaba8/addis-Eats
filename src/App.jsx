import Footer from './components/Footer';
import Header from './components/Header';
import Menu from './Menu';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Checkout from './components/Checkout';
import DishDetails from './components/DishDetails';
import Login from './components/Login';
import NotFound from './components/NotFound';
import RequireAuth from './components/RequireAuth';
import "./css/style.css";

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

function App() {
  return (
    <div>
      <ThemeProvider>
        <CartProvider>
          <AuthProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout />}>
                <Route index element={<Navigate to="/menu" replace />} />
                <Route path="menu" element={<Menu />} />
                <Route path="menu/:id" element={<DishDetails />} />
                <Route element={<RequireAuth />}>
                  <Route path="checkout" element={<Checkout />} />
                </Route>
                <Route path="login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </CartProvider>
      </ThemeProvider>
    </div>
  );
}

export default App
