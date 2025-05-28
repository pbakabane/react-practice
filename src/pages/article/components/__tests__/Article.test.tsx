import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Article } from "../Article";

const mockedHandleClick = jest.fn();
const articleIds: number[] = [1, 2];

describe("Articleのテスト", () => {
  beforeEach(() => render(<Article articleIds={[1, 2, 3]} handleClick={mockedHandleClick} />));
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  test("タイトルが表示されていること", () => {
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("Here is article!");
  });

  test.each<number>(articleIds)("「Article %i」ボタンが表示されていること", (id) => {
    expect(screen.getByRole("button", { name: `Article ${id}` })).toBeInTheDocument();
  });

  test.each<number>(articleIds)("「Article %i」ボタンを押下するとhandleClickがコールされること", async (id) => {
    await waitFor(() => userEvent.click(screen.getByRole("button", { name: `Article ${id}` })));
    expect(mockedHandleClick).toHaveBeenCalledWith(id);
  });
});
