import { FC } from "react";
import { Post } from "../../containers/PostsContainer";
import { Outlet } from "react-router";

interface PostContentPaneProps {
  post: Post;
  selectedPostId: number | null;
  onClickPost: (post: Post) => void;
}

export const PostContentPane: FC<PostContentPaneProps> = ({ post, selectedPostId, onClickPost }) => (
  <div>
    <h2 onClick={() => onClickPost(post)}>{post.title}</h2>
    {selectedPostId === post.id && <Outlet />}
  </div>
);
