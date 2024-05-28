// Lib
// Api
// Hooks
// Actions
// Selectors
// Types
// Theme
// Constants
// Helpers
// Utils
// Icons
// Layouts
// Components
// Styled

import { Tooltip } from "components";
import { useNotification } from "hooks";
import { ContentCopyIcon } from "icons";
import { FC } from "react";
import { Button } from "./styled";

export interface CopyToClipBoardProps {
  tooltipTitle?: string;
  data: string;
}

export const CopyToClipBoard: FC<CopyToClipBoardProps> = ({
  tooltipTitle,
  data,
}) => {
  const { openNotification } = useNotification();

  const handleCopyToClipBoard = async () => {
    try {
      await navigator.clipboard.writeText(data);
      openNotification({ message: "Copied to clipboard" });
    } catch (error) {
      openNotification({ message: "Something went wrong", type: "error" });
    }
  };

  return (
    <Tooltip title={tooltipTitle || "Copy to clipboard"}>
      <Button onClick={handleCopyToClipBoard}>
        <ContentCopyIcon />
      </Button>
    </Tooltip>
  );
};

export default CopyToClipBoard;
