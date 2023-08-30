import React, { useState } from "react";
import { uploadImage } from "../api/uploader.js";

export default function NewProduct() {
  const [product, setProduct] = useState({});
  const [file, setFile] = useState();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFile(files && files[0]);
      return;
    }

    setProduct((product) => ({ ...product, [name]: value }));
    console.log(product);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    uploadImage(file).then((data) => console.log(data));

    // 제품의 사진을 cloudy에 업로드하고 제품의 URL을 획득
    // Firebase에 새로운 제품을 추가함
  };

  return (
    <section>
      {file && <img src={URL.createObjectURL(file)} alt="local file" />}
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          name="file"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="title"
          value={product.title ?? ""}
          placeholder="제품명"
          required
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          value={product.price ?? ""}
          placeholder="가격"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="category"
          value={product.category ?? ""}
          placeholder="카테고리"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          value={product.description ?? ""}
          placeholder="제품 설명"
          required
          onChange={handleChange}
        />
        <button type="submit">제품등록하기</button>
      </form>
    </section>
  );
}
