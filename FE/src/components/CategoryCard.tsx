// CategoryCard.tsx
import { Link } from "react-router-dom";

type Category = {
  id: number;
  name: string;
  slug: string;
  image: string;
};

type Props = {
  category: Category;
};

const CategoryCard = ({ category }: Props) => {
  return (
    <Link to={`/category/${category.slug}`}>
      <div className="relative rounded-lg overflow-hidden cursor-pointer group">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h3 className="text-white text-lg font-semibold">
            {category.name}
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;


