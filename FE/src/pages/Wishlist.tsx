import { useEffect } from "react";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlist, removeFromWishlist } from "@/redux/wishlist/action";
import { addToCart } from "@/redux/cart/action";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";

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
    dispatch(addToCart(item.product.id, 1) as any);
    toast.success("Added to cart");
  }

  return (
    <Layout>
      <div className="container py-16 px-4">
        <div className="flex items-center gap-3 mb-10">
          <div className="p-3 rounded-2xl bg-primary/10">
            <Heart className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-4xl font-display font-bold tracking-tight">My Wishlist</h1>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          </div>
        ) : !wishlist || wishlist.length === 0 ? (
          <div className="text-center py-24 bg-card rounded-3xl border border-border/50 shadow-sm overflow-hidden relative">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
                <Heart size={48} className="text-muted-foreground opacity-50" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Wishlist is empty</h2>
              <p className="text-muted-foreground mb-8 max-w-xs mx-auto">
                Save your favorite luxury decor pieces here to keep track of them.
              </p>
              <Link to="/shop">
                <Button className="btn-gold px-10 py-6 rounded-2xl font-bold">
                  Start Exploring
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {wishlist.map((item: any) => (
              <div
                key={item.id}
                className="group relative bg-card border border-border/50 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
              >
                {/* Image and Remove Button */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all">
                    <button
                      onClick={() => handleRemove(item.product.id)}
                      className="p-3 bg-white/90 backdrop-blur-md rounded-xl text-destructive hover:bg-destructive hover:text-white transition-all shadow-lg"
                      title="Remove from wishlist"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <p className="text-[10px] text-primary font-bold uppercase tracking-widest mb-1">
                      {item.product.category?.name || 'Exclusive'}
                    </p>
                    <h3 className="font-display font-bold text-lg leading-tight group-hover:text-primary transition-colors line-clamp-1">
                      {item.product.name}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-xl font-bold text-primary">
                      ₹{item.product.price.toLocaleString()}
                    </p>
                    <Link
                      to={`/product/p${item.product.id}`}
                      className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
                    >
                      View Details
                    </Link>
                  </div>

                  <Button
                    onClick={() => handleAddToCart(item)}
                    className="w-full btn-gold rounded-xl py-6 font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/10"
                  >
                    <ShoppingBag size={18} />
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Wishlist;
