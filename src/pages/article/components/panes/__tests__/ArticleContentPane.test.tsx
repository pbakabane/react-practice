import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ArticleContentPane } from "../ArticleContentPane";

const mockedHandleClick = jest.fn();

describe("ArticleContentPaneのテスト", () => {
  beforeEach(() => render(<ArticleContentPane articleIds={[1, 2]} handleClick={mockedHandleClick} />));
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("各記事ボタンが表示されていること", () => {
    expect(screen.getByRole("button", { name: "Article 1" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Article 2" })).toBeInTheDocument();
  });

  test("クリックでhandleClickが呼ばれること", async () => {
    await waitFor(() => userEvent.click(screen.getByRole("button", { name: "Article 1" })));
    expect(mockedHandleClick).toHaveBeenCalledWith(1);
  });
});
