import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Home } from "../Home";

// モック関数
const mockedHandleClick = jest.fn();

describe("Homeのテスト", () => {
  beforeEach(() => {
    render(<Home handleClick={mockedHandleClick} />);
  });

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
        test("「to index」ボタンをクリックすると handleClick が1度コールされること", async () => {
          await waitFor(async () => await userEvent.click(screen.getByRole("button", { name: "to index" })));
          expect(mockedHandleClick).toHaveBeenCalledTimes(1);
        });
      });
    });
  });
});
