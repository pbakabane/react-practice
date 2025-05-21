import { Routes, Route } from "react-router";
import { Index } from "../pages/Index";
import { Home } from "../pages/Home";
import { Article } from "../pages/Article";
import { ArticleDetail } from "../pages/article/ArticleDetail";
import { PostsContainer } from "../pages/posts/containers/PostsContainer";
import { PostDetailContainer } from "../pages/posts/containers/PostDetailContainer";

export const Router: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Index />} />
      <Route path='/home' element={<Home />} />
      <Route path='/posts' element={<PostsContainer />}>
        <Route path=':id' element={<PostDetailContainer />} />
      </Route>
      <Route path='/article' element={<Article />}>
        <Route path=':id' element={<ArticleDetail />} />
      </Route>
    </Routes>
  );
};
