import Footer from './components/Footer';
import Header from './components/Header';
import Menu from './Menu';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import "./css/style.css";

function App() {
  return (
    <div>
      <ThemeProvider>
        <CartProvider>
          <Header />
          <Menu />
          <Footer />
        </CartProvider>
      </ThemeProvider>
    </div>
  );
}

export default App
