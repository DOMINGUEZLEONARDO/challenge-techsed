import React, { useState, useEffect } from "react";
import { Product } from "../types";

interface QuantitySelectorProps {
  product: Product;
  cartQuantity: number;
  updateCartQuantity: (quantity: number) => void;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  product,
  cartQuantity,
  updateCartQuantity,
}) => {
  const [quantity, setQuantity] = useState(cartQuantity);
  const [measurementQuantity, setMeasurementQuantity] = useState(0); // Para manejar cantidad en medida (area, group)
  const [error, setError] = useState("");

  useEffect(() => {
    setQuantity(cartQuantity);
  }, [cartQuantity]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseFloat(e.target.value);
    value = parseFloat(value.toFixed(2)); // Redondear a dos decimales


    if (value < 0) {
      setError("La cantidad no puede ser negativa.");
      return;
    }

    // Validación para "group" (producto vendido como grupo)
    if (product.salesUnit === "group") {
      const maxGroupCount = product.stock * (product.unitValue || 1); // Máximo stock en unidades del grupo
      if (value * (product.unitValue || 1) > maxGroupCount) {
        setError("No hay suficiente stock de ladrillos.");
        return;
      }
    }

    // Validación para "area" (producto vendido por área)
    if (product.salesUnit === "area") {
      const maxArea = product.stock * (product.unitValue || 1); // Máximo stock en m²
      if (value * (product.unitValue || 1) > maxArea) {
        setError("No hay suficiente stock de metros cuadrados.");
        return;
      }
    }

    // Validación para "unit" (producto vendido como unidad)
    if (product.salesUnit === "unit") {
      if (value > product.stock) {
        setError(`No hay suficiente stock de ${product.title}.`);
        return;
      }
    }

    setQuantity(value);
    updateCartQuantity(value);

    // Ajuste para "group"
    if (product.salesUnit === "group") {
      setMeasurementQuantity(value * (product.unitValue || 1)); 
      // Calcular el total de unidades en función de "unitValue"
    }

    // Ajuste para "area"
    if (product.salesUnit === "area") {
      setMeasurementQuantity(value * (product.unitValue || 1));
       // Calcular el total de metros cuadrados
    }
  };

  const handleMeasurementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseFloat(e.target.value);
    value = parseFloat(value.toFixed(2));

    // Validar que no exceda el stock
    if (product.salesUnit === "group") {
      const maxGroupCount = product.stock * (product.unitValue || 1);
      if (value > maxGroupCount) {
        setError("No hay suficiente stock de ladrillos.");
        return;
      }
    }

    if (product.salesUnit === "area") {
      const maxArea = product.stock * (product.unitValue || 1);
      if (value > maxArea) {
        setError("No hay suficiente stock de metros cuadrados.");
        return;
      }
    }

    // Ajuste según unidad de venta
    if (
      product.salesUnit === "group" &&
      value % (product.unitValue || 1) !== 0
    ) {
      // Ajustar a múltiplo de 198
      const adjustedValue =
        Math.round(value / (product.unitValue || 1)) * (product.unitValue || 1);
      setMeasurementQuantity(adjustedValue);
      setQuantity(Math.floor(adjustedValue / (product.unitValue || 1)));
      return;
    } else if (
      product.salesUnit === "area" &&
      value % (product.unitValue || 1) !== 0
    ) {
      // Ajustar a múltiplo de 2.68
      const adjustedValue =
        Math.round(value / (product.unitValue || 1)) * (product.unitValue || 1);
        console.log(adjustedValue)
      setMeasurementQuantity(adjustedValue);
      setQuantity(Math.floor(adjustedValue / (product.unitValue || 1)));
      return;
    } else {
      setError(""); // Limpiar mensaje de error si es válido
    }

    setMeasurementQuantity(value);
    const newQuantity = value / (product.unitValue || 1);
    setQuantity(newQuantity);
    updateCartQuantity(newQuantity);
  };

  return (
    <div className="my-4">
      <label
        htmlFor="quantity"
        className="block text-sm font-medium text-gray-700"
      >
        Cantidad
      </label>
      <input
        id="quantity"
        type="number"
        value={quantity}
        onChange={handleInputChange}
        min="0"
        className="mt-2 p-2 border border-gray-300 rounded-md w-full text-gray-900"
      />
      {error && <p className="text-red-600 mt-2">{error}</p>} {/* Mostrar el mensaje de error */}
      {product.salesUnit === "group" && (
        <>
          <label
            htmlFor="measurementQuantity"
            className="block text-sm font-medium text-gray-700 mt-4"
          >
            Cantidad de ladrillos
          </label>
          <input
            id="measurementQuantity"
            type="number"
            value={measurementQuantity}
            onChange={handleMeasurementChange}
            step={product.unitValue}
            min="0"
            className="mt-2 p-2 border border-gray-300 rounded-md w-full text-gray-900"
          />
        </>
      )}
      {product.salesUnit === "area" && (
        <>
          <label
            htmlFor="measurementQuantity"
            className="block text-sm font-medium text-gray-700 mt-4"
          >
            Superficie en m²
          </label>
          <input
            id="measurementQuantity"
            type="number"
            value={measurementQuantity}
            onChange={handleMeasurementChange}
            step={product.unitValue}
            min="0"
            className="mt-2 p-2 border border-gray-300 rounded-md w-full text-gray-900"
          />
        </>
      )}
    </div>
  );
};

export default QuantitySelector;
