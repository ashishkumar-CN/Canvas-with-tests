import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ChevronRight } from 'lucide-react';

const categories = [
    { name: 'Canvas Art', slug: 'canvas-paintings', count: 420 },
    { name: 'Crystal Paintings', slug: 'crystal-paintings', count: 85 },
    { name: 'Wallpapers', slug: 'wallpapers', count: 150 },
    { name: 'Gear Clocks', slug: 'gear-clocks', count: 24 },
    { name: 'Spiritual', slug: 'spiritual-paintings', count: 120 },
    { name: 'Abstract', slug: 'abstract-art', count: 90 },
    { name: 'Nature', slug: 'nature-paintings', count: 200 }
];

const ShopSidebar = () => {
    const [priceRange, setPriceRange] = useState([0, 50000]);

    return (
        <div className="space-y-8">
            {/* Categories */}
            <div>
                <h3 className="font-display text-lg font-bold mb-4 uppercase tracking-wide">Browse Categories</h3>
                <div className="space-y-2">
                    {categories.map((cat) => (
                        <Link
                            key={cat.slug}
                            to={`/shop/${cat.slug}`}
                            className="flex items-center justify-between text-muted-foreground hover:text-primary transition-colors text-sm group"
                        >
                            <span>{cat.name}</span>
                            <span className="text-xs bg-secondary px-2 py-0.5 rounded-full group-hover:bg-primary/10 transition-colors">
                                {cat.count}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>

            <Separator />

            {/* Price Filter */}
            <div>
                <h3 className="font-display text-lg font-bold mb-4 uppercase tracking-wide">Filter by Price</h3>
                <Slider
                    defaultValue={[0, 50000]}
                    max={50000}
                    step={100}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mb-4"
                />
                <div className="flex items-center justify-between text-sm font-medium">
                    <span>₹{priceRange[0].toLocaleString()}</span>
                    <span>₹{priceRange[1].toLocaleString()}</span>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                    Filter
                </Button>
            </div>

            <Separator />

            {/* Size / Stock Status (Mock) */}
            <div>
                <h3 className="font-display text-lg font-bold mb-4 uppercase tracking-wide">Availability</h3>
                <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                        <Checkbox id="in-stock" />
                        <Label htmlFor="in-stock" className="text-sm font-normal cursor-pointer">In Stock (520)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="out-of-stock" />
                        <Label htmlFor="out-of-stock" className="text-sm font-normal cursor-pointer">Out of Stock (45)</Label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopSidebar;
