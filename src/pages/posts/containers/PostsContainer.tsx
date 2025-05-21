import { JSX, useState } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";

export interface Post {
  id: number;
  title: string;
  body: string;
}

interface RenderProps {
  posts: Post[];
  isFetching: boolean;
  isPending: boolean;
  selectedPostId: number | null;
  onClickPost: (post: Post) => void;
  error: Error | null;
  onRefetch: () => void;
}

export interface Props {
  render: (props: RenderProps) => JSX.Element;
}

export const PostsContainer = ({ render }: Props) => {
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

  return render({
    posts,
    selectedPostId,
    isPending,
    isFetching,
    onClickPost: handleClickPost,
    error: error || null,
    onRefetch: refetch
  });
};
