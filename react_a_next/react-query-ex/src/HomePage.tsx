import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  UploadPostType,
  getPosts,
  getPostsByUsername,
  uploadPost,
} from "./api";
import { ChangeEvent, FormEvent, FormEventHandler, useState } from "react";

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

  /////////////////////////////////////

  const queryClient = useQueryClient();
  const [content, setContent] = useState("");

  const uploadPostMutation = useMutation({
    mutationFn: (newPost: UploadPostType) => uploadPost(newPost),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newPost: UploadPostType = { username: "helloworld", content };
    uploadPostMutation.mutate(newPost, {
      onSuccess: () => {
        //
      },
    });
    setContent("");
  };

  /////////////////////////////////////

  const { data: userInfo } = useQuery({
    queryKey: ["user", email],
    queryFn: getPostsByEmail,
  });

  const userId = userInfo?.id;

  const { data: projects } = useQuery({
    queryKey: ["projects", userId],
    queryFn: getProjectsByUser,
    enabled: !!userId,
  });

  const likesMutation = useMutation({
    mutationFn: async ({ postId, username, userAction }) => {
      if (userAction === "LIKE_POST") {
        await likePost(postId, username);
      } else {
        await unlikePost(postId, username);
      }
    },
    onMutate: async ({ postId, username, userAction }) => {
      await queryClient.cancelQueries({
        queryKey: ["likeStatus", postId, username],
      });
      await queryClient.cancelQueries({ queryKey: ["likeCount", postId] });
    },
  });

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <textarea
            name="content"
            value={content}
            onChange={handleInputChange}
          />
          <button disabled={!content} type="submit">
            업로드
          </button>
        </form>
      </div>
    </div>
  );
}
