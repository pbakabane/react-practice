import { render, screen } from "@testing-library/react";
import { ErrorPane } from "../ErrorPane";

describe("ErrorPaneのテスト", () => {
  test("「エラーです」という文字列が表示されていること", () => {
    render(<ErrorPane />);
    expect(screen.getByText("エラーです")).toBeInTheDocument();
  });

  test("文字色が赤であること", () => {
    render(<ErrorPane />);
    const element = screen.getByText("エラーです");
    expect(element).toHaveStyle("color: red");
  });
});
