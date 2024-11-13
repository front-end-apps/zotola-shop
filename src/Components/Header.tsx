import { Link, useLocation } from "react-router-dom";
import Button from "./Button";
import "../styles/header.scss";
import CartIcon from '../assets/icons/cart.svg';
import getQueryParamFromURL from "../utils";

const Header = () => {
  const location = useLocation(); // Get the current location from React Router
  const products = [
    { name: "men's" },
    { name: "women's" },
    { name: "jewelry" },
    { name: "electronics" }, // Fixed typo: "electronis" -> "electronics"
  ];

  // Extract the 'category' query param from the URL
  const queryCategory = getQueryParamFromURL('category', location.search);

  return (
    <header>
      <nav className="container web-nav">
        <div className="container-left">
          <a href="/" className="brand-logo">
            Zotola eShop
          </a>
          <div className="menu">
          {products.map((product, index) => {
            const isActiveCategory = product.name.split("'")[0] === queryCategory;
            return (
              <Link key={index} to={`/products?category=${encodeURIComponent(product.name.split("'")[0])}`}>
                <Button 
                  text={product.name} 
                  solid={isActiveCategory && true} 
                />
              </Link>
            );
          })}
          </div>
        </div>
        <div className="container-right">
          <Button text="Cart" icon={CartIcon} />
          <Button text="Login" />
        </div>
      </nav>
    </header>
  );
};

export default Header;
