import { FC } from "react";
import { TitlePane } from "./panes/TitlePane";
import { ArticleContentPane } from "./panes/ArticleContentPane";

interface ArticleProps {
  articleIds: number[];
  handleClick: (id: number) => void;
}

export const Article: FC<ArticleProps> = ({ articleIds, handleClick }) => (
  <div>
    <TitlePane />
    <ArticleContentPane articleIds={articleIds} handleClick={handleClick} />
  </div>
);
