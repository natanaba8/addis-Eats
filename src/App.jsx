import { lazy, Suspense } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import Menu from './Menu';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import DishDetails from './components/DishDetails';
import Login from './components/Login';
import NotFound from './components/NotFound';
import RequireAuth from './components/RequireAuth';
import ErrorBoundary from './ErrorBoundary';
import "./css/style.css";

const Checkout = lazy(() => import('./components/Checkout'));
const Receipt = lazy(() => import('./components/Receipt'));

const routeSkeleton = (
  <div style={{ padding: '1.5rem', fontWeight: 600 }}>Loading page...</div>
);

function Layout() {
  return (
    <>
      <ErrorBoundary fallback={(error) => (
        <div role="alert" style={{ padding: '1rem', border: '1px solid #f59e0b', margin: '1rem' }}>
          <h3>Cart section unavailable</h3>
          <p>{error?.message || 'The cart region failed to load.'}</p>
        </div>
      )}>
        <Header />
      </ErrorBoundary>
      <Outlet />
      <ErrorBoundary fallback={(error) => (
        <div role="alert" style={{ padding: '1rem', border: '1px solid #f59e0b', margin: '1rem' }}>
          <h3>Cart section unavailable</h3>
          <p>{error?.message || 'The cart region failed to load.'}</p>
        </div>
      )}>
        <Footer />
      </ErrorBoundary>
    </>
  );
}

function App() {
  return (
    <div>
      <AuthProvider>
        <ThemeProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Navigate to="/menu" replace />} />
                <Route
                  path="menu"
                  element={
                    <ErrorBoundary fallback={(error) => (
                      <main role="alert" style={{ padding: '1rem', border: '1px solid #ef4444' }}>
                        <h2>Menu unavailable</h2>
                        <p>{error?.message || 'The menu crashed unexpectedly.'}</p>
                      </main>
                    )}>
                      <Menu />
                    </ErrorBoundary>
                  }
                />
                <Route path="menu/:id" element={<DishDetails />} />
                <Route element={<RequireAuth />}>
                  <Route
                    path="checkout"
                    element={
                      <Suspense fallback={routeSkeleton}>
                        <Checkout />
                      </Suspense>
                    }
                  />
                  <Route
                    path="receipt"
                    element={
                      <Suspense fallback={routeSkeleton}>
                        <Receipt />
                      </Suspense>
                    }
                  />
                </Route>
                <Route path="login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </AuthProvider>
    </div>
  );
}

export default App
