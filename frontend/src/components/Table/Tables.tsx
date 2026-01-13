import React from "react";
import "./Tables.css";

interface Action {
  name?: string;
  icon?: string;
  onClick: () => void;
}

interface TableRow {
  _id?: number;
  title?: string;
  category?: string;
  price?: number;
  description?: string;
  duration?: string;
  image?: string;
  content?: string;
  studentName?: string;
  email?: string;
  courseName?: string;
  enrolledAt?: string;
  actions?: Action[];
  active?: string;
}

export interface ColumnConfig {
  key: keyof TableRow | "actions" | "image";
  header: string;
  render?: (row: any) => React.ReactNode;
}

interface TableDataProps {
  rows: TableRow[];
  columns: ColumnConfig[];
  onRowClick?: (row: TableRow) => void;
}

const Tables = ({ rows, columns, onRowClick }: TableDataProps) => {
  return (
    <table className="tableOuter">
      <thead className="tableHeader">
        <tr>
          {columns.map((col, index) => (
            <th key={index}> {col.header} </th>
          ))}
        </tr>
      </thead>
      <tbody className="tableBody">
        {rows.map((row) => (
          <tr key={row._id} onClick={() => onRowClick && onRowClick(row)}>
            {columns.map((col, index) => {
              if (col.key === "image") {
                return (
                  <td key={index}>
                    {row.image && (
                      <img src={row.image} height={40} width={40} alt="course" />
                    )}
                  </td>
                );
              } else if (col.key === "actions") {
                return (
                  <td key={index} style={{ paddingLeft: "50px" }}>
                    {row.actions?.map((action, actionIndex) => (
                      <img
                        key={actionIndex}
                        src={action.icon || ""}
                        alt={action.name}
                        style={{ cursor: "pointer", paddingRight: "10px" }}
                        onClick={(event) => {
                          event.stopPropagation();
                          action.onClick();
                        }}
                      />
                    ))}
                  </td>
                );
              } else {
                return (
                  <td key={index}>
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                );
              }
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Tables;
