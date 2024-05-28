import { Modal } from "antd";
import styled from "styled-components";
import { FlexContainer } from "styled/Box";

export const StyledModal = styled(Modal)`
  .ant-modal-content {
    padding: 24px;
  }
  .ant-modal-close {
    display: none;
  }
`;

export const TitleContainer = styled(FlexContainer)<{
  $withoutPadding: boolean;
}>`
  padding: 0 4px 24px 4px;

  ${({ $withoutPadding }) => $withoutPadding && `padding: 0;`};
`;
