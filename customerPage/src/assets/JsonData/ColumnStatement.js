import { format } from "date-fns";

export const COLUMNSTATEMENT = [
  {
    Header: "ID",
    Footer: "username",
    accessor: "id",
  },
  {
    Header: "username",
    Footer: "username",
    accessor: "username",
  },
  {
    Header: "money",
    Footer: "money",
    accessor: "money",
  },
  {
    Header: "method",
    Footer: "method",
    accessor: "method",
  },
  {
    Header: "Ngày",
    Footer: "Ngày",
    accessor: "date",
    // Cell: (value) => {
    //   return format(new Date(value.row.original.date, "dd/MM/yyyy"));
    // },toLocaleDateString("en-US")

    // Cell: (tableProps) => {
    //   var localDate = new Date(tableProps.row.original.date.toString());
    //   return localDate.toLocaleDateString("en-US");
    // },

    Cell: (tableProps) => {
      var localDate = new Date(tableProps.row.original.date.toString());

      localDate = localDate.toLocaleDateString("en-US");
      var initial = localDate.split(/\//);
      if (initial[1] && initial[0]) {
        if (initial[1].length === 1) initial[1] = "0" + initial[1];
        if (initial[0].length === 1) initial[0] = "0" + initial[0];
      }
      return [initial[2], initial[1], initial[0]].join("-");
    },
  },
  {
    Header: "type",
    Footer: "type",
    accessor: "type",
    Cell: (tableProps) => (
      <span
        className={
          tableProps.row.original.type === "mot lan"
            ? "status once"
            : "status monthly"
        }
      >
        {tableProps.row.original.type === "mot lan" ? "một lần" : "hàng tháng"}
      </span>
    ),
  },
];
