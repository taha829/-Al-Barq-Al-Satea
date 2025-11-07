import React from 'react';
import { useCart } from '../contexts/CartContext';
import { useTranslation } from '../hooks/useTranslation';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Cart: React.FC = () => {
  const { state, updateQuantity, removeItem, clearCart } = useCart();
  const { t, isRTL } = useTranslation();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center py-16">
            <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t('emptyCart')}
            </h2>
            <p className="text-gray-600 mb-8">
              {t('emptyCartDescription')}
            </p>
            <Button onClick={handleContinueShopping} size="lg">
              {t('continueShopping')}
              <ArrowRight className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0 rtl:rotate-180" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t('shoppingCart')}
            </h1>
            <p className="text-lg text-gray-600">
              {t('cartItemsCount', { count: state.items.length })}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {state.items.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                      <img
                        src={item.image}
                        alt={item.imageAlt ?? item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg truncate">
                          {item.name}
                        </h3>
                        <Badge variant="secondary" className="mt-1">
                          {item.category}
                        </Badge>
                        <p className="text-primary font-bold mt-2">
                          {item.price} {t('currency')}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        
                        <span className="font-semibold text-lg min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="text-right rtl:text-left">
                        <p className="font-bold text-lg">
                          {(item.price * item.quantity).toFixed(2)} {t('currency')}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 mt-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <div className="flex justify-between items-center pt-4">
                <Button
                  variant="outline"
                  onClick={handleContinueShopping}
                >
                  {t('continueShopping')}
                </Button>
                
                <Button
                  variant="destructive"
                  onClick={clearCart}
                >
                  {t('clearCart')}
                </Button>
              </div>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>{t('orderSummary')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {state.items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="truncate flex-1 mr-2 rtl:ml-2 rtl:mr-0">
                          {item.name} × {item.quantity}
                        </span>
                        <span className="font-medium">
                          {(item.price * item.quantity).toFixed(2)} {t('currency')}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>{t('total')}</span>
                    <span className="text-primary">
                      {state.total.toFixed(2)} {t('currency')}
                    </span>
                  </div>
                  
                  <Button
                    onClick={handleCheckout}
                    className="w-full"
                    size="lg"
                  >
                    {t('proceedToCheckout')}
                    <ArrowRight className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0 rtl:rotate-180" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;