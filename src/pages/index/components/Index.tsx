import { FC } from "react";
import { TitlePane } from "./panes/TitlePane";
import { IndexContentPane } from "./panes/IndexContentPane";

interface IndexProps {
  onClickHome: () => void;
  onClickPosts: () => void;
  onClickArticle: () => void;
}

export const Index: FC<IndexProps> = ({ onClickHome, onClickPosts, onClickArticle }) => (
  <div>
    <TitlePane />
    <IndexContentPane onClickHome={onClickHome} onClickPosts={onClickPosts} onClickArticle={onClickArticle} />
  </div>
);
