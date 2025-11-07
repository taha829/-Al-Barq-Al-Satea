import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { CheckCircle, MessageCircle, Home, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OrderSuccess: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="text-center">
            <CardContent className="py-12">
              <div className="mb-6">
                <CheckCircle className="h-24 w-24 text-green-500 mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {t('orderSuccess')}
                </h1>
                <p className="text-lg text-gray-600">
                  {t('orderSuccessDescription')}
                </p>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg mb-8">
                <div className="flex items-center justify-center mb-3">
                  <MessageCircle className="h-6 w-6 text-blue-600 mr-2 rtl:ml-2 rtl:mr-0" />
                  <h3 className="text-lg font-semibold text-blue-800">
                    {t('nextSteps')}
                  </h3>
                </div>
                <div className="text-blue-700 space-y-2">
                  <p>• {t('whatsappSent')}</p>
                  <p>• {t('confirmOrder')}</p>
                  <p>• {t('deliveryInfo')}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => navigate('/')}
                  variant="default"
                  size="lg"
                >
                  <Home className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                  {t('backToHome')}
                </Button>
                
                <Button
                  onClick={() => navigate('/products')}
                  variant="outline"
                  size="lg"
                >
                  <ShoppingBag className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                  {t('continueShopping')}
                </Button>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  {t('needHelp')} {' '}
                  <Button
                    variant="link"
                    className="p-0 h-auto text-sm"
                    onClick={() => navigate('/contact')}
                  >
                    {t('contactUs')}
                  </Button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;