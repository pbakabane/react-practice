import { useLocation, useParams } from "react-router";

export const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const state = location.state as { from?: string } | null;

  const articleContent = `This is article ${id}`;
  const fromPath = state?.from ?? "";

  const isFromArticle = fromPath.startsWith("/article");

  const lastSegment = isFromArticle ? (fromPath.split("/").filter(Boolean).pop() ?? "") : "";

  return (
    <div style={{ padding: "20px" }}>
      <p>{articleContent}</p>
      {isFromArticle && lastSegment && <p style={{ color: "gray", fontSize: "12px" }}>from: {lastSegment}</p>}
    </div>
  );
};
