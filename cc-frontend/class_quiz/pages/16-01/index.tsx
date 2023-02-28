import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function lifeCyclePage() {
  const router = useRouter();

  const [isChange, setIsChange] = useState(false);

  useEffect(() => {
    alert("Rendered!");

    return () => {
      alert("Bye!!");
    };
  }, []);

  useEffect(() => {
    alert("Changed");
  }, [isChange]);

  const onClickChange = () => {
    setIsChange(true);
  };

  const onClickMove = () => {
    router.push("/");
  };

  return (
    <>
      <button onClick={onClickChange}>변경</button>
      <button onClick={onClickMove}>이동</button>
    </>
  );
}
