import { render, screen } from "@testing-library/react";
import { FC } from "react";
import { BrowserRouter } from "react-router";
import { ArticleDetailContainer } from "../ArticleDetailContainer";

const mockedUseParams = jest.fn();
const mockedUseLocation = jest.fn();

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useParams: () => mockedUseParams(),
  useLocation: () => mockedUseLocation()
}));

const Wrapper: FC = () => (
  <BrowserRouter>
    <ArticleDetailContainer />
  </BrowserRouter>
);

describe("ArticleDetailContainerのテスト", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("現在 /article/2 で、from が /article/1 の場合", () => {
    mockedUseParams.mockReturnValue({ id: "2" });
    mockedUseLocation.mockReturnValue({ state: { from: "/article/1" } });

    render(<Wrapper />);

    expect(screen.getByText("This is article 2")).toBeInTheDocument();
    expect(screen.getByText("from: 1")).toBeInTheDocument();
  });

  test("現在 /article/1 で、from が / の場合", () => {
    mockedUseParams.mockReturnValue({ id: "1" });
    mockedUseLocation.mockReturnValue({ state: { from: "/" } });

    render(<Wrapper />);

    expect(screen.getByText("This is article 1")).toBeInTheDocument();
    expect(screen.queryByText(/^from:/)).not.toBeInTheDocument();
  });
});
