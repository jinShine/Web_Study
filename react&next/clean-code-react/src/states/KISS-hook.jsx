// Keep Is Simple Stupid

import { useEffect, useState } from "react";

// 연관 되어 있는 상태 단순화 하기
function KISS() {
  const { isLoading, isSuccess, isError } = useFetch(url);

  if (isLoading) {
  }
  if (isSuccess) {
  }
  if (isError) {
  }

  return <></>;
}

function useFetch(url) {
  const [fetchState, setFetchState] = useState({
    isLoading: false,
    isSuccess: false,
    isError: false,
  });

  const fetchData = () => {
    setFetchState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));

    fetch(url)
      .then(() => {
        setFetchState((prevState) => ({
          ...prevState,
          isSuccess: true,
        }));
      })
      .catch(() => {
        setFetchState((prevState) => ({
          ...prevState,
          isError: true,
        }));
      });
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return fetchState;
}

function ParentComponent({
  관련없는_props,
  관련있는_props_1,
  관련있는_props_2,
  ...나머지_props
}) {
  관련없는_props;

  return (
    <ChildComponent
      관련있는_props_1={관련있는_props_1}
      관련있는_props_2={관련있는_props_2}
      {...나머지_props}
    />
  );
}

function ChildComponent({ 관련있는_props_1, 관련있는_props_2, ...props }) {}

// const UserInfo = ({ user }) => {
//   return <div>
//     <img src={user.url} />
//     <h3>{user.name}</h3>
//     <h4>{user.email}</h4>
//   </div>
// }

function Component() {
  /** 순서 */

  const isHold = false; // 기본 변수

  const ref = useRef(null); // Ref

  // third party
  const location = useLocation;
  const queryClient = useQueryClient();

  // custom hooks
  const state = useCustomHooks();

  // hooks
  const state = useState();

  // event
  const onClose = () => handleClose();

  // Early Return JSX
  if (isHold) {
    return null;
  }

  // Main JSX와 가장 가까운 곳에 위치 (useEffect)
  useEffect(() => {}, []);

  // JSX
  return <></>;
}

// Styles
const Button = styled.button``;

const TestComponent = () => {
  return <>Hi, Buzz</>;
};
