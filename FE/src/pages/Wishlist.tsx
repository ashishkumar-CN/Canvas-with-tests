import { useEffect } from "react";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlist, removeFromWishlist } from "@/redux/wishlist/action";
import { addToCart } from "@/redux/cart/action";

const Wishlist: React.FC = () => {
  const dispatch = useDispatch();
  const { wishlist, loading } = useSelector((state: any) => state.wishlist);

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  const handleRemove = (id: number) => {
    dispatch(removeFromWishlist(id));
    toast.success("Removed from wishlist");
  };

  const handleAddToCart = (item: any) => {
    dispatch(addToCart(item.product.id, 1));
    toast.success("Added to cart");
  }

  return (
    <div className="container py-16">
      <h1 className="text-3xl font-semibold mb-8 flex items-center gap-2">
        <Heart className="text-primary" />
        My Wishlist
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : wishlist.length === 0 ? (
        <div className="text-center py-20">
          <Heart size={48} className="mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground mb-6">
            Your wishlist is empty
          </p>
          <Link
            to="/shop"
            className="px-6 py-3 bg-primary text-white rounded-lg"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item: any) => (
            <div
              key={item.id}
              className="relative border border-border rounded-xl p-4 bg-background hover:shadow-lg transition"
            >
              {/* Heart Icon */}
              <button
                onClick={() => handleRemove(item.product.id)}
                className={`absolute top-3 left-3 transition text-red-500`}
                title="Remove from wishlist"
              >
                <Heart
                  size={20}
                  fill="currentColor"
                />
              </button>

              <img
                src={item.product.imageUrl}
                alt={item.product.name}
                className="w-full h-52 object-cover rounded-lg mb-4"
              />

              <h3 className="font-medium text-lg mb-1">
                {item.product.name}
              </h3>

              <p className="text-primary font-semibold mb-4">
                ₹{item.product.price}
              </p>

              <div className="flex justify-between items-center">
                <Link
                  to={`/product/${item.product.id}`}
                  className="text-sm text-primary hover:underline"
                >
                  View Product
                </Link>

                <button
                  onClick={() => handleAddToCart(item)}
                  className="px-4 py-2 text-sm border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
