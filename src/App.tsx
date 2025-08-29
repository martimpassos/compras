import InputForm from "@/components/InputForm";
import ShoppingList from "@/components/ShoppingList";
import LoginForm from "@/components/LoginForm";
import type { Product } from "@/types";
import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, update, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "compras-c0bf9.firebaseapp.com",
    databaseURL: import.meta.env.VITE_FIREBASE_DB_URL,
    projectId: "compras-c0bf9",
    storageBucket: "compras-c0bf9.firebasestorage.app",
    messagingSenderId: "795646016843",
    appId: "1:795646016843:web:b9c3816be0d8719b6d3cce",
    measurementId: "G-Z2R57EGX1K",
  };

function App() {
  
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);

  const [productToAdd, setProductToAdd] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [authLoading, setAuthLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(false);

  const isLoading = authLoading || (isLoggedIn && productsLoading);

  const addProduct = (product: Product) => {
    const newProductRef = ref(db, `products/${product.name}`);
    set(newProductRef, product);
  };

  const updateProduct = (product: Product) => {
    const itemRef = ref(db, `products/${product.name}`);
    update(itemRef, { checked: product.checked });
  };

  // listen for auth changes
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      setAuthLoading(false); // auth check done
    });
    return () => unsubscribe();
  }, []);

  // listen for products only if logged in
  useEffect(() => {
    if (!isLoggedIn) return;

    setProductsLoading(true);
    const productsRef = ref(db, "products");

    const unsubscribe = onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setProducts(Object.values(data));
      } else {
        setProducts([]);
      }
      setProductsLoading(false);
    });

    return () => unsubscribe();
  }, [db, isLoggedIn]);

  return (
    <div className="p-8 max-h-screen grid grid-rows-[auto_1fr]">
      {isLoading ? (
        <p>Carregando...</p>
      ) : !isLoggedIn ? (
        <LoginForm 
          setIsLoggedIn={setIsLoggedIn}
        />
      ) : (
        <>
          <div id="header">
            <h1 className="mb-4">Compras</h1>
            <InputForm
              setProducts={setProducts}
              setProductToAdd={setProductToAdd}
              products={products}
              productToAdd={productToAdd}
              addProduct={addProduct}
            />
          </div>
          <div id="list" className="overflow-y-auto no-scrollbar h-full">
            <ShoppingList
              products={products}
              productToAdd={productToAdd}
              setProducts={setProducts}
              updateProduct={updateProduct}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
