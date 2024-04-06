import { useRouter } from "next/router";
import { useEffect } from "react";

export const withAuth = (Component) => (props: any) => {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      alert("로그인 후 이용가능합니다.");
      router.back();
    }

    return () => {
      localStorage.removeItem("accessToken");
    };
  }, []);

  return <Component {...props} />;
};
