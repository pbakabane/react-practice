import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HomeContentPane } from "../HomeContentPane";

const mockedHandleClick = jest.fn();

describe("HomeContentPaneのテスト", () => {
  beforeEach(() => {
    render(<HomeContentPane handleClick={mockedHandleClick} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  describe("画面の表示について", () => {
    describe("「to index」ボタンについて", () => {
      test("表示されていること", () => {
        expect(screen.getByRole("button", { name: "to index" })).toBeInTheDocument();
      });

      test("クリックすると propsのhandleClick が1度コールされること", async () => {
        await waitFor(async () => await userEvent.click(screen.getByRole("button", { name: "to index" })));
        expect(mockedHandleClick).toHaveBeenCalledTimes(1);
      });
    });
  });
});
