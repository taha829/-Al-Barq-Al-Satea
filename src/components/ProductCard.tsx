import React from 'react';
import { Card, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ShoppingCart } from 'lucide-react';
import { Product, useCart } from '../contexts/CartContext';
import { useTranslation } from '../hooks/useTranslation';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();
  const { t } = useTranslation();

  const handleAddToCart = () => {
    // Add single product to cart
    addItem(product, 1);
  };

    return (
  <Card className="flex flex-col overflow-hidden hover:shadow-md transition-transform duration-200 transform hover:-translate-y-0.5 rounded-lg shadow-sm max-h-48 border-0">
      <div className="relative overflow-hidden rounded-t-lg bg-gray-50 h-28">
        <img
          src={product.image}
          alt={product.imageAlt ?? product.name}
          loading="lazy"
          decoding="async"
          width={800}
          height={144}
          className="w-full h-full object-cover bg-gray-100"
          onError={(e) => {
            const img = e.currentTarget as HTMLImageElement;
            if (!img.dataset.fallback) {
              img.dataset.fallback = '1';
              img.src = '/estet/bag-small.svg';
            }
          }}
        />
        <Badge className="absolute top-2 right-2 bg-primary/5 text-primary text-xs px-2 py-0.5 rounded">
          الأحدث
        </Badge>
      </div>
      
  <CardContent className="flex-1 p-2 pb-4 min-h-0">
        <h3 className="font-medium text-sm mb-1 line-clamp-1 truncate">
          {product.name}
        </h3>

        {product.description && (
          <p className="text-muted-foreground text-xs mb-1 line-clamp-1 truncate">
            {product.description}
          </p>
        )}
        {/* Price shown above the button */}
        <div className="mb-2">
          <span className="text-base font-semibold text-yellow-700 block">
            {product.price} {t('currency')}
          </span>
        </div>
      </CardContent>
      <CardFooter className="p-2 pt-0">
        <div className="w-full flex items-center justify-center">
          <Button
            variant="outline"
            onClick={handleAddToCart}
            className="w-full border-yellow-400 hover:bg-yellow-50 text-yellow-700 hover:text-yellow-800"
            size="sm"
          >
            <ShoppingCart className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
            {t('addToCart')}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};