import { FC } from "react";
import { Button } from "../../../../parts/Button";

interface IndexContentPaneProps {
  onClickHome: () => void;
  onClickPosts: () => void;
  onClickArticle: () => void;
}

export const IndexContentPane: FC<IndexContentPaneProps> = ({ onClickHome, onClickPosts, onClickArticle }) => (
  <div>
    <Button label='to home' onClick={() => onClickHome()} />
    <Button label='to posts' onClick={() => onClickPosts()} />
    <Button label='to article' onClick={() => onClickArticle()} />
  </div>
);
