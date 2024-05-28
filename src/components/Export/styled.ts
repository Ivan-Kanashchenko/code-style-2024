import { styled } from "styled-components";
import { Button } from "styled/Buttons";

const styles = `
&:not(:disabled):not(.ant-btn-disabled):hover {
  color: #093b0f;
  border-color: #093b0f;

  .ant-btn-icon {
    svg {
      g {
        path {
          fill: #093b0f;
        }
      }
    }
  }
}

&.ant-btn-default:disabled {
  .ant-btn-icon {
    svg {
      g {
        path {
          fill: rgba(0, 0, 0, 0.25);
        }
      }
    }
  }
}
`;

export const Base = styled(Button.Base)`
  ${styles}
`;

export const Heading = styled(Button.Heading)`
  ${styles}
`;

export const ExportButton = {
  Base,
  Heading,
};
