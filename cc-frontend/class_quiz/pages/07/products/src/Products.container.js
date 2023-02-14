import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import ProductsUI from "./Products.presenter";
import { DELETE_PRODUCT, FETCH_PRODUCTS } from "./Products.queries";

export default function Products() {
  const { data } = useQuery(FETCH_PRODUCTS);
  const [deleteProduct] = useMutation(DELETE_PRODUCT);

  const [selectedInfo, setSelectedInfo] = useState({});

  const onClickChecked = (e, number) => {
    if (e.target.checked) {
      setSelectedInfo({ number, checked: true });
    } else {
      resetState();
    }
  };
  const onClickDelete = (e) => {
    if (selectedInfo.checked) {
      deleteProduct({
        variables: { productId: e.target.id },
        refetchQueries: [{ query: FETCH_PRODUCTS }],
      });

      resetState();
    }
  };

  const resetState = () => {
    setSelectedInfo({});
  };

  return <ProductsUI data={data} onClickChecked={onClickChecked} onClickDelete={onClickDelete} />;
}
