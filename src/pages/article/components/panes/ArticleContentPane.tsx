import { FC } from "react";
import { Outlet } from "react-router";

interface ArticleContentPaneProps {
  articleIds: number[];
  handleClick: (id: number) => void;
}

export const ArticleContentPane: FC<ArticleContentPaneProps> = ({ articleIds, handleClick }) => (
  <div>
    {articleIds.map((id) => (
      <button key={id} onClick={() => handleClick(id)} style={{ marginRight: "10px" }}>
        {" "}
        Article {id}
      </button>
    ))}
    <Outlet />
  </div>
);
