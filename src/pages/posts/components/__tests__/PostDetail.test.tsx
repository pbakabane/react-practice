import { render, screen } from "@testing-library/react";
import { PostDetail } from "../PostDetail";

jest.mock("../panes/PostBodyPane", () => ({
  PostBodyPane: ({ body }: { body: string }) => <div data-testid='post-body'>{body}</div>
}));

jest.mock("../panes/LoadingPane", () => ({
  LoadingPane: () => <div data-testid='loading'>loading...</div>
}));

describe("PostDetailのテスト", () => {
  describe("本文の表示について", () => {
    test.each<string>(["test body 1", "test body 2", "test body 3"])(
      "bodyが'%s'のとき、PostBodyPaneに反映されていること",
      (body) => {
        render(<PostDetail body={body} />);
        expect(screen.getByTestId("post-body")).toHaveTextContent(body);
      }
    );
  });

  describe("ローディング表示について", () => {
    test("bodyがundefinedのとき、LoadingPaneが表示されること", () => {
      render(<PostDetail body={undefined} />);
      expect(screen.getByTestId("loading")).toBeInTheDocument();
    });
  });
});
