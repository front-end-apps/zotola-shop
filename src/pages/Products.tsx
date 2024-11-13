import { useEffect, useState } from "react";
import Product from "../Components/Product";
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

interface CategoryItem {
  category: string;
  image: string; // Image URL associated with the category
}
const Products = () => {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [failedApi, setFailedApi] = useState<boolean>(false);

  const location = useLocation(); // Get the current location

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);
        setFailedApi(false)
        const response = await fetch("https://fakestoreapi.com/products");
        const data: Product[] = await response.json();
        const queryString = getQueryParamFromURL("category", location.search);

        // Ensure queryString is valid before filtering
        const filteredCategories = queryString ? data.filter(
          (item) =>
            item.category.slice(0, 3).toLowerCase() === queryString.slice(0, 3).toLowerCase() 
        )
        : [];

        setCategories(filteredCategories);
        setLoading(false);
        console.log(filteredCategories); // Log filtered categories
      } catch (error) {
        console.error("Error fetching categories:", error);
        setFailedApi(true)
      }
    };

    // Fetch the categories whenever the location or query parameter changes
    fetchCategory();
  }, [location.search]); // Dependency on location.search ensures it runs when the URL changes

  if (loading) {
    return <div className="loader">Loading...</div>; // Display loader until data is fetched
  }

  return (
    <div className="container">
      <div className="topbar">
        <h1>{getQueryParamFromURL("category", location.search)}</h1>
      </div>
      {!loading && failedApi ? 
      <div className="container align-center">
      <a href={`products?category=${getQueryParamFromURL("category",  location.search)}`} className="page-404">
        <h1>Oops! There was an error fetching categories—please refresh the page or try again.</h1>
        <button className="solid">
          <span>Try again</span>
        </button>
      </a>
    </div>
      : 
      <Product items={categories} />
      }
    </div>
  );
};

export default Products;
