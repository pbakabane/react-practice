import { render, screen } from "@testing-library/react";
import { ErrorPane } from "../ErrorPane";

describe("ErrorPaneのテスト", () => {
  beforeEach(() => render(<ErrorPane />));

  test("「エラーです」という文字列が表示されていること", () => {
    expect(screen.getByText("エラーです")).toBeInTheDocument();
  });

  test("文字色が赤であること", () => {
    expect(screen.getByText("エラーです")).toHaveStyle("color: red");
  });
});
