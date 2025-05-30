import { render, screen, waitFor } from "@testing-library/react";
import { PostsContainer } from "../PostsContainer";
import userEvent from "@testing-library/user-event";
import { Post } from "../PostsContainer";

const mockedNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockedNavigate
}));

const mockedUseQuery = jest.fn();
const mockedRefetch = jest.fn();
jest.mock("@tanstack/react-query", () => {
  const originalModule = jest.requireActual("@tanstack/react-query");
  return {
    ...originalModule,
    useQuery: () => mockedUseQuery()
  };
});

const mockPosts: Post[] = [
  { id: 1, title: "Post 1", body: "Body 1" },
  { id: 2, title: "Post 2", body: "Body 2" }
];

describe("PostsContainerのテスト", () => {
  describe("通常状態の表示について", () => {
    beforeEach(() => {
      mockedUseQuery.mockReturnValue({
        data: mockPosts,
        isFetching: false,
        isPending: false,
        error: null,
        refetch: mockedRefetch
      });
      render(<PostsContainer />);
    });

    test.each<Post>(mockPosts)("ポスト一覧(タイトル)が表示されていること", ({ title }) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
    test.each<Post>(mockPosts)("ポストのタイトルをクリックするとnavigateがコールされること", async (post) => {
      await waitFor(async () => await userEvent.click(screen.getByText(post.title)));
      expect(mockedNavigate).toHaveBeenCalledWith(`/posts/${post.id}`, { state: post });
    });
    test("リロードボタンをクリックするとrefetchが呼ばれること", async () => {
      await waitFor(async () => await userEvent.click(screen.getByRole("button", { name: "リロード" })));
      expect(mockedRefetch).toHaveBeenCalledTimes(1);
    });
  });

  describe("ローディング状態の表示について", () => {
    beforeEach(() => {
      mockedUseQuery.mockReturnValue({
        data: [],
        isFetching: true,
        isPending: false,
        error: null,
        refetch: mockedRefetch
      });
      render(<PostsContainer />);
    });

    test("LoadingPaneが表示されること", () => {
      expect(screen.getByText("loading...")).toBeInTheDocument();
    });
  });

  describe("エラー状態の表示について", () => {
    beforeEach(() => {
      mockedUseQuery.mockReturnValue({
        data: [],
        isFetching: false,
        isPending: false,
        error: new Error("fetch failed"),
        refetch: mockedRefetch
      });
      render(<PostsContainer />);
    });

    test("ErrorPaneが表示されること", () => {
      expect(screen.getByText("エラーです")).toBeInTheDocument();
    });
  });
});
