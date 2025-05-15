// import { Link } from 'react-router';
import { useNavigate } from "react-router";
import { Button } from "../parts/Button";

export const Index = () => {
  const navigate = useNavigate();

  const handleClick = (path: string) => {
    navigate(path);
  };
  return (
    <div style={{ padding: "20px" }}>
      <h2>Here is index!</h2>
      <Button label='to home' onClick={() => handleClick("/home")} />
      <Button label='to posts' onClick={() => handleClick("/posts")} />
      <Button label='to article' onClick={() => handleClick("/article")} />
    </div>
  );
};
