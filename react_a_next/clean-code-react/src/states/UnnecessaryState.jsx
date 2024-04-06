const { useEffect } = require("react");

function UnnecessaryState() {
  // const [isLogin, setIsLogin] = useState(false);

  // useEffect(() => {
  //   if (isValidToken && hasToken) {
  //     setIsLogin(true);
  //   }
  // }, []);

  const isLogin = isValidToken && hasToken;

  return <>s</>;
}
