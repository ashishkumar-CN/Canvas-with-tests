import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { products } from "@/data/products";

const CategoryProducts = () => {
  const { slug } = useParams();

  const filteredProducts = products.filter(
    p => p.categorySlug === slug
  );

  return (
    <Layout>
      <div className="container py-10">
        <h1 className="text-2xl font-bold mb-6 capitalize">
          {slug?.replace("-", " ")}
        </h1>

        {filteredProducts.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="block"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <h3 className="mt-2 font-medium">{product.name}</h3>
                <p className="text-sm text-muted-foreground">
                  ₹{product.price}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CategoryProducts;

