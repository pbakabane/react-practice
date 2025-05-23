import { Routes, Route } from "react-router";
import { Index } from "../pages/Index";
import { Home } from "../pages/Home";
import { PostsContainer } from "../pages/posts/containers/PostsContainer";
import { PostDetailContainer } from "../pages/posts/containers/PostDetailContainer";
import { ArticleDetailContainer } from "../pages/article/containers/ArticleDetailContainer";
import { ArticleContainer } from "../pages/article/containers/ArticleContainer";

export const Router: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Index />} />
      <Route path='/home' element={<Home />} />
      <Route path='/posts' element={<PostsContainer />}>
        <Route path=':id' element={<PostDetailContainer />} />
      </Route>
      <Route path='/article' element={<ArticleContainer />}>
        <Route path=':id' element={<ArticleDetailContainer />} />
      </Route>
    </Routes>
  );
};
