import { useLocation } from "react-router";
import { Post } from "../../containers/PostsContainer";

export const PostDetail: React.FC = () => {
  const location = useLocation();
  const post = location.state as Post | undefined;

  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <p style={{ color: "gray", fontSize: "12px" }}>{post.body}</p>
    </div>
  );
};
