// Lib
import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CollapseProps, Spin } from "antd";
// Api
import { useDeleteRoleMutation, useGetRolesQuery } from "redux/query/rolesAPI";
// Hooks
import { useNotification, usePermissions } from "hooks";
// Types
import { RoleResponseDto } from "types/roles";
// Theme
import { theme } from "theme";
// Constants
import {
  ADMIN_ROUTES,
  DAY_MONTH_YEAR_DATE,
  NOTIFICATIONS,
  permissionLabel,
  rtkQueryParams,
} from "consts";
// Helpers
import { dateTransform } from "helpers/dataHelpers";
// Utils
import { errorHandler } from "utils/errorHandler";
// Icons
import { ManageAccountsIcon, PencilIcon, PlusIcon, TrashIcon } from "icons";
// Components
import { Badge, Loader, NoItemsContent } from "components";
import { ConfirmDialog } from "components/Modals";
// Styled
import {
  FlexContainer,
  PageHeadingContainer,
  PageTitleContainer,
} from "styled/Box";
import { Typography } from "styled/Typography";
import { Button } from "styled/Buttons";
import {
  Action,
  Collapse,
  CollapseContainer,
  CollapseTableWrapper,
  DownArrow,
  Header,
  HeaderItem,
  LabelDescription,
} from "./styled";

export const Roles: FC = () => {
  const {
    canRolesGet,
    canRolesCreate,
    canPermissionsGet,
    canRolesUpdate,
    canRolesDelete,
  } = usePermissions();

  const navigate = useNavigate();
  const { openNotification } = useNotification();

  const [deleteRole, { isLoading }] = useDeleteRoleMutation();

  const { data, isFetching, error } = useGetRolesQuery(null, {
    ...rtkQueryParams,
    skip: !canRolesGet,
  });

  useEffect(() => {
    if (error) {
      errorHandler({ error, openNotification });
    }
  }, [error]);

  const [roleDeleteConfirm, setRoleDeleteConfirm] = useState<
    RoleResponseDto | false
  >(false);

  const handleAddRole = () => {
    navigate(ADMIN_ROUTES.ROLES_CREATE.path);
  };

  const onEdit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string,
  ) => {
    e.stopPropagation();
    navigate(`/roles/${id}`);
  };

  const onDelete = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string,
  ) => {
    e.stopPropagation();
    const role = data?.items?.find(role => role.id === id);

    if (role) {
      setRoleDeleteConfirm(role);
    }
  };

  const onDeleteConfirm = async () => {
    if (!roleDeleteConfirm) {
      return;
    }

    try {
      await deleteRole({ id: roleDeleteConfirm.id }).unwrap();

      openNotification({
        message: NOTIFICATIONS.ROLE_DELETE,
      });

      setRoleDeleteConfirm(false);
    } catch (error) {
      errorHandler({ error, openNotification });
    }
  };

  const isActions = [canRolesDelete, canRolesUpdate]?.filter(Boolean).length;

  const createCollapseItems = (
    items: RoleResponseDto[],
  ): CollapseProps["items"] => {
    if (!items?.length) {
      return [];
    }

    return items.map(role => ({
      key: role.id,
      label: (
        <FlexContainer $fullwidth $align="flex-start" $justify="space-between">
          <FlexContainer $column $gap={4}>
            <Typography.Title>{role.name}</Typography.Title>
            {canPermissionsGet && (
              <LabelDescription>
                {role.permissions?.length} permissions
              </LabelDescription>
            )}
          </FlexContainer>

          <FlexContainer>
            <FlexContainer
              $width="160px"
              $padding="12px"
              $gap={16}
              $align="center"
            >
              {dateTransform({
                date: role?.createdAt,
                format: DAY_MONTH_YEAR_DATE,
              })}
            </FlexContainer>

            <FlexContainer
              $width="160px"
              $padding="12px"
              $gap={16}
              $align="center"
            >
              {dateTransform({
                date: role?.updatedAt,
                format: DAY_MONTH_YEAR_DATE,
              })}
            </FlexContainer>

            <FlexContainer
              $width={
                isActions === 2 ? "100px" : isActions === 1 ? "50px" : "0"
              }
              $padding="12px"
              $gap={16}
              $align="center"
              style={{
                width: `${isActions * 50}px`,
                display: isActions ? "static" : "none",
              }}
            >
              {canRolesUpdate && (
                <Action onClick={e => onEdit(e, role.id)}>
                  <PencilIcon />
                </Action>
              )}

              {canRolesDelete && (
                <Action onClick={e => onDelete(e, role.id)}>
                  <TrashIcon />
                </Action>
              )}
            </FlexContainer>
          </FlexContainer>
        </FlexContainer>
      ),
      children: !canPermissionsGet ? undefined : (
        <FlexContainer $wrap $gap={8} $padding="0 0 16px">
          {role.permissions.map(p => (
            <Badge key={p.name} title={permissionLabel[p.name]} />
          ))}
        </FlexContainer>
      ),
    }));
  };

  const items = createCollapseItems(data?.items || []);

  return (
    <>
      <FlexContainer $fullwidth $column $gap={24}>
        <PageHeadingContainer>
          <PageTitleContainer>
            <Typography.H1>Roles</Typography.H1>
          </PageTitleContainer>
          {canRolesCreate && (
            <Button.Heading
              type="primary"
              icon={<PlusIcon fill={theme.color.white} />}
              onClick={handleAddRole}
            >
              Add Role
            </Button.Heading>
          )}
        </PageHeadingContainer>
        <CollapseContainer>
          <CollapseTableWrapper>
            <Header $isActions={isActions}>
              <HeaderItem>Name</HeaderItem>
              <HeaderItem>Created at</HeaderItem>
              <HeaderItem>Updated at</HeaderItem>
              <HeaderItem />
            </Header>
            <Spin
              spinning={isFetching}
              indicator={
                <>
                  <Loader />
                </>
              }
            >
              {items?.length ? (
                <Collapse
                  items={items}
                  expandIcon={({ isActive }) => (
                    <DownArrow $rotate={isActive ? -180 : 0} />
                  )}
                />
              ) : isFetching ? (
                <NoItemsContent message={"No data"} Icon={ManageAccountsIcon} />
              ) : (
                <NoItemsContent
                  message={"No rules to show."}
                  description="Try to create new rule"
                  Icon={ManageAccountsIcon}
                />
              )}
            </Spin>
          </CollapseTableWrapper>
        </CollapseContainer>
      </FlexContainer>

      <ConfirmDialog
        open={!!roleDeleteConfirm}
        isLoading={isLoading}
        Icon={TrashIcon}
        message={
          !!roleDeleteConfirm &&
          `Role ${roleDeleteConfirm?.name} will be deleted`
        }
        description="Are you sure to continue this action?"
        onCancel={() => setRoleDeleteConfirm(false)}
        firstCTAButton={{
          title: "Delete Role",
          status: "danger",
          loading: isLoading,
          onClick: onDeleteConfirm,
        }}
      />
    </>
  );
};
