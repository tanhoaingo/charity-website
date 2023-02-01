import { format } from "date-fns";

export const COLUMNS = [
  {
    Header: "Username",
    Footer: "username",
    accessor: "username",
  },
  {
    Header: "Ảnh đại diện",
    Footer: "avatar",
    accessor: "avatar",
    width: 50,
    Cell: (tableProps) => (
      <img src={"https://letters.noticeable.io/" + tableProps.row.original.avatar} alt="Player" />
    ),
  },
  {
    Header: "Họ và tên",
    Footer: "Họ và tên",
    accessor: "fullname",
  },
  {
    Header: "Email",
    Footer: "email",
    accessor: "email",
  },
  {
    Header: "Số điện thoại",
    Footer: "Số điện thoại",
    accessor: "phoneNumber",
  },
  {
    Header: "Tổng tiền",
    Footer: "total",
    accessor: "total",
    Cell: (tableProps) => tableProps.row.original.total.toFixed(0).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.") + " VNĐ"
  },
  {
    Header: "Số lần",
    Footer: "count",
    accessor: "times",
  },

  // {
  //   Header: "type",
  //   Footer: "type",
  //   accessor: "type",
  //   Cell: (tableProps) => (
  //     <span
  //       className={
  //         tableProps.row.original.type === "mot lan"
  //           ? "status once"
  //           : "status monthly"
  //       }
  //     >
  //       {tableProps.row.original.type === "mot lan" ? "một lần" : "hàng tháng"}
  //     </span>
  //   ),
  //},
];
