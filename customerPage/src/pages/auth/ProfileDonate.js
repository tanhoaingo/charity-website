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
 * @function ProfileDonate
 **/

export const ProfileDonate = (props) => {
  const [donations, setDonations] = useState([]);
  const [profile, setProfile] = useState({
    username: '',
    fullname: '',
    avatar: ''
  });
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
        axios.get("http://localhost:8080/user/donations").then(res => {
          setDonations(res.data);
        })
      }
    });
  }, []);

  return (
    <div>
      <Header />
      <div className="profile-page">
        <div className="profile-tab">
          <ProfileTab tab="donate" fullname={profile.fullname} avatar={profile.avatar} />
        </div>
        <div className="content">
          {" "}
          <h1 className="title">Chương trình đã đóng góp</h1>
          {donations.map(donation =>
            <div className="chuongtrinh">
              <img
                src={'data:image/jpeg;base64,' + donation.img}
                alt=""
              />
              <div className="name-chuongtrinh">
                <p>{donation.title}</p>
{/*                 <span className="desc">
                  Cùng chung tay hỗ trợ xây dựng tủ sách cho hơn 20 điểm trường
                  thuộc vùng núi khó khăn của tỉnh Quảng Trị,
                </span> */}
                <span className="onwer">
                  {" "}
                  <i class="fas fa-check-circle"></i>{donation.organization}
                </span>
              </div>

              <div className="col3">
                <p className="price">Số tiền: {donation.amount.toFixed(0).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")} VNĐ</p>
                <Link to={"/post?id=" + donation.postId}>Xem chi tiết chương trình</Link>
              </div>
            </div>)}
        </div>
      </div>
    </div>
  );
};
