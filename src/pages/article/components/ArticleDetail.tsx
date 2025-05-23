import { FC } from "react";
import { ArticleDetailContentPane } from "./panes/ArticleDetailContentPane";

interface ArticleDetailProps {
  articleContent: string;
  isFromArticle: boolean;
  lastSegment: string;
}

export const ArticleDetail: FC<ArticleDetailProps> = ({ articleContent, isFromArticle, lastSegment }) => (
  <ArticleDetailContentPane articleContent={articleContent} isFromArticle={isFromArticle} lastSegment={lastSegment} />
);
