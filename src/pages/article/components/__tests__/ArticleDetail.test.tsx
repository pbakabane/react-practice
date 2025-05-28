import { render, screen } from "@testing-library/react";
import { ArticleDetail } from "../ArticleDetail";

describe("ArticleDetailのテスト", () => {
  beforeEach(() => render(<ArticleDetail articleContent='This is article 3' isFromArticle={true} lastSegment='2' />));

  test("記事内容が表示されていること", () => {
    expect(screen.getByText("This is article 3")).toBeInTheDocument();
  });

  test("from情報が表示されていること", () => {
    expect(screen.getByText("from: 2")).toBeInTheDocument();
  });
});
