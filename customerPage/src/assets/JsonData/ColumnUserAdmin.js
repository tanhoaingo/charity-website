import { format, set } from "date-fns";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./tablegeneral.css";
import charityImg from "../../assets/img/charity.gif";
import Select from "react-select";
// toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

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
      <img src={"https://letters.noticeable.io/" + tableProps.row.original.avatar} width={60} alt="Player" />
    ),
  },
  {
    Header: "Họ và tên",
    Footer: "Họ và tên",
    accessor: "fullname",
    width: 90
  },
  {
    Header: "Ngày đăng ký",
    Footer: "Ngày",
    accessor: "createAt",
    width: 50
    // Cell: (value) => {
    //   return format(new Date(value.row.original.date, "dd/MM/yyyy"));
    // },toLocaleDateString("en-US")
  },
  {
    Header: "Email",
    Footer: "email",
    accessor: "email",
    width: 80
    // Cell: (tableProps) => (
    //   <span className={"hang " + tableProps.row.original.hang}>
    //     {tableProps.row.original.hang === "kimcuong"
    //       ? "Kim cương"
    //       : tableProps.row.original.hang === "hangvang"
    //       ? "Vàng"
    //       : tableProps.row.original.hang === "hangbac"
    //       ? "Bạc"
    //       : tableProps.row.original.hang === "hangdong"
    //       ? "Đồng"
    //       : ""}
    //   </span>
    // ),
  },
  {
    Header: "Số điện thoại",
    Footer: "Số điện thoại",
    accessor: "phoneNumber",
  },
  {
    Header: "Chương trình",
    Footer: "Chương trình",
    accessor: "title",
    width: 110
  },
  {
    Header: "",
    Footer: "status",
    accessor: "status",
    width: 110,
    Cell: (tableProps) => {
      const [point, setPoint] = useState(0);
      const [openModal, setOpenModal] = useState(false);
      const [reload, setReload] = useState(false);
      const optionMonth = [
        { value: 1, label: "Tháng 7" },
        { value: 20, label: "Tháng 8" },
        { value: 50, label: "Tháng 9" },
        { value: 100, label: "Tháng 10" },
        { value: 1300, label: "Tháng 11" },
      ];
      const optionScore = [
        { value: 1, label: "5" },
        { value: 20, label: "6" },
        { value: 50, label: "7" },
        { value: 100, label: "8" },
        { value: 1030, label: "9" },
        { value: 1010, label: "10" },
      ];

      // toast
      const notify = () => {
        if (true) {
          toast.success("🎄 Đã đánh giá thành công", {
            position: "top-right",
            autoClose: 5222,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            width: "500px",
          });
          setOpenModal(false);
        }
      };
      const notify1 = () => {
        if (true) {
          toast.success("😊 Đã chấp nhận tình nguyện viên", {
            position: "top-right",
            autoClose: 5222,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            width: "500px",
          });
          setOpenModal(false);
        }
      };
      const notify2 = () => {
        if (true) {
          toast.success("🥺 Đã xóa tình nguyện viên", {
            position: "top-right",
            autoClose: 5222,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            width: "500px",
          });
          setOpenModal(false);
        }
      };

      return (
        <span>
          {tableProps.row.original.status === "CHỜ PHÊ DUYỆT TÌNH NGUYỆN VIÊN" ? (
            <span className="adminduyet">
              <i onClick={() => {
                axios.put("http://localhost:8080/volunteer/update/" + tableProps.row.original.id, "ĐÃ TRỞ THÀNH TÌNH NGUYỆN VIÊN").then(() => {
                  tableProps.row.original.status = "ĐÃ TRỞ THÀNH TÌNH NGUYỆN VIÊN";
                  setReload(!reload);
                }
                );
                notify1();
              }}
                class="btn-see accept fas fa-vote-yea"></i>
              <i onClick={() => {
                axios.put("http://localhost:8080/volunteer/update/" + tableProps.row.original.id, "ĐÃ BỊ TỪ CHỐI").then(() => {
                  tableProps.row.original.status = "ĐÃ BỊ TỪ CHỐI";
                  setReload(!reload);
                }
                );
                notify2();
              }} class="btn-see remove fas fa-trash-alt"></i>
            </span>
          ) : tableProps.row.original.status === "ĐÃ TRỞ THÀNH TÌNH NGUYỆN VIÊN" ? (
            <div
              className="adminduyet-open-modal"
              onClick={() => {
                setPoint(0);
                setOpenModal(true);
              }}
            >
              Đánh giá
            </div>
          ) : (
            <div
              className="adminduyet-open-modal delete"
            >
              đã xóa
            </div>
          )}

          <div
            className={
              openModal ? "edit-modal__wrapper active" : "edit-modal__wrapper"
            }
          >
            <div className="edit-modal">
              <div
                className="btn-exit"
                onClick={() => {
                  setOpenModal(0);
                }}
              >
                <i class="fas fa-times"></i>
              </div>

              <h3 className="title">
                Đánh giá hoạt động của tình nguyện viên <span>Lâm Hồng</span>
              </h3>

              <div className="body">
                <div className="left">
                  <img src={charityImg} alt="" />
                </div>
                <div className="right">
                  {/*                   <div className="session">
                    <h5 className="title">Chọn tháng</h5>
                    <Select
                      placeholder=""
                      className="honghong year"
                      options={optionMonth}
                    />
                  </div>

                  <div className="session">
                    <h5 className="title">Đánh giá</h5>
                    <Select
                      placeholder=""
                      className="honghong year"
                      options={optionScore}
                    />
                  </div> */}
                  <form onSubmit={(e) =>{
                    e.preventDefault();
                    axios.put(`http://localhost:8080/volunteer/evaluate/${tableProps.row.original.id}/${point}`);
                    notify();
                  }}>
                    <div className="session">
                      <h5 className="title">Cho điểm</h5>
                      <input name="point" id="" type="number" value={point} onChange={(e) => {
                        setPoint(e.target.value);
                      }}></input>
                    </div>
                    <button type="submit"
                    >Hoàn tất</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </span>
      );
    },
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
