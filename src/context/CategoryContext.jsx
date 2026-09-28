import {
    createContext,
    useContext,
    useState
} from "react";

const CategoryContext = createContext(null);


export function CategoryProvider({ children }) {

    const [categoryProducts, setCategoryProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    const fetchCategoryProducts = async (categoryName) => {

        try {

            setLoading(true);
            setError("");

            const category = decodeURIComponent(categoryName);

            console.log("Fetching category:", category);
            //https://blinkit-backend-1-e6wf.onrender.com/product/getAllProducts
            //https://fakestoreapi.com/products
            const response = await fetch(
                `https://blinkit-backend-1-e6wf.onrender.com/product/getAllProducts/category/${encodeURIComponent(category)}`
            );

            if (!response.ok) {
                throw new Error("Failed to fetch category products");
            }

            const data = await response.json();

            console.log("Category products:", data);

            setCategoryProducts(data);

        } catch (error) {

            console.error("Error:", error);

            setError(error.message);

        } finally {

            setLoading(false);

        }

    };


    return (
        <CategoryContext.Provider
            value={{
                categoryProducts,
                loading,
                error,
                fetchCategoryProducts
            }}
        >
            {children}
        </CategoryContext.Provider>
    );

}


export function useCategory() {

    return useContext(CategoryContext);

}


export default CategoryContext;


//==============how to use this context============================
    // const {
    //     categoryProducts,
    //     loading,
    //     error,
    //     fetchCategoryProducts
    // } = useCategory();


    // useEffect(() => {

    //     console.log("URL category:", categoryName);

    //     fetchCategoryProducts(categoryName);

    // }, [categoryName]);