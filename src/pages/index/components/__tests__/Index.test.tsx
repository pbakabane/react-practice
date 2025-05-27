import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Index } from "../Index";

// Index.tsxのpropsをモック
const mockedOnClickHome = jest.fn();
const mockedOnClickPosts = jest.fn();
const mockedOnClickArticle = jest.fn();

describe("Indexのテスト", () => {
  beforeEach(() =>
    render(
      <Index onClickHome={mockedOnClickHome} onClickPosts={mockedOnClickPosts} onClickArticle={mockedOnClickArticle} />
    )
  );
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  describe("画面の表示について", () => {
    describe("TitlePaneの内容について", () => {
      test("表示されていること", () => {
        expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("Here is index!");
      });
    });
    describe("IndexContentPaneの内容について", () => {
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
});
