// Lib
import { FC } from "react";
// Types
import { UserDeliveryAddressForm } from "types/orders";
// Constants
import { PHONE_CODES } from "consts";
// Components
import { Input, Select, PhoneInput } from "components/Form";
// Styled
import { ContentBox, FlexContainer } from "styled/Box";
import { Typography } from "styled/Typography";

const customAddress: UserDeliveryAddressForm = {
  id: "other",
  name: "Other",
  city: "",
  area: "",
  block: "",
  street: "",
  building: "",
  floor: "",
  flat: "",
  phoneCode: "",
  phone: "",
  additionalInfo: "",
};

export interface DeliveryAddressProps {
  isCustomerSelected: boolean;
  isUseUserPhone: boolean;
  deliveryAddressesList: UserDeliveryAddressForm[];
  userDeliveryAddress: UserDeliveryAddressForm | null;
  onSetIsUserPhone: (isUseUserPhone: boolean) => void;
  setUserDeliveryAddress: (address: UserDeliveryAddressForm) => void;
}

export const DeliveryAddress: FC<DeliveryAddressProps> = ({
  isCustomerSelected,
  deliveryAddressesList,
  isUseUserPhone,
  userDeliveryAddress,
  onSetIsUserPhone,
  setUserDeliveryAddress,
}) => {
  const handleChangeAddress = (value: string) => {
    if (value === "other") {
      onSetIsUserPhone(false);

      setUserDeliveryAddress(customAddress);
      return;
    }

    const selectedAddress =
      deliveryAddressesList.find(el => el.id === value) || null;

    onSetIsUserPhone(false);
    setUserDeliveryAddress(selectedAddress);
  };

  const handleChangeField = (key: string, value: string) => {
    setUserDeliveryAddress({ ...userDeliveryAddress, [key]: value });
  };

  const locationOptions = [...deliveryAddressesList, customAddress]?.map(a => ({
    label: a.name,
    value: a.id,
  }));

  const isDisabled = userDeliveryAddress?.id !== customAddress.id;

  return (
    <ContentBox $column $gap={16}>
      <Typography.H2>Delivery address</Typography.H2>

      <FlexContainer $column $fullwidth $gap={20}>
        <Select
          disabled={!isCustomerSelected}
          label="Location name"
          value={userDeliveryAddress?.id}
          options={locationOptions}
          onChange={value => handleChangeAddress(value)}
        />

        <Input
          required
          label="City"
          disabled={isDisabled}
          value={userDeliveryAddress?.city}
          onChange={e => handleChangeField("city", e.target.value)}
        />

        <Input
          required
          label="Area"
          disabled={isDisabled}
          value={userDeliveryAddress?.area}
          onChange={e => handleChangeField("area", e.target.value)}
        />

        <Input
          required
          label="Block no."
          disabled={isDisabled}
          value={userDeliveryAddress?.block}
          onChange={e => handleChangeField("block", e.target.value)}
        />

        <Input
          required
          label="Street"
          disabled={isDisabled}
          value={userDeliveryAddress?.street}
          onChange={e => handleChangeField("street", e.target.value)}
        />

        <Input
          required
          label="Building/Apartment no."
          disabled={isDisabled}
          value={userDeliveryAddress?.building}
          onChange={e => handleChangeField("building", e.target.value)}
        />

        <Input
          label="Floor"
          disabled={isDisabled}
          value={userDeliveryAddress?.floor}
          onChange={e => handleChangeField("floor", e.target.value)}
        />

        <Input
          label="Flat"
          disabled={isDisabled}
          value={userDeliveryAddress?.flat}
          onChange={e => handleChangeField("flat", e.target.value)}
        />

        <PhoneInput
          label="Phone number"
          toggle={{
            label: "Use current number",
            value: isUseUserPhone,
            setToggleValue: onSetIsUserPhone,
          }}
          disabled={false}
          phone={userDeliveryAddress?.phone}
          phoneCode={userDeliveryAddress?.phoneCode}
          phoneCodes={PHONE_CODES}
          setPhone={phone => handleChangeField("phone", phone)}
          setPhoneCode={phoneCode => handleChangeField("phoneCode", phoneCode)}
        />

        <Input
          label="Detail for courier"
          value={userDeliveryAddress?.additionalInfo}
          onChange={e => handleChangeField("additionalInfo", e.target.value)}
        />
      </FlexContainer>
    </ContentBox>
  );
};
