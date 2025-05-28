import { render, screen } from "@testing-library/react";
import { ArticleDetailContentPane } from "../ArticleDetailContentPane";

describe("ArticleDetailContentPaneのテスト", () => {
  test("記事内容が表示されること", () => {
    render(<ArticleDetailContentPane articleContent='This is article 1' isFromArticle={true} lastSegment='' />);
    expect(screen.getByText("This is article 1")).toBeInTheDocument();
  });

  test("from情報が表示されること", () => {
    render(<ArticleDetailContentPane articleContent='This is article 1' isFromArticle={true} lastSegment='3' />);
    expect(screen.getByText("from: 3")).toBeInTheDocument();
  });

  test("from情報がない場合、表示されないこと", () => {
    render(<ArticleDetailContentPane articleContent='Test' isFromArticle={false} lastSegment='' />);
    expect(screen.queryByText(/from:/)).not.toBeInTheDocument();
  });
});
