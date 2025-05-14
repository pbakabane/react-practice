import { Outlet, useNavigate } from "react-router";

export const Article = () => {
    const navigate = useNavigate();
    const articleIds = [1, 2, 3, 4, 5];

    const handleClick = (id: number) => {
        navigate(`/article/${id}`, {
            state: { from: location.pathname }
        });
    };

    return (
        <div style={{ padding: '20px' }
        }>
            <h2>Here is article! </h2>
            {
                articleIds.map((id) => (
                    <><button
                        key={id}
                        onClick={() => handleClick(id)} style={{ marginRight: '10px' }}
                    > Article {id}
                    </button></>
                ))}
            <Outlet />
        </div>
    );
};
