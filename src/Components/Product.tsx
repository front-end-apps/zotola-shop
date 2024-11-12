import "../styles/product-card.scss";
import { Link } from "react-router-dom";
import startRatingIcon from '../assets/icons/star.svg'
function slugify(str) {
  return str
    .toLowerCase() 
    .trim() 
    .replace(/[^a-z0-9\s-]/g, "") 
    .replace(/\s+/g, "-") 
    .replace(/-+/g, "-") 
    .replace(/^-+|-+$/g, ""); 
}

interface CategoryProps {
  items: CategoryItem[]; // Now each item is a CategoryItem with name and image
}

const Product: React.FC<CategoryProps> = ({ items }) => {
  return (
    <ul className="product-card">
      {items.map((category, index) => (
        <li key={index} className="card">
          <Link to={`/products/${slugify(category.title)}?id=${category.id}`}>
            <img
              src={category.image}
              alt={category.category}
              className="product-image"
            />
            <div className="product-name">
            {category.title.length > 15
                ? `${category.title.substring(0, 15)}...`
                : category.title}
            </div>
            <div className="product-description">
              {category.description.length > 120
                ? `${category.description.substring(0, 120)}...`
                : category.description}
            </div>
            <div className="card-footer">
            <div className="meta-data">
              <div className="product-price">₹ {category.price}</div>
              <div className="product-delivery">Free delivery</div>
            </div>
            <div className="product-rating">
              <span>{category.rating.rate} <img src={startRatingIcon} alt="" /></span>
              <strong>{category.rating.count} Reviews</strong>
            </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Product;
