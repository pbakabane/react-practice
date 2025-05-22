import { FC } from "react";
import { Button } from "../../../../parts/Button";

interface ReloadPaneProps {
  onClickReload: () => void;
}

export const ReloadPane: FC<ReloadPaneProps> = ({ onClickReload }) => (
  <div style={{ marginBottom: "10px" }}>
    <Button label='リロード' onClick={() => onClickReload()} />
  </div>
);
