import axios from "axios";
import { useEffect, useState } from "react";

export default function openAPIWithUseEffectPage() {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetch = async () => {
      const result = await axios.get("https://koreanjson.com/posts/1");
      setData(result.data);
      console.log(result.data);
    };

    fetch();
  }, []);

  return (
    <>
      <div>{data}</div>
    </>
  );
}
