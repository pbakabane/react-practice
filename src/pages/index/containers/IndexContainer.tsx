import { useNavigate } from "react-router";
import { Index } from "../components/Index";

export const IndexContainer = () => {
  const navigate = useNavigate();

  const onClickHome = () => {
    navigate("/home");
  };

  const onClickPosts = () => {
    navigate("/posts");
  };
  const onClickArticle = () => {
    navigate("/article");
  };

  return <Index onClickHome={onClickHome} onClickPosts={onClickPosts} onClickArticle={onClickArticle} />;
};
