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
 * @function Profile
 **/

export const Profile = (props) => {
  const [profile, setProfile] = useState({
    username: '',
    fullname: '',
    email: '',
    phoneNumber: '',
    address: '',
    description: '',
    avatar: ''
  });
  const [defaultProfile, setDefaultProfile] = useState({});
  const [error, setError] = useState('');

  const handleReset = () => {
    setProfile(defaultProfile);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile({
      ...profile,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!profile.fullname.trim()) {
      setError("Họ tên không được bỏ trống");
    } else {
      axios.put("http://localhost:8080/user/profile/update", profile).then(() => {
        alert("Cập nhật thành công");
        setError(error + " ");
      });
    }
  }
  useEffect(() => {
    axios.get("http://localhost:8080/auth/profile").then(res => {
      if (res.status == 204) {
        localStorage.removeItem("USERNAME");
        localStorage.removeItem("TOKEN");
        localStorage.removeItem("REFRESH_TOKEN");
        window.location.href = "/login";
      } else if (res.status == 200) {
        setProfile(res.data);
        setDefaultProfile(res.data);
      }
    });
  }, [error]);
  // toast
  // toast
  const notifyx = () => {
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
          <ProfileTab tab="account" fullname={defaultProfile.fullname} avatar={defaultProfile.avatar} />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="content">
            {" "}
            <h1 className="title">Cài đặt tài khoản</h1>
            <div className="account-info">
              <div className="session-input">
                <div className="title">Họ Tên</div>
                <input type="text" value={profile.fullname} name="fullname" onChange={handleChange} />
                {error.trim() && <p style={{ color: 'red', fontSize: 'small' }}>{error}</p>}
              </div>
              <div className="session-input">
                <div className="title">Email</div>
                <input type="text" value={profile.email} name="email" disabled />
              </div>
              <div className="session-input">
                <div className="title">Số điện thoại</div>
                <input type="text" value={profile.phoneNumber} name="phoneNumber" disabled />
              </div>
              <div className="session-input">
                <div className="title">Nơi ở</div>
                <input type="text" value={profile.address} name="address" onChange={handleChange} />
              </div>
              <div className="session-input">
                <div className="title">Mô tả bản thân</div>
                <textarea type="text" value={profile.description} name="description" onChange={handleChange} />
              </div>

              <div className="button-wrap">
                <button className="btn btn-update" type="submit">
                  Cập nhật
                </button>
                <button onClick={handleReset} className="btn btn-cancle" type="button">
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
