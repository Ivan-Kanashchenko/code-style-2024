// Lib
import { FC, useEffect, useState } from "react";
import { Skeleton } from "antd";
// Theme
import { theme } from "theme";
// Icons
import { CloseBlackIcon, DoneBlackIcon } from "icons";
// Helpers
import { fixedDigitsValue } from "helpers/dataHelpers";
// Components
import { ButtonLink } from "components";
import { InputNumber } from "components/Form";
// Styled
import { FlexContainer } from "styled/Box";
import { Typography } from "styled/Typography";
import { Button } from "styled/Buttons";

interface InputProps {
  canUpdate?: boolean;
  isLoading: boolean;
  suffix?: string;
  step?: number;
  precision?: number;
  fixedDigitsPlaceholder?: number;
  data: number | null;
  onSubmit: (value: number) => void;
}

export const Input: FC<InputProps> = ({
  canUpdate,
  isLoading,
  suffix,
  step,
  precision,
  fixedDigitsPlaceholder,
  data,
  onSubmit,
}) => {
  const [value, setValue] = useState<number>(data);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (data === value) {
      setEdit(false);
    }
    setValue(data);
  }, [data]);

  const title = [fixedDigitsValue(data, fixedDigitsPlaceholder), suffix]
    .filter(el => !!el || el === 0)
    .join(" ");

  if (data === undefined && isLoading) {
    return <Skeleton.Input active />;
  }

  if (data === undefined) {
    return null;
  }

  if (!edit) {
    return (
      <FlexContainer $gap={16}>
        <Typography.Title>{title}</Typography.Title>
        <ButtonLink
          title="Edit"
          disabled={!canUpdate}
          onClick={() => setEdit(true)}
        />
      </FlexContainer>
    );
  }

  const handleSubmit = () => {
    if (!value && value !== 0) {
      return;
    }

    if (value === data) {
      return;
    }

    onSubmit(value);
  };

  return (
    <FlexContainer $gap={8}>
      <InputNumber
        style={{ width: 100 }}
        min={0}
        step={step}
        precision={fixedDigitsPlaceholder || precision || 0}
        disabled={isLoading}
        value={value}
        onChange={(value: number) => setValue(value)}
      />

      <Button.Form
        type="primary"
        style={{ width: 40 }}
        loading={isLoading}
        icon={<DoneBlackIcon fill={theme.color.white} />}
        onClick={handleSubmit}
      />

      <Button.Form
        icon={<CloseBlackIcon />}
        style={{ width: 40 }}
        disabled={isLoading}
        onClick={() => setEdit(false)}
      />
    </FlexContainer>
  );
};
