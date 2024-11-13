import { useEffect, useState } from "react";
import ProductDetailCard from "../Components/ProductDetailCard";
import { useLocation } from "react-router-dom";
import getQueryParamFromURL from "../utils";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const ProductDetails = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [failedApi, setFailedApi] = useState<boolean>(false);

  const location = useLocation(); // Get the current location

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setFailedApi(false);
        const productId = getQueryParamFromURL("id"); // Get the product ID from the URL
        if (!productId) {
          throw new Error("Product ID is missing in the URL.");
        }

        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product data.");
        }

        const data: Product = await response.json();
        setProduct(data); // Set the fetched product data
        console.log(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setFailedApi(true);
        setLoading(false);
      }
    };

    // Fetch product when component mounts or query parameter changes
    fetchProduct();
  }, [location.search]); // Dependency on location.search ensures it runs when the URL changes

  if (loading) {
    return <div className="loader">Loading...</div>; // Display loader until data is fetched
  }

  if (failedApi) {
    return (
      <div className="container align-center">
        <a href={`products?category=${getQueryParamFromURL("id")}`} className="page-404">
          <h1>Oops! There was an error fetching the product—please refresh the page or try again.</h1>
          <button className="solid">
            <span>Try again</span>
          </button>
        </a>
      </div>
    );
  }

  if (!product) {
    return <div>Product not found!</div>; // Handle case if no product is found
  }

  return (
    <div className="container">
      <div className="topbar">
        <h1>{product.category}</h1>
      </div>
      <ProductDetailCard items={[product]} /> {/* Pass the single product wrapped in an array */}
    </div>
  );
};

export default ProductDetails;
