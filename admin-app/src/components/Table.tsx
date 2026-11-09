import { type ReactNode } from "react";

export interface TableColumn<T> {
  header: string;
  cell: (item: T) => ReactNode | string;
  key: keyof T | string;
  className?: string;
}

export interface UniversalTableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  keyExtractor: (item: T) => string | number;
  isLoading?: boolean;
  emptyMessage?: string;
}

function Table<T>({
  data,
  columns,
  keyExtractor,
  isLoading,
  emptyMessage = "No data available",
}: UniversalTableProps<T>) {
  return (
    <div className="overflow-hidden rounded-md border border-[#E4E6EB] bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-190 border-collapse text-left text-sm text-[#2E3445]">
          <thead className="bg-[#F5F6F8] text-xs uppercase tracking-[0.04em] text-[#4A5163]">
            <tr className="font-semibold">
              {columns.map((column, index) => (
                <th key={index} scope="col" className="px-5 py-3">
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#ECEEF2]">
            {isLoading ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-5 py-10 text-center text-[#6B7285]"
                >
                  Loading...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-5 py-10 text-center text-[#6B7285]"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={keyExtractor(item)} className="hover:bg-[#F9FAFB]">
                  {columns.map((col, colIndex) => (
                    <td
                      key={colIndex}
                      className={`px-5 py-3.5 ${col.className || ""}`}
                    >
                      {col.cell(item)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
