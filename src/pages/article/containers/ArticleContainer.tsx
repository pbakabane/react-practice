import { useLocation, useNavigate } from "react-router";
import { Article } from "../components/Article";

export const ArticleContainer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const articleIds = [1, 2, 3, 4, 5];

  const handleClick = (id: number) => {
    navigate(`/article/${id}`, {
      state: { from: pathname }
    });
  };

  return <Article articleIds={articleIds} handleClick={handleClick} />;
};
