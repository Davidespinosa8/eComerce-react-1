import { useState } from "react";
import { salebd } from "./salebd";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../../redux/slices/cart-slice";
import { FaStar } from "react-icons/fa6";
import { message } from "antd";
import { setFavorite, removeFavorite } from "../../../redux/slices/user-slice";

export const Sale = () => {
  const [visibleProducts, setVisibleProducts] = useState(4); // Estado para controlar productos visibles
  const newProducts = salebd.filter((product) => product.isNew);
  const dispatch = useDispatch();
  const userLogged = useSelector((state) => state.user.userLogged);
  const userFavoriteProducts = useSelector((state) => state.user.favorites);
  const cart = useSelector((state) => state.cart);

  const handleFavorite = (product, isFavorite) => {
    if (isFavorite) {
      dispatch(removeFavorite(product.id));
    } else {
      dispatch(setFavorite(product));
    }
  };

  const addProductToCart = (product) => {
    dispatch(addToCart(product));
    message.success("Artículo agregado al carrito.");
  };

  const removeProductFromCart = (productId) => {
    dispatch(removeFromCart(productId));
    message.error("Artículo eliminado del carrito.");
  };

  const handleLoadMore = () => {
    setVisibleProducts((prev) => prev + 4); // Incrementa la cantidad de productos visibles en bloques de 4
  };

  // console.log('Sale - userFavoriteProducts', userFavoriteProducts);

  return (
    <section className="py-8">
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">Flash Sale</h2>
      {/* Contenedor dinámico */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4">
        {newProducts.slice(0, visibleProducts).map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-xl hover:scale-105 transition-all duration-300 ease-in-out flex-shrink-0 relative"
          >
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-52 object-contain rounded-t-xl mb-4"
            />
            <div className="px-4 pb-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{product.description}</p>
              <p className="text-xl font-bold text-blue-600 mb-4">${product.price}</p>
              <div className="flex justify-between items-center">
                {cart.some((item) => item.id === product.id) ? (
                  <button
                    onClick={() => removeProductFromCart(product.id)}
                    className="w-1/2 bg-red-600 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 hover:bg-red-700"
                  >
                    <FaCartPlus />
                  </button>
                ) : (
                  <button
                    className="w-1/2 bg-slate-600 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 hover:bg-slate-700"
                    onClick={() => addProductToCart(product)}
                  >
                    <FaCartPlus />
                  </button>
                )}
              </div>
            </div>

            {/* Estrella de favoritos */}
            {userLogged && <button
              className="absolute top-2 right-2 text-gray-500 hover:text-yellow-400 transition-all duration-300"
              onClick={() => handleFavorite(product, userFavoriteProducts.some((item) => item.id === product.id))}
            >
              <FaStar size={24} className={userFavoriteProducts.some((item) => item.id === product.id) ? 'text-yellow-400' : 'text-gray-500'} />
            </button>}
          </div>
        ))}
      </div>
      {/* Botón de cargar más */}
      {visibleProducts < newProducts.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleLoadMore}
            className="bg-slate-600 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 hover:bg-slate-700"
          >
            Cargar más
          </button>
        </div>
      )}
    </section>
  );
};
