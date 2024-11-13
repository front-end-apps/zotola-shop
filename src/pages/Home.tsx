import { useEffect, useState } from "react";
import Category from "../Components/Category";
import { Link } from "react-router-dom";
import "../styles/home.scss";

function slugify(str:any) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

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

interface AllItem {
  category: string;
  image: string; // Image URL associated with the category
  id: number,
  title: string
}

const Home = () => {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [allItems, setAllItems] = useState<AllItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data: Product[] = await response.json();
        setAllItems(data);
        // Extract unique categories and associate an image with each
        const uniqueCategories = data.reduce((acc: CategoryItem[], item) => {
          // Check if category already exists
          if (!acc.some((category) => category.category === item.category)) {
            acc.push({
              category: item.category,
              image: item.image, // You can adjust the image logic based on your requirement
            });
          }
          return acc;
        }, []);

        setCategories(uniqueCategories);
        setLoading(false);
        console.log(uniqueCategories); // Log unique categories with images
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategory();
  }, []);
  if (loading) {
    return <div className="loader">Loading...</div>; // Display loader until data is fetched
  }
  return (
    <div className="container">
      <div className="topbar">
        <h1>Products</h1>
      </div>
      <Category items={categories} />
      <div className="slider">
        <div className="slide-track">
          {allItems.map((item, index) => (
              <div key={index} className="slide">
                <Link to={`/products/${slugify(item.title)}/?id=${item.id}`}>
                  <img
                    src={item.image}
                    height="100"
                    width="250"
                    alt={item.category}
                  />
                </Link>
              </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
