import { FC } from "react";

interface ArticleDetailContentPaneProps {
  articleContent: string;
  isFromArticle: boolean;
  lastSegment: string;
}

export const ArticleDetailContentPane: FC<ArticleDetailContentPaneProps> = ({
  articleContent,
  isFromArticle,
  lastSegment
}) => (
  <div style={{ padding: "20px" }}>
    <p>{articleContent}</p>
    {isFromArticle && lastSegment && <p style={{ color: "gray", fontSize: "12px" }}>from: {lastSegment}</p>}
  </div>
);
