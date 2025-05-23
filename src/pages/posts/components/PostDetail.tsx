import { FC } from "react";
import { LoadingPane } from "./panes/LoadingPane";
import { PostBodyPane } from "./panes/PostBodyPane";

interface PostDetailProps {
  body: string | undefined;
}

export const PostDetail: FC<PostDetailProps> = ({ body }) => (body ? <PostBodyPane body={body} /> : <LoadingPane />);
