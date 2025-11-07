import React, { useState, useMemo } from 'react';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/products';
import { useTranslation } from '../hooks/useTranslation';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Search, Filter } from 'lucide-react';

const Products: React.FC = () => {
  const { t, isRTL } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(products.map(p => p.category)));
    return uniqueCategories;
  }, []);

  const filteredProducts = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return products.filter(product => {
      const matchesSearch =
        product.name.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term);

      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('products')}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('productsDescription')}
          </p>
        </div>

        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder={t('searchProducts')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rtl:pr-10 rtl:pl-3"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder={t('selectCategory')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('allCategories')}</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">{t('noProductsFound')}</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="mt-4"
            >
              {t('clearFilters')}
            </Button>
          </div>
          ) : (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          <p className="text-gray-600">
            {t('showingProducts', { count: filteredProducts.length, total: products.length })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Products;