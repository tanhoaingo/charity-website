import React from "react";
import { Link } from "react-router-dom";
import { ItemHomePage } from "../../../components/donateItemHomePage/ItemHomePage";
import { Header } from "../../../components/header/Header";
import "./listpostall.css";

//  json

import { featuredPost } from "../../../assets/JsonData/featuredPost";
/**
 * @author
 * @function ListPostCovid
 **/

export const ListPostCovid = (props) => {
  return (
    <div>
      <Header link="list" />
      <div className="listpost listpostall">
        {/* header */}
        <div className="listpost__header">
          <h2 className="title">Tìm kiếm</h2>
          <div className="input-search">
            <input type="text" />
            <Link to="/">
              {" "}
              <div className="search-btn">Tìm kiếm</div>
            </Link>
          </div>
        </div>
        {/* end :header */}

        {/* body */}
        <div className="listpost__body">
          {/* left */}
          <div className="left">
            <div className="session-title">
              <i class="bx bxs-category-alt"></i>
              Loại thiện nguyện
            </div>
            <div className="session-list">
              <Link to="/list"> Tất cả</Link>

              <Link to="/listpost/covid" className="active">
                Covid 19
              </Link>
              <Link to="/listpost/children">Trẻ Em</Link>
              <Link to="/listpost/oldpeople">Người già</Link>
              <Link to="/listpost/disability">Người Khuyết tật</Link>
              <Link to="/listpost/heart">Ghép Tim</Link>
              <Link to="/listpost/poorpeople">Người khó khăn</Link>
            </div>

            <div className="session-title">
              <i class="far fa-building"></i>
              Tổ chức từ thiện
            </div>
            <div className="session-list">
              <Link to="/list" className="active">
                {" "}
                Tất cả{" "}
              </Link>

              <Link to="/listpost/chuthapdo">Hội chữ thập đỏ</Link>
              <Link to="/listpost/tinhthuonghcm">Quỹ Tình Thương HCM</Link>
              <Link to="/listpost/bongsenvang">Bông Sen Vàng</Link>
              <Link to="/listpost/tuthien">Từ Thiện Hoài Linh</Link>
              <Link to="/listpost/hoicovidhcm">Hội Covid HCM</Link>
              <Link to="/listpost/treemvietnam">Trẻ Em Việt Nam</Link>
            </div>
          </div>{" "}
          {/* end : left  pannel */}
          {/* right pannel */}
          <div className="right">
            <div className="list-donate-itemss">
              {featuredPost.map((item, ind) => {
                if (item.type === "Covid 19") {
                  return <ItemHomePage {...item} />;
                }
              })}
            </div>
          </div>
          {/* end: right pannel */}
        </div>
      </div>
    </div>
  );
};
