import { render, screen, waitFor } from "@testing-library/react";
import { PostsContainer } from "../PostsContainer";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import userEvent from "@testing-library/user-event";
import { Post } from "../PostsContainer";

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: jest.fn()
}));

jest.mock("@tanstack/react-query", () => {
  const originalModule = jest.requireActual("@tanstack/react-query");
  return {
    ...originalModule,
    useQuery: jest.fn()
  };
});

const mockNavigate = jest.fn();
const mockRefetch = jest.fn();

const mockPosts: Post[] = [
  { id: 1, title: "Post 1", body: "Body 1" },
  { id: 2, title: "Post 2", body: "Body 2" }
];

describe("PostsContainerのテスト", () => {
  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useQuery as jest.Mock).mockReturnValue({
      data: mockPosts,
      isFetching: false,
      isPending: false,
      error: null,
      refetch: mockRefetch
    });
  });

  test("ポスト一覧が表示されること", () => {
    render(<PostsContainer />);
    mockPosts.forEach((post) => {
      expect(screen.getByText(post.title)).toBeInTheDocument();
    });
  });

  test("投稿タイトルをクリックするとnavigateが呼ばれること", async () => {
    render(<PostsContainer />);
    const postTitle = screen.getByText(mockPosts[0].title);
    await userEvent.click(postTitle);
    expect(mockNavigate).toHaveBeenCalledWith(`/posts/${mockPosts[0].id}`, { state: mockPosts[0] });
  });

  test("リロードボタンをクリックするとrefetchが呼ばれること", async () => {
    render(<PostsContainer />);
    const reloadButton = screen.getByRole("button", { name: /リロード/i });
    await waitFor(() => userEvent.click(reloadButton));
    expect(mockRefetch).toHaveBeenCalled();
  });

  test("ローディング状態の場合にLoadingPaneが表示されること", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: [],
      isFetching: true,
      isPending: false,
      error: null,
      refetch: mockRefetch
    });
    render(<PostsContainer />);
    expect(screen.getByText("loading...")).toBeInTheDocument();
  });

  test("エラー状態の場合にErrorPaneが表示されること", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: [],
      isFetching: false,
      isPending: false,
      error: new Error("fetch failed"),
      refetch: mockRefetch
    });
    render(<PostsContainer />);
    expect(screen.getByText("エラーです")).toBeInTheDocument();
  });
});
