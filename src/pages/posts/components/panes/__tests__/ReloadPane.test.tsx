import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ReloadPane } from "../ReloadPane";

const mockedOnClickReload = jest.fn();

describe("ReloadPaneのテスト", () => {
  beforeEach(() => render(<ReloadPane onClickReload={mockedOnClickReload} />));
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("「リロード」ボタンが表示されていること", () => {
    expect(screen.getByRole("button", { name: "リロード" })).toBeInTheDocument();
  });

  test("「リロード」ボタンを押下するとonClickReloadが1回コールされること", async () => {
    await waitFor(() => userEvent.click(screen.getByRole("button", { name: "リロード" })));
    expect(mockedOnClickReload).toHaveBeenCalledTimes(1);
  });
});
