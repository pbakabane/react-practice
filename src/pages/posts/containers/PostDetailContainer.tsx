import { FC } from "react";
import { useLocation } from "react-router";
import { Post } from "./PostsContainer";
import { PostDetail } from "../components/PostDetail";

export const PostDetailContainer: FC = () => {
  const post = useLocation().state as Post | undefined;

  return <PostDetail body={post?.body} />;
};
