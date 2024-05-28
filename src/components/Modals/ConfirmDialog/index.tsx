// Lib
import { FC, ReactNode } from "react";
// Types
import { SvgIconConstituentValues } from "types/common";
// Theme
import { theme } from "theme";
// Components
import { Modal } from "components";
// Styled
import { FlexContainer } from "styled/Box";
import { Button } from "styled/Buttons";
import { Description, IconContainer, Title } from "./styled";

type CTAButton = {
  title: string;
  status?: "danger" | "success" | "warning";
  disabled?: boolean;
  type?: "primary";
  loading?: boolean;
  onClick: () => void;
};

interface ConfirmDialogProps {
  isLoading: boolean;
  open: boolean;
  Icon: FC<SvgIconConstituentValues>;
  message: ReactNode;
  description?: ReactNode;
  onCancel: () => void;
  firstCTAButton: CTAButton;
  secondCTAButton?: CTAButton;
}

export const ConfirmDialog: FC<ConfirmDialogProps> = ({
  open,
  isLoading,
  message,
  description,
  Icon,
  onCancel,
  firstCTAButton,
  secondCTAButton,
}) => {
  return (
    <Modal closeIcon={false} open={open} width={480}>
      <FlexContainer
        $fullwidth
        $column
        $gap={8}
        $align="center"
        $justify="center"
        $padding="24px 0 0"
      >
        <IconContainer>
          <Icon fill={theme.color.text.tertiary} />
        </IconContainer>

        <Title>{message}</Title>
        {!!description && <Description>{description}</Description>}

        <FlexContainer
          $fullwidth
          $align="center"
          $justify="flex-end"
          $gap={8}
          $padding="24px 0 0"
        >
          <Button.Heading disabled={isLoading} onClick={onCancel}>
            Cancel
          </Button.Heading>

          {firstCTAButton && (
            <Button.Heading
              type={firstCTAButton?.type}
              status={firstCTAButton?.status}
              disabled={firstCTAButton?.disabled}
              loading={firstCTAButton?.loading}
              onClick={firstCTAButton.onClick}
            >
              {firstCTAButton.title}
            </Button.Heading>
          )}

          {secondCTAButton && (
            <Button.Heading
              type={secondCTAButton?.type}
              status={secondCTAButton?.status}
              disabled={secondCTAButton?.disabled}
              loading={secondCTAButton?.loading}
              onClick={secondCTAButton.onClick}
            >
              {secondCTAButton.title}
            </Button.Heading>
          )}
        </FlexContainer>
      </FlexContainer>
    </Modal>
  );
};
