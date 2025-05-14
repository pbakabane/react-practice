import { useNavigate } from "react-router";
import { Button } from "../parts/Button";

export const Home = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Here is home!</h2>
            <Button label="to index" onClick={handleClick} />
        </div>
    );
};


