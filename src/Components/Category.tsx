
import '../styles/category.scss'
import { Link } from "react-router-dom";

interface CategoryProps {
  items: CategoryItem[]; // Now each item is a CategoryItem with name and image
}

const Category: React.FC<CategoryProps> = ({ items }) => {
  return (
    <ul className="category">
      {items.map((category, index) => (
        <li key={index} className="card">
          <Link to={`/products?category=${(category.category).split("'")[0]}`}>
          <img
            src={category.image}
            alt={category.category}
            className="product-image"
          />
          <div className="product-name">{category.category}</div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Category;
