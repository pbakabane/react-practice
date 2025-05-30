import { render, screen } from "@testing-library/react";
import { ArticleDetail } from "../ArticleDetail";

describe("ArticleDetailのテスト", () => {
  describe("記事内容の表示について", () => {
    test.each<string>(["articleContent1", "articleContent2", "articleContent3"])(
      "propsのarticleContentの内容が反映されていること",
      (articleContent) => {
        render(<ArticleDetail articleContent={articleContent} isFromArticle={true} lastSegment='' />);
        expect(screen.getByText(articleContent)).toBeInTheDocument();
      }
    );
  });

  describe("from情報の表示について", () => {
    test("propsのisFromArticleとlastSegmentがどちらもtruthyな場合、表示されること", () => {
      render(<ArticleDetail articleContent='This is article 1' isFromArticle={true} lastSegment='3' />);
      expect(screen.getByText("from: 3")).toBeInTheDocument();
    });

    test.each<{ isFromArticle: boolean; lastSegment: string }>([
      { isFromArticle: false, lastSegment: "" },
      { isFromArticle: true, lastSegment: "" },
      { isFromArticle: false, lastSegment: "1" }
    ])(
      "propsのisFromArticleとlastSegmentがどちらか片方だけでもfalsyな場合、表示されないこと",
      ({ isFromArticle, lastSegment }) => {
        render(
          <ArticleDetail articleContent='This is article 1' isFromArticle={isFromArticle} lastSegment={lastSegment} />
        );
        expect(screen.queryByText(/from:/)).not.toBeInTheDocument();
      }
    );
  });
});
