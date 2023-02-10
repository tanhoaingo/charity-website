import React from "react";
import { Link } from "react-router-dom";
import "./itemhomepage.css";
import { EnumData } from "../../assets/JsonData/enumData";
import ProgressBar from "@ramonak/react-progress-bar";

/**
 * @author
 * @function ItemHomePage
 **/

export const ItemHomePage = ({ ...props }) => {
  const handleToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="donate-item">
      <Link to={"/post?id=" + props.post.id} onClick={handleToTop}>
        <div className="image">
          <img src={'data:image/jpeg;base64,' + props.post.image} alt="" className="main-img"/>
        </div>
      </Link>
      <div className="donate-item__body">
        <div className="pop-info time-remaining">
          {"còn " + props.post.remainingDay + " ngày"}
        </div>
        <div className="pop-info project">{props.post.type}</div>
        <div className="pop-info owner">{props.post.organization}</div>
        <div className="title">{props.post.title}</div>
        <div className="desc" style={{ display: "none" }}>
          {props.post.title}
        </div>
        <div className="below-desc">
          <ProgressBar completed={((props.post.contribution / props.post.expectation) * 100).toFixed(2)} />
          {/* <div className="status-bar item2">
            <span></span>
          </div> */}
          {/* <div className="status">{props.time}</div> */}
        </div>
        <div className="donate-info">
          <div className="target">
            <div className="target__txt">Mục tiêu</div>
            <div className="target__detail">
              <span> {props.post.contribution?.toFixed(0).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")} đồng</span>/ {props.post.expectation?.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")} đồng
            </div>
          </div>

          <Link to={"/post?id=" + props.post.id} onClick={handleToTop}>
            <div className="btn-donate">
              <button className="zoom-anim">Ủng hộ</button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
