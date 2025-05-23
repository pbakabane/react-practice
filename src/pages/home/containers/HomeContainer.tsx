import { useNavigate } from "react-router";
import { Home } from "../components/Home";

export const HomeContainer = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return <Home handleClick={handleClick} />;
};
