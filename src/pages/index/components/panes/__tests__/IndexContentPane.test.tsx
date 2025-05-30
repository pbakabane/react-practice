import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IndexContentPane } from "../IndexContentPane";

// IndexContentPane.tsxのpropsをモック
const mockedOnClickHome = jest.fn();
const mockedOnClickPosts = jest.fn();
const mockedOnClickArticle = jest.fn();

describe("IndexContentPaneのテスト", () => {
  beforeEach(() =>
    render(
      <IndexContentPane
        onClickHome={mockedOnClickHome}
        onClickPosts={mockedOnClickPosts}
        onClickArticle={mockedOnClickArticle}
      />
    )
  );
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  describe("画面の表示について", () => {
    describe("「to home」ボタンについて", () => {
      test("表示されていること", () => {
        expect(screen.getByRole("button", { name: "to home" })).toBeInTheDocument();
      });
      test("クリックすると、propsのonClickHomeが1度コールされること", async () => {
        await waitFor(async () => await userEvent.click(screen.getByRole("button", { name: "to home" })));
        expect(mockedOnClickHome).toHaveBeenCalledTimes(1);
      });
    });
    describe("「to posts」ボタンについて", () => {
      test("表示されていること", () => {
        expect(screen.getByRole("button", { name: "to posts" })).toBeInTheDocument();
      });
      test("クリックすると、propsのonClickPostsが1度コールされること", async () => {
        await waitFor(async () => await userEvent.click(screen.getByRole("button", { name: "to posts" })));
        expect(mockedOnClickPosts).toHaveBeenCalledTimes(1);
      });
    });
    describe("「to article」ボタンについて", () => {
      test("表示されていること", () => {
        expect(screen.getByRole("button", { name: "to article" })).toBeInTheDocument();
      });
      test("クリックすると、propsのonClickArticleが1度コールされること", async () => {
        await waitFor(async () => await userEvent.click(screen.getByRole("button", { name: "to article" })));
        expect(mockedOnClickArticle).toHaveBeenCalledTimes(1);
      });
    });
  });
});
