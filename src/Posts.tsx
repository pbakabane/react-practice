import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';

export interface Post {
    id: number;
    title: string;
    body: string;
}

export const Posts = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const navigate = useNavigate();
    const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res => res.json())
            .then(data => setPosts(data))
            .catch(err => console.error(err));
    }, []);

    const handleClick = (post: Post) => {
        setSelectedPostId(post.id);
        navigate(`/posts/${post.id}`, {
            state: post,
        });
    };

    return (
        <div style={{ padding: '20px' }}>
            <h3>Here is posts!</h3>
            {posts.map((post: any) => (
                <div key={post.id}>
                    <h2
                        onClick={() => handleClick(post)}
                    >
                        {post.title}
                    </h2>
                    {selectedPostId === post.id && (
                        <Outlet />
                        // <p style={{ color: 'gray' }}>{post.body}</p>
                    )}
                </div>
            ))
            }
        </div >
    );
};
