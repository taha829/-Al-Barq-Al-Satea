import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useTranslation } from '../hooks/useTranslation';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Separator } from '../components/ui/separator';
import { Badge } from '../components/ui/badge';
import { MessageCircle, User, Phone, MapPin, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../hooks/use-toast';

interface CustomerInfo {
  name: string;
  phone: string;
  address: string;
  notes: string;
}

const Checkout: React.FC = () => {
  const { state, clearCart } = useCart();
  const { t, isRTL } = useTranslation();
  const navigate = useNavigate();
  
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    phone: '',
    address: '',
    notes: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: keyof CustomerInfo, value: string) => {
    setCustomerInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateWhatsAppMessage = (invoiceId?: string) => {
    const itemsText = state.items.map(item => `• ${item.name} × ${item.quantity} — ${(item.price * item.quantity).toFixed(2)} دينار`).join('\n');

    const customerPhoneNormalized = (() => {
      const p = customerInfo.phone.trim();
      if (!p) return p;
      if (p.startsWith('0')) return `+962${p.slice(1)}`;
      return p;
    })();

    const header = `🧾 فاتورة طلب - Al Barq Al Satea`;
    const meta = `📄 رقم الفاتورة: ${invoiceId || '—'}\n🕒 التاريخ: ${new Date().toLocaleString('en-GB')}`;

    const customerBlock = `👤 معلومات العميل:\n• الاسم: ${customerInfo.name}\n• الهاتف: ${customerPhoneNormalized || customerInfo.phone}\n• العنوان: ${customerInfo.address}`;

    const orderBlock = `🛒 تفاصيل الطلب:\n${itemsText}\n\n💰 المجموع: ${state.total.toFixed(2)} دينار`;

    const notesBlock = customerInfo.notes ? `📝 ملاحظات: ${customerInfo.notes}` : '';

    const footer = `\nشكراً لاختياركم Al Barq Al Satea`;

    const message = [header, meta, '', customerBlock, '', orderBlock, notesBlock, footer].filter(Boolean).join('\n');

    return message;
  };

  const handleSubmitOrder = async () => {
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      toast({ title: t('fillRequiredFields') });
      return;
    }

    setIsSubmitting(true);

    try {
      // Generate a unique invoice ID (no PDF)
      const invoiceId = `INV-${Date.now().toString(36).toUpperCase().slice(-8)}`;

      // Include invoice ID in WhatsApp message
      const message = generateWhatsAppMessage(invoiceId);

      // prefer a Vite env var: VITE_WHATSAPP_NUMBER (digits or +countryprefix). Fallback below.
  const rawNumber = (import.meta.env.VITE_WHATSAPP_NUMBER as string) || '+962799259682';

      // sanitize: remove non-digit characters (wa.me expects country code without +)
      const phoneDigits = rawNumber.replace(/\D/g, '');

      const encoded = encodeURIComponent(message);

      let whatsappUrl = `https://wa.me/${phoneDigits}?text=${encoded}`;

      // If URL is too long for some browsers, fall back to api.whatsapp.com/send
      if (whatsappUrl.length > 1900) {
        whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneDigits}&text=${encoded}`;
        toast({ title: t('orderSuccess'), description: `${t('whatsappSent')} (long message used web fallback)` });
      } else {
        toast({ title: t('orderSuccess'), description: t('whatsappSent') });
      }

      window.open(whatsappUrl, '_blank');

      clearCart();

      setTimeout(() => {
        navigate('/order-success');
      }, 1000);
    } catch (error) {
      console.error('Error submitting order:', error);
      toast({ title: t('orderError') });
    } finally {
      setIsSubmitting(false);
    }
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
              {t('emptyCartCheckout')}
            </p>
            <Button onClick={() => navigate('/products')} size="lg">
              {t('continueShopping')}
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
              {t('checkout')}
            </h1>
            <p className="text-lg text-gray-600">
              {t('completeOrder')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2 rtl:ml-2 rtl:mr-0" />
                    {t('customerInformation')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">{t('customerName')} *</Label>
                    <Input
                      id="name"
                      type="text"
                      value={customerInfo.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder={t('enterName')}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">{t('phone')} *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="phone"
                        type="tel"
                        value={customerInfo.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder={t('enterPhone')}
                        className="pl-10 rtl:pr-10 rtl:pl-3"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">{t('address')} *</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 rtl:right-3 rtl:left-auto top-3 text-gray-400 h-4 w-4" />
                      <Textarea
                        id="address"
                        value={customerInfo.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        placeholder={t('enterAddress')}
                        className="pl-10 rtl:pr-10 rtl:pl-3 min-h-[80px]"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="notes">{t('notes')} ({t('optional')})</Label>
                    <Textarea
                      id="notes"
                      value={customerInfo.notes}
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                      placeholder={t('enterNotes')}
                      className="min-h-[80px]"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>{t('orderSummary')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {state.items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img
                          src={item.image}
                          alt={item.imageAlt ?? item.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">
                            {item.name}
                          </p>
                          <Badge variant="secondary" className="text-xs">
                            {item.category}
                          </Badge>
                          <p className="text-xs text-gray-500">
                            {t('quantity')}: {item.quantity}
                          </p>
                        </div>
                        <div className="text-right rtl:text-left">
                          <p className="font-bold text-sm">
                            {(item.price * item.quantity).toFixed(2)} {t('currency')}
                          </p>
                        </div>
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
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <MessageCircle className="h-4 w-4 text-blue-600 mr-2 rtl:ml-2 rtl:mr-0" />
                      <span className="text-sm font-medium text-blue-800">
                        {t('whatsappOrder')}
                      </span>
                    </div>
                    <p className="text-xs text-blue-600">
                      {t('whatsappOrderDescription')}
                    </p>
                  </div>
                  
                  <Button
                    onClick={handleSubmitOrder}
                    disabled={isSubmitting || !customerInfo.name || !customerInfo.phone || !customerInfo.address}
                    className="w-full"
                    size="lg"
                  >
                    {isSubmitting ? (
                      t('submittingOrder')
                    ) : (
                      <>
                        <MessageCircle className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                        {t('sendOrderWhatsApp')}
                      </>
                    )}
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

export default Checkout;