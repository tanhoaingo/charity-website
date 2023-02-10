import axios from "axios";
import React, { useEffect, useState } from "react";
import "react-awesome-slider/dist/captioned.css";
import "react-awesome-slider/dist/styles.css";
import { Link } from "react-router-dom";
import SimpleImageSlider from "react-simple-image-slider";
import { RecentDonates } from "../../../assets/JsonData/RecentDonates";
import { Header } from "../../../components/header/Header";
// css
import "./postpage.css";

/**
 * @author
 * @function PostPage
 **/

export const PostPage = (props) => {
  const queryParams = new URLSearchParams(window.location.search);
  const [post, setPost] = useState({
    id: 0,
    title: '',
    organization: '',
    type: '',
    postDate: 0,
    remainingDay: 0,
    content: [],
    contribution: 0,
    expectation: 0,
    images: [{
      id: 0,
      description: '',
      imgByte: ''
    }],
    donationDetails: [],
    volunteer: '',
    numberOfVolunteers: 0
  });
  const [images, setImages] = useState([
    {
      url: "https://www.1stformationsblog.co.uk/wp-content/uploads/2020/09/Charity-Image.png"
    }
  ]);
  const [update, setUpdate] = useState(false);
  const [color, setColor] = useState('gray');
  useEffect(() => {
    axios.get("http://localhost:8080/post/get/" + queryParams.get('id')).then(res => {
      console.log(res.data);
      setPost(res.data);

      let items = [];
      res.data.images.map(image => items.push({ url: 'data:image/jpeg;base64,' + image.imgByte }));
      setImages(items);
      switch (res.data.volunteer) {
        case 'ĐĂNG KÝ TÌNH NGUYỆN VIÊN': {
          setColor('#2565AE');
          break;
        }
        case 'CHỜ PHÊ DUYỆT TÌNH NGUYỆN VIÊN': {
          setColor('#E84855');
          break;
        }         
        case 'ĐÃ TRỞ THÀNH TÌNH NGUYỆN VIÊN': {
          setColor('var(--third-color-green)');
          break;
        }  
        default:
          setColor('gray');     
      }
    });
  }, [update]);

  const handleRegister = () => {
    switch (post.volunteer) {
      case 'ĐĂNG KÝ TÌNH NGUYỆN VIÊN': {
        axios.get("http://localhost:8080/volunteer/create/" + post.id).then(() => {
          setUpdate(!update);
        });
        break;
      }
      case 'CHỜ PHÊ DUYỆT TÌNH NGUYỆN VIÊN': {
        axios.delete("http://localhost:8080/volunteer/delete/" + post.id).then(() => {
          setUpdate(!update);
        });
        break;
      }
      default:
        break;     
    }
  }
  return (
    <div>
      <Header />
      <div className="post-page">
        <div className="post-page__header">
          <div className="header__title">
            <h3>
              {post.title}
            </h3>

            <div className="header-info">
              <div className="txt txt-author">
                <i class="fas fa-check-circle"></i> {post.organization}
              </div>
              <div className="txt txt-date">{new Date(post.postDate).toLocaleDateString("vi-VN")}</div>
              <div className="txt txt-type">{post.type}</div>
            </div>
          </div>
          <div className="slider">
            <SimpleImageSlider
              width={1000}
              height={404}
              images={images}
              showBullets={true}
              showNavs={true}
              autoPlay={true}
            />
          </div>
        </div>
        <div className="post-page__above">
          <h3>Tổng quan</h3>
          <div className="items">
            <div className="item">
              <span>{post.donationDetails.length}</span>
              <p>Lượt Ủng Hộ</p>
            </div>
            <div className="item">
              <span>{post.contribution.toFixed(0).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")} / {post.expectation.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")} VNĐ</span>
              <p>Đã quyên góp</p>
            </div>
            <div className="item">
              <span>{post.numberOfVolunteers}</span>
              <p>Tình nguyện viên</p>
            </div>
          </div>
          <div className="funtion">
            <Link
              onClick={() => {
                window.scrollTo(0, 0);
              }}
              className="report"
              to={"/analysic?id=" + queryParams.get('id')}
            >
              <i class="bx bxs-report"></i> Xem báo cáo
            </Link>
            <Link
              onClick={() => {
                window.scrollTo(0, 0);
              }}
              className="donate"
              to={"/donate?id=" + post.id}
            >
              Ủng hộ
            </Link>
            {post.volunteer !== "CHƯA ĐĂNG NHẬP" && <button className="volunteer" style={{ 'backgroundColor': color }} onClick={handleRegister}>{post.volunteer}</button>}
          </div>
        </div>

        <div className="post-page__body">
          <div className="left">
            <h1 className="txt-title">Thông tin về chiến dịch</h1>
            {post.content.map((paragraph, index) => {
              if (index < 4) {
                return <p>{paragraph}</p>;
              }
            })}
            {post.images.map((image, index) => {
              if (index === 0) {
                return <div>
                  <div className="image">
                    <img
                      src={'data:image/jpeg;base64,' + image.imgByte}
                      alt=""
                    />
                  </div>
                  <h6>
                    {image.description}
                  </h6>
                </div>
              }
            })}
            {post.content.map((paragraph, index) => {
              if (index >= 4 && index < 8) {
                return <p>{paragraph}</p>;
              }
            })}
            {post.images.map((image, index) => {
              if (index === 1) {
                return <div>
                  <div className="image">
                    <img
                      src={'data:image/jpeg;base64,' + image.imgByte}
                      alt=""
                    />
                  </div>
                  <h6>
                    {image.description}
                  </h6>
                </div>
              }
            })}
            {post.content.map((paragraph, index) => {
              if (index >= 8) {
                return <p>{paragraph}</p>;
              }
            })}
            {post.images.map((image, index) => {
              if (index > 1) {
                return <div>
                  <div className="image">
                    <img
                      src={'data:image/jpeg;base64,' + image.imgByte}
                      alt=""
                    />
                  </div>
                  <h6>
                    {image.description}
                  </h6>
                </div>
              }
            })}
          </div>

          <div className="right">
            <div className="recent-donates">
              <div className="txt-recent-donates">
                <div className="txt">Đóng góp gần đây</div>
                <Link
                  onClick={() => {
                    window.scrollTo(0, 0);
                  }}
                  to={"/user?id=" + queryParams.get('id')}
                >
                  Xem tất cả
                </Link>
              </div>
              {post.donationDetails.map((donation, ind) => (
                <div className="item" key={ind}>
                  <div className="avatar">
                    <img src={donation.isAnonymous ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToZZjg_l0c8MyET9IcMmPBUYVP8PDKqBiT-OLHBVch7tk0GpEO0bxTgWfYJy3LGXLFDmI&usqp=CAU" : "https://letters.noticeable.io/" + donation.avatar} alt="" />
                  </div>
                  <div className="info">
                    <div className="name">{donation.isAnonymous ? "Ẩn danh" : donation.fullname}</div>
                    <div className="time">{new Date(donation.createAt).toLocaleDateString("vi", "VN")}</div>
                  </div>
                  <div className="money">{donation.amount.toFixed(0).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")} VNĐ</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
