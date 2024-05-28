// Lib
import { FC, ReactNode } from "react";
import { Skeleton } from "antd";
// Styled
import { FlexContainer, IconRoundedContainer } from "styled/Box";
import { Typography } from "styled/Typography";
import { Button } from "styled/Buttons";
import { SummaryItemLabel } from "./styled";

interface SummaryFieldProps {
  isLoading?: boolean;
  label: string;
  Icon?: ReactNode;
  value?: string | ReactNode;
  button?: {
    title: string;
    onClick: () => void;
  };
}
export const SummaryField: FC<SummaryFieldProps> = ({
  isLoading,
  Icon,
  label,
  value,
  button,
}) => {
  return (
    <FlexContainer $gap={12}>
      {Icon && <IconRoundedContainer>{Icon}</IconRoundedContainer>}

      <FlexContainer $column $gap={8}>
        <FlexContainer $column $gap={4}>
          <SummaryItemLabel>{label}</SummaryItemLabel>

          {isLoading ? (
            <Skeleton.Input active size="small" />
          ) : value ? (
            <Typography.Title>{value}</Typography.Title>
          ) : (
            <Typography.Title>No data</Typography.Title>
          )}
        </FlexContainer>

        {button && (
          <Button.SubHeading onClick={button.onClick}>
            {button.title}
          </Button.SubHeading>
        )}
      </FlexContainer>
    </FlexContainer>
  );
};
