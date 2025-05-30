import { render, screen } from "@testing-library/react";
import { PostBodyPane } from "../PostBodyPane";

const bodyText = "テスト文章";

describe("PostBodyPaneのテスト", () => {
  beforeEach(() => render(<PostBodyPane body={bodyText} />));

  test("本文の文字列が表示されていること", () => {
    expect(screen.getByText(bodyText)).toBeInTheDocument();
  });

  test("文字色がグレーであること", () => {
    expect(screen.getByText(bodyText)).toHaveStyle("color: gray");
  });

  test("フォントサイズが12pxであること", () => {
    expect(screen.getByText(bodyText)).toHaveStyle("font-size: 12px");
  });
});
