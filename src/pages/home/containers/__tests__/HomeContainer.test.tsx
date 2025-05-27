import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HomeContainer } from "../HomeContainer";
import { FC } from "react";
import { BrowserRouter } from "react-router";

// react-routerのモジュールをモック
const mockedNavigate = jest.fn();
jest.mock("react-router", () => ({ ...jest.requireActual("react-router"), useNavigate: () => mockedNavigate }));

// BrowserRouter でラップ
const Wrapper: FC = () => (
  <BrowserRouter>
    <HomeContainer />
  </BrowserRouter>
);

describe("HomeContainerのテスト", () => {
  beforeEach(() => render(<Wrapper />));
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  describe("画面の表示について", () => {
    describe("TitlePaneの内容について", () => {
      test("表示されていること", () => {
        expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("Here is home!");
      });
    });

    describe("HomeContentPaneの内容について", () => {
      describe("「to index」ボタンについて", () => {
        test("表示されていること", () => {
          expect(screen.getByRole("button", { name: "to index" })).toBeInTheDocument();
        });

        test("クリックすると、navigateが「/」を引数に1度コールされること", async () => {
          await waitFor(async () => await userEvent.click(screen.getByRole("button", { name: "to index" })));
          expect(mockedNavigate).toHaveBeenNthCalledWith(1, "/");
        });
      });
    });
  });
});
