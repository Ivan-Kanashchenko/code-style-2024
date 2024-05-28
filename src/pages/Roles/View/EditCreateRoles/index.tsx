// Lib
import { Checkbox, Input } from "components/Form";
import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Spin } from "antd";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
// Api
import {
  useCreateRoleMutation,
  useGetRolesQuery,
  useUpdateRoleMutation,
} from "redux/query/rolesAPI";
import { useLazyGetAuthMeQuery } from "redux/query/authMeAPI";
import { useGetPermissionsQuery } from "redux/query/permissionsAPI";
// Hooks
import { useAppDispatch, useNotification, usePermissions } from "hooks";
// Actions
import { setUser } from "redux/slices";
// Types
import { RolesPermissionsState } from "types/roles";
// Constants
import { ADMIN_ROUTES, NOTIFICATIONS, permissionLabel } from "consts";
// Helpers
import {
  dotReplace,
  handleInitialCreateState,
  handleInitialEditState,
  createFormFields,
  selectAllFields,
  clearAllFields,
  isAllChecked,
  isAllCleared,
  isNameAlreadyExist,
  convertToPayload,
} from "./helpers";
// Utils
import { errorHandler } from "utils/errorHandler";
// Components
import { ArrowBackLink, Loader } from "components";
import { Rules } from "../components";
// Styled
import {
  ContentBox,
  FlexContainer,
  PageHeadingContainer,
  PageTitleContainer,
} from "styled/Box";
import { Typography } from "styled/Typography";
import { Button } from "styled/Buttons";
import { ErrorMessage } from "components/Form/styled";
import { CheckBoxContainer, MainFormWrapper, Wrapper } from "./styled";

import { resolver } from "./validation";

export const EditCreateRoles: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const { openNotification } = useNotification();

  const { canPermissionsGet, canRolesCreate, canRolesUpdate, canRolesGet } =
    usePermissions();

  const [getMe] = useLazyGetAuthMeQuery();
  const [createRole, { isLoading: isRoleCreateLoading }] =
    useCreateRoleMutation();

  const [updateRole, { isLoading: isRoleUpdateLoading }] =
    useUpdateRoleMutation();

  const {
    data: rolesData,
    isFetching: isRolesDataFetching,
    error: rolesDataError,
  } = useGetRolesQuery(null, {
    skip: !canRolesGet,
  });

  const {
    data: permissionsData,
    isFetching: isPermissionsFetching,
    error: permissionsDataError,
  } = useGetPermissionsQuery(null, {
    refetchOnMountOrArgChange: 120,
    skip: !canPermissionsGet,
  });

  useEffect(() => {
    if (rolesDataError) {
      errorHandler({ error: rolesDataError, openNotification });
    }
  }, [rolesDataError]);

  useEffect(() => {
    if (permissionsDataError) {
      errorHandler({ error: permissionsDataError, openNotification });
    }
  }, [permissionsDataError]);

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(() =>
    isEdit ? false : true,
  );
  const [all, setAll] = useState({ selectedAll: false, clearedAll: false });
  const [nameError, setNameError] = useState(false);

  const { handleSubmit, control, reset, watch, getValues } =
    useForm<RolesPermissionsState>(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      { resolver },
    );

  const formFields = createFormFields(permissionsData);

  const name = watch("name");
  const watcher = watch();

  useEffect(() => {
    setNameError(false);
  }, [name]);

  const initialEdit = isEdit && !!permissionsData?.length && rolesData;

  const initialCreate = !isEdit && !!permissionsData?.length;

  useEffect(() => {
    if (initialEdit) {
      reset(handleInitialEditState(id, permissionsData, rolesData));
      return;
    }

    if (initialCreate) {
      reset(handleInitialCreateState(permissionsData));
      return;
    }
  }, [permissionsData, rolesData]);

  useEffect(() => {
    if (all.selectedAll) {
      if (!isAllChecked(getValues())) {
        setAll(prev => ({ ...prev, selectedAll: false }));
      }
    }

    if (all.clearedAll) {
      if (!isAllCleared(getValues())) {
        setAll(prev => ({ ...prev, clearedAll: false }));
      }
    }

    if (isAllCleared(getValues())) {
      setIsSubmitDisabled(true);
    } else {
      setIsSubmitDisabled(false);
    }
  }, [watcher]);

  const handleSelectAll = (value: boolean) => {
    setAll(prev => ({ ...prev, selectedAll: value, clearedAll: false }));

    if (value) {
      reset(selectAllFields(getValues()));
    } else {
      if (initialEdit) {
        reset(handleInitialEditState(id, permissionsData, rolesData, name));
        return;
      }

      if (initialCreate) {
        reset(handleInitialCreateState(permissionsData, name));
        return;
      }
    }
  };

  const handleClearAll = (value: boolean) => {
    setAll(prev => ({ ...prev, clearedAll: value, selectedAll: false }));

    if (value) {
      reset(clearAllFields(getValues()));
    } else {
      if (initialEdit) {
        reset(handleInitialEditState(id, permissionsData, rolesData, name));
        return;
      }

      if (initialCreate) {
        reset(handleInitialCreateState(permissionsData, name));
        return;
      }
    }
  };

  const onSubmit: SubmitHandler<RolesPermissionsState> = async data => {
    const { name } = data;

    if (isNameAlreadyExist({ id, name, rolesData })) {
      setNameError(true);
      return;
    }

    if (isAllCleared(data)) {
      errorHandler({
        error: "Please select at least one permission",
        openNotification,
      });
      return;
    }

    try {
      if (isEdit) {
        if (!canRolesUpdate) return;

        await updateRole({ id, ...convertToPayload(data) }).unwrap();

        const me = await getMe().unwrap();

        dispatch(setUser(me));

        openNotification({ message: NOTIFICATIONS.ROLE_UPDATED });
      } else {
        if (!canRolesCreate) return;

        await createRole(convertToPayload(data)).unwrap();

        const me = await getMe().unwrap();

        dispatch(setUser(me));

        openNotification({ message: NOTIFICATIONS.ROLE_CREATED });
      }

      navigate(ADMIN_ROUTES.ROLES.path);
    } catch (error) {
      errorHandler({ error, openNotification });
    }
  };

  const isLoading = isRoleCreateLoading || isRoleUpdateLoading;

  return (
    <FlexContainer
      $fullwidth
      $column
      $gap={24}
      as="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <PageHeadingContainer>
        <PageTitleContainer $column $gap={16}>
          <ArrowBackLink title="Back to Roles" path={ADMIN_ROUTES.ROLES.path} />

          <Typography.H1>{isEdit ? "Edit" : "Add"} Role</Typography.H1>
        </PageTitleContainer>

        <Button.Heading
          type="primary"
          htmlType="submit"
          loading={isRoleCreateLoading || isRoleUpdateLoading}
          disabled={isSubmitDisabled}
        >
          Save
        </Button.Heading>
      </PageHeadingContainer>

      <Wrapper>
        <MainFormWrapper $gap={16} $column>
          <ContentBox $column>
            <Typography.H2>Role name</Typography.H2>

            <div>
              <Controller
                name="name"
                control={control}
                render={({ field, fieldState }) => (
                  <Input
                    disabled={isLoading}
                    {...field}
                    fieldState={fieldState}
                    fieldError={nameError}
                  />
                )}
              />

              {nameError && (
                <ErrorMessage>
                  {`Role with name '${name}' is already exist`}
                </ErrorMessage>
              )}
            </div>
          </ContentBox>

          <Spin
            spinning={isRolesDataFetching || isPermissionsFetching}
            indicator={<Loader />}
          >
            <ContentBox $column>
              <FlexContainer
                $fullwidth
                $align="center"
                $justify="space-between"
              >
                <Typography.H2>Permissions</Typography.H2>

                <FlexContainer $gap={24}>
                  <Checkbox
                    label="Select all"
                    disabled={isLoading}
                    checked={all.selectedAll}
                    onChange={e => handleSelectAll(e.target.checked)}
                  />

                  <Checkbox
                    label="Clear all"
                    disabled={isLoading}
                    checked={all.clearedAll}
                    onChange={e => handleClearAll(e.target.checked)}
                  />
                </FlexContainer>
              </FlexContainer>

              <CheckBoxContainer $gridRows={Math.ceil(formFields.length / 2)}>
                {formFields.map(p => (
                  <Controller
                    key={p}
                    name={p}
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        key={dotReplace(p, true)}
                        label={
                          permissionLabel[dotReplace(p, false)] ||
                          dotReplace(p, false)
                        }
                        {...field}
                        disabled={isLoading}
                        checked={field.value}
                        onChange={e => field.onChange(e.target.checked)}
                      />
                    )}
                  />
                ))}
              </CheckBoxContainer>
            </ContentBox>
          </Spin>
        </MainFormWrapper>

        <Rules />
      </Wrapper>
    </FlexContainer>
  );
};
