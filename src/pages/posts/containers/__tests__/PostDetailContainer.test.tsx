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
    const body: string = "本文です";
    beforeEach(() => {
      mockedUseLocation.mockReturnValue({
        state: { id: 1, title: "タイトル", body }
      });
      render(<Wrapper />);
    });

    test("PostDetailにbodyが渡されて表示されていること", () => {
      expect(screen.getByText(body)).toBeInTheDocument();
    });
    test("LoadingPaneが表示されていないこと", () => {
      expect(screen.queryByText("loading...")).not.toBeInTheDocument();
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
