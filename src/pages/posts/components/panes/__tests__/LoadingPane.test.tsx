import { render, screen } from "@testing-library/react";
import { LoadingPane } from "../LoadingPane";

describe("LoadingPaneのテスト", () => {
  describe("画面の表示について", () => {
    test("「loading...」が表示されていること", () => {
      render(<LoadingPane />);
      expect(screen.getByText("loading...")).toBeInTheDocument();
    });

    test("文字色が orange であること", () => {
      render(<LoadingPane />);
      expect(screen.getByText("loading...")).toHaveStyle("color: orange");
    });
  });
});
