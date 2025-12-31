import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useReduxWishlist } from '@/redux/wishlist/ReduxWishlistProvider';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useReduxWishlist();
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    // Extract numeric ID for comparison with backend number IDs
    if (!product?.id) return;
    const numericIdStr = product.id.toString().replace(/\D/g, '');

    // Safety check for wishlist being an array and item.product existing
    const inWishlist = Array.isArray(wishlist) && wishlist.some(item =>
      item?.product?.id?.toString() === numericIdStr
    );
    setIsInWishlist(inWishlist);
  }, [wishlist, product?.id]);

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsAdding(true);
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      category: product.category
    });

    // toast.success('Added to cart!', { description: product.name }); // Drawer provides enough feedback now

    setTimeout(() => setIsAdding(false), 2000);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Extract numeric ID (e.g., '1' from 'p1')
    const numericId = parseInt(product.id.replace(/\D/g, ''), 10);

    if (isNaN(numericId)) {
      toast.error("Invalid product ID");
      return;
    }

    if (isInWishlist) {
      removeFromWishlist(numericId);
      toast.success('Removed from wishlist!', { description: product.name });
    } else {
      addToWishlist(numericId);
      toast.success('Added to wishlist!', { description: product.name });
    }
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group bg-card rounded-lg overflow-hidden card-hover block border border-border"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image || (product as any).imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Discount Badge */}
        {discount > 0 && (
          <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded">
            -{discount}%
          </span>
        )}

        {/* Wishlist Button */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            className="p-2 bg-card/90 backdrop-blur-sm rounded-full text-foreground hover:text-primary hover:bg-card transition-colors"
            onClick={handleWishlistToggle}
          >
            <Heart className={`h-4 w-4 ${isInWishlist ? 'text-red-500 fill-red-500' : ''}`} />
          </button>
        </div>

        {/* Add to Cart */}
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <Button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={cn(
              "w-full flex items-center justify-center gap-2 transition-all duration-300",
              isAdding ? "bg-green-600 hover:bg-green-600 text-white" : "btn-gold border-0"
            )}
          >
            {isAdding ? (
              <>
                <CheckCircle2 className="h-4 w-4" />
                Added!
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4" />
                Add to Cart
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <p className="text-xs text-primary font-medium uppercase tracking-wider mb-1">
          {typeof product?.category === 'object' ? (product.category as any).name : product?.category}
        </p>
        <h3 className="font-medium text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'text-primary fill-primary' : 'text-muted'}`}
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">({product.rating})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-primary">₹{(product?.price || 0).toLocaleString()}</span>
          {product?.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export { ProductCard };

