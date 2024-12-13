import React from "react";
import { CartItem } from "../types";
import DeleteIcon from "@mui/icons-material/Delete";

interface CartProps {
  cartItems: CartItem[];
  removeFromCart: (item: CartItem) => void;
}

const Cart: React.FC<CartProps> = ({ cartItems, removeFromCart }) => {
  return (
    <div className="mt-6 p-4 bg-gray-100 rounded-md shadow-lg">
      <h3 className="text-2xl font-semibold mb-4">Carrito de compras</h3>
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Tu carrito está vacío.</p>
      ) : (
        <table className="min-w-full bg-white">
          <thead>
            <tr className="w-full bg-gray-200">
              <th className="py-2 px-4 text-center">Producto</th>
              <th className="py-2 px-4 text-center">Cantidad</th>
              <th className="py-2 px-4 text-center">Precio Total</th>
              <th className="py-2 px-4 text-center"></th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => {
              const totalPrice = item.quantity * item.product.price;

              return (
                <tr key={item.product.id} className="border-b">
                  <td className="py-2 px-4">{item.product.title}</td>
                  <td className="py-2 px-4 text-center">{item.quantity}</td>
                  <td className="py-2 px-4 text-center">${totalPrice}</td>
                  <td className="py-2 px-4 text-center">
                    <button
                      onClick={() => removeFromCart(item)}
                      className="text-red-600 hover:text-red-800"
                      aria-label="Eliminar producto"
                    >
                      <DeleteIcon />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Cart;
