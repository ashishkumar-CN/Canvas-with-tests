import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout';
import { ProductCard } from '@/components/ProductCard';
import CategoryCard from '@/components/CategoryCard';
import { ChevronRight } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '@/redux/product/action';
import { fetchCategories } from '@/redux/category/action';

import ShopSidebar from '@/components/ShopSidebar';
import { Button } from '@/components/ui/button';

const Shop = () => {
  const { category } = useParams();
  const [sortBy, setSortBy] = useState('default');
  const dispatch = useDispatch();
  // Using 'any' for now
  const { products, loading } = useSelector((state: any) => state.product);
  const { categories } = useSelector((state: any) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProducts({ category }));
  }, [dispatch, category]);

  const currentCategory = category
    ? categories.find((c: any) => c.slug === category)
    : null;

  let displayProducts = products;

  // SORTING (Applied on frontend for now, or could pass to backend)
  switch (sortBy) {
    case 'price-low':
      displayProducts = [...displayProducts].sort((a: any, b: any) => a.price - b.price);
      break;
    case 'price-high':
      displayProducts = [...displayProducts].sort((a: any, b: any) => b.price - a.price);
      break;
    case 'rating':
      displayProducts = [...displayProducts].sort((a: any, b: any) => b.rating - a.rating);
      break;
    default:
      break;
  }

  return (
    <Layout>
      <Helmet>
        <title>
          {currentCategory
            ? `${currentCategory.name} | YF Decor`
            : 'Shop | YF Decor'}
        </title>
        <meta
          name="description"
          content={
            currentCategory
              ? `Shop ${currentCategory.name} at YF Decor`
              : 'Browse premium home decor products'
          }
        />
      </Helmet>

      {/* BREADCRUMB header */}
      <section className="bg-secondary/30 py-8 border-b border-border">
        <div className="container">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link to="/" className="hover:text-primary">HOME</Link>
            <ChevronRight className="h-4 w-4" />
            {currentCategory ? (
              <>
                <Link to="/shop" className="hover:text-primary">SHOP</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-foreground font-medium">
                  {currentCategory.name.toUpperCase()}
                </span>
              </>
            ) : (
              <span className="text-foreground font-medium">SHOP</span>
            )}
          </div>

          <h1 className="font-display text-3xl md:text-4xl font-bold">
            {currentCategory ? currentCategory.name : 'Shop Online'}
          </h1>
        </div>
      </section>

      {/* MAIN CONTENT GRID */}
      <section className="py-12 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

            {/* SIDEBAR */}
            <aside className="hidden lg:block col-span-1">
              <ShopSidebar />
            </aside>

            {/* PRODUCT GRID */}
            <main className="col-span-1 lg:col-span-3">
              {/* Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <p className="text-muted-foreground">
                  Showing {displayProducts.length} results
                </p>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48 bg-card border-border">
                    <SelectValue placeholder="Default sorting" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default sorting</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">By Rating</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-80 bg-secondary animate-pulse rounded-lg"></div>
                  ))}
                </div>
              ) : displayProducts.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {displayProducts.map((product: any) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 border rounded-lg">
                  <p className="text-lg mb-4 text-muted-foreground">
                    No products found in this category.
                  </p>
                  <Link to="/shop">
                    <Button variant="outline">View All Products</Button>
                  </Link>
                </div>
              )}
            </main>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Shop;
