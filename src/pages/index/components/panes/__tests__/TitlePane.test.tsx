import { render, screen } from "@testing-library/react";
import { TitlePane } from "../TitlePane";

describe("TitlePaneのテスト", () => {
  describe("画面の表示について", () => {
    test("「Here is index!」がh3タグに表示されていること", () => {
      render(<TitlePane />);
      expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("Here is index!");
    });
  });
});
