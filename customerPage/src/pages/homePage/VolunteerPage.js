import React, { useEffect, useState } from "react";
import { Header } from "../../components/header/Header";
import "./volunteerpage.css";
import video from "../../assets/img/video/video.mp4";
import maskImg from "../../assets/img/video/mask.jpg";

import interviewImg from "../../assets/img/orgnization.jpg";
import { Link } from "react-router-dom";
import axios from "axios";
/**
 * @author
 * @function Volunteer
 **/

export const Volunteer = (props) => {
  const [volunteers, setVolunteers] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8080/volunteer/find/volunteersOfUser").then(res => {
      if (res.data !== undefined) {
        console.log(res.data);
        setVolunteers(res.data);
      }
    })
  }, []);

  function chooseColor(status) {
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
  return (
    <div className="volunteer_page__wrapper">
      <Header link="volunteer" />
      <div className="voluteer_page">
        <div class="video__wrapper">
          <video src={video} autoPlay muted loop type="mp4"></video>
          <img src={maskImg} class="mask" />
          <h2>Cứu trợ Covid 19</h2>
        </div>
        <div className="volunteer__title">
          <h1>Đăng ký tham gia tình nguyện viên</h1>
        </div>

        <div className="volunteer__body">
          <div className="form">
            <div className="left-image">
              <img src={interviewImg} alt="" />
            </div>

            <div className="right-form">
              <div className="nologin hide">
                <h2 className="title">
                  Các tổ chức đang thực sự cần sự hỗ trợ của bạn
                </h2>
                <div className="desc">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Justo laoreet sit amet cursus sit amet. Purus sit amet luctus
                  venenatis. Sed faucibus turpis in eu mi. Magna eget est lorem
                  ipsum dolor sit amet.
                </div>
                <div className="nologin-form hide">
                  <div className="txt-require-login">
                    Trước hết, bạn phải đăng nhập
                  </div>
                  <div className="login-require">
                    <Link to="/login">Đăng nhập</Link>
                    <span>hoặc</span>
                    <Link to="/signup" className="signup">
                      Đăng ký
                    </Link>
                  </div>
                </div>
                <div className="logined-form"></div>
              </div>

              {/* logined */}
              <div className="nologin">
                {volunteers.map(item =>
                  <div className="item" onClick={() => window.location.href = "/post?id=" + item.postId}>
                    <div className="avatar">
                      <img src={'data:image/jpeg;base64,' + item.img} alt="" />
                    </div>
                    <div className="info">
                      <div className="name">{item.title}</div>
                      <div className="time">{item.organization}</div>
                    </div>
                    <div className="money" style={{ 'color': chooseColor(item.status) }}>{item.status}</div>
                  </div>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
