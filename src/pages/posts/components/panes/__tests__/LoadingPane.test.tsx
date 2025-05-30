import { render, screen } from "@testing-library/react";
import { LoadingPane } from "../LoadingPane";

describe("LoadingPaneのテスト", () => {
  describe("画面の表示について", () => {
    beforeEach(() => render(<LoadingPane />));

    test("「loading...」が表示されていること", () => {
      expect(screen.getByText("loading...")).toBeInTheDocument();
    });

    test("文字色が orange であること", () => {
      expect(screen.getByText("loading...")).toHaveStyle("color: orange");
    });
  });
});
