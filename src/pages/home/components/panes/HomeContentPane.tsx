import { FC } from "react";
import { Button } from "../../../../parts/Button";

interface HomeContentPaneProps {
  handleClick: () => void;
}

export const HomeContentPane: FC<HomeContentPaneProps> = ({ handleClick }) => (
  <div>
    <Button label='to index' onClick={() => handleClick()} />
  </div>
);
