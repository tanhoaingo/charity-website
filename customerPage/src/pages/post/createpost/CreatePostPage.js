import React, { useEffect, useState } from "react";
import { Header } from "../../../components/header/Header";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ReactHtmlParser from "react-html-parser";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./createpostpage.css";

import Select from "react-select";
import { Link } from "react-router-dom";
import "./image.css";
import axios from "axios";
import usePost from "../../../util/post/usePost";
import validatePost from "../../../util/post/validatePost";
/**
 * @author
 * @function CreatePostPage
 **/

export const CreatePostPage = (props) => {
  const [addDate, setVal] = useState("");
  const [addedDate, showData] = useState(0);
  const { values, errors, row, files, desc, handleChange, handleTypeChange, handleSubmit, handleTxtAreaChange, handleUpload, handleDescChange } = usePost(validatePost);
  const options = [
    { value: "Covid 19", label: "Covid 19" },
    { value: "Trẻ em", label: "Trẻ em" },
    { value: "Người già", label: "Người già" },
    { value: "Người khuyết tật", label: "Người khuyết tật" },
    { value: "Ghép tim", label: "Ghép tim" },
    { value: "Người khó khăn", label: "Người khó khăn" },
  ];

  useEffect(() => {
    axios.get("http://localhost:8080/auth/role").then(res => {
      if(!res.data){
        window.location.href = "/";
      }
    });
  },[]);
  return (
    <div>
      <Header type="createpost" />
      <div className="create-post-page">
        <form onSubmit={handleSubmit}>
          <div className="upload-form__wrapper">
            <div className="input-info">
              <h2 className="title">
                Vui lòng nhập đầy đủ các thông tin bên dưới
              </h2>
              <h3 className="h3title">Thông tin cơ bản về chương trình</h3>
              <div className="input-session name">
                <input type="text" placeholder="Nhập tên chương trình" name="title" onChange={handleChange} value={values.title} />
              </div>
              {errors.title && <p style={{color: 'red', fontSize: 'small'}}>{errors.title}</p>}
              <div className="input-session name">
                <input type="text" placeholder="Nhập tên tổ chức" name="organization" onChange={handleChange} value={values.organization} />
              </div>
              {errors.organization && <p style={{color: 'red', fontSize: 'small'}}>{errors.organization}</p>}
              <div className="input-number">
                <div className="input-session name">
                  <input type="number" placeholder="Nhập số tiền" name="expectation" onChange={handleChange} value={values.expectation} />
                </div>
                <span>[ Đơn vị : VNĐ ]</span>

                <div className="input-session time">
                  <input type="number" placeholder="Nhập thời gian" name="expirationDate" onChange={handleChange} value={values.expirationDate} />
                </div>
                <span>[ Đơn vị : ngày ]</span>
              </div>
              <div className="input-number">
              {errors.expectation && <p style={{color: 'red', fontSize: 'small'}}>{errors.expectation}</p>}
              {errors.expirationDate && <p style={{color: 'red', fontSize: 'small', marginLeft: '235px'}}>{errors.expirationDate}</p>}
              </div>
              <div className="select-session">
                <Select
                  placeholder="Chọn loại"
                  className="honghong type"
                  options={options}
                  name="type" onChange={handleTypeChange} 
                />
                <div className="img-div">
                  <input type="file" accept="image/*" multiple name="image-upload" id="input" onChange={handleUpload} formEncType="multipart/form-data"/>
                  <div className="label">
                    <label className="image-upload" htmlFor="input">
                      <i className="material-icons">add_photo_alternate</i>
                      <p className="img-select">Thêm hình ảnh</p>
                    </label>
                  </div>
                </div>
              </div>
              {errors.type && <p style={{color: 'red', fontSize: 'small'}}>{errors.type}</p>}
              <div className="select-session">
                {/* <div className="img-page">
                <div className="img-holder">
                  <img src={defaultImg} alt="" id="img" className="img" />
                </div>
              </div> */}
                {files.map((file, index) => {
                  return (<div className="img-page">
                    <div className="img-holder">
                      <img src={URL.createObjectURL(file)} alt="" id="img" className="img" />
                    </div>
                    <input type="text" className="desc-input" placeholder="Thêm chú thích" name={index} onChange={handleDescChange} value={desc[index]}></input>
                  </div>)
                })}
              </div>
            </div>
            <h3 className="h3title">Thông tin chi tiết về chương trình</h3>
            <div className="upload-form">
              {/* <CKEditor
              className="ckeditor"
              editor={ClassicEditor}
              data={addDate}
              onChange={handleChange}
            /> */}
              <textarea onChange={handleTxtAreaChange} rows={row} className="txtArea" ></textarea>
              {errors.content && <p style={{color: 'red', fontSize: 'small'}}>{errors.content}</p>}
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
        </form>
      </div>
    </div>
  );
};
