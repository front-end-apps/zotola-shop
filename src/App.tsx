import Header from "./Components/Header";
import "./App.scss";
import { lazy, Suspense } from "react";
import NotFound from "./pages/NotFound";
const Home = lazy(() => import("./pages/Home"));
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./pages/Products";
import ProductDetails from './pages/ProductDetails'
import Footer from "./Components/Footer";

function App() {
  return (
    <Router>
      <Header />
        <Routes>
          <Route path="/" element={
             <Suspense fallback={<div className="loader">Loading...</div>}>
             <Home />
           </Suspense>
          } />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productName" element={<ProductDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
    </Router>
  );
}

export default App;
