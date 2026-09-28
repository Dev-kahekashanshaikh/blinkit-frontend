import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

const ProductContext = createContext();

export function ProductProvider({ children }) {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {


  //http://localhost:4000/product/getAllProducts
//localhost:4000/product/getAllProducts
//https://fakestoreapi.com/products
//https://blinkit-backend-1-e6wf.onrender.com/product/getAllProducts

    fetch("https://blinkit-backend-1-e6wf.onrender.com/product/getAllProducts")
      .then(res => {

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        return res.json();

      })
      .then(data => {

        setProducts(data);
        setLoading(false);

      })
      .catch(error => {

        setError(error.message);
        setLoading(false);

      });

  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

//jab bhi hume products fetch krna hai tu bus below function ko call krna hai
export function useProducts() {

  return useContext(ProductContext);

}


export default ProductContext;