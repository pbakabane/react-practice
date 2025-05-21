import { Outlet } from "react-router";
import { Button } from "../../../parts/Button";
import { Post, PostsContainer } from "../containers/PostsContainer";

export const Posts = () => {
  return (
    <PostsContainer
      render={({ posts, selectedPostId, isFetching, isPending, error, onClickPost, onRefetch }) => (
        <div style={{ padding: "20px" }}>
          <h3>Here is posts!</h3>

          {isFetching || isPending ? (
            <div style={{ color: "orange" }}>loading...</div>
          ) : error ? (
            <div style={{ color: "red" }}>エラーです</div>
          ) : (
            <>
              <div style={{ marginBottom: "10px" }}>
                <Button label='リロード' onClick={() => onRefetch()} />
              </div>
              {posts.map((post: Post) => (
                <div key={post.id}>
                  <h2 onClick={() => onClickPost(post)}>{post.title}</h2>
                  {selectedPostId === post.id && <Outlet />}
                </div>
              ))}
            </>
          )}
        </div>
      )}
    />
  );
};
