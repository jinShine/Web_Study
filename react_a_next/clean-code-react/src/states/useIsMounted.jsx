const { useEffect, useRef } = require("react");

function useInMounted() {
  const isMount = useRef(false);

  useEffect(() => {
    isMount.current = true;

    return () => (isMount.current = false);
  }, []);

  return isMount;
}
