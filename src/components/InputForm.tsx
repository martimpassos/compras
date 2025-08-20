import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { InputFormProps } from "@/types";

export default function InputForm({
  setProducts,
  setProductToAdd,
  products,
  productToAdd,
}: InputFormProps) {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmedProduct = productToAdd.trim();
    if (!trimmedProduct) {
      return;
    }
    if (
      products.some(
        (product) =>
          product.name.toLowerCase() === trimmedProduct.toLowerCase(),
      )
    ) {
      return;
    } else {
      const titleCase =
        trimmedProduct.charAt(0).toUpperCase() + trimmedProduct.slice(1);
      setProducts([...products, { name: titleCase, checked: false }]);
      setProductToAdd("");
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-sm items-center gap-2 mb-4"
    >
      <Input
        type="text"
        name="product"
        id="product"
        placeholder="Produto"
        value={productToAdd}
        onChange={(e) => {
          setProductToAdd(e.target.value);
        }}
      />
      <Button type="submit">Adicionar</Button>
    </form>
  );
}
