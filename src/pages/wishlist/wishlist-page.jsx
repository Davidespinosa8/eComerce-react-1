import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductCard } from "../product/components";
import { removeFavorite, setFavorite } from "../../redux/slices/user-slice";

export const WishlistPage = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);
    const userFavoriteProducts = useSelector((state) => state.user.favorites);
    const userLogged = useSelector((state) => state.user.userLogged);
    const [listaSugerida, setListaSugerida] = useState([]);

    const handleFavorite = (item, add) => {
        if (add) {
            dispatch(setFavorite(item)); 
        } else {
            dispatch(removeFavorite(item.id)); 
        }
    };

    useEffect(() => {
        const productosSugeridos = () => {
            let lst = [];
            products.forEach(p => {
                let sugerido = true;
                userFavoriteProducts.forEach(up => {
                    if (p.id === up.id) {
                        sugerido = false;
                        return false;
                    }
                });
                if (sugerido) {
                    if (userFavoriteProducts.find(up => up.category === p.category)) {
                        lst.push(p);
                    }
                }
            });
            setListaSugerida(lst);
        };

        if (products && products.length > 0) {
            if (userFavoriteProducts && userFavoriteProducts.length > 0) {
                productosSugeridos();
            } else {
                setListaSugerida(products);
            }
        }
    }, [products, userFavoriteProducts]);

    return (
        <div className="container mx-auto">
            <section>
                <h1 className="text-5xl font-bold">Wishlist</h1>
                <div className="md:h-full grid grid-cols-4 gap-4 p-2 mt-6">
                    {userFavoriteProducts && userFavoriteProducts.map(curr => <ProductCard key={curr.id} item={curr} favorite={true} handleFavorite={handleFavorite} user={userLogged} />)}
                </div>
            </section>

            <section>
                <h2 className="text-3xl font-bold">Just For You</h2>
                <div className="md:h-full grid grid-cols-4 gap-4 p-2 mt-6">
                    {listaSugerida && listaSugerida.map(curr => <ProductCard key={curr.id} item={curr} favorite={false} handleFavorite={handleFavorite} user={userLogged} />)}
                </div>
            </section>
        </div>
    );
};
