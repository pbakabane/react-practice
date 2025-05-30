import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PostContentPane } from "../PostContentPane";

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  Outlet: () => <div data-testid='outlet' />
}));

const mockedOnClickPost = jest.fn();
const mockPost = { id: 1, title: "テストタイトル", body: "テスト本文" };

describe("PostContentPaneのテスト", () => {
  beforeEach(() => render(<PostContentPane post={mockPost} selectedPostId={null} onClickPost={mockedOnClickPost} />));
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("postのタイトルが表示されていること", () => {
    expect(screen.getByText(mockPost.title)).toBeInTheDocument();
  });

  test("タイトルクリックでonClickPostが呼ばれること", async () => {
    await waitFor(async () => await userEvent.click(screen.getByText(mockPost.title)));
    expect(mockedOnClickPost).toHaveBeenCalledWith(mockPost);
  });

  describe("PostContentPaneのテスト", () => {
    test("selectedPostIdがpost.idと等しい場合にOutletが表示されること", () => {
      render(<PostContentPane post={mockPost} selectedPostId={1} onClickPost={mockedOnClickPost} />);
      expect(screen.getByTestId("outlet")).toBeInTheDocument();
    });

    test("selectedPostIdがpost.idと異なる場合にOutletが表示されないこと", () => {
      render(<PostContentPane post={mockPost} selectedPostId={999} onClickPost={mockedOnClickPost} />);
      expect(screen.queryByTestId("outlet")).not.toBeInTheDocument();
    });
  });
});
