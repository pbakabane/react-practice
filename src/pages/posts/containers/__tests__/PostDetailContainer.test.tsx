import { render, screen } from "@testing-library/react";
import { FC } from "react";
import { BrowserRouter } from "react-router";
import { PostDetailContainer } from "../PostDetailContainer";

const mockedUseLocation = jest.fn();

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useLocation: () => mockedUseLocation()
}));

const Wrapper: FC = () => (
  <BrowserRouter>
    <PostDetailContainer />
  </BrowserRouter>
);

describe("PostDetailContainerのテスト", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("location.stateにpostがある場合", () => {
    beforeEach(() => {
      mockedUseLocation.mockReturnValue({
        state: { id: 1, title: "タイトル", body: "本文です" }
      });
      render(<Wrapper />);
    });

    test("PostDetailにbodyが渡されて表示されていること", () => {
      expect(screen.getByText("本文です")).toBeInTheDocument();
    });
  });

  describe("location.stateがundefinedの場合", () => {
    beforeEach(() => {
      mockedUseLocation.mockReturnValue({ state: undefined });
      render(<Wrapper />);
    });

    test("LoadingPaneが表示されていること", () => {
      expect(screen.getByText("loading...")).toBeInTheDocument();
    });
  });
});
