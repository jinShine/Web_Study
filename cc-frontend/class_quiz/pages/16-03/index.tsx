import axios from "axios";
import { useEffect, useState } from "react";

export default function dogImagePage() {
  const [dogImageURL, setDogImageURL] = useState("");

  useEffect(() => {
    fetchDogData();

    return () => {
      alert("컴포넌트가 제거됩니다~");
    };
  }, []);

  const fetchDogData = async () => {
    const { data } = await axios.get("https://dog.ceo/api/breeds/image/random");
    console.log(data.message);

    setDogImageURL(data.message);
  };

  return (
    <>
      <img src={dogImageURL} />
    </>
  );
}
