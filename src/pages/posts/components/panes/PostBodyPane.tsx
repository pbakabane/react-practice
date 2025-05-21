import { FC } from "react";

interface PostBodyPaneProps {
  body: string;
}

export const PostBodyPane: FC<PostBodyPaneProps> = ({ body }) => (
  <div>
    <p style={{ color: "gray", fontSize: "12px" }}>{body}</p>
  </div>
);
