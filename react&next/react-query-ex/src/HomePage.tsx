import { useQuery } from "@tanstack/react-query";
import { getPosts, getPostsByUsername } from "./api";

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
    staleTime: 60 * 1000, //  1분
    gcTime: 60 * 1000 * 10, // 10분
  });

  console.log(data);
  console.log(status);
  console.log(fetchStatus);

  const username = "Buzz";

  const { data: postsDataByUsername } = useQuery({
    queryKey: ["posts", username],
    queryFn: () => getPostsByUsername(username),
  });

  console.log(postsDataByUsername);

  return <div>홈페이지</div>;
}
