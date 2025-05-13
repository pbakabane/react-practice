import { Routes, Route } from 'react-router';
import { Index } from './Index';
import { Posts } from './Posts';
import { PostDetail } from './PostDetail';

export const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/posts" element={<Posts />} >
                <Route path=":id" element={<PostDetail />} />
            </Route>
        </Routes >
    );
}