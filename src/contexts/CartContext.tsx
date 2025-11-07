import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description?: string;
  // وصف بديل للصورة (نص عربي لوصف الصورة لأغراض الوصول والـ alt)
  imageAlt?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
}

interface CustomerInfo {
  name: string;
  phone: string;
  address: string;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; quantity?: number } }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_CART'; payload: CartState };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity = 1 } = action.payload;

      const existingItem = state.items.find(item => item.id === product.id);

      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        return {
          items: updatedItems,
          total: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        };
      } else {
        const newItems = [...state.items, { ...product, quantity }];
        return {
          items: newItems,
          total: newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        };
      }
    }
    case 'SET_CART':
      return action.payload;
    
    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload);
      return {
        items: newItems,
        total: newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      };
    }
    
    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        const newItems = state.items.filter(item => item.id !== action.payload.id);
        return {
          items: newItems,
          total: newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        };
      }
      
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      return {
        items: updatedItems,
        total: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      };
    }
    
    case 'CLEAR_CART':
      return { items: [], total: 0 };
    
    default:
      return state;
  }
};

interface CartContextType {
  state: CartState;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
    sendToWhatsApp: (customerInfo: { name: string; phone: string; address: string }) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize from localStorage when available so cart persists across reloads
  const initializer = (): CartState => {
    try {
      const raw = localStorage.getItem('cart');
      if (raw) {
        const parsed = JSON.parse(raw) as CartState;
        // basic validation
        if (parsed && Array.isArray(parsed.items)) return parsed;
      }
    } catch (e) {
      // ignore parse errors and return default
    }
    return { items: [], total: 0 };
  };

  const [state, dispatch] = useReducer(cartReducer, undefined, initializer);

  // Persist cart to localStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(state));
    } catch (e) {
      // ignore storage errors (e.g., in private mode)
    }
  }, [state]);

  const addItem = (product: Product, quantity = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity } });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getItemCount = () => {
    return state.items.reduce((count, item) => count + item.quantity, 0);
  };

    const sendToWhatsApp = (customerInfo: { name: string; phone: string; address: string }) => {
      const whatsappNumber = '962799259682'; // Remove spaces and '+' for URL
    
      // Generate a simple invoice id for reference
      const invoiceId = `INV-${Date.now().toString(36).toUpperCase().slice(-8)}`;

      // Format order items with bullets
      const orderItems = state.items.map(item =>
        `• ${item.name} × ${item.quantity} — ${(item.price * item.quantity).toFixed(2)} دينار`
      ).join('\n');

      // Professional formatted message with icons
      const message = [
        '🧾 فاتورة طلب من: Al Barq Al Satea',
        `📄 رقم الفاتورة: ${invoiceId}`,
        `🕒 التاريخ: ${new Date().toLocaleString('en-GB')}`,
        '',
        '👤 معلومات العميل:',
        `   • الاسم: ${customerInfo.name}`,
        `   • الهاتف: ${customerInfo.phone}`,
        `   • العنوان: ${customerInfo.address}`,
        '',
        '🛒 تفاصيل الطلب:',
        orderItems,
        '',
        `💰 المجموع: ${state.total.toFixed(2)} دينار`,
        '',
        '🚚 ملاحظات: يُرجى إضافة أي ملاحظات عند التأكيد',
        '',
        'شكرًا لاختياركم Al Barq Al Satea'
      ].join('\n');

      // URL encode the message
      const encodedMessage = encodeURIComponent(message);
    
      // Create WhatsApp URL
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
      // Open WhatsApp in new window
      window.open(whatsappUrl, '_blank');

      // Clear the cart after sending
      clearCart();
    };

    return (
      <CartContext.Provider value={{
        state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getItemCount,
        sendToWhatsApp
      }}>
        {children}
      </CartContext.Provider>
    );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};