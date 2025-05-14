import type { FC } from "react";

interface ButtonProps {
    /**
     * ボタンに表示される文言
     * @type {string}
     */
    label: string;

    /**
     * 活性・非活性
     * @type {boolean}
     */
    disabled?: boolean;

    /**
     * クリック時の処理
     * @returns {void}
     */
    onClick: () => void;
}

export const Button: FC<ButtonProps> = ({ label, disabled = false, onClick }) => (
    <button disabled={disabled} onClick={() => onClick()}>
        {label}
    </button>
);