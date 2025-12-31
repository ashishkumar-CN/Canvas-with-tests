import canvasBuddha from '@/assets/products/horses-painting.jpg';
import crystalButterfly from '@/assets/products/flowerPot.jpeg';
import gearClock from '@/assets/products/rangloi.jpeg';
import tropicalWallpaper from '@/assets/products/peacock.jpeg';
import horsesPainting from '@/assets/products/horses-painting.jpg';
import radhaKrishna from '@/assets/products/flower.jpeg';
import abstractArt from '@/assets/products/abstract-art.jpg';

import mandala from '@/assets/products/DoorBug.jpeg';
import lotus from '@/assets/products/radha.jpeg';
import ganesha from '@/assets/products/bhgwan.jpeg';
import modernClock from '@/assets/products/rangoli2.jpeg';
import floralWallpaper from '@/assets/products/taz.jpeg';
import peacockArt from '@/assets/products/dear.jpeg';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  categorySlug: string;
  description: string;
  rating: number;
  inStock: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  productCount: number;
}

export const categories: Category[] = [
  {
    id: '1',
    name: 'Canvas Paintings',
    slug: 'canvas-paintings',
    image: canvasBuddha,
    description: 'Premium quality canvas wall art',
    productCount: 245
  },
  {
    id: '2',
    name: 'Crystal Glass Paintings',
    slug: 'crystal-paintings',
    image: crystalButterfly,
    description: 'Elegant crystal glass artwork',
    productCount: 128
  },
  {
    id: '3',
    name: 'Moving Gear Clocks',
    slug: 'gear-clocks',
    image: gearClock,
    description: 'Vintage style moving gear wall clocks',
    productCount: 56
  },
  {
    id: '4',
    name: 'Premium Wallpapers',
    slug: 'wallpapers',
    image: tropicalWallpaper,
    description: 'Designer wallpapers for modern homes',
    productCount: 312
  }
];

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Buddha Lotus Canvas Painting',
    price: 2499,
    originalPrice: 4999,
    image: canvasBuddha,
    category: 'Canvas Paintings',
    categorySlug: 'canvas-paintings',
    description: 'Beautiful Buddha canvas painting with lotus flowers.',
    rating: 4.8,
    inStock: true
  },
  {
    id: 'p2',
    name: 'Golden Butterfly Crystal Art',
    price: 3499,
    originalPrice: 5999,
    image: crystalButterfly,
    category: 'Crystal Glass Paintings',
    categorySlug: 'crystal-paintings',
    description: 'Stunning crystal glass artwork.',
    rating: 4.9,
    inStock: true
  },
  {
    id: 'p3',
    name: 'Vintage Moving Gear Wall Clock',
    price: 4999,
    originalPrice: 7999,
    image: gearClock,
    category: 'Moving Gear Clocks',
    categorySlug: 'gear-clocks',
    description: 'Steampunk style wall clock.',
    rating: 4.7,
    inStock: true
  },
  {
    id: 'p4',
    name: 'Tropical Paradise Wallpaper',
    price: 1299,
    originalPrice: 2499,
    image: tropicalWallpaper,
    category: 'Premium Wallpapers',
    categorySlug: 'wallpapers',
    description: 'Vibrant tropical wallpaper.',
    rating: 4.6,
    inStock: true
  },
  {
    id: 'p5',
    name: 'Seven Running Horses Painting',
    price: 2999,
    originalPrice: 5499,
    image: horsesPainting,
    category: 'Canvas Paintings',
    categorySlug: 'canvas-paintings',
    description: 'Seven galloping horses canvas art.',
    rating: 4.8,
    inStock: true
  },
  {
    id: 'p6',
    name: 'Radha Krishna Divine Love',
    price: 2799,
    originalPrice: 4999,
    image: radhaKrishna,
    category: 'Canvas Paintings',
    categorySlug: 'canvas-paintings',
    description: 'Radha Krishna traditional artwork.',
    rating: 4.9,
    inStock: true
  },
  {
    id: 'p7',
    name: 'Abstract Gold & Teal Art',
    price: 3299,
    originalPrice: 5999,
    image: abstractArt,
    category: 'Canvas Paintings',
    categorySlug: 'canvas-paintings',
    description: 'Modern abstract artwork.',
    rating: 4.5,
    inStock: true
  },
  {
    id: 'p8',
    name: 'Colorful Mandala Canvas Art',
    price: 2899,
    originalPrice: 5499,
    image: mandala,
    category: 'Canvas Paintings',
    categorySlug: 'canvas-paintings',
    description: 'Mandala artwork symbolizing harmony.',
    rating: 4.7,
    inStock: true
  },
  {
    id: 'p9',
    name: 'Lotus Serenity Canvas',
    price: 2599,
    originalPrice: 4999,
    image: lotus,
    category: 'Canvas Paintings',
    categorySlug: 'canvas-paintings',
    description: 'Lotus themed peaceful artwork.',
    rating: 4.8,
    inStock: true
  },
  {
    id: 'p10',
    name: 'Ganesha Blessings Artwork',
    price: 3199,
    originalPrice: 5999,
    image: ganesha,
    category: 'Canvas Paintings',
    categorySlug: 'canvas-paintings',
    description: 'Lord Ganesha divine painting.',
    rating: 4.9,
    inStock: true
  },
  {
    id: 'p11',
    name: 'Modern Industrial Gear Clock',
    price: 5599,
    originalPrice: 8999,
    image: modernClock,
    category: 'Moving Gear Clocks',
    categorySlug: 'gear-clocks',
    description: 'Industrial style gear clock.',
    rating: 4.6,
    inStock: true
  },
  {
    id: 'p12',
    name: 'Luxury Floral Wallpaper',
    price: 1499,
    originalPrice: 2999,
    image: floralWallpaper,
    category: 'Premium Wallpapers',
    categorySlug: 'wallpapers',
    description: 'Elegant floral wallpaper.',
    rating: 4.5,
    inStock: true
  },
  {
    id: 'p13',
    name: 'Royal Peacock Canvas Art',
    price: 3399,
    originalPrice: 6499,
    image: peacockArt,
    category: 'Canvas Paintings',
    categorySlug: 'canvas-paintings',
    description: 'Royal peacock artwork.',
    rating: 4.8,
    inStock: true
  },
  {
    id: 'p14',
    name: 'Abstract Sunset Canvas',
    price: 2699,
    originalPrice: 4799,
    image: abstractArt,
    category: 'Canvas Paintings',
    categorySlug: 'canvas-paintings',
    description: 'A vibrant abstract representation of a sunset.',
    rating: 4.7,
    inStock: true
  },
  {
    id: 'p15',
    name: 'Crystal Floral Vase',
    price: 3899,
    originalPrice: 6299,
    image: crystalButterfly,
    category: 'Crystal Glass Paintings',
    categorySlug: 'crystal-paintings',
    description: 'Breathtaking crystal glass art with delicate floral details.',
    rating: 5.0,
    inStock: true
  },
  {
    id: 'p16',
    name: 'Steampunk Chronometer',
    price: 5299,
    originalPrice: 8499,
    image: gearClock,
    category: 'Moving Gear Clocks',
    categorySlug: 'gear-clocks',
    description: 'Precision engineered moving gear clock with exposed mechanics.',
    rating: 4.9,
    inStock: true
  },
  {
    id: 'p17',
    name: 'Emerald Forest Wallpaper',
    price: 1599,
    originalPrice: 2899,
    image: tropicalWallpaper,
    category: 'Premium Wallpapers',
    categorySlug: 'wallpapers',
    description: 'Deep emerald tones to bring the forest into your living room.',
    rating: 4.8,
    inStock: true
  },
  {
    id: 'p18',
    name: 'Geometric Gold Canvas',
    price: 3199,
    originalPrice: 5599,
    image: abstractArt,
    category: 'Canvas Paintings',
    categorySlug: 'canvas-paintings',
    description: 'Modern geometric patterns with gold leaf accents.',
    rating: 4.6,
    inStock: true
  },
  {
    id: 'p19',
    name: 'Silver Peacock Crystal',
    price: 4299,
    originalPrice: 7299,
    image: peacockArt,
    category: 'Crystal Glass Paintings',
    categorySlug: 'crystal-paintings',
    description: 'Exquisite silver-etched peacock in premium crystal glass.',
    rating: 4.9,
    inStock: true
  },
  {
    id: 'p20',
    name: 'Astronomical Gear Clock',
    price: 5999,
    originalPrice: 9499,
    image: modernClock,
    category: 'Moving Gear Clocks',
    categorySlug: 'gear-clocks',
    description: 'Celestial themed gear clock showing planetary alignments.',
    rating: 5.0,
    inStock: true
  },
  {
    id: 'p21',
    name: 'Midnight Bloom Wallpaper',
    price: 1799,
    originalPrice: 3199,
    image: floralWallpaper,
    category: 'Premium Wallpapers',
    categorySlug: 'wallpapers',
    description: 'Dark, sophisticated floral patterns for a luxury bedroom.',
    rating: 4.7,
    inStock: true
  },
  {
    id: 'p22',
    name: 'Tibetan Monk Canvas',
    price: 2899,
    originalPrice: 5199,
    image: canvasBuddha,
    category: 'Canvas Paintings',
    categorySlug: 'canvas-paintings',
    description: 'Spiritual artwork depicting the journey of a Tibetan monk.',
    rating: 4.8,
    inStock: true
  },
  {
    id: 'p23',
    name: 'Radiant Sun Mandala',
    price: 2999,
    originalPrice: 5399,
    image: mandala,
    category: 'Canvas Paintings',
    categorySlug: 'canvas-paintings',
    description: 'Intricate sun mandala for positive energy.',
    rating: 4.9,
    inStock: true
  },
  {
    id: 'p24',
    name: 'Gilded Lotus Wall-Art',
    price: 1899,
    originalPrice: 3499,
    image: lotus,
    category: 'Premium Wallpapers',
    categorySlug: 'wallpapers',
    description: 'Large scale lotus print with gold metallic highlights.',
    rating: 4.6,
    inStock: true
  }
];

export const getProductsByCategory = (categorySlug: string): Product[] =>
  products.filter(p => p.categorySlug === categorySlug);

export const getProductById = (id: string): Product | undefined =>
  products.find(p => p.id === id);

export const getCategoryBySlug = (slug: string): Category | undefined =>
  categories.find(c => c.slug === slug);

