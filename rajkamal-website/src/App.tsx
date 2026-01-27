import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import { CartProvider } from './context/CartContext';
import Home from './pages/Home';
import BookDetails from './pages/BookDetails';
import Events from './pages/Events';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <Layout>
          <CartSidebar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/book/:id" element={<BookDetails />} />
            <Route path="/events" element={<Events />} />
          </Routes>
          <Footer />
        </Layout>
      </Router>
    </CartProvider>
  )
}

export default App
