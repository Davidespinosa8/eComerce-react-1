/* eslint-disable react/prop-types */

import { useState } from "react";
import { FaStar, FaCartPlus, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../../redux/slices/cart-slice";
import { message } from "antd";
import { cartAdapter } from "../../cart/adapter/cart-adapter";

export const ProductCard = ({ item, favorite, handleFavorite, user }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addProductToCart = (product) => {
    const cartProduct = cartAdapter(product);
    dispatch(addToCart(cartProduct));
    message.success("Artículo agregado al carrito.");
  };

  const removeProductToCart = (productId) => {
    dispatch(removeFromCart(productId));
    message.error("Artículo eliminado del carrito.");
  };

  return (
    <div className="w-full max-w-sm pb-10 ">
      <div
        className={`flip-card__inner relative w-full h-96 bg-white rounded-lg shadow-lg cursor-pointer transition-transform duration-500 ${
          isFlipped ? "transform rotate-y-180" : ""
        }`}
        style={{ transformStyle: "preserve-3d" }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Lado Frontal */}
        <div
          className={`flip-card__front p-6 flex flex-col items-center justify-center gap-4 ${
            isFlipped ? "hidden" : "flex"
          }`}
        >
          <img
            src={item.images ? item.images[0] : ""}
            alt={item.title}
            className={`w-42 h-36 object-contain rounded-md transition-transform duration-300 ${
              isHovered ? "scale-110 rotate-6" : ""
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
          <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
          <p className="text-sm text-gray-600 text-center">{item.description}</p>
          <p className="text-xl font-bold text-blue-500">${item.price}</p>
        </div>

        {/* Lado Posterior */}
        <div
          className={`flip-card__back p-6 flex items-center justify-center bg-gray-200 rounded-lg ${
            isFlipped ? "flex" : "hidden"
          }`}
        >
          <div className="relative w-full">
            <img
              src={item.images ? item.images[0] : ""}
              alt={item.title}
              className="w-full h-60 object-cover rounded-md"
            />
            {user && (
              <span
                className={`absolute top-2 right-2 ${
                  favorite ? "text-red-700" : "text-gray-500"
                }`}
                role="button"
                onClick={() => handleFavorite(item, !favorite)}
              >
                <FaStar size={24} />
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Botón siempre visible */}
      <div className="mt-4 flex justify-center">
        {cart.some((itmCart) => itmCart.id === item.id) ? (
          <button
            onClick={() => {
              removeProductToCart(item.id);
            }}
            className="text-slate-950 flex items-center gap-2 px-4 py-2 border border-slate-950 rounded-lg"
          >
            <FaTrash /> 
          </button>
        ) : (
          <button
            className="bg-slate-600 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2"
            onClick={() => {
              addProductToCart(item);
            }}
          >
            <FaCartPlus /> 
          </button>
        )}
      </div>
    </div>
  );
};
