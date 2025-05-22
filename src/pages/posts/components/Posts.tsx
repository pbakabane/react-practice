import { Post } from "../containers/PostsContainer";
import { LoadingPane } from "./panes/LoadingPane";
import { ErrorPane } from "./panes/ErrorPane";
import { FC } from "react";
import { PostContentPane } from "./panes/PostContentPane";
import { TitlePane } from "./panes/TitlePane";
import { ReloadPane } from "./panes/ReloadPane";

interface PostsProps {
  posts: Post[];
  isFetching: boolean;
  isPending: boolean;
  selectedPostId: number | null;
  error: Error | null;
  onClickPost: (post: Post) => void;
  onClickReload: () => void;
}

export const Posts: FC<PostsProps> = ({
  posts,
  isFetching,
  isPending,
  selectedPostId,
  error,
  onClickPost,
  onClickReload
}) => (
  <div>
    <TitlePane />
    {isFetching || isPending ? (
      <LoadingPane />
    ) : error ? (
      <ErrorPane />
    ) : (
      <>
        <ReloadPane onClickReload={onClickReload} />
        {posts.map((post: Post) => (
          <PostContentPane key={post.id} post={post} selectedPostId={selectedPostId} onClickPost={onClickPost} />
        ))}
      </>
    )}
  </div>
);
