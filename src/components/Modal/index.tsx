// Lib
import React, { FC, ReactNode } from "react";
// Types
import { ModalProps as AntDModalProps } from "antd";
// Icons
import { CloseBlackIcon } from "icons";
// Styled
import { Typography } from "styled/Typography";
import { Button } from "styled/Buttons";
import { StyledModal, TitleContainer } from "./styled";
import { FlexContainer } from "../../styled/Box";
import { Loader } from "components";

interface ModalProps extends AntDModalProps {
  isLoading?: boolean;
  closeIcon?: boolean;
  width?: number;
  title?: string;
  subTitle?: string;
  suffix?: ReactNode;
  onClose?: () => void;
}

export const Modal: FC<ModalProps> = ({
  isLoading = false,
  closeIcon = true,
  title,
  subTitle,
  width = 640,
  onClose,
  children,
  suffix,
  ...props
}) => {
  return (
    <StyledModal
      centered
      maskClosable
      footer={null}
      width={width}
      {...props}
      closeIcon={<CloseBlackIcon />}
      onCancel={onClose}
    >
      {isLoading && <Loader />}
      <TitleContainer
        $withoutPadding={!closeIcon && !title?.length}
        $align="center"
        $justify={title ? "space-between" : "flex-end"}
      >
        <FlexContainer $column $gap={4}>
          <Typography.H3>{title}</Typography.H3>
          {subTitle && <Typography.Title>{subTitle}</Typography.Title>}
        </FlexContainer>

        {!!closeIcon && (
          <Button.SquaredIcon
            disabled={isLoading}
            icon={<CloseBlackIcon />}
            onClick={onClose}
          />
        )}

        {!!suffix && suffix}
      </TitleContainer>

      {children}
    </StyledModal>
  );
};
