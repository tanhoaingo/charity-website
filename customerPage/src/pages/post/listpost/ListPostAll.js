import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ItemHomePage } from "../../../components/donateItemHomePage/ItemHomePage";
import { Header } from "../../../components/header/Header";
import "./listpostall.css";

//  json

import { featuredPost } from "../../../assets/JsonData/featuredPost";
import { MonthRegisterFullWidth1 } from "../../../components/monthRegister/monthRegisterFullWidth1";
import { Footer } from "../../../components/footer/Footer";
import { useDispatch, useSelector } from 'react-redux';
import { getAll } from '../../../action/post'
/**
 * @author
 * @function ListPostAll
 **/

export const ListPostAll = (props) => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.post.data);

  useEffect(() => {
    dispatch(getAll());
  },[dispatch]);
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
              <Link
                to="/list"
                className="active"
                onClick={() => window.scrollTo(0, 0)}
              >
                {" "}
                Tất cả
              </Link>

              <Link to="/listpost/covid" onClick={() => window.scrollTo(0, 0)}>
                Covid 19
              </Link>
              <Link
                to="/listpost/children"
                onClick={() => window.scrollTo(0, 0)}
              >
                Trẻ Em
              </Link>
              <Link
                to="/listpost/oldpeople"
                onClick={() => window.scrollTo(0, 0)}
              >
                Người già
              </Link>
              <Link
                to="/listpost/disability"
                onClick={() => window.scrollTo(0, 0)}
              >
                Người Khuyết tật
              </Link>
              <Link to="/listpost/heart" onClick={() => window.scrollTo(0, 0)}>
                Ghép Tim
              </Link>
              <Link
                to="/listpost/poorpeople"
                onClick={() => window.scrollTo(0, 0)}
              >
                Người khó khăn
              </Link>
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

              <Link
                to="/listpost/chuthapdo"
                onClick={() => window.scrollTo(0, 0)}
              >
                Hội chữ thập đỏ
              </Link>
              <Link
                to="/listpost/tinhthuonghcm"
                onClick={() => window.scrollTo(0, 0)}
              >
                Quỹ Tình Thương HCM
              </Link>
              <Link
                to="/listpost/bongsenvang"
                onClick={() => window.scrollTo(0, 0)}
              >
                Bông Sen Vàng
              </Link>
              <Link
                to="/listpost/tuthien"
                onClick={() => window.scrollTo(0, 0)}
              >
                Từ Thiện Hoài Linh
              </Link>
              <Link
                to="/listpost/hoicovidhcm"
                onClick={() => window.scrollTo(0, 0)}
              >
                Hội Covid HCM
              </Link>
              <Link
                to="/listpost/treemvietnam"
                onClick={() => window.scrollTo(0, 0)}
              >
                Trẻ Em Việt Nam
              </Link>
            </div>
          </div>{" "}
          {/* end : left  pannel */}
          {/* right pannel */}
          <div className="right">
            <div className="list-donate-itemss">
              {posts.map(post =>(<ItemHomePage post={post} />))}
{/*               {featuredPost.map((item, ind) => (
                <ItemHomePage {...item} />
              ))}
              {featuredPost.map((item, ind) => (
                <ItemHomePage {...item} />
              ))} */}
            </div>
          </div>
          {/* end: right pannel */}
        </div>
      </div>

      <MonthRegisterFullWidth1 />
      <Footer />
    </div>
  );
};
