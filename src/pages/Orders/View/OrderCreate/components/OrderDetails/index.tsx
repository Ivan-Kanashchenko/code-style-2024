// Lib
import { FC, memo, useState } from "react";
// Types
import { CompleteProductData } from "../../types";
// Helpers
import { renderSubtotal } from "../../helpers";
// Icons
import { DiningIcon, PencilIcon, PlusIcon, TrashIcon } from "icons";
// Components
import { Switch } from "components/Form";
import { ConfirmDialog } from "components/Modals";
import { EmptyState } from "../EmptyState";
import { BlockedState } from "../BlockedState";
import { AddItem } from "../AddItem";
// Styled
import { ContentBox, FlexContainer, HorizontalDevider } from "styled/Box";
import { Typography } from "styled/Typography";
import { Button } from "styled/Buttons";
import { Addon, QuantityContainer } from "./styled";

interface OrderDetailsProps {
  isBlocked: boolean;
  customerId: string | undefined;
  locationId: string;
  orderItems: CompleteProductData[];
  isCutlery: boolean;
  setMenuId: (id: string) => void;
  handleAddOrderItem: (data: CompleteProductData) => void;
  handleRemoveOrderItem: (id: string) => void;
  setIsCutlery: (data: boolean) => void;
}

const OrderDetailsComponent: FC<OrderDetailsProps> = ({
  isBlocked,
  customerId,
  locationId,
  orderItems,
  isCutlery,
  setMenuId,
  handleAddOrderItem,
  handleRemoveOrderItem,
  setIsCutlery,
}) => {
  const [itemModal, setItemModal] = useState<boolean | CompleteProductData>(
    false,
  );

  const [removeItemModal, setRemoveItemModal] = useState<
    CompleteProductData | false
  >(false);

  const handleOpenModal = () => {
    setItemModal(true);
  };

  const handleCloseModal = () => {
    setItemModal(false);
  };

  const onRemoveItem = () => {
    if (!removeItemModal) {
      return;
    }
    handleRemoveOrderItem(removeItemModal.uniqId);
    setRemoveItemModal(false);
  };

  const onAddItem = (data: CompleteProductData) => {
    setItemModal(false);
    handleAddOrderItem(data);
  };

  return (
    <>
      <ContentBox $column $gap={16} $position="relative">
        <FlexContainer $fullwidth $align="center" $justify="space-between">
          <Typography.H2>Order Details</Typography.H2>

          <Button.Form2 icon={<PlusIcon />} onClick={handleOpenModal}>
            Add item
          </Button.Form2>
        </FlexContainer>

        {!orderItems?.length ? (
          <EmptyState
            Icon={<DiningIcon />}
            title="Selected item will show here"
          />
        ) : (
          orderItems.map(({ product, addonsModifiers, quantity, uniqId }) => (
            <FlexContainer
              key={uniqId}
              $align="center"
              $fullwidth
              $justify="space-between"
            >
              <FlexContainer $gap={12} $align="center">
                <QuantityContainer>
                  <Typography.Title>{quantity}</Typography.Title>
                </QuantityContainer>

                <div>
                  <Typography.Title>{product.name}</Typography.Title>

                  {!!addonsModifiers?.addon?.length &&
                    addonsModifiers?.addon.map(a => (
                      <Addon key={a.id}>{a.name}</Addon>
                    ))}

                  {!!addonsModifiers?.modifier?.length &&
                    addonsModifiers?.modifier.map(m => (
                      <Addon key={m.id}>{m.name}</Addon>
                    ))}
                </div>
              </FlexContainer>

              <FlexContainer $align="center">
                {renderSubtotal({ product, addonsModifiers, quantity })}

                <FlexContainer $gap={8} $margin="0 0 0 24px">
                  <Button.Form
                    icon={<PencilIcon />}
                    style={{ width: 40, minWidth: 40 }}
                    onClick={() =>
                      setItemModal({
                        product,
                        addonsModifiers,
                        quantity,
                        uniqId,
                      })
                    }
                  />

                  <Button.Form
                    icon={<TrashIcon fill="#646965" />}
                    style={{ width: 40, minWidth: 40 }}
                    onClick={() =>
                      setRemoveItemModal({
                        product,
                        addonsModifiers,
                        quantity,
                        uniqId,
                      })
                    }
                  />
                </FlexContainer>
              </FlexContainer>
            </FlexContainer>
          ))
        )}

        <HorizontalDevider />

        <FlexContainer $fullwidth $align="center" $justify="space-between">
          <Typography.Title>Use cutlery</Typography.Title>

          <Switch checked={isCutlery} onChange={value => setIsCutlery(value)} />
        </FlexContainer>

        {isBlocked && <BlockedState />}
      </ContentBox>

      <AddItem
        customerId={customerId}
        locationId={locationId}
        itemData={itemModal}
        setMenuId={setMenuId}
        onAddItem={onAddItem}
        onClose={handleCloseModal}
      />

      <ConfirmDialog
        isLoading={false}
        open={!!removeItemModal}
        Icon={TrashIcon}
        message={
          !!removeItemModal && `${removeItemModal.product.name} will be removed`
        }
        description="Are you sure to continue this action?"
        onCancel={() => setRemoveItemModal(false)}
        firstCTAButton={{
          title: "Remove Product",
          status: "danger",
          onClick: onRemoveItem,
        }}
      />
    </>
  );
};

export const OrderDetails = memo(OrderDetailsComponent);
