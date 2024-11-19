import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { getProducts, getProductsSearch } from "../product/services/product-service";
import { productAdapter } from "../product/adapter";
import { ProductCard } from "../product/components";
import { useDispatch, useSelector } from "react-redux";
import { removeFavorite, setFavorite } from "../../redux/slices/user-slice";

const HomePage = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const userLogged = useSelector((state) => state.user.userLogged);
    const userFavoriteProducts = useSelector((state) => state.user.favorites);
    const [products, setProducts] = useState(null);
    const [search, setSearch] = useState("");
    const [searchDebounce] = useDebounce(search, 300);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getProducts();
                const productList = res.data.products.map(itm => productAdapter(itm));
                setProducts(productList);
                setLoading(false);
            } catch (error) {
                console.log('HomePage - fetchData - Error', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getProductsSearch(searchDebounce);
                const productList = res.data.products.map(itm => productAdapter(itm));
                setProducts(productList);
                setLoading(false);
            } catch (error) {
                console.log('HomePage - fetchData - Error', error);
            }
        };

        fetchData();
    }, [searchDebounce]);

    const handleFavorite = (item, add) => {
        if (add) {
            dispatch(setFavorite(item));
        } else {
            dispatch(removeFavorite(item.id));
        }
    };

    return (
            <section>
                <div className="bg-red-700 md:h-full grid place-items-center mt-3 m-3">
                    <input
                        type="search"
                        id="default-search"
                        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Search Mockups, Logos..."
                        value={search}
                        onChange={(evt) => setSearch(evt.currentTarget.value)}
                    />
                </div>

                <div className="md:h-full grid grid-cols-4 gap-4 p-2 mt-6">
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        products &&
                        products.map(curr => (
                            <ProductCard
                                key={curr.id}
                                item={curr}
                                favorite={
                                    !userLogged
                                        ? false
                                        : !!userFavoriteProducts.find(cf => cf.id === curr.id)
                                }
                                handleFavorite={handleFavorite}
                                user={userLogged}
                            />
                        ))
                    )}
                </div>
            </section>
    );
};

export default HomePage;
