import Product from "./types/product";

type ProductRowProps = {
  product: Product;
};

export default function ProductRow({ product }: ProductRowProps) {
  return (
    <tr>
      <td
        style={{
          color: product.stocked ? "black" : "red",
        }}
      >
        {product.name}
      </td>
      <td>{product.price}</td>
    </tr>
  );
}
