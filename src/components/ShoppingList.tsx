import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { ShoppingListProps } from "@/types";

export default function ShoppingList({
  products,
  productToAdd,
  setProducts,
  updateProduct,
}: ShoppingListProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {products.map((product) => {
        const isFiltered =
          productToAdd &&
          !product.name.toLowerCase().startsWith(productToAdd.toLowerCase());

        return (
          <div
            className={`flex p-4 border border-gray-300 rounded-xl transition-opacity duration-100 ${
              isFiltered ? "opacity-0" : "opacity-100"
            }`}
            key={product.name}
            style={{
              order: (isFiltered ? 2 : 0) + (product.checked ? 1 : 0),
            }}
          >
            <Checkbox
              id={product.name}
              checked={product.checked}
              onCheckedChange={(checked) => {
                setProducts(
                  products.map((p) =>
                    p.name === product.name
                      ? { ...p, checked: checked === true }
                      : p,
                  ),
                );
                updateProduct({ ...product, checked: checked === true });
              }}
              className="mr-2"
            />
            <Label htmlFor={product.name}>{product.name}</Label>
          </div>
        );
      })}
    </div>
  );
}
