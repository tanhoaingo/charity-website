import React, { useEffect, useState } from "react";
import { Header } from "../../components/header/Header";
import "./profile.css";
// toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ProfileTab } from "./ProfileTab";
import { Link } from "react-router-dom";
import axios from "axios";
/**
 * @author
 * @function ProfileVolunteer
 **/

export const ProfileVolunteer = (props) => {
  const [volunteers, setVolunteers] = useState([]);
  const [profile, setProfile] = useState({
    username: '',
    fullname: '',
    avatar: ''
  });
  function chooseColor(status){
    switch (status) {
      case 'ĐĂNG KÝ TÌNH NGUYỆN VIÊN': {
        return '#2565AE';
      }
      case 'CHỜ PHÊ DUYỆT TÌNH NGUYỆN VIÊN': {
         return '#E84855'
      }         
      case 'ĐÃ TRỞ THÀNH TÌNH NGUYỆN VIÊN': {
        return 'var(--third-color-green)';
      }  
      default:
        return '#4D4D4D';  
    }
  }
  // toast
  // toast
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
        axios.get("http://localhost:8080/volunteer/find/volunteersOfUser").then(res => {
          console.log(res.data);
          setVolunteers(res.data);
        })
      }
    });
  }, []);

  return (
    <div>
      <Header />
      <div className="profile-page">
        <div className="profile-tab">
          <ProfileTab tab="volunteer" fullname={profile.fullname} avatar={profile.avatar} />
        </div>
        <div className="content">
          {" "}
          <h1 className="title">Đăng ký tình nguyện viên</h1>
          {volunteers.map(volunteer =>
            <div className="chuongtrinh">
              <img
                className="img-chuongtrinh"
                src={'data:image/jpeg;base64,' + volunteer.img}
                alt=""
              />
              <div className="name-chuongtrinh">
                <p>{volunteer.title}</p>
{/*                 <span className="desc">
                  Trong điều kiện giãn cách xã hội phòng, chống Covid-19 tại Thành
                  phố Hồ Chí Minh kể từ trung tuần tháng 5/2021 đến nay; trước
                  những khó khăn của CBCN
                </span> */}
                <span className="onwer">
                  {" "}
                  <i class="fas fa-check-circle"></i>{volunteer.organization }
                </span>
              </div>
              <div className="col3">
                <p style={{'color' : chooseColor(volunteer.status), 'marginLeft': '10px'}}>{volunteer.status}</p>
{/*                 <img
                  src="https://cdn-icons-png.flaticon.com/512/1786/1786640.png"
                  alt=""
                /> */}
              </div>
            </div>)}
        </div>
      </div>
    </div>
  );
};
