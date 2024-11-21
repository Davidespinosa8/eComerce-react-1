import { useEffect, useState } from "react";
import { getProducts } from "../product/services/product-service";
import { productAdapter } from "../product/adapter";
import { ProductCard } from "../product/components";
import { useDispatch, useSelector } from "react-redux";
import { removeFavorite, setFavorite } from "../../redux/slices/user-slice";
import { setProducts } from "../../redux/slices/product-slice";

const HomePage = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const userLogged = useSelector((state) => state.user.userLogged);
    const userFavoriteProducts = useSelector((state) => state.user.favorites);
    const products = useSelector((state) => state.products.products);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getProducts();
                const productList = res.data.products.map(itm => productAdapter(itm));
                // console.log('HomePage - fetchData', productList);
                dispatch(setProducts(productList));
                setLoading(false);
            } catch (error) {
                console.log('HomePage - fetchData - Error', error);
            }
        };

        fetchData();
    }, []);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const res = await getProductsSearch(searchDebounce);
    //             const productList = res.data.products.map(itm => productAdapter(itm));
    //             // console.log('HomePage - fetchData', productList);
    //             setProducts(productList);
    //             // setProducts(res.data.products);
    //             setLoading(false);
    //         } catch (error) {
    //             console.log('HomePage - fetchData - Error', error);
    //         }
    //     };

    //     fetchData();
    // }, [searchDebounce]);

    const handleFavorite = (item, add) => {
        if (add) {
            dispatch(setFavorite(item));
        } else {
            dispatch(removeFavorite(item.id));
        }
    }

    // console.log('HomePage - loading - products', loading, products);

    return (
        <div className="container  mx-auto">
            <section>
                <div className="md:h-full grid grid-cols-4 gap-4 p-2 mt-6">
                    {loading
                        ? <></>
                        : products && products.map(curr => <ProductCard key={curr.id} item={curr} favorite={!userLogged ? false : (userFavoriteProducts.find(cf => cf.id === curr.id) ? true : false)} handleFavorite={handleFavorite} user={userLogged} />)
                    }
                </div>
            </section>
        </div>
    );
};

export default HomePage;