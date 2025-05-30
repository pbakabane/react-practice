import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Posts } from "../Posts";
import { Post } from "../../containers/PostsContainer";

const mockPosts: Post[] = [
  { id: 1, title: "Post 1", body: "Body 1" },
  { id: 2, title: "Post 2", body: "Body 2" }
];

const mockOnClickPost = jest.fn();
const mockOnClickReload = jest.fn();

describe("Postsコンポーネントのテスト", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("isFetchingがtruthyならLoadingPaneが表示される", () => {
    render(
      <Posts
        posts={[]}
        isFetching={true}
        isPending={false}
        selectedPostId={null}
        error={null}
        onClickPost={mockOnClickPost}
        onClickReload={mockOnClickReload}
      />
    );
    expect(screen.getByText("loading...")).toBeInTheDocument();
  });
  test("isPendingがtruthyならLoadingPaneが表示される", () => {
    render(
      <Posts
        posts={[]}
        isFetching={false}
        isPending={true}
        selectedPostId={null}
        error={null}
        onClickPost={mockOnClickPost}
        onClickReload={mockOnClickReload}
      />
    );
    expect(screen.getByText("loading...")).toBeInTheDocument();
  });
});
test("isFetching,isPendingがどちらもtruthyならLoadingPaneが表示される", () => {
  render(
    <Posts
      posts={[]}
      isFetching={true}
      isPending={true}
      selectedPostId={null}
      error={null}
      onClickPost={mockOnClickPost}
      onClickReload={mockOnClickReload}
    />
  );
  expect(screen.getByText("loading...")).toBeInTheDocument();
});
test("エラーがある場合ErrorPaneが表示される", () => {
  render(
    <Posts
      posts={[]}
      isFetching={false}
      isPending={false}
      selectedPostId={null}
      error={new Error("test error")}
      onClickPost={mockOnClickPost}
      onClickReload={mockOnClickReload}
    />
  );
  expect(screen.getByText("エラーです")).toBeInTheDocument();
});

describe("エラーでもロード中でもない通常時について", () => {
  beforeEach(() => {
    render(
      <Posts
        posts={mockPosts}
        isFetching={false}
        isPending={false}
        selectedPostId={null}
        error={null}
        onClickPost={mockOnClickPost}
        onClickReload={mockOnClickReload}
      />
    );
  });

  test.each<Post>(mockPosts)("PostContentPaneがpostsの分だけ表示される", (post) => {
    expect(screen.getByRole("heading", { name: post.title })).toBeInTheDocument();
  });

  test.each<Post>(mockPosts)("PostContentPaneのタイトル「%s」をクリックするとonClickPostが呼ばれる", async (post) => {
    const postTitle = screen.getByText(post.title);
    await waitFor(() => userEvent.click(postTitle));
    expect(mockOnClickPost).toHaveBeenCalledWith(post);
  });

  test("ReloadPaneのリロードボタンが表示される", () => {
    const reloadButton = screen.getByRole("button", { name: /リロード/i });
    expect(reloadButton).toBeInTheDocument();
  });

  test("リロードボタンをクリックするとonClickReloadが呼ばれる", async () => {
    const reloadButton = screen.getByRole("button", { name: /リロード/i });
    await waitFor(() => userEvent.click(reloadButton));
    expect(mockOnClickReload).toHaveBeenCalledTimes(1);
  });
});
