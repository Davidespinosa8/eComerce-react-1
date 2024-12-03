/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { clearUserLogged } from '../redux/slices/user-slice';
import { getCategoriesProducts, getProducts, getProductsSearch, getProductsSearchCategory } from "../pages/product/services/product-service";
import { productAdapter } from "../pages/product/adapter";
import { setProducts } from "../redux/slices/product-slice";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { FaCartShopping, FaRegHeart } from "react-icons/fa6";
import { Dropdown } from "./dropdown";

export const NavBar = () => {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const cart = useSelector((state) => state.cart);
    const cantCart = cart.reduce((acc, curr) => acc + curr.quantity, 0);
    const userLogged = useSelector((state) => state.user.userLogged);
    const [search, setSearch] = useState("");
    // eslint-disable-next-line no-unused-vars
    const [searchDebounce, setSearchDebounce] = useDebounce(search, 300);
    const userFavoriteProducts = useSelector((state) => state.user.favorites);
    const cantFavorite = userFavoriteProducts ? userFavoriteProducts.length : 0;
    const [categories, setCategories] = useState([]);
    const [dropdownClose, setDropdownClose] = useState(false);
    const [dropdownLabel, setDropdownLabel] = useState('Categories');
    useEffect(() => {
        const fetchData = async () => {
            const res = await getCategoriesProducts();
            // console.log('NavBar - getCategoriesProducts', res);
            let listDropdownCategories = [
                <button key={-1} className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left" role="menuitem" onClick={() => searchProducts()}>Categories</button>
            ];
            res.data.forEach((curr, idx) => {
                listDropdownCategories.push(<button key={idx} className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left" role="menuitem" onClick={() => searchProductsByCategory(curr.name, curr.slug)}>{curr.name}</button>)
            });
            setCategories(listDropdownCategories);
        };
        fetchData();
    }, []);
    
    useEffect(() => {
        if (dropdownClose) {
            setDropdownClose(prevStat => !prevStat);
        }
    }, [dropdownClose]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getProductsSearch(searchDebounce);
                const productList = res.data.products.map(itm => productAdapter(itm));
                // console.log('NavBar - fetchData', productList);
                dispatch(setProducts(productList));
            } catch (error) {
                console.log('NavBar - fetchData - Error', error);
            }
        };

        fetchData();
        
    }, [searchDebounce]);

    const sessionClose = () => {
        dispatch(clearUserLogged());
        nav("/");
    };


    const searchProducts = async () => {
        const res = await getProducts();
        const productList = res.data.products.map(itm => productAdapter(itm));
        dispatch(setProducts(productList));
        setDropdownLabel('Categories');
        setDropdownClose(true);
    }

    const searchProductsByCategory = async (category, slug) => {
        const res = await getProductsSearchCategory(slug);
        const productList = res.data.products.map(itm => productAdapter(itm));
        dispatch(setProducts(productList));
        setDropdownLabel(category);
        setDropdownClose(true);
    };

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="bg-black text-white text-center">
                Summer Sail For All Swim Suits And Free Express Delibery - OFF 50%! ShopNow
            </div>

            <div className="flex flex-wrap items-center justify-between mx-auto p-2">
                <Link to={'/login'} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent font-bold">
                    Exclusive
                </Link>
                <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
                <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                    <li>
                        <Link to={'/'} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to={'/contact'} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                            Contact
                        </Link>
                    </li>
                    <li>
                        <Link to={'/about'} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                            About
                        </Link>
                    </li>
                    <li>
                        
                        <Link to={'/register'} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                            Sign Up
                        </Link>
                    </li>
                </ul>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <Dropdown isClose={dropdownClose} labelSelected={dropdownLabel} list={categories} />
                        </li>
                        <li>
                            <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." value={search} onChange={(evt) => setSearch(evt.currentTarget.value)} />
                        </li>
                        <li>
                            
                            <Link to={'/favorites'} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                                <FaRegHeart />
                                {cantFavorite > 0 ? cantFavorite : ''}
                            </Link>
                        </li>
                        <li>
                            <Link to={'/cart'} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                                <FaCartShopping />
                                {cantCart > 0 ? cantCart : ''}
                            </Link>
                        </li>
                        {userLogged
                            ? <>
                                <li>{userLogged.name}</li>
                                <li><button onClick={sessionClose}>Cerrar sesión</button></li>
                            </>
                            : <> </>}
                        
                    </ul>
                </div>
            </div>
        </nav>
    );
}