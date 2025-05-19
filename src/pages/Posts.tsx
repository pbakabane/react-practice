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

  const { data: posts = [] } = useQuery<Post[], Error>({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      if (!res.ok) throw new Error("Failed to fetch posts");
      return res.json();
    }
  });

  const handleClick = (post: Post) => {
    setSelectedPostId(post.id);
    navigate(`/posts/${post.id}`, {
      state: post
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h3>Here is posts!</h3>
      {posts.map((post: Post) => (
        <div key={post.id}>
          <h2 onClick={() => handleClick(post)}>{post.title}</h2>
          {selectedPostId === post.id && (
            <Outlet />
            // <p style={{ color: 'gray' }}>{post.body}</p>
          )}
        </div>
      ))}
    </div>
  );
};
