import InputForm from "@/components/InputForm";
import ShoppingList from "./components/ShoppingList";
import type { Product } from "@/types";
import { useState, useEffect } from "react";

function App() {
  const [productToAdd, setProductToAdd] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  const STORAGE_KEY = "shopping-list";

  const saveProducts = (products: Product[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  };

  const loadProducts = (): Product[] => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  };

  useEffect(() => {
    const stored = loadProducts();
    if (stored.length > 0) {
      setProducts(stored);
    }
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      saveProducts(products);
    }
  }, [products]);

  return (
    <div className="p-8 max-h-screen grid grid-rows-[auto_1fr]">
      <div id="header">
        <h1 className="mb-4">Compras</h1>
        <InputForm
          setProducts={setProducts}
          setProductToAdd={setProductToAdd}
          products={products}
          productToAdd={productToAdd}
        />
      </div>
      <div id="list" className="overflow-y-auto no-scrollbar h-full">
        <ShoppingList products={products} productToAdd={productToAdd} setProducts={setProducts} />
        {/* <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p> */}
      </div>
    </div>
  );
}

export default App;
