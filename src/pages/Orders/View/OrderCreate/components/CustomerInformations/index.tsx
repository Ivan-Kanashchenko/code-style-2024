// Lib
import { FC, useEffect, useState } from "react";
// Api
import {
  useLazyGetCustomerAddressesQuery,
  useLazyGetCustomersQuery,
} from "redux/query/customersAPI";
// Hooks
import { useNotification } from "hooks";
// Types
import { UserDeliveryAddressForm } from "types/orders";
import {
  CustomerProfileResponseDto,
  GetCustomersAddressResponseDto,
} from "types/customers";
// Constants
import { PHONE_CODES } from "consts";
// Helpers
import { fixedDigitsValue } from "helpers/dataHelpers";
// Utils
import { errorHandler } from "utils/errorHandler";
// Icons
import {
  AvatarIcon,
  CurrencyIcon,
  LocationsIcon,
  PersonIcon,
  SearchBlackIcon,
} from "icons";
// Components
import { PhoneInput } from "components/Form";
import { EmptyState } from "../EmptyState";
// Styled
import { ContentBox, FlexContainer, InputsGridContainer } from "styled/Box";
import { Typography } from "styled/Typography";
import { Button } from "styled/Buttons";
import { IconRoundedContainer, SummaryItemLabel, Wrapper } from "./styled";

interface CustomerInformationsProps {
  customerData: CustomerProfileResponseDto | null;
  defaultDeliveryAddress: UserDeliveryAddressForm | null;
  setCustomerData: (customer: CustomerProfileResponseDto) => void;
  setDeliveryAddresses: (addresses: GetCustomersAddressResponseDto[]) => void;
}

export const CustomerInformations: FC<CustomerInformationsProps> = ({
  customerData,
  defaultDeliveryAddress,
  setCustomerData,
  setDeliveryAddresses,
}) => {
  const { openNotification } = useNotification();

  const [phoneCode, setPhoneCode] = useState("");
  const [phone, setPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const isPhoneNumberValid = () => {
    return phoneCode?.trim()?.length && phone?.trim()?.length;
  };

  useEffect(() => {
    if (errorMessage && isPhoneNumberValid()) {
      setErrorMessage("");
    }
  }, [phoneCode, phone]);

  const [getCustomer, { isFetching: isCustomerFetching }] =
    useLazyGetCustomersQuery();

  const [getCustomerAddresses, { isFetching: isCustomerAddress }] =
    useLazyGetCustomerAddressesQuery();

  const onSearch = async () => {
    if (!isPhoneNumberValid()) {
      setErrorMessage("Phone number required");
      return;
    }

    try {
      const customers = await getCustomer({
        query: { phoneNumber: `${phoneCode}${phone}` },
      }).unwrap();

      if (!customers?.items?.length) {
        openNotification({ message: "Customer not found", type: "error" });
        return;
      }

      if (customers?.items?.length > 1) {
        openNotification({
          message:
            "Found 2 or more users with a similar phone number. check that the phone number is correct",
          type: "error",
        });
        return;
      }

      const customerData = customers?.items[0];

      const addresses = await getCustomerAddresses({
        id: customerData?.id,
      }).unwrap();

      setDeliveryAddresses(addresses);
      setCustomerData(customerData);
    } catch (error) {
      errorHandler({ error, openNotification });
    }
  };

  const { city, area, block, street, building, floor, flat, additionalInfo } =
    defaultDeliveryAddress || {};

  const defaultPhone =
    defaultDeliveryAddress?.phoneCode &&
    defaultDeliveryAddress?.phone &&
    `+${defaultDeliveryAddress.phoneCode}${defaultDeliveryAddress.phone}`;

  const defaultAddress = [
    city,
    area,
    block,
    street,
    building,
    floor,
    flat,
    defaultPhone,
    additionalInfo,
  ]
    .filter(Boolean)
    .join(", ");

  const isFetching = isCustomerFetching || isCustomerAddress;

  return (
    <ContentBox $column $gap={16}>
      <Typography.H2>Customer Informations</Typography.H2>

      <FlexContainer $gap={8}>
        <div style={{ maxWidth: 365 }}>
          <PhoneInput
            phone={phone}
            phoneCode={phoneCode}
            phoneCodes={PHONE_CODES}
            setPhone={setPhone}
            setPhoneCode={setPhoneCode}
            errorMessage={errorMessage}
          />
        </div>

        <Button.Form2
          icon={<SearchBlackIcon />}
          loading={isFetching}
          onClick={onSearch}
        >
          Search
        </Button.Form2>
      </FlexContainer>

      {!customerData ? (
        <EmptyState
          Icon={<PersonIcon />}
          title="Selected customer will show here"
        />
      ) : (
        <Wrapper>
          <InputsGridContainer>
            <FlexContainer $gap={12}>
              <AvatarIcon width="40" height="40" />

              <FlexContainer $column $gap={4}>
                <SummaryItemLabel>Customer</SummaryItemLabel>

                <Typography.Title>{customerData.fullName}</Typography.Title>
              </FlexContainer>
            </FlexContainer>

            <FlexContainer $gap={12}>
              <IconRoundedContainer>
                <CurrencyIcon width="24" height="24" />
              </IconRoundedContainer>

              <FlexContainer $column $gap={4}>
                <SummaryItemLabel>Available balance</SummaryItemLabel>

                <Typography.Title>
                  {fixedDigitsValue(customerData.balanceData.fmcCentsAmount, 3)}
                </Typography.Title>
              </FlexContainer>
            </FlexContainer>
          </InputsGridContainer>

          <FlexContainer $gap={12}>
            <IconRoundedContainer>
              <LocationsIcon />
            </IconRoundedContainer>

            <FlexContainer $column $gap={4}>
              <SummaryItemLabel>Default address</SummaryItemLabel>

              <Typography.Title>{defaultAddress}</Typography.Title>
            </FlexContainer>
          </FlexContainer>
        </Wrapper>
      )}
    </ContentBox>
  );
};
