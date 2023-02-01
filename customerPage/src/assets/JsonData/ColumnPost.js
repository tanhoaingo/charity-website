import { format } from "date-fns";
import { Link } from "react-router-dom";
import { EnumData } from "./enumData";

import charityImg from "../../assets/img/charity.gif";
import { useEffect, useMemo, useState } from "react";
import Select from "react-select";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ReactHtmlParser from "react-html-parser";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import usePost from "../../util/post/usePost";
import validatePost from "../../util/post/validatePost";
import "../../pages/post/createpost/image.css";
import {useDispatch} from 'react-redux'
import { getEntire } from "../../action/post";
export const COLUMNS = [
  {
    Header: "Hình ảnh",
    Footer: "image",
    accessor: "image",
    Cell: (tableProps) => (
      <img src={tableProps.row.original.image} width={190} alt="Player" />
    ),
  },
  {
    Header: "Tiêu đề",
    Footer: "title",
    accessor: "title",
  },

  {
    Header: "Đã nhận",
    Footer: "progress",
    accessor: "progress",
  },
  //   {
  //     Header: "Ngày",
  //     Footer: "Ngày",
  //     accessor: "date",
  //     // Cell: (value) => {
  //     //   return format(new Date(value.row.original.date, "dd/MM/yyyy"));
  //     // },toLocaleDateString("en-US")

  //     Cell: (tableProps) => {
  //       var localDate = new Date(tableProps.row.original.date.toString());

  //       localDate = localDate.toLocaleDateString("en-US");
  //       var initial = localDate.split(/\//);
  //       if (initial[1] && initial[0]) {
  //         if (initial[1].length === 1) initial[1] = "0" + initial[1];
  //         if (initial[0].length === 1) initial[0] = "0" + initial[0];
  //       }
  //       return [initial[1], initial[0], initial[2]].join("-");
  //     },
  //   },
  {
    Header: "Tổ chức",
    Footer: "organization",
    accessor: "organization",
    // Cell: (tableProps) => (
    //   <span>{EnumData[tableProps.row.original.owner - 1]}</span>
    // ),
  },
  {
    Header: "Phân loại",
    Footer: "type",
    accessor: "type",
  },
  {
    Header: "Thời hạn",
    Footer: "remainingDay",
    accessor: "remainingDay",
    Cell: (tableProps) => (
      <span
        className={
          tableProps.row.original.remainingDay <= 0
            ? "status d0"
            : tableProps.row.original.remainingDay < 3
              ? "status d3"
              : tableProps.row.original.remainingDay < 10
                ? "status d10"
                : "status d100"
        }
      >
        {tableProps.row.original.remainingDay <= 0
          ? "đã hoàn thành"
          : "còn " + tableProps.row.original.remainingDay + " ngày"}
      </span>
    ),
  },
  {
    Header: "",
    Footer: "action",
    accessor: "action",

    Cell: (tableProps) => {
      const { values, errors, row, files, oldImages, desc, handleChange, handleTypeChange, handleTxtAreaChange, handleUpload, handleDescChange, handleLoad, handleOldDescUpdate, clickDeleteButton, handleUpdate } = usePost(validatePost);
      const [openModal, setOpenModal] = useState(false);
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
        if (openModal) {
          toast.success("🎄 Đã chỉnh sửa thành công", {
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
      const [addDate, setVal] = useState("");
      const [addedDate, showData] = useState(0);

      /*       const handleChange = (e, editor) => {
              const data = editor.getData();
              setVal(data);
            }; */
      const options = [
        { value: "Covid 19", label: "Covid 19" },
        { value: "Trẻ em", label: "Trẻ em" },
        { value: "Người già", label: "Người già" },
        { value: "Người khuyết tật", label: "Người khuyết tật" },
        { value: "Ghép tim", label: "Ghép tim" },
        { value: "Người khó khăn", label: "Người khó khăn" },
      ];

      return (
        <span>
          <Link to={"/post?id=" + tableProps.row.original.id}>
            <i class="btn-see far fa-eye"></i>
          </Link>
          <Link to={"/analysic?id=" + tableProps.row.original.id}>
            <i class="btn-see fas fa-chart-line"></i>
          </Link>

{/*           <i onClick={() => {
            axios.get("http://localhost:8080/post/get/" + tableProps.row.original.id).then(res => {
              handleLoad(res.data);
            });
            setOpenModal(true)
          }} class="btn-see far fa-edit"></i> */}

          <div
            className={
              openModal ? "edit-modal__wrapper active" : "edit-modal__wrapper"
            }
          >
            <div className="edit-modal big">
              <div
                className="btn-exit"
                onClick={() => {
                  setOpenModal(0);
                }}
              >
                <i class="fas fa-times"></i>
              </div>
              <h2 className="title">Chỉnh sửa thông tin</h2>
              <form onSubmit={(e) => {
                  e.preventDefault();
                  notify();
                  handleUpdate(tableProps.row.original.id);               
                }}>
              <div className="create-post-page dashboard">
                <div className="upload-form__wrapper">
                  <div className="input-info">
                    <h3 className="h3title">
                      Thông tin cơ bản về chương trình
                    </h3>
                    <div className="input-session name">
                      <input type="text" placeholder="Nhập tên chương trình" name="title" onChange={handleChange} value={values.title} />
                    </div>
                    {errors.title && <p style={{ color: 'red', fontSize: 'small' }}>{errors.title}</p>}
                    <div className="input-session name">
                      <input type="text" placeholder="Nhập tên tổ chức" name="organization" onChange={handleChange} value={values.organization} />
                    </div>
                    {errors.organization && <p style={{ color: 'red', fontSize: 'small' }}>{errors.organization}</p>}
                    <div className="input-number">
                      <div className="input-session name">
                        <input type="number" placeholder="Nhập số tiền" name="expectation" onChange={handleChange} value={values.expectation}/>
                      </div>
                      <span>[ Đơn vị : VNĐ ]</span>

                      <div className="input-session time">
                        <input type="number" placeholder="Nhập thời gian" name="expirationDate" onChange={handleChange} value={values.expirationDate} />
                      </div>
                      <span>[ Đơn vị : ngày ]</span>
                    </div>
                    <div className="input-number">
                      {errors.expectation && <p style={{ color: 'red', fontSize: 'small' }}>{errors.expectation}</p>}
                      {errors.expirationDate && <p style={{ color: 'red', fontSize: 'small', marginLeft: '235px' }}>{errors.expirationDate}</p>}
                    </div>
                    <div className="select-session">
                      <Select
                        placeholder={values.type}
                        className="honghong type"
                        options={options}
                        name="type" onChange={handleTypeChange}
                      />
                      <div className="img-div">
                        <input type="file" accept="image/*" multiple name="image-upload" id="input" onChange={handleUpload} formEncType="multipart/form-data" />
                        <div className="label">
                          <label className="image-upload" htmlFor="input">
                            <p className="img-select"></p>
                            <p className="img-select">Thêm hình ảnh</p>
                          </label>
                        </div>
                      </div>
                    </div>
                    {errors.type && <p style={{ color: 'red', fontSize: 'small' }}>{errors.type}</p>}
                    <div className="select-session">
                      {oldImages.map((image, index) => {
                        return (<div className="img-page">
                          <button className={image.isDeleted ? "btn-undo" : "btn-delete"} onClick={clickDeleteButton} name={index}>{image.isDeleted ? "Hoàn tác" : "Xoá"}</button>
                          <div className="img-holder">
                            <img src={image.isDeleted ? "" : 'data:image/jpeg;base64,' + image.imgByte} alt="" id="img" className="img" />
                          </div>
                          <input type="text" className="desc-input" placeholder="Thêm chú thích" name={index} onChange={handleOldDescUpdate} value={oldImages[index].description} disabled={image.isDeleted}></input>
                        </div>)
                      })}
                      {files.map((file, index) => {
                        return (<div className="img-page">
                          <div className="img-holder" style={{'margin-top': '21px'}}>
                            <img src={URL.createObjectURL(file)} alt="" id="img" className="img" />
                          </div>
                          <input type="text" className="desc-input" placeholder="Thêm chú thích" name={index} onChange={handleDescChange} value={desc[index]}></input>
                        </div>)
                      })}
                    </div>
                  </div>
                  <h3 className="h3title">
                    Thông tin chi tiết về chương trình
                  </h3>
                  <div className="upload-form">
                    <textarea onChange={handleTxtAreaChange} rows={row} className="txtArea" value={values.content}></textarea>
                    {errors.content && <p style={{ color: 'red', fontSize: 'small' }}>{errors.content}</p>}
                    <button className="btn-show-demo" type="submit">Hoàn tất</button>
                    <div>{addedDate ? ReactHtmlParser(addDate) : ""}</div>
                  </div>

                  <div className="modal__wrapper">
                    <div className="modal">
                      <div className="modal__header">hong</div>
                      <div className="modal__body">
                        <div className="modal__body__container">
                          <p>hong</p>
                          <h3>lam</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </form>
            </div>
          </div>
        </span>
      );
    },
  },
];
