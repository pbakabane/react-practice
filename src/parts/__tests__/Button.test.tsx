import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { Button } from "../Button";
import userEvent from "@testing-library/user-event";

describe("Buttonのテスト", () => {
  // onClickに設定するモック関数
  const mockedOnClick = jest.fn();

  // テスト環境に`<Button />`をrenderする関数
  const renderer = ({ label, disabled }: { label: string; disabled?: boolean }) =>
    render(<Button label={label} disabled={disabled} onClick={mockedOnClick} />);

  test("propsのlabelについて、設定した内容がボタンの文言に設定されていること", () => {
    renderer({ label: "ラベル" });
    expect(screen.getByRole("button")).toHaveTextContent("ラベル");
  });

  describe("propsのdisabledについて", () => {
    test("trueの場合、ボタンが非活性であること", () => {
      renderer({ label: "ラベル", disabled: true });
      expect(screen.getByRole("button")).toBeDisabled();
    });
    test("falseの場合、ボタンが活性であること", () => {
      renderer({ label: "ラベル", disabled: false });
      expect(screen.getByRole("button")).not.toBeDisabled();
    });
  });

  test("propsのonClickについてボタンをクリックするとコールされること", async () => {
    renderer({ label: "ラベル" });
    await waitFor(async () => await userEvent.click(screen.getByRole("button")));
    expect(mockedOnClick).toHaveBeenCalledTimes(1);
  });
});
