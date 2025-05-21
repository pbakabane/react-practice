import { useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../parts/Button";

export interface Post {
  id: number;
  title: string;
  body: string;
}

export const Posts = () => {
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

  const handleClick = (posts: Post) => {
    setSelectedPostId(posts.id);
    navigate(`/posts/${posts.id}`, {
      state: posts
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h3>Here is posts!</h3>

      {isFetching || isPending ? (
        <div style={{ color: "orange" }}>loading...</div>
      ) : error ? (
        <div style={{ color: "red" }}>エラーです</div>
      ) : (
        <>
          <div style={{ marginBottom: "10px" }}>
            <Button label='リロード' onClick={() => refetch()} />
          </div>
          {posts.map((post: Post) => (
            <div key={post.id}>
              <h2 onClick={() => handleClick(post)}>{post.title}</h2>
              {selectedPostId === post.id && <Outlet />}
            </div>
          ))}
        </>
      )}
    </div>
  );
};
