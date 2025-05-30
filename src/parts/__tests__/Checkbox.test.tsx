import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { Checkbox } from "../Checkbox";
import userEvent from "@testing-library/user-event";

describe("Checkboxのテスト", () => {
  // onChangeに設定するモック関数
  const mockedOnChange = jest.fn();

  // テスト環境に`<Checkbox />`をrenderする関数
  const renderer = ({ isChecked }: { isChecked: boolean }) =>
    render(<Checkbox isChecked={isChecked} onChange={mockedOnChange} />);

  describe("propsのisCheckedについて", () => {
    test("trueの場合、チェックが入っていること", () => {
      renderer({ isChecked: true });
      expect(screen.getByRole("checkbox")).toBeChecked();
    });

    test("falseの場合、チェックが外れていること", () => {
      renderer({ isChecked: false });
      expect(screen.getByRole("checkbox")).not.toBeChecked();
    });
  });

  test("propsのonChangeについてチェックボックスをクリックするとコールされること", async () => {
    renderer({ isChecked: false });
    await waitFor(async () => await userEvent.click(screen.getByRole("checkbox")));
    expect(mockedOnChange).toHaveBeenNthCalledWith(1, true);
  });
});
