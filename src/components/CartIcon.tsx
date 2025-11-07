import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

export const CartIcon: React.FC = () => {
  const { getItemCount } = useCart();
  const navigate = useNavigate();
  const itemCount = getItemCount();

  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleCartClick}
      className="relative"
    >
      <ShoppingCart className="h-5 w-5" />
      {itemCount > 0 && (
        <Badge
          variant="destructive"
          className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
        >
          {itemCount > 99 ? '99+' : itemCount}
        </Badge>
      )}
    </Button>
  );
};