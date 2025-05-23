import { useLocation, useParams } from "react-router";
import { ArticleDetail } from "../components/ArticleDetail";

export const ArticleDetailContainer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const state = location.state as { from?: string } | null;

  const articleContent = `This is article ${id}`;
  const fromPath = state?.from ?? "";

  const isFromArticle = fromPath.startsWith("/article");

  const lastSegment = isFromArticle ? (fromPath.split("/").filter(Boolean).pop() ?? "") : "";

  return <ArticleDetail articleContent={articleContent} isFromArticle={isFromArticle} lastSegment={lastSegment} />;
};
