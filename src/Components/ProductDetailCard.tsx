import "../styles/product-card-details.scss";
import { Link } from "react-router-dom";
import Button from "./Button";
import addToCardIcon from '../assets/icons/cart.svg'
import startIcon from '../assets/icons/star.svg'

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

const ProductDetailCard: React.FC<CategoryProps> = ({ items }) => {
  return (
    <div className="product-card-details">
      {items.map((category, index) => (
        <div key={index} className="product-card-detail">
          <div className="product-card-left">
            <img
              src={category.image}
              alt={category.category}
              className="product-image"
            />
            <Link to={`/products/${slugify(category.title)}?id=${category.id}`}>
            <Button text="Add to Cart" solid="solid" icon={addToCardIcon} sizes="32x32"/>
            </Link>
          </div>
          <div className="product-card-right">
            <div className="product-name">
              {category.title}
            </div>
            <div className="product-description">
             {category.description}
            </div>
            <div className="card-footer">
              <div className="meta-data">
                <div className="product-price">₹ {category.price}</div>
                <div className="product-delivery">Free delivery</div>
              </div>
              <div className="product-rating">
                <span>{category.rating.rate} <img src={startIcon} alt="" /></span>
                <strong>{category.rating.count} Reviews</strong>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductDetailCard;
