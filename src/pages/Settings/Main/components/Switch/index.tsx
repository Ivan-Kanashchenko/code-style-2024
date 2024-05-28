// Lib
import { FC } from "react";
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
import { Switch as FormSwitch } from "components/Form";
import { Skeleton } from "antd";
// Styled

interface SwitchProps {
  canUpdate: boolean;
  isLoading: boolean;
  data: boolean | undefined;
  onChange: (value: boolean) => void;
}

export const Switch: FC<SwitchProps> = ({
  canUpdate,
  isLoading,
  data,
  onChange,
}) => {
  if (data === undefined && isLoading) {
    return <Skeleton.Input active />;
  }

  if (data === undefined) {
    return null;
  }

  return (
    <FormSwitch
      checked={data}
      loading={isLoading}
      disabled={!canUpdate}
      onChange={onChange}
    />
  );
};
