import React from 'react';
import { Product } from '../types';

const ProductDetails: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-md flex flex-col">
      <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
      <p className="text-gray-700 mb-2">{product.description}</p>
      <p className="text-xl text-gray-900 font-semibold mb-2">Precio: <span className="text-green-600">${product.price}</span></p>
      <p className="text-sm text-gray-500">Disponibilidad: <span className="font-semibold">{product.stock} unidades</span></p>
    </div>
  );
};

export default ProductDetails;
