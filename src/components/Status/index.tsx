// Lib
import { FC } from "react";
//Styled
import { Marker, Wrapper } from "./styled";

interface StatusProps {
  text: string;
  type?: "primary" | "outlined" | "borderless";
  status?: "success" | "warning" | "neutral" | "danger";
}

export const Status: FC<StatusProps> = ({
  text,
  type = "primary",
  status = "success",
}) => {
  return (
    <Wrapper type={type} status={status}>
      {type !== "primary" && <Marker type={type} status={status} />}
      <div>{text}</div>
    </Wrapper>
  );
};
