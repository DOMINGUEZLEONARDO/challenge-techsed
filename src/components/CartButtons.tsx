import React, { useState } from 'react';
import { Product } from '../types';

interface CartButtonsProps {
  product: Product;
  cartQuantity: number;
  addToCart: (quantity: number) => void;
  removeFromCart: () => void;
}

const CartButtons: React.FC<CartButtonsProps> = ({ product, cartQuantity, addToCart, removeFromCart }) => {
  const [showCartButtons, setShowCartButtons] = useState(false);

  const handleAddToCart = () => {
    addToCart(cartQuantity);
    setShowCartButtons(true);
  };

  return (
    <div className="mt-4 flex justify-between">
      {showCartButtons ? (
        <>
          <button 
            onClick={() => removeFromCart()} 
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
          >
            Eliminar del carrito
          </button>
          <button 
            onClick={() => addToCart(cartQuantity)} 
            className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
          >
            Cambiar cantidad
          </button>
        </>
      ) : (
        <button 
          onClick={handleAddToCart}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
        >
          Agregar al carrito
        </button>
      )}
    </div>
  );
};

export default CartButtons;
