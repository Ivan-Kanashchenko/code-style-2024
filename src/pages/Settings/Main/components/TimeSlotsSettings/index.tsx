// Lib
import { FC, useEffect, useRef, useState } from "react";
import { useNotification, usePermissions } from "hooks";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
// Api
import {
  useGetTimeSlotsQuery,
  useUpdateTimeSlotsMutation,
} from "redux/query/timeSlotsAPI";
// Hooks
// Actions
// Selectors
// Types
import {
  EditIndexType,
  KitchenSlots,
  KitchenType,
  RemoveTimeSlotModalType,
  TimeSlotsForm,
} from "types/timeSlots";
// Theme
import { theme } from "theme";
// Constants
// Helpers
import {
  convertToTimeSlotFormValues,
  transformToTimeSlotRequest,
} from "helpers/dataHelpers";
import { getModalTitle } from "./helpers";
// Utils
import { errorHandler } from "utils/errorHandler";
// Icons
import {
  CloseBlackIcon,
  DescriptionBlackIcon,
  DoneBlackIcon,
  PlusIcon,
  TrashIcon,
} from "icons";
// Layouts
// Components
import { ButtonLink, NoItemsContent } from "components";
import { DatePicker } from "components/Form";
import { ConfirmDialog } from "components/Modals";
// Styled
import { ContentBox, FlexContainer, SubContentBox } from "styled/Box";
import { Button } from "styled/Buttons";
import { Typography } from "styled/Typography";
import {
  EditButtonsContainer,
  InputsContainer,
  TimeSelectorsContainer,
  Title,
} from "./styled";

import { resolver } from "./validation";

export const TimeSlotsSettings: FC = () => {
  const { openNotification } = useNotification();

  const {
    canTimeSlotsGet,
    canTimeSlotsCreate,
    canTimeSlotsUpdate,
    canTimeSlotsDelete,
  } = usePermissions();

  const [update, { isLoading: isUpdateLoading }] = useUpdateTimeSlotsMutation();

  const { data, error } = useGetTimeSlotsQuery(null, {
    refetchOnMountOrArgChange: true,
    skip: !canTimeSlotsGet,
  });

  useEffect(() => {
    if (error) {
      errorHandler({ error, openNotification });
    }
  }, [error]);

  const [editIndex, setEditIndex] = useState<EditIndexType>({
    [KitchenType.All]: null,
    [KitchenType.Cold]: null,
    [KitchenType.Hot]: null,
  });
  const [confirmModal, setConfirmModal] =
    useState<RemoveTimeSlotModalType>(null);

  const prevVersion = useRef<KitchenSlots>();

  const {
    control: coldControl,
    handleSubmit: handleColdSubmit,
    watch: coldWatch,
    setValue: setColdValue,
    reset: coldReset,
  } = useForm<TimeSlotsForm>({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    resolver,
  });

  const {
    fields: coldFields,
    append: coldAppend,
    remove: coldRemove,
  } = useFieldArray({
    control: coldControl,
    name: `slot`,
  });
  const {
    control: hotControl,
    handleSubmit: handleHotSubmit,
    watch: hotWatch,
    setValue: setHotValue,
    reset: hotReset,
  } = useForm<TimeSlotsForm>({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    resolver,
  });

  const {
    fields: hotFields,
    append: hotAppend,
    remove: hotRemove,
  } = useFieldArray({
    control: hotControl,
    name: `slot`,
  });

  const coldFieldsData = coldWatch("slot");
  const hotFieldsData = hotWatch("slot");

  const fieldsData = {
    [KitchenType.Cold]: coldFieldsData,
    [KitchenType.Hot]: hotFieldsData,
  };

  useEffect(() => {
    if (!data) return;

    const kitchenSlots = data.reduce((acc, { type, id, timeSlots }) => {
      acc[type] = {
        id,
        type,
        timeSlots: convertToTimeSlotFormValues(timeSlots),
      };

      return acc;
    }, {} as KitchenSlots);

    prevVersion.current = kitchenSlots;

    coldReset({ slot: kitchenSlots[KitchenType.Cold].timeSlots });
    hotReset({ slot: kitchenSlots[KitchenType.Hot].timeSlots });
  }, [data]);

  const handleAddSlot = (key: KitchenType) => {
    setEditIndex(prev => ({ ...prev, [key]: fieldsData[key].length || 0 }));
    switch (key) {
      case KitchenType.Cold:
        coldAppend({ from: null, to: null });
        break;
      case KitchenType.Hot:
        hotAppend({ from: null, to: null });
        break;

      default:
        break;
    }
  };

  const handleRemoveSlot = (index: number, key: KitchenType) => {
    setConfirmModal({ ...fieldsData[key][index], i: index, key });
  };

  const onCancelRemove = () => {
    setConfirmModal(null);
  };

  const onConfirmRemove = async () => {
    if (confirmModal === null) return;

    try {
      const reqData = transformToTimeSlotRequest({
        slot: fieldsData[confirmModal.key],
      });

      const timeSlots = reqData
        .map((t, i) => i !== confirmModal.i && t)
        .filter(Boolean);

      await update({ timeSlots, type: confirmModal.key }).unwrap();

      prevVersion.current = {
        ...prevVersion.current,
        [confirmModal.key]: {
          ...prevVersion.current[confirmModal.key],
          timeSlots: fieldsData[confirmModal.key],
        },
      };

      switch (confirmModal.key) {
        case KitchenType.Cold:
          coldRemove(confirmModal.i);
          break;
        case KitchenType.Hot:
          hotRemove(confirmModal.i);
          break;

        default:
          break;
      }

      setConfirmModal(null);
    } catch (error) {
      errorHandler({ error, openNotification });
    }
  };

  const handleCancelEditing = (timeIndex: number, key: KitchenType) => {
    if (prevVersion.current[key]?.timeSlots[timeIndex]) {
      switch (key) {
        case KitchenType.Cold:
          setColdValue("slot", prevVersion.current[key].timeSlots);
          break;
        case KitchenType.Hot:
          setHotValue("slot", prevVersion.current[key].timeSlots);
          break;

        default:
          break;
      }
    } else {
      switch (key) {
        case KitchenType.Cold:
          coldRemove(timeIndex);
          break;
        case KitchenType.Hot:
          hotRemove(timeIndex);
          break;

        default:
          break;
      }
    }

    setEditIndex(prev => ({ ...prev, [key]: null }));
  };

  const handleUpdateTimeSlot = async (
    data: TimeSlotsForm,
    type: KitchenType,
  ) => {
    try {
      const timeSlots = transformToTimeSlotRequest(data);

      await update({ timeSlots, type }).unwrap();

      prevVersion.current = {
        ...prevVersion.current,
        [type]: {
          ...prevVersion.current[type],
          timeSlots: data.slot,
        },
      };

      setEditIndex(prev => ({ ...prev, [type]: null }));
    } catch (error) {
      errorHandler({ error, openNotification });
    }
  };

  const onColdSubmit: SubmitHandler<TimeSlotsForm> = data =>
    handleUpdateTimeSlot(data, KitchenType.Cold);

  const onHotSubmit: SubmitHandler<TimeSlotsForm> = data =>
    handleUpdateTimeSlot(data, KitchenType.Hot);

  return (
    <>
      <ContentBox $column $gap={12} $padding="24px 12px 12px">
        <Title>Time Slots</Title>

        <SubContentBox
          as="form"
          key={KitchenType.Cold}
          $column
          $gap={1}
          $padding="12px 12px 0px"
          onSubmit={handleColdSubmit(onColdSubmit)}
        >
          <FlexContainer
            $fullwidth
            $align="flex-start"
            $justify="space-between"
            $padding="0 0 12px"
          >
            <Typography.H3>Cold Kitchen</Typography.H3>

            {canTimeSlotsCreate && (
              <Button.Base
                type="primary"
                icon={<PlusIcon fill="white" />}
                disabled={editIndex[KitchenType.Cold] !== null}
                onClick={() => handleAddSlot(KitchenType.Cold)}
              >
                Add Time Slot
              </Button.Base>
            )}
          </FlexContainer>
          {coldFields?.length ? (
            coldFields?.map((timeField, timeIndex) => (
              <InputsContainer key={timeField.id} $bordered={timeIndex !== 0}>
                <TimeSelectorsContainer>
                  <Controller
                    name={`slot.${timeIndex}.from`}
                    control={coldControl}
                    render={({ field, fieldState }) => (
                      <DatePicker
                        picker="time"
                        format={"HH:mm"}
                        {...field}
                        fieldState={fieldState}
                        isDisabled={editIndex[KitchenType.Cold] !== timeIndex}
                        onChange={field.onChange as any}
                      />
                    )}
                  />
                  <FlexContainer $align="center" $justify="center">
                    -
                  </FlexContainer>
                  <Controller
                    name={`slot.${timeIndex}.to`}
                    control={coldControl}
                    render={({ field, fieldState }) => (
                      <DatePicker
                        picker="time"
                        format={"HH:mm"}
                        {...field}
                        fieldState={fieldState}
                        isDisabled={editIndex[KitchenType.Cold] !== timeIndex}
                        onChange={field.onChange as any}
                      />
                    )}
                  />
                </TimeSelectorsContainer>
                {timeIndex === editIndex[KitchenType.Cold] ? (
                  <FlexContainer $gap={8} $padding="0 0 0 12px">
                    <Button.Form
                      type="primary"
                      htmlType="submit"
                      style={{ width: 40, minWidth: 40 }}
                      icon={<DoneBlackIcon fill={theme.color.white} />}
                      loading={isUpdateLoading}
                      disabled={
                        coldFieldsData[timeIndex]?.["from"] === null ||
                        coldFieldsData[timeIndex]?.["to"] === null
                      }
                    />
                    <Button.Form
                      icon={<CloseBlackIcon />}
                      style={{ width: 40, minWidth: 40 }}
                      onClick={() =>
                        handleCancelEditing(timeIndex, KitchenType.Cold)
                      }
                    />
                  </FlexContainer>
                ) : (
                  <EditButtonsContainer>
                    {canTimeSlotsUpdate && (
                      <ButtonLink
                        title="Edit"
                        onClick={() =>
                          setEditIndex(prev => ({
                            ...prev,
                            [KitchenType.Cold]: timeIndex,
                          }))
                        }
                      />
                    )}
                    {canTimeSlotsDelete && (
                      <ButtonLink
                        title="Remove"
                        onClick={() =>
                          handleRemoveSlot(timeIndex, KitchenType.Cold)
                        }
                      />
                    )}
                  </EditButtonsContainer>
                )}
              </InputsContainer>
            ))
          ) : (
            <NoItemsContent
              Icon={DescriptionBlackIcon}
              message="No Time Slots to show."
            />
          )}
        </SubContentBox>
        <SubContentBox
          as="form"
          key={KitchenType.Hot}
          $column
          $gap={1}
          $padding="12px 12px 0px"
          onSubmit={handleHotSubmit(onHotSubmit)}
        >
          <FlexContainer
            $fullwidth
            $align="flex-start"
            $justify="space-between"
            $padding="0 0 12px"
          >
            <Typography.H3>Hot Kitchen</Typography.H3>

            {canTimeSlotsCreate && (
              <Button.Base
                type="primary"
                icon={<PlusIcon fill="white" />}
                disabled={editIndex[KitchenType.Hot] !== null}
                onClick={() => handleAddSlot(KitchenType.Hot)}
              >
                Add Time Slot
              </Button.Base>
            )}
          </FlexContainer>
          {hotFields?.length ? (
            hotFields?.map((timeField, timeIndex) => (
              <InputsContainer key={timeField.id} $bordered={timeIndex !== 0}>
                <TimeSelectorsContainer>
                  <Controller
                    name={`slot.${timeIndex}.from`}
                    control={hotControl}
                    render={({ field, fieldState }) => (
                      <DatePicker
                        picker="time"
                        format={"HH:mm"}
                        {...field}
                        fieldState={fieldState}
                        isDisabled={editIndex[KitchenType.Hot] !== timeIndex}
                        onChange={field.onChange as any}
                      />
                    )}
                  />
                  <FlexContainer $align="center" $justify="center">
                    -
                  </FlexContainer>
                  <Controller
                    name={`slot.${timeIndex}.to`}
                    control={hotControl}
                    render={({ field, fieldState }) => (
                      <DatePicker
                        picker="time"
                        format={"HH:mm"}
                        {...field}
                        fieldState={fieldState}
                        isDisabled={editIndex[KitchenType.Hot] !== timeIndex}
                        onChange={field.onChange as any}
                      />
                    )}
                  />
                </TimeSelectorsContainer>
                {timeIndex === editIndex[KitchenType.Hot] ? (
                  <FlexContainer $gap={8} $padding="0 0 0 12px">
                    <Button.Form
                      type="primary"
                      htmlType="submit"
                      style={{ width: 40, minWidth: 40 }}
                      icon={<DoneBlackIcon fill={theme.color.white} />}
                      loading={isUpdateLoading}
                      disabled={
                        hotFieldsData[timeIndex]?.["from"] === null ||
                        hotFieldsData[timeIndex]?.["to"] === null
                      }
                    />
                    <Button.Form
                      icon={<CloseBlackIcon />}
                      style={{ width: 40, minWidth: 40 }}
                      onClick={() =>
                        handleCancelEditing(timeIndex, KitchenType.Hot)
                      }
                    />
                  </FlexContainer>
                ) : (
                  <EditButtonsContainer>
                    {canTimeSlotsUpdate && (
                      <ButtonLink
                        title="Edit"
                        onClick={() =>
                          setEditIndex(prev => ({
                            ...prev,
                            [KitchenType.Hot]: timeIndex,
                          }))
                        }
                      />
                    )}
                    {canTimeSlotsDelete && (
                      <ButtonLink
                        title="Remove"
                        onClick={() =>
                          handleRemoveSlot(timeIndex, KitchenType.Hot)
                        }
                      />
                    )}
                  </EditButtonsContainer>
                )}
              </InputsContainer>
            ))
          ) : (
            <NoItemsContent
              Icon={DescriptionBlackIcon}
              message="No Time Slots to show."
            />
          )}
        </SubContentBox>
      </ContentBox>

      <ConfirmDialog
        open={confirmModal !== null}
        Icon={TrashIcon}
        isLoading={isUpdateLoading}
        message={getModalTitle(confirmModal)}
        description="Are you sure to continue this action?"
        onCancel={onCancelRemove}
        firstCTAButton={{
          title: "Accept",
          status: "danger",
          disabled: false,
          loading: isUpdateLoading,
          onClick: onConfirmRemove,
        }}
      />
    </>
  );
};
