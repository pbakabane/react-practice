import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ArticleContainer } from "../ArticleContainer";
import { FC } from "react";
import { BrowserRouter } from "react-router";

const mockedNavigate = jest.fn();
const pathname: string = "/article";
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockedNavigate,
  useLocation: () => ({ pathname })
}));

const Wrapper: FC = () => (
  <BrowserRouter>
    <ArticleContainer />
  </BrowserRouter>
);

describe("ArticleContainerのテスト", () => {
  beforeEach(() => render(<Wrapper />));
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  test.each<number>([1, 2, 3, 4, 5])("「Article %i」ボタンが表示されていること", (id) => {
    expect(screen.getByRole("button", { name: `Article ${id}` })).toBeInTheDocument();
  });

  test.each<number>([1, 2, 3, 4, 5])("「Article %i」ボタンを押下するとnavigateがコールされること", async (id) => {
    await waitFor(async () => await userEvent.click(screen.getByRole("button", { name: `Article ${id}` })));
    expect(mockedNavigate).toHaveBeenCalledWith(`/article/${id}`, { state: { from: pathname } });
  });
});
