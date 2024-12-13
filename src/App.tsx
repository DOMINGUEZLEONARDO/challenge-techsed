import React, { useState } from 'react';
import ProductDetails from './components/ProductDetails.tsx';
import QuantitySelector from './components/QuantitySelector.tsx';
import CartButtons from './components/CartButtons.tsx';
import Cart from './components/Cart.tsx';
import { Product, CartItem } from './types';

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  const products: Product[] = [
    {
      id: '100012',
      title: "Ladrillo hueco 8cm x 18cm x 33cm (Pallet de 198u)",
      description: "Ladrillo hueco 8cm x 18cm x 33cm - Pallet: 198 unidades",
      price: 60588,
      stock: 5,
      salesUnit: "group",
      measurementUnit: "pallet",
      unitValue: 198,
    },
    {
      id: '2060',
      title: "Ceramico Azabache 20Und 36X36 1ra 2,68 m2 por Caja",
      description: "Ceramica esmaltada 36x36, terminacion brillante, transito medio, liso, Colores disponibles: Negro",
      price: 13031,
      stock: 5,
      salesUnit: "area",
      measurementUnit: "m2",
      unitValue: 2.68,
    },
    {
      id: '10035',
      title: "Hierro 25 mm x 12 m Acindar",
      description: "HIERRO 25 MM X 12M",
      price: 76293,
      stock: 5,
      salesUnit: "unit",
    }
  ];

  const addToCart = (product: Product, quantity: number) => {
    const existingItem = cart.find(item => item.product.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.product.id === product.id
          ? { ...item, quantity }
          : item
      ));
    } else {
      setCart([...cart, { product, quantity }]);
    }
    setQuantities(prev => ({ ...prev, [product.id]: quantity }));
  };

  const removeFromCart = (item: CartItem) => {
    setCart(cart.filter(cartItem => cartItem.product.id !== item.product.id));
  };

  const handleQuantityChange = (productId: string, quantity: number) => {
    setQuantities(prev => ({ ...prev, [productId]: quantity }));
  };

  console.log(cart)

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Lista de Productos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-white p-4 rounded-md shadow-md hover:shadow-lg transition duration-300 flex flex-col justify-between">
            <ProductDetails product={product} />
            <QuantitySelector 
              product={product} 
              cartQuantity={quantities[product.id] || 0} 
              updateCartQuantity={(quantity) => handleQuantityChange(product.id, quantity)} 
            />
            <CartButtons 
              product={product} 
              cartQuantity={quantities[product.id] || 0} 
              addToCart={(quantity) => addToCart(product, quantity)} 
              removeFromCart={() => removeFromCart({ product, quantity: quantities[product.id] || 0 })} 
            />
          </div>
        ))}
      </div>
      <Cart cartItems={cart} removeFromCart={removeFromCart} />
    </div>
  );
};

export default App;
