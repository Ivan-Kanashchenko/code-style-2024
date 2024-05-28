// Lib
import { FC, useEffect, useRef, useState } from "react";
// Api
import { useGetCustomerMenuQuery } from "redux/query/customersAPI";
// Types
import {
  CustomerMenuAddonModifier,
  CustomerMenuProduct,
} from "types/customers";
import { AddonsModifiers, CompleteProductData } from "../../types";
// Theme
// Constants
import { rtkQueryParams } from "consts";
// Helpers
import { fixedDigitsValue } from "helpers/dataHelpers";
import { getSubtotal } from "../../helpers";
// Icons
import { CurrencyIcon } from "icons";
// Components
import { Modal } from "components";
import {
  Checkbox,
  Input,
  InputQuantity,
  SearchProductsSelect,
} from "components/Form";
// Styled
import { FlexContainer } from "styled/Box";
import { Typography } from "styled/Typography";
import { Button } from "styled/Buttons";
import { InputsGridContainer, Title } from "./styled";

interface AddItemProps {
  customerId: string | undefined;
  locationId: string;
  itemData: boolean | CompleteProductData;
  setMenuId: (id: string) => void;
  onAddItem: (data: CompleteProductData) => void;
  onClose: () => void;
}

export const AddItem: FC<AddItemProps> = ({
  customerId,
  locationId,
  itemData,
  setMenuId,
  onAddItem,
  onClose,
}) => {
  const isEdit = !!itemData && typeof itemData !== "boolean";

  const [products, setProducts] = useState<CustomerMenuProduct[]>([]);

  const { data } = useGetCustomerMenuQuery(
    { id: customerId, query: { locationId } },
    { ...rtkQueryParams, skip: !customerId || !locationId },
  );

  useEffect(() => {
    if (data) {
      const products = data.categories.reduce(
        (acc: CustomerMenuProduct[], el) => {
          return acc.concat(el.products);
        },
        [],
      );
      setMenuId(data.id);
      setProducts(products);
    }
  }, [data]);

  const addonsListRef = useRef<HTMLDivElement>();
  const [addonsHeight, setAddonsHeight] = useState(0);

  const [quantity, setQuantity] = useState(1);

  const [selectedProduct, setSelectedProduct] =
    useState<CustomerMenuProduct | null>(null);

  const [selectedModifiers, setSelectedModifiers] = useState<AddonsModifiers>({
    addon: [],
    modifier: [],
  });

  useEffect(() => {
    if (selectedProduct?.id) {
      setAddonsHeight(addonsListRef?.current?.clientHeight);
      return;
    }

    if (!selectedProduct?.id) {
      setAddonsHeight(0);
    }
  }, [selectedProduct?.id, itemData]);

  useEffect(() => {
    if (!itemData) {
      setQuantity(1);
      setSelectedProduct(null);
      setSelectedModifiers({
        addon: [],
        modifier: [],
      });
      return;
    }

    if (typeof itemData !== "boolean") {
      setSelectedModifiers(itemData.addonsModifiers);
      setQuantity(itemData.quantity);
      setSelectedProduct(itemData.product);
    }
  }, [itemData]);

  const onClear = () => {
    setQuantity(1);
    setSelectedProduct(null);
    setSelectedModifiers({
      addon: [],
      modifier: [],
    });
  };

  const onCheck = (
    addonModifier: CustomerMenuAddonModifier,
    value: boolean,
  ) => {
    if (value) {
      setSelectedModifiers(prev => {
        if (prev[addonModifier.type]?.find(el => el.id === addonModifier.id)) {
          return prev;
        }
        return {
          ...prev,
          [addonModifier.type]: prev[addonModifier.type].concat(addonModifier),
        };
      });

      return;
    }

    setSelectedModifiers(prev => {
      if (prev[addonModifier.type]?.find(el => el.id === addonModifier.id)) {
        return {
          ...prev,
          [addonModifier.type]: prev[addonModifier.type].filter(
            el => el.id !== addonModifier.id,
          ),
        };
      }
      return prev;
    });
  };

  const handleAddItem = () => {
    const uniqId =
      !!itemData && typeof itemData !== "boolean"
        ? itemData?.uniqId
        : undefined;

    onAddItem({
      uniqId,
      product: selectedProduct,
      addonsModifiers: selectedModifiers,
      quantity,
    });
  };

  const options =
    products?.map(i => ({
      label: i.name,
      value: i.id,
      subdata: i,
      disabled: i.isSnoozed,
    })) || [];

  const { subTotalCoins, subTotalFiat } = getSubtotal({
    product: selectedProduct,
    addonsModifiers: selectedModifiers,
    quantity,
  });

  return (
    <Modal width={560} title="Add Item" open={!!itemData} onClose={onClose}>
      <FlexContainer $fullwidth $column $gap={24}>
        <FlexContainer $column $gap={16}>
          <SearchProductsSelect
            required
            label="Food name"
            placeholder="Search food name"
            disabled={isEdit}
            value={selectedProduct?.id}
            options={options}
            optionRender={option => (
              <FlexContainer
                $align="center"
                $justify="space-between"
                $padding="8px 0"
              >
                <Typography.Title>{option.label}</Typography.Title>

                <FlexContainer $gap={4} $minWidth="160px" $justify="flex-end">
                  <CurrencyIcon width="24" height="24" />

                  <Typography.Title>
                    {fixedDigitsValue(option.data.subdata.fmcCentsPrice, 1)} |
                    KD {fixedDigitsValue(option.data.subdata.fiatCentsPrice, 3)}
                  </Typography.Title>
                </FlexContainer>
              </FlexContainer>
            )}
            onSelect={(_value, option) =>
              setSelectedProduct(option.subdata || null)
            }
            onClear={onClear}
          />

          <InputsGridContainer>
            <Input
              prefix={<CurrencyIcon />}
              label="Price"
              disabled
              value={`${
                selectedProduct?.fmcCentsPrice
                  ? fixedDigitsValue(selectedProduct.fmcCentsPrice, 1)
                  : 0
              } | KD ${
                selectedProduct?.fiatCentsPrice
                  ? fixedDigitsValue(selectedProduct.fiatCentsPrice, 3)
                  : 0
              }`}
            />

            <InputQuantity
              label="Quantity"
              value={quantity}
              onChange={(value: number) => setQuantity(value)}
            />
          </InputsGridContainer>
        </FlexContainer>

        <div
          style={{
            height: isEdit ? "auto" : addonsHeight,
            overflow: "hidden",
            transition: "height .25s",
          }}
        >
          <FlexContainer ref={addonsListRef} $fullwidth $column $gap={24}>
            {!!selectedProduct?.addons?.length && (
              <FlexContainer $column $gap={16}>
                <Title>Addons</Title>

                {selectedProduct.addons.map(el => (
                  <FlexContainer
                    key={el.id}
                    $fullwidth
                    $justify="space-between"
                    $align="center"
                  >
                    <Checkbox
                      label={el.name}
                      checked={
                        !!selectedModifiers.addon.find(a => a.id === el.id)
                      }
                      onChange={e => onCheck(el, e.target.checked)}
                    />

                    <FlexContainer
                      $gap={4}
                      $minWidth="160px"
                      $justify="flex-end"
                    >
                      <CurrencyIcon width="24" height="24" />

                      <Typography.Title>{`${fixedDigitsValue(
                        el.fmcCentsPrice,
                        1,
                      )} | KD ${fixedDigitsValue(
                        el.fiatCentsPrice,
                        3,
                      )}`}</Typography.Title>
                    </FlexContainer>
                  </FlexContainer>
                ))}
              </FlexContainer>
            )}

            {!!selectedProduct?.modifiers?.length && (
              <FlexContainer $column $gap={16}>
                <Title>Modifiers</Title>

                {selectedProduct.modifiers.map(el => (
                  <FlexContainer
                    key={el.id}
                    $fullwidth
                    $justify="space-between"
                    $align="center"
                  >
                    <Checkbox
                      checked={
                        !!selectedModifiers.modifier.find(m => m.id === el.id)
                      }
                      label={el.name}
                      onChange={e => onCheck(el, e.target.checked)}
                    />
                  </FlexContainer>
                ))}
              </FlexContainer>
            )}
          </FlexContainer>
        </div>
      </FlexContainer>

      <FlexContainer
        $fullwidth
        $align="center"
        $justify="space-between"
        $padding="24px 0 0 0"
      >
        <FlexContainer $column $gap={8}>
          <Typography.Title>Subtotal</Typography.Title>

          <FlexContainer $gap={4}>
            <CurrencyIcon width="24" height="24" />

            <Title>
              {subTotalCoins} | KD {subTotalFiat}
            </Title>
          </FlexContainer>
        </FlexContainer>

        <FlexContainer $gap={8}>
          <Button.Heading onClick={onClose}>Cancel</Button.Heading>

          <Button.Heading type="primary" onClick={handleAddItem}>
            {isEdit ? "Save" : "Add"} Item
          </Button.Heading>
        </FlexContainer>
      </FlexContainer>
    </Modal>
  );
};
