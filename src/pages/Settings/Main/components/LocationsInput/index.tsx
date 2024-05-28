// Lib
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
// Styled

import { Skeleton } from "antd";
import { ButtonLink, Modal } from "components";
import { Checkbox } from "components/Form";
import { FC, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useGetLocationsQuery } from "redux/query/locationsAPI";
import { FlexContainer } from "styled/Box";
import { Button } from "styled/Buttons";
import { Typography } from "styled/Typography";
import { Grid } from "./styled";

interface LocationsInput {
  isLoading: boolean;
  canUpdate: boolean;
  isModalOpen: boolean;
  data: string[] | undefined;
  handleAreasModalOpen: () => void;
  handleAreasModalClose: () => void;
  onSubmit: (value: string[]) => void;
}

export const LocationsInput: FC<LocationsInput> = ({
  isLoading,
  canUpdate,
  isModalOpen,
  data,
  handleAreasModalOpen,
  handleAreasModalClose,
  onSubmit,
}) => {
  const { data: locations } = useGetLocationsQuery();

  const { handleSubmit, control, reset } = useForm<Record<string, boolean>>();

  const createFormValues = () => {
    return locations.reduce((acc, field) => {
      acc[field.id] = data?.includes(field.id);
      return acc;
    }, {});
  };

  useEffect(() => {
    if (!locations || !data) {
      return;
    }
    reset(createFormValues());
  }, [isModalOpen, data, locations]);

  const onSubmitForm: SubmitHandler<Record<string, boolean>> = async data => {
    const chosenIds = Object.keys(data).filter(key => data[key] === true);
    onSubmit(chosenIds);
  };

  const handleClose = () => {
    if (isLoading) {
      return;
    }
    handleAreasModalClose();
  };

  const formFields = locations?.map(({ id, name }) => ({ id, name })) || [];

  const title = `${data?.length || 0}/${locations?.length || 0} Kitchens`;

  if (data === undefined && isLoading) {
    return <Skeleton.Input active />;
  }

  if (data === undefined) {
    return null;
  }

  return (
    <div>
      <FlexContainer $gap={16}>
        <Typography.Title>{title}</Typography.Title>
        <ButtonLink
          title={canUpdate ? "Edit" : "View"}
          onClick={handleAreasModalOpen}
        />
      </FlexContainer>

      <Modal
        title="Available Kitchens"
        open={isModalOpen}
        onClose={handleClose}
      >
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <Grid>
            {formFields.map(({ id, name }) => (
              <Controller
                key={id}
                name={id}
                control={control}
                render={({ field }) => (
                  <Checkbox
                    label={name}
                    {...field}
                    disabled={!canUpdate || isLoading}
                    checked={field.value}
                    onChange={e => field.onChange(e.target.checked)}
                  />
                )}
              />
            ))}
          </Grid>

          {canUpdate && (
            <FlexContainer
              $fullwidth
              $align="center"
              $justify="flex-end"
              $gap={8}
              $margin="24px 0 0 0"
            >
              <Button.Base disabled={isLoading} onClick={handleClose}>
                Close
              </Button.Base>

              <Button.Base loading={isLoading} type="primary" htmlType="submit">
                Save
              </Button.Base>
            </FlexContainer>
          )}
        </form>
      </Modal>
    </div>
  );
};
