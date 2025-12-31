import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2, ShoppingBag, X, ChevronRight } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const CartDrawer = () => {
    const { items, removeFromCart, updateQuantity, totalPrice, isDrawerOpen, setDrawerOpen } = useCart();
    const navigate = useNavigate();

    const handleCheckout = () => {
        setDrawerOpen(false);
        navigate('/checkout');
    };

    const handleViewCart = () => {
        setDrawerOpen(false);
        navigate('/cart');
    };

    return (
        <Sheet open={isDrawerOpen} onOpenChange={setDrawerOpen}>
            <SheetContent className="w-full sm:max-w-md bg-card border-l border-border/50 p-0 flex flex-col shadow-2xl">
                <SheetHeader className="p-6 border-b border-border/40">
                    <div className="flex items-center justify-between">
                        <SheetTitle className="text-xl font-display font-bold flex items-center gap-2">
                            <ShoppingBag className="h-5 w-5 text-primary" />
                            Your Cart
                        </SheetTitle>
                    </div>
                </SheetHeader>

                <ScrollArea className="flex-1 px-6">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center py-20 text-center">
                            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-4">
                                <ShoppingBag className="h-10 w-10 text-muted-foreground" />
                            </div>
                            <p className="text-muted-foreground font-medium">Your cart is empty.</p>
                            <Button
                                variant="link"
                                className="text-primary mt-2"
                                onClick={() => setDrawerOpen(false)}
                            >
                                Start Shopping
                            </Button>
                        </div>
                    ) : (
                        <div className="py-6 space-y-6">
                            {(items || []).map((item) => (
                                <div key={item.id} className="flex gap-4 group">
                                    <div className="relative h-20 w-20 flex-shrink-0 bg-secondary rounded-xl overflow-hidden">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="h-full w-full object-cover transition-transform group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0 space-y-1">
                                        <h4 className="text-sm font-semibold truncate leading-tight pr-4">{item.name}</h4>
                                        <p className="text-xs text-muted-foreground uppercase tracking-widest">{item.category}</p>
                                        <div className="flex items-center justify-between pt-2">
                                            <div className="flex items-center border border-border/60 rounded-lg overflow-hidden bg-background/50 scale-90 -ml-2">
                                                <button
                                                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                                    className="p-1.5 hover:bg-secondary text-muted-foreground"
                                                >
                                                    <Minus className="h-3 w-3" />
                                                </button>
                                                <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="p-1.5 hover:bg-secondary text-muted-foreground"
                                                >
                                                    <Plus className="h-3 w-3" />
                                                </button>
                                            </div>
                                            <p className="text-sm font-bold text-primary">₹{((item.price || 0) * (item.quantity || 1)).toLocaleString()}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="h-8 w-8 flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </ScrollArea>

                {items.length > 0 && (
                    <SheetFooter className="p-6 border-t border-border/40 bg-secondary/20 block sm:flex-none">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center px-1">
                                <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Subtotal</span>
                                <span className="text-xl font-bold text-foreground">₹{(totalPrice || 0).toLocaleString()}</span>
                            </div>
                            <p className="text-[10px] text-muted-foreground uppercase text-center tracking-widest">
                                Shipping & taxes calculated at checkout
                            </p>
                            <div className="grid grid-cols-2 gap-3">
                                <Button
                                    variant="outline"
                                    className="w-full rounded-xl border-border/60 font-bold"
                                    onClick={handleViewCart}
                                >
                                    View Cart
                                </Button>
                                <Button
                                    className="w-full btn-gold rounded-xl font-bold flex items-center justify-center gap-1 shadow-lg shadow-primary/10"
                                    onClick={handleCheckout}
                                >
                                    Checkout
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </SheetFooter>
                )}
            </SheetContent>
        </Sheet>
    );
};

export default CartDrawer;
