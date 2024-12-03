/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { getProducts } from "../product/services/product-service";
import { productAdapter } from "../product/adapter";
import { ProductCard } from "../product/components";
import { useDispatch, useSelector } from "react-redux";
import { removeFavorite, setFavorite } from "../../redux/slices/user-slice";
import { setProducts } from "../../redux/slices/product-slice";
import { Sale } from "./sale/sale";

const HomePage = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [visibleCount, setVisibleCount] = useState(4); // Mostrar inicialmente 2 productos
    const userLogged = useSelector((state) => state.user.userLogged);
    const userFavoriteProducts = useSelector((state) => state.user.favorites);
    const products = useSelector((state) => state.products.products);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getProducts();
                const productList = res.data.products.map(itm => productAdapter(itm));
                dispatch(setProducts(productList));
                setLoading(false);
            } catch (error) {
                console.log("HomePage - fetchData - Error", error);
            }
        };

        fetchData();
    }, []);

    const handleFavorite = (item, add) => {
        if (add) {
            dispatch(setFavorite(item));
        } else {
            dispatch(removeFavorite(item.id));
        }
    };

    const showMoreProducts = () => {
        setVisibleCount((prev) => prev + 4); // Cargar 4 productos más al presionar
    };

    return (
        <div className="container mx-auto">
            <Sale />
            <section>
							<h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">Productos</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2 mt-6">
                    {loading ? (
                        <p>Cargando productos...</p>
                    ) : (
                        products?.slice(0, visibleCount).map((curr) => (
                            <ProductCard
                                key={curr.id}
                                item={curr}
                                favorite={!!userLogged && userFavoriteProducts.some((cf) => cf.id === curr.id)}
                                handleFavorite={handleFavorite}
                                user={userLogged}
                            />
                        ))
                    )}
                </div>
                {!loading && visibleCount < products?.length && (
                    <div className="text-center mt-6 pb-10">
                        <button
                            onClick={showMoreProducts}
                            className="bg-slate-600 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 hover:bg-slate-700"
                        >
                            Cargar más
                        </button>
                    </div>
                )}
            </section>
        </div>
    );
};

export default HomePage;
