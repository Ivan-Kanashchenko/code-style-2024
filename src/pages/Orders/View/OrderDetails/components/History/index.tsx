// Lib
import { FC } from "react";
import { Skeleton } from "antd";
// Types
import { OrderStatusHistoryItemResponseDto } from "types/orders";
// Theme
import { theme } from "theme";
// Helpers
import { convertStatusToText, dateTransform } from "helpers/dataHelpers";
// Icons
import { LabelBlackIcon } from "icons";
// Styled
import { ContentBox } from "styled/Box";
import { Typography } from "styled/Typography";
import {
  Description,
  Devider,
  HistoryItem,
  HistoryItemsWrapper,
  IconWrapper,
} from "./styled";

interface HistoryProps {
  isLoading: boolean;
  data: OrderStatusHistoryItemResponseDto[];
}

export const History: FC<HistoryProps> = ({ isLoading, data }) => {
  const items = data.map(({ newStatus, timestamp }) => ({
    Icon: LabelBlackIcon,
    title: `Status change to ${convertStatusToText(newStatus)}`,
    date: dateTransform({ date: timestamp }),
  }));

  return (
    <ContentBox $fullwidth $column $gap={20}>
      <Typography.H2>History</Typography.H2>

      <HistoryItemsWrapper>
        {isLoading ? (
          <Skeleton active />
        ) : items?.length ? (
          items.map(({ Icon, title, date }, i) => (
            <HistoryItem key={i}>
              <IconWrapper>
                {i !== 0 && <Devider />}
                <Icon fill={theme.color.text.tertiary} height="16" width="16" />
              </IconWrapper>

              <div>
                <Typography.Title>{title}</Typography.Title>
                <Description>{date}</Description>
              </div>
            </HistoryItem>
          ))
        ) : null}
      </HistoryItemsWrapper>
    </ContentBox>
  );
};
