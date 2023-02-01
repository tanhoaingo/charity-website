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
    width: 10,
    Cell: (tableProps) => (
      <img src={tableProps.row.original.isAnonymous ? tableProps.row.original.avatar : "https://letters.noticeable.io/" + tableProps.row.original.avatar} width={60} alt="Player" />
    ),
  },
  {
    Header: "Họ và tên",
    Footer: "username",
    accessor: "fullname",
    width: 90
  },
  {
    Header: "Số tiền",
    Footer: "money",
    accessor: "amount",
    width: 90,
    Cell: (tableProps) => tableProps.row.original.amount.toFixed(0).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.") + " VNĐ"
  },
  {
    Header: "Phương thức thanh toán",
    Footer: "method",
    accessor: "paymentMethod",
    width: 60
  },
  {
    Header: "Ngày",
    Footer: "Ngày",
    accessor: "createAt",
    width: 50
    // Cell: (value) => {
    //   return format(new Date(value.row.original.date, "dd/MM/yyyy"));
    // },toLocaleDateString("en-US")
  },
  {
    Header: "Chương trình",
    Footer: "duan",
    accessor: "titlePost",
  },
];
