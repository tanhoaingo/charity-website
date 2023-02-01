import React from "react";
import { Header } from "../../components/header/Header";
import "./volunteerpage.css";

import video from "../../assets/img/video/video.mp4";
import maskImg from "../../assets/img/video/mask.jpg";

import interviewImg from "../../assets/img/process.jpg";
import { Link } from "react-router-dom";
/**
 * @author
 * @function VolunteerSuccessPage
 **/

export const VolunteerSuccessPage = (props) => {
  return (
    <div className="volunteer_page__wrapper">
      <Header link="volunteer" />
      <div className="voluteer_page">
        <div className="volunteer__title">
          <h1>Đăng ký tham gia tình nguyện viên</h1>
        </div>

        <div className="volunteer__body success">
          <div className="form">
            <div className="left-image ">
              <img src={interviewImg} alt="" />
            </div>

            <div className="right-form success">
              {/* logined */}
              <div className="nologin">
                <h2 className="title">
                  Đơn đăng ký của bạn đã được gửi thành công
                </h2>
                <div className="desc">
                  Vui lòng chờ ít ngày, chúng tôi sẽ liên hệ lại với bạn để kiểm
                  tra thông tin
                </div>

                <div className="logined-form">
                  <Link className="signup" to="/">
                    Trở về trang chủ
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};