// Lib
import { FC, useEffect } from "react";
// Api
import { useGetLocationsQuery } from "redux/query/locationsAPI";
// Hooks
import { useNotification } from "hooks";
// Constants
import { rtkQueryParams } from "consts";
// Utils
import { errorHandler } from "utils/errorHandler";
// Components
import { Select } from "components/Form";
// Styled
import { ContentBox } from "styled/Box";
import { Typography } from "styled/Typography";

interface StoreProps {
  isCustomerSelected: boolean;
  locationId: string;
  onLocationChange: (locationId: string) => void;
}

export const Store: FC<StoreProps> = ({
  isCustomerSelected,
  locationId,
  onLocationChange,
}) => {
  const { openNotification } = useNotification();

  const { data, isFetching, error } = useGetLocationsQuery(
    null,
    rtkQueryParams,
  );

  useEffect(() => {
    if (error) {
      errorHandler({ error, openNotification });
    }
  }, [error]);

  const locationOptions = data?.map(({ name, id }) => ({
    label: name,
    value: id,
  }));

  return (
    <ContentBox $column $gap={20}>
      <Typography.H2>Store</Typography.H2>

      <Select
        disabled={!isCustomerSelected}
        loading={isFetching}
        placeholder="Select location"
        value={locationId}
        options={locationOptions}
        onChange={onLocationChange}
      />
    </ContentBox>
  );
};
