import { format } from "date-fns";

export const COLUMNS = [
  {
    Header: "Hạng",
    Footer: "username",
    accessor: "index",
    Cell: (tableProps) => (
      <span className={tableProps.row.original.index < 4 ? "rank top" : "rank"}>
        {tableProps.row.original.index}{" "}
      </span>
    ),
  },
  {
    Header: "Ảnh đại diện",
    Footer: "avatar",
    accessor: "avatar",
    width: 50,
    Cell: (tableProps) => (
      <img src={"https://letters.noticeable.io/" + tableProps.row.original.avatar} width={60} alt="Player" />
    ),
  },
  {
    Header: "Username",
    Footer: "username",
    accessor: "username",
  },
  {
    Header: "Họ và tên",
    Footer: "Họ và tên",
    accessor: "fullname",
    // Cell: (value) => {
    //   return format(new Date(value.row.original.date, "dd/MM/yyyy"));
    // },toLocaleDateString("en-US")

  },
  {
    Header: "Email",
    Footer: "email",
    accessor: "email",
  },
  {
    Header: "Số lần",
    Footer: "Số lần",
    accessor: "times",
  },
  {
    Header: "Danh hiệu",
    Footer: "Danh hiệu",
    accessor: "rank",
    Cell: (tableProps) => (
      <span className={"hang " + tableProps.row.original.rank}>
        {tableProps.row.original.rank === "kimcuong"
          ? "Kim cương"
          : tableProps.row.original.rank === "hangvang"
          ? "Vàng"
          : tableProps.row.original.rank === "hangbac"
          ? "Bạc"
          : tableProps.row.original.rank === "hangdong"
          ? "Đồng"
          : ""}
      </span>
    ),
  },
  {
    Header: "Tổng điểm",
    Footer: "Tổng điểm",
    accessor: "point",
    Cell: (tableProps) => tableProps.row.original.point.toFixed(0).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")
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
