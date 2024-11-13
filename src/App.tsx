import Header from "./Components/Header";
import "./App.scss";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Footer from "./Components/Footer";

// Define your routes
const routes = [
  {
    path: "/",
    element: (
      <>
        <Header />
        <Home />
        <Footer />
      </>
    ),
  },
  {
    path: "/products",
    element: (
      <>
        <Header />
        <Products />
        <Footer />
      </>
    ),
  },
  {
    path: "/products/:productName",
    element: (
      <>
        <Header />
        <ProductDetails />
        <Footer />
      </>
    ),
  },
  { path: "*", element: <NotFound /> },
];

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
