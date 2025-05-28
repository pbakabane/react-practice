import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ArticleContainer } from "../ArticleContainer";
import { FC } from "react";
import { BrowserRouter } from "react-router";

const mockedNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockedNavigate
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

  test("ボタンがすべて表示されていること", () => {
    [1, 2, 3, 4, 5].forEach((id) => {
      expect(screen.getByRole("button", { name: `Article ${id}` })).toBeInTheDocument();
    });
  });

  test("ボタンをクリックするとnavigateが呼ばれること", async () => {
    await waitFor(async () => await userEvent.click(screen.getByRole("button", { name: "Article 2" })));
    expect(mockedNavigate).toHaveBeenCalledWith(
      "/article/2",
      expect.objectContaining({
        state: expect.objectContaining({ from: expect.any(String) })
      })
    );
  });
});
