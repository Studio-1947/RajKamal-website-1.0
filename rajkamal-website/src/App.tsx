import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import { CartProvider } from './context/CartContext';
import Home from './pages/Home';
import BookDetails from './pages/BookDetails';
import Events from './pages/Events';
import EventDetails from './pages/EventDetails';
import Authors from './pages/Authors';
import EBooks from './pages/EBooks';
import StudentCorner from './pages/StudentCorner';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import PressCorner from './pages/PressCorner';
import AuthorProfile from './pages/AuthorProfile';
import AllBooks from './pages/AllBooks';
import Publications from './pages/Publications';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Account from './pages/Account';
import FooterDesigns from './pages/FooterDesigns';
import ReturnRefundPolicy from './pages/ReturnRefundPolicy';
import ShippingDelivery from './pages/ShippingDelivery';
import IconPreview from './pages/IconPreview';
import ScrollToTop from './components/ScrollToTop';
import ScrollToTopButton from './components/ScrollToTopButton';

function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <ScrollToTopButton />
        <Routes>
          {/* Standalone — no site Header or Footer interfering */}
          <Route path="/footer-designs" element={<FooterDesigns />} />
          <Route path="/icon-preview" element={<IconPreview />} />

          {/* All other routes wrapped in Layout */}
          <Route path="/*" element={
            <Layout>
              <CartSidebar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/book/:id" element={<BookDetails />} />
                <Route path="/books/:category" element={<AllBooks />} />
                <Route path="/publication/:brand" element={<AllBooks />} />
                <Route path="/events" element={<Events />} />
                <Route path="/event/:id" element={<EventDetails />} />
                <Route path="/authors" element={<Authors />} />
                <Route path="/author/:name" element={<AuthorProfile />} />
                <Route path="/ebooks" element={<EBooks />} />
                <Route path="/student-corner" element={<StudentCorner />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogDetail />} />
                <Route path="/press" element={<PressCorner />} />
                <Route path="/publications" element={<Publications />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/account" element={<Account />} />
                <Route path="/return-refund-policy" element={<ReturnRefundPolicy />} />
                <Route path="/shipping-delivery" element={<ShippingDelivery />} />
              </Routes>
              <Footer />
            </Layout>
          } />
        </Routes>
      </Router>
    </CartProvider>
  )
}

export default App
