import { useQuery } from "@tanstack/react-query";
import { getPosts } from "./api";

export default function HomePage() {
  const {
    data,
    status,
    isPending,
    isSuccess,
    isError,
    fetchStatus,
    isFetching,
    isPaused,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  console.log(data);
  console.log(status);
  console.log(fetchStatus);

  return <div>홈페이지</div>;
}
