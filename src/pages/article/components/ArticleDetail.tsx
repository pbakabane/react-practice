import { FC } from "react";

interface ArticleDetailProps {
  articleContent: string;
  isFromArticle: boolean;
  lastSegment: string;
}

export const ArticleDetail: FC<ArticleDetailProps> = ({ articleContent, isFromArticle, lastSegment }) => (
  <div style={{ padding: "20px" }}>
    <p>{articleContent}</p>
    {isFromArticle && lastSegment && <p style={{ color: "gray", fontSize: "12px" }}>from: {lastSegment}</p>}
  </div>
);
