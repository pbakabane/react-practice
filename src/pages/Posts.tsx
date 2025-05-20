import { useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";

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
    isFetching
  } = useQuery<Post[], Error>({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/err"); //https://jsonplaceholder.typicode.com/posts
      return res.json();
    }
  });

  console.log("https://jsonplaceholder.typicode.com/err"); //実行時URL
  console.log("postsの中身:", posts);
  console.log("errorの中身:", error);

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
        <div style={{ color: "yellow" }}>loading...</div>
      ) : error ? (
        <div style={{ color: "red" }}>エラーです</div>
      ) : (
        posts.map((posts: Post) => (
          <div key={posts.id}>
            <h2 onClick={() => handleClick(posts)}>{posts.title}</h2>
            {selectedPostId === posts.id && <Outlet />}
          </div>
        ))
      )}
    </div>
  );
};
