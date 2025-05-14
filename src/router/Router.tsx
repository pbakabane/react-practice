import { Routes, Route } from 'react-router';
import { Index } from '../pages/Index';
import { Posts } from '../pages/Posts';
import { PostDetail } from '../pages/posts/PostDetail';

export const Router: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/posts" element={<Posts />} >
                <Route path=":id" element={<PostDetail />} />
            </Route>
        </Routes >
    );
}