import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
