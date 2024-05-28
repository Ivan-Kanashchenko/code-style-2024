// Lib
import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
// Api
import { useGetOrderQuery } from "redux/query/ordersAPI";
// Hooks
import { useNotification } from "hooks";
// Constants
import { ADMIN_ROUTES, rtkQueryParams } from "consts";
// Utils
import { errorHandler } from "utils/errorHandler";
// Components
import { ArrowBackLink } from "components";
import { DeliveryAddress, History, OrderDetail, Summary } from "./components";
// Styled
import {
  FlexContainer,
  PageHeadingContainer,
  PageTitleContainer,
} from "styled/Box";
import { Typography } from "styled/Typography";
import { AdditionalInfoWrapper, MainInfoWrapper, Wrapper } from "./styled";

export const OrderDetails: FC = () => {
  const { id } = useParams();

  const { openNotification } = useNotification();

  const { data, isFetching, error } = useGetOrderQuery({ id }, rtkQueryParams);

  useEffect(() => {
    if (error) {
      errorHandler({ error, openNotification });
    }
  }, [error]);

  return (
    <FlexContainer $fullwidth $column $gap={24}>
      <PageHeadingContainer>
        <PageTitleContainer $column $gap={16}>
          <ArrowBackLink
            title="Back to Orders"
            path={ADMIN_ROUTES.ORDERS.path}
          />

          <Typography.H1>Order Detail</Typography.H1>
        </PageTitleContainer>
      </PageHeadingContainer>

      <Wrapper>
        <MainInfoWrapper>
          <Summary isLoading={isFetching} data={data} />

          <OrderDetail
            isLoading={isFetching}
            data={data?.items || []}
            paymentType={data?.paymentType}
          />
        </MainInfoWrapper>

        <AdditionalInfoWrapper>
          <DeliveryAddress isLoading={isFetching} data={data?.delivery} />

          <History
            isLoading={isFetching}
            data={data?.orderStatusHistory || []}
          />
        </AdditionalInfoWrapper>
      </Wrapper>
    </FlexContainer>
  );
};
