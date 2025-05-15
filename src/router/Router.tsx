import { Routes, Route } from "react-router";
import { Index } from "../pages/Index";
import { Home } from "../pages/Home";
import { Posts } from "../pages/Posts";
import { PostDetail } from "../pages/posts/PostDetail";
import { Article } from "../pages/Article";
import { ArticleDetail } from "../pages/article/ArticleDetail";

export const Router: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Index />} />
      <Route path='/home' element={<Home />} />
      <Route path='/posts' element={<Posts />}>
        <Route path=':id' element={<PostDetail />} />
      </Route>
      <Route path='/article' element={<Article />}>
        <Route path=':id' element={<ArticleDetail />} />
      </Route>
    </Routes>
  );
};
