import { TitlePane } from "./panes/TitlePane";
import { HomeContentPane } from "./panes/HomeContentPane";
import { FC } from "react";

interface HomeProps {
  handleClick: () => void;
}

export const Home: FC<HomeProps> = ({ handleClick }) => (
  <div>
    <TitlePane />
    <HomeContentPane handleClick={handleClick} />
  </div>
);
