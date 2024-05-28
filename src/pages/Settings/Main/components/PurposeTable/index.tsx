// Lib
import { FC, useEffect, useState } from "react";
import { Form } from "antd";
// Api
import {
  useCreatePurposeOptionMutation,
  useGetPurposeOptionsQuery,
  useRemovePurposeOptionMutation,
  useUpdatePurposeOptionMutation,
} from "redux/query/authSettingsAPI";
// Hooks
import { useNotification, usePermissions } from "hooks";
// Theme
import { theme } from "theme";
// Constants
import { rtkQueryParams } from "consts";
// Helpers
import { generateUniqueId } from "helpers/dataHelpers";
// Utils
import { errorHandler } from "utils/errorHandler";
// Icons
import {
  CloseBlackIcon,
  DoneBlackIcon,
  OrdersIcon,
  PlusIcon,
  TrashIcon,
} from "icons";
// Components
import { ButtonLink, Table } from "components";
import { Input, InputNumber } from "components/Form";
import { ConfirmDialog } from "components/Modals";
// Styled
import { ContentBox, FlexContainer } from "styled/Box";
import { Button } from "styled/Buttons";
import { Typography } from "styled/Typography";

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: any;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `${title} is required`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

type ColumnsData = {
  name: string;
  value: string;
  key: string;
};

export const PurposeTable: FC = () => {
  const { canPurposeCreate, canPurposeUpdate, canPurposeDelete } =
    usePermissions();

  const { openNotification } = useNotification();

  const [form] = Form.useForm();

  const [data, setData] = useState<ColumnsData[]>([]);

  const [editingKey, setEditingKey] = useState("");

  const [confirmModal, setConfirmModal] = useState<ColumnsData | null>(null);

  const {
    data: optionsData,
    isFetching: isTableDataLoading,
    error: optionsError,
  } = useGetPurposeOptionsQuery(null, rtkQueryParams);
  const [create, { isLoading: isCreateOptionLoading }] =
    useCreatePurposeOptionMutation();
  const [update, { isLoading: isUpdateOptionLoading }] =
    useUpdatePurposeOptionMutation();
  const [remove, { isLoading: isRemoveOptionLoading }] =
    useRemovePurposeOptionMutation();

  useEffect(() => {
    if (optionsData) {
      setData(
        optionsData.map(({ name, id }) => ({ value: name, name: id, key: id })),
      );
    }
  }, [optionsData]);

  useEffect(() => {
    if (optionsError) {
      errorHandler({ error: optionsError, openNotification });
    }
  }, [optionsError]);

  const isEditing = (record: ColumnsData) => record.key === editingKey;

  const handleEdit = (record: ColumnsData) => {
    form.setFieldsValue(record);

    setEditingKey(record.key);
  };

  const onCancel = () => {
    if (editingKey.includes("temp")) {
      setData(prev => prev.filter(item => item.key !== editingKey));
    }
    setEditingKey("");
  };

  const onSave = async (key: React.Key) => {
    try {
      const row = await form.validateFields();

      if (!row.value) return;
      const newData = [...data];

      if (key.toString().includes("temp")) {
        await create({ name: row.value }).unwrap();
      } else {
        await update({ id: key.toString(), name: row.value }).unwrap();
      }
      const index = newData.findIndex(item => key === item?.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (error) {
      if ("values" in error && "errorFields" in error) {
        return;
      }
      errorHandler({ error, openNotification });
    }
  };

  const handleAddOption = () => {
    const id = `temp-${generateUniqueId()}`;

    form.setFieldsValue({ name: id, value: "" });

    setEditingKey(id);
    setData(prev => [{ value: "", name: id, key: id }, ...prev]);
  };

  const onConfirmRemove = async () => {
    if (!confirmModal) return;

    try {
      await remove({ id: confirmModal.key }).unwrap();

      setConfirmModal(null);
    } catch (error) {
      errorHandler({ error, openNotification });
    }
  };

  const onCancelRemove = () => {
    setConfirmModal(null);
  };

  const columns = [
    {
      title: "name",
      dataIndex: "value",
      editable: true,
      render: (text: string) => (
        <FlexContainer $align="center" $height="40px" $padding="0 13px">
          {text}
        </FlexContainer>
      ),
    },
    {
      title: "operation",
      dataIndex: "operation",
      align: "right" as const,
      render: (_: any, record: ColumnsData) => {
        const editable = isEditing(record);
        return editable ? (
          <FlexContainer $gap={8} $align="center" $justify="flex-end">
            <Button.Form
              type="primary"
              style={{ width: 40 }}
              loading={isCreateOptionLoading || isUpdateOptionLoading}
              icon={<DoneBlackIcon fill={theme.color.white} />}
              onClick={() => onSave(record.key)}
            />

            <Button.Form
              icon={<CloseBlackIcon />}
              style={{ width: 40 }}
              disabled={isCreateOptionLoading || isUpdateOptionLoading}
              onClick={onCancel}
            />
          </FlexContainer>
        ) : (
          <FlexContainer $gap={8} $align="center" $justify="flex-end">
            {canPurposeUpdate && (
              <ButtonLink
                title="Edit"
                disabled={!canPurposeUpdate || editingKey !== ""}
                onClick={() => handleEdit(record)}
              />
            )}

            {canPurposeDelete && (
              <ButtonLink
                title="Remove"
                disabled={!canPurposeDelete || editingKey !== ""}
                onClick={() => setConfirmModal(record)}
              />
            )}
          </FlexContainer>
        );
      },
    },
  ];

  const mergedColumns = columns.map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: ColumnsData) => ({
        record,
        inputType: "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <>
      <ContentBox $column $gap={12}>
        <FlexContainer $fullwidth $align="flex-start" $justify="space-between">
          <Typography.H2>Purpose Options</Typography.H2>

          {canPurposeCreate && (
            <Button.Base
              type="primary"
              icon={<PlusIcon fill="white" />}
              onClick={handleAddOption}
              disabled={!canPurposeCreate || editingKey !== ""}
            >
              Add Option
            </Button.Base>
          )}
        </FlexContainer>

        <Form form={form} component={false}>
          <Table
            rowKey={"key"}
            loading={isTableDataLoading}
            shadow={false}
            showHeader={false}
            nested={true}
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            empty={{
              icon: OrdersIcon,
              title: "No options to show.",
            }}
            dataSource={data}
            columns={mergedColumns}
          />
        </Form>
      </ContentBox>

      <ConfirmDialog
        open={!!confirmModal}
        Icon={TrashIcon}
        isLoading={isRemoveOptionLoading}
        message={confirmModal && `${confirmModal?.value} will be removed`}
        description="Are you sure to continue this action?"
        onCancel={onCancelRemove}
        firstCTAButton={{
          title: "Accept",
          status: "danger",
          disabled: false,
          loading: isRemoveOptionLoading,
          onClick: onConfirmRemove,
        }}
      />
    </>
  );
};
