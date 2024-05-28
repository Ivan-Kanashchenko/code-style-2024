// Lib
import { FC } from "react";
// Api
// Hooks
// Actions
// Selectors
// Types
// Theme
// Constants
import { TABLE_DATE } from "consts";
// Helpers
import { dateTransform } from "helpers/dataHelpers";
// Utils
// Icons
import { DownloadIcon } from "icons";
// Layouts
// Components
// Styled
import { ExportButton } from "./styled";

interface ExportProps {
  type?: "Heading" | "Base";
  fileName: string;
  isLoading: boolean;
  isDisabled: boolean;
  columns: Record<string, unknown>[];
  getExportData: () => Promise<Record<string, unknown>[]>;
}

function extractValues(keys: string[], data: Record<string, unknown>[]) {
  const rowsArray = data.map(d => {
    const rows = keys.map(k => {
      if (k === "createdAt" || k === "updatedAt") {
        return dateTransform({
          date: d[k] as string,
          format: TABLE_DATE,
        });
      }
      return d[k];
    });

    return rows;
  });

  return rowsArray;
}

export const Export: FC<ExportProps> = ({
  type = "Heading",
  isLoading,
  isDisabled,
  fileName,
  columns,
  getExportData,
}) => {
  const titles = columns.map(c => c?.title);

  const keys = columns
    .map(c => c?.key)
    .filter(el => typeof el === "string") as string[];

  const convertToCSV = (arr: unknown[][]) => {
    return arr
      .map(row =>
        row
          .map(data => {
            if (typeof data === "string" && data.includes(",")) {
              return `"${data}"`;
            }

            return data;
          })
          .join(","),
      )
      .join("\n");
  };

  const downloadCSV = async () => {
    const data = await getExportData();

    const rowsArray = extractValues(keys, data);

    const csvData = [titles, ...rowsArray];

    const csvContent =
      "data:text/csv;charset=utf-8," +
      encodeURIComponent(convertToCSV(csvData));
    const link = document.createElement("a");
    link.setAttribute("href", csvContent);
    link.setAttribute("download", `${fileName}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const Component = ExportButton[type];

  return (
    <Component
      icon={<DownloadIcon />}
      loading={isLoading}
      disabled={isDisabled}
      onClick={downloadCSV}
    >
      Export
    </Component>
  );
};
