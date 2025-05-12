// import { Link } from 'react-router';
import { useNavigate } from 'react-router';
import { Button } from './Button';

export const Index = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/posts');
    };
    return (
        <div style={{ padding: '20px' }}>
            <h2>Here is index!</h2>
            <Button label="to posts" onClick={handleClick} />
        </div>
    );
};

