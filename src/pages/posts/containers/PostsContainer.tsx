import { useState } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Posts } from "../components/Posts";

export interface Post {
  id: number;
  title: string;
  body: string;
}

export const PostsContainer = () => {
  const navigate = useNavigate();
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  const {
    data: posts = [],
    error,
    isPending,
    isFetching,
    refetch
  } = useQuery<Post[], Error>({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      if (!res.ok) {
        throw new Error();
      }
      return res.json();
    }
  });

  const handleClickPost = (posts: Post) => {
    setSelectedPostId(posts.id);
    navigate(`/posts/${posts.id}`, {
      state: posts
    });
  };

  const handleClickReload = () => refetch();

  return (
    <Posts
      posts={posts}
      isFetching={isFetching}
      isPending={isPending}
      selectedPostId={selectedPostId}
      error={error}
      onClickPost={handleClickPost}
      onClickReload={handleClickReload}
    />
  );
};
