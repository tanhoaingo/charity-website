import React, { useEffect, useState } from "react";
import { Header } from "../../components/header/Header";
import "./profile.css";
// toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ProfileTab } from "./ProfileTab";
import axios from "axios";
/**
 * @author
 * @function ProfilePassword
 **/

export const ProfilePassword = (props) => {
  // toast
  // toast 
  const [profile, setProfile] = useState({
    username: '',
    fullname: '',
    avatar: ''
  });
  const [password, setPassword] = useState({
    oldPass: '',
    newPass: '',
    rePass: ''
  });
  const [error, setError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPassword({
      ...password,
      [name]: value
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let err = {};
    if (!password.oldPass.trim()) {
      err.oldPass = "Vui lòng nhập lại mật khẩu cũ";
    }
    if (!password.newPass.trim()) {
      err.newPass = "Vui lòng nhập mật khẩu mới";
    } else if (password.newPass.length < 6) {
      err.newPass = "Mật khẩu phải có ít nhất 6 ký tự";
    }
    if (password.newPass !== password.rePass) {
      err.rePass = "Không trùng khớp";
    }
    setError(err);
    if (Object.keys(err).length === 0){
      axios.put("http://localhost:8080/user/password/update", {username: profile.username, oldPassword: password.oldPass, newPassword: password.newPass}).then(res => {
        if(res.data === false){
          setError({oldPass: "Mật khẩu không chính xác"});
        } else {
          alert("Đổi mật khẩu thành công");
          setPassword({
            oldPass: '',
            newPass: '',
            rePass: ''
          });
        }
      });
    }
  }
  useEffect(() => {
    axios.get("http://localhost:8080/auth/profile").then(res => {
      if (res.status == 204) {
        window.location.href = "/login";
      } else if (res.status == 200) {
        setProfile({
          username: res.data.username,
          fullname: res.data.fullname,
          avatar: res.data.avatar
        });
      }
    });
  }, []);
  const notify = () => {
    if (true) {
      toast.success("🎄 Đã tải bản sao kê về máy", {
        position: "top-right",
        autoClose: 5222,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        width: "500px",
      });
    } else {
      toast.error("Vui lòng chọn tháng và năm!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div>
      <Header />
      <div className="profile-page">
        <div className="profile-tab">
          <ProfileTab tab="password" fullname={profile.fullname} avatar={profile.avatar} />
        </div>
        <form onSubmit={handleSubmit}>
        <div className="content password">
          {" "}
          <h1 className="title">Đặt lại mật khẩu</h1>
          <div className="account-info">
            <div className="session-input">
              <div className="title">Mật khẩu cũ</div>
              <input type="password" name="oldPass" value={password.oldPass} onChange={handleChange}/>
            {error.oldPass && <p style={{color: 'red', fontSize: 'small'}}>{error.oldPass}</p>}
            </div>
            <div className="session-input">
              <div className="title">Mập khẩu mới</div>
              <input type="password" name="newPass" value={password.newPass} onChange={handleChange}/>
            {error.newPass && <p style={{color: 'red', fontSize: 'small'}}>{error.newPass}</p>}
            </div>
            <div className="session-input">
              <div className="title">Nhập lại mật khẩu mới</div>
              <input type="password" name="rePass" value={password.rePass} onChange={handleChange}/>
              {error.rePass && <p style={{color: 'red', fontSize: 'small'}}>{error.rePass}</p>}
            </div>
            <div className="button-wrap">
              <button className="btn btn-update" type="submit">
                Cập nhật
              </button>
              <button onClick={() => {
                setPassword({
                  oldPass: '',
                  newPass: '',
                  rePass: ''
                })
              }} className="btn btn-cancle" type="button">
                Hủy bỏ
              </button>
            </div>
          </div>
        </div>
        </form>
      </div>
    </div>
  );
};
