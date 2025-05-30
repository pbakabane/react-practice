import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ArticleContentPane } from "../ArticleContentPane";

const mockedHandleClick = jest.fn();
const articleIds: number[] = [1, 2];

describe("ArticleContentPaneのテスト", () => {
  beforeEach(() => render(<ArticleContentPane articleIds={[1, 2]} handleClick={mockedHandleClick} />));
  afterEach(() => {
    jest.clearAllMocks();
  });

  test.each<number>(articleIds)("「Article %i」ボタンが表示されていること", (id) => {
    expect(screen.getByRole("button", { name: `Article ${id}` })).toBeInTheDocument();
  });

  test.each<number>(articleIds)("「Article %i」ボタンを押下するとhandleClickがコールされること", async (id) => {
    await waitFor(async () => await userEvent.click(screen.getByRole("button", { name: `Article ${id}` })));
    expect(mockedHandleClick).toHaveBeenCalledWith(id);
  });
});
