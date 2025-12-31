import React from 'react';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';
import { ShoppingCart, Zap, CheckCircle2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const ProductDetail = () => {
  // ... imports and basic state ...
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product, loading } = useSelector((state: any) => state.product);
  const { addToCart } = useCart(); // Destructure addToCart

  // ... useEffect ...

  const [isAdding, setIsAdding] = React.useState(false);

  const handleAddToCart = async () => {
    if (!product) return;
    setIsAdding(true);
    await addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.discount > 0 ? product.price + product.discount : product.price,
      image: product.imageUrl || product.image,
      category: product.category?.name || 'General'
    });

    setTimeout(() => setIsAdding(false), 2000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  if (loading || !product) {
    // ... loading state ...
  }

  return (
    // ... Layout ...
    // ... Image ...
    <div className="flex-1 space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-display">{product.name}</h1>
        <div className="flex items-center gap-4 mt-2">
          <p className="text-2xl font-bold text-primary">
            ₹{product.price.toLocaleString()}
          </p>
          {product.discount > 0 && (
            <span className="text-sm text-muted-foreground line-through">
              ₹{product.price + product.discount} {/* Or correct calculation */}
            </span>
          )}
        </div>
      </div>

      <p className="text-muted-foreground leading-relaxed">
        {product.description}
      </p>

      <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-border">
        <Button
          size="lg"
          disabled={isAdding}
          className={cn(
            "flex-1 gap-2 transition-all duration-300",
            isAdding ? "bg-green-600 hover:bg-green-600 text-white" : "btn-gold border-0"
          )}
          onClick={handleAddToCart}
        >
          {isAdding ? (
            <>
              <CheckCircle2 className="h-5 w-5" />
              Added to Cart!
            </>
          ) : (
            <>
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </>
          )}
        </Button>
        <Button size="lg" variant="outline" className="flex-1 gap-2 border-primary text-primary hover:bg-primary/10" onClick={handleBuyNow}>
          <Zap className="h-5 w-5" />
          Buy Now
        </Button>
      </div>

      {/* Additional Info / Trust Badges could go here */}
    </div>
    // ...
  );
};

export default ProductDetail;
