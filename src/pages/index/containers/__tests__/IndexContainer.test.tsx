import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IndexContainer } from "../IndexContainer";
import { FC } from "react";
import { BrowserRouter } from "react-router";

// IndexContainer.tsxで用いているreact-routerのモジュールをモック
const mockedNavigate = jest.fn();
jest.mock("react-router", () => ({ ...jest.requireActual("react-router"), useNavigate: () => mockedNavigate }));

// `<BrowserRouter />`で`<IndexContainer />`をラップすることで、react-routerを有効化
const Wrapper: FC = () => (
  <BrowserRouter>
    <IndexContainer />
  </BrowserRouter>
);

describe("IndexContainerのテスト", () => {
  beforeEach(() => render(<Wrapper />));
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
        test("クリックすると、navigateが「/home」を引数に1度コールされること", async () => {
          await waitFor(async () => await userEvent.click(screen.getByRole("button", { name: "to home" })));
          expect(mockedNavigate).toHaveBeenNthCalledWith(1, "/home");
        });
      });
      describe("「to posts」ボタンについて", () => {
        test("表示されていること", () => {
          expect(screen.getByRole("button", { name: "to posts" })).toBeInTheDocument();
        });
        test("クリックすると、navigateが「/posts」を引数に1度コールされること", async () => {
          await waitFor(async () => await userEvent.click(screen.getByRole("button", { name: "to posts" })));
          expect(mockedNavigate).toHaveBeenNthCalledWith(1, "/posts");
        });
      });
      describe("「to article」ボタンについて", () => {
        test("表示されていること", () => {
          expect(screen.getByRole("button", { name: "to article" })).toBeInTheDocument();
        });
        test("クリックすると、navigateが「/article」を引数に1度コールされること", async () => {
          await waitFor(async () => await userEvent.click(screen.getByRole("button", { name: "to article" })));
          expect(mockedNavigate).toHaveBeenNthCalledWith(1, "/article");
        });
      });
    });
  });
});
