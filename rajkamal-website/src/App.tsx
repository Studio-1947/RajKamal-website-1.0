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
import PressCorner from './pages/PressCorner';
import AuthorProfile from './pages/AuthorProfile';
import AllBooks from './pages/AllBooks';
import Publications from './pages/Publications';
import ScrollToTop from './components/ScrollToTop';
import ScrollToTopButton from './components/ScrollToTopButton';

function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <ScrollToTopButton />
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
            <Route path="/press" element={<PressCorner />} />
            <Route path="/publications" element={<Publications />} />
          </Routes>
          <Footer />
        </Layout>
      </Router>
    </CartProvider>
  )
}

export default App
