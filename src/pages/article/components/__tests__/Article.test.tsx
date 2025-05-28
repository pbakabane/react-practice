import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Article } from "../Article";

const mockedHandleClick = jest.fn();

describe("Articleのテスト", () => {
  beforeEach(() => render(<Article articleIds={[1, 2, 3]} handleClick={mockedHandleClick} />));
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  test("タイトルが表示されていること", () => {
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("Here is article!");
  });

  test("記事ボタンがすべて表示されていること", () => {
    [1, 2, 3].forEach((id) => {
      expect(screen.getByRole("button", { name: `Article ${id}` })).toBeInTheDocument();
    });
  });

  test("ボタンをクリックするとhandleClickが呼ばれること", async () => {
    await waitFor(() => userEvent.click(screen.getByRole("button", { name: "Article 1" })));
    expect(mockedHandleClick).toHaveBeenCalledWith(1);
  });
});
