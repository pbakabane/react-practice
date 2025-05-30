import { render, screen } from "@testing-library/react";
import { PostBodyPane } from "../PostBodyPane";

const bodyText = "テスト文章";

describe("PostBodyPaneのテスト", () => {
  test("本文の文字列が表示されていること", () => {
    render(<PostBodyPane body={bodyText} />);
    expect(screen.getByText(bodyText)).toBeInTheDocument();
  });

  test("文字色がグレーであること", () => {
    render(<PostBodyPane body={bodyText} />);
    const element = screen.getByText(bodyText);
    expect(element).toHaveStyle("color: gray");
  });

  test("フォントサイズが12pxであること", () => {
    render(<PostBodyPane body={bodyText} />);
    const element = screen.getByText(bodyText);
    expect(element).toHaveStyle("font-size: 12px");
  });
});
