import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../../components/header/Header";
import post1Img from "../../assets/img/homePagePost/post1.jpg";
import donateReceive1 from "../../assets/img/donateReceive.png";
import donateReceive from "../../assets/img/donategif.gif";
import { SiEthereum } from "react-icons/si";
import "./donatepage.css";
import axios from "axios";
import { PayPage } from "../paypage/PayPage";
import useTransaction from "../../util/transaction/useTransaction";
/**
 * @author
 * @function DonatePage
 **/

export const DonatePage = (props) => {
  const {
    connectWallet,
    currentAccount,
    sendTransaction,
  } = useTransaction();
  const [donation, setDonation] = useState({
    username: localStorage.getItem('USERNAME'),
    postId: 0,
    amount: 0,
    message: '',
    isAnonymous: false,
    paymentMethod: ""
  })
  const [checked, setChecked] = useState({
    "500000": false,
    "200000": false,
    "100000": false
  });
  const [error, setError] = useState({});
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
    }]
  });
  const [images, setImages] = useState([
    {
      url: "https://www.1stformationsblog.co.uk/wp-content/uploads/2020/09/Charity-Image.png"
    }
  ]);
  const handleClick = (e) => {
    const { value, name } = e.target;
    console.log(donation.isAnonymous);
    setChecked({
      "500000": false,
      "200000": false,
      "100000": false,
      [value]: value
    })
    setDonation({
      ...donation,
      [name]: value
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    let err = {};
    if (donation.amount === 0) {
      err.amount = "Số tiền phải lớn hơn 0";
    }
    if (!donation.paymentMethod.trim()) {
      err.paymentMethod = "Vui lòng chọn phương thức thanh toán";
    }
    setError(err);
    if (Object.keys(err).length === 0) {
      console.log(donation);
      if (optionDonate === 1) {
        axios({
          method: 'POST', url: "http://localhost:8080/donation/create", data: donation, headers: { "Navigation": "http://localhost:3001/paying-complete?id=" + donation.postId }
        }).then(() => {
          window.location.href = "/paying-complete?id=" + donation.postId;
        });
      } else {
        await sendTransaction(donation.amount, donation.message);
        axios.get("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=VND").then(res => {
          axios({
            method: 'POST', url: "http://localhost:8080/donation/create", data: { ...donation, amount: donation.amount * res.data.VND }, headers: { "Navigation": "http://localhost:3001/paying-complete?id=" + donation.postId }
          }).then(() => {
            window.location.href = "/paying-complete?id=" + donation.postId;
          });
        })
      }
    }
  }
  useEffect(() => {
    axios.get("http://localhost:8080/auth/isLoggin").then(res => {
      if (res.data) {
        setDonation({
          ...donation,
          postId: queryParams.get('id')
        })
        axios.get("http://localhost:8080/post/get/" + queryParams.get('id')).then(res => {
          setPost(res.data);

          let items = [];
          res.data.images.map(image => items.push({ url: 'data:image/jpeg;base64,' + image.imgByte }));
          setImages(items);
        });
      } else {
        window.location.href = "/login";
      }
    })
  }, []);
  const incognitoToggle = useRef(null);
  const handleToggleIncognito = () => {
    incognitoToggle.current.classList.toggle("active");
    setDonation({
      ...donation,
      isAnonymous: !donation.isAnonymous
    });
  };
  const btn = useRef(null);
  const [optionDonate, setOptionDonate] = useState(1);
  const leftClick = () => {
    btn.current.style.left = "0";
    setOptionDonate(1);
    setDonation({
      ...donation,
      paymentMethod: ""
    });
    btn.current.style.width = "90px";
  };
  const rightClick = async () => {
    const isLogged = await connectWallet();
    if (isLogged) {
      btn.current.style.left = "90px";
      btn.current.style.width = "120px";
      setOptionDonate(2);
      setDonation({
        ...donation,
        paymentMethod: "Ethereum"
      });
    }
  };
  return (
    <div>
      <Header />

      <div className="donate-info-option">
        <div className="homepage session1">
          <div className="new-update">
            <div className="post post-column">
              <div className="post-left">
                <div className="image">
                  <img src={images[0].url} alt="" />
                </div>
              </div>
              <div className="post-right">
                <h3>
                  {post.title}
                </h3>
                <p className="desc">
                  {post.content[0]}
                </p>
                <a className="btn btn-detail zoom-anim" href={"/post?id=" + queryParams.get('id')}>Chi tiết</a>
              </div>
            </div>
          </div>
        </div>
        <div className="donate-option">
          <div className="header-page-session">
            <div className="title">
              <img src={donateReceive} alt="" />
              <h2>Tiến hành ủng hộ</h2>
            </div>
            {optionDonate === 2 && (
              <div className="title2">
                <SiEthereum fontSize={40} color="#000000" />
                <h3 style={{ "margin-left": "25px" }}>{currentAccount}</h3>
              </div>)}
          </div>
          <form onSubmit={handleSubmit}>
            <div className="donate-option__body">
              {/*             <div className="title-session">
              Để người khác biết tấm lòng của bạn
            </div>
            <div className="desc-login">
              Có thể
              <a href="#">đăng nhập</a>
            </div>
            <div className="input-info">
              <div className="component-input name-input">
                <input type="text" placeholder="Nhập họ tên bạn" />
              </div>
              <div className="component-input number-input">
                <input type="number" placeholder="SĐT" />
              </div>
            </div> */}
              <div className="title-session">Bạn muốn đóng góp?</div>
              <div class="button-box option-donate">
                <div id="btn" ref={btn}></div>
                <button
                  type="button"
                  class={
                    optionDonate === 1
                      ? "toggle-btn toggle1 active"
                      : "toggle-btn"
                  }
                  onClick={leftClick}
                >
                  VNĐ
                </button>
                <button
                  type="button"
                  class={optionDonate === 2 ? "toggle-btn active" : "toggle-btn"}
                  onClick={rightClick}
                >
                  ETH
                </button>
              </div>

              <div className="option-money">
                <div className="selected-radio">
                  {/* text */}
                  <p style={{ 'margin-top': '25px' }}>{optionDonate === 1 ? "VNĐ" : "ETH"}</p>
                  <input
                    // value={new Intl.NumberFormat("vi-VN", {
                    //   style: "currency",
                    //   currency: "VND",
                    // }).format(111000)}
                    type="number"
                    id=""
                    maxLength="10"
                    name="amount"
                    value={donation.amount}
                    onChange={(e) => {
                      const { value, name } = e.target;
                      setChecked({
                        "500000": false,
                        "200000": false,
                        "100000": false,
                      })
                      setDonation({
                        ...donation,
                        [name]: value
                      })
                    }}
                  />
                  {/* 100.000vnd */}
                  {optionDonate === 1 && (<>
                    <input
                      type="radio"
                      name="amount"
                      id="1"
                      className="hide"
                      value={100000}
                      onClick={handleClick}
                      checked={checked[100000]}
                    />
                    <label htmlFor="1" className="lbl-radio">
                      100.000 VNĐ
                    </label>

                    {/* 200.000vnd */}

                    <input
                      type="radio"
                      name="amount"
                      id="2"
                      className="hide"
                      value={200000}
                      onClick={handleClick}
                      checked={checked[200000]}
                    />
                    <label htmlFor="2" className="lbl-radio">
                      200.000 VNĐ
                    </label>

                    {/* 500.000vnd */}
                    <input
                      type="radio"
                      name="amount"
                      id="3"
                      className="hide"
                      value={500000}
                      onClick={handleClick}
                      checked={checked[500000]}
                    />
                    <label htmlFor="3" className="lbl-radio">
                      500.000 VNĐ
                    </label></>)}
                </div>
              </div>
              {error.amount && <p style={{ color: 'red', fontSize: 'small' }}>{error.amount}</p>}

              {/* lời nhắn  */}
              <div className="title-session">Lời nhắn</div>
              <div className="input-message">
                <textarea
                  placeholder="Nhập lời nhắn của bạn ở đây"
                  id=""
                  cols="30"
                  rows="5"
                  maxLength="400"
                  name="message"
                  value={donation.message}
                  onChange={(e) => {
                    const { value, name } = e.target;
                    setDonation({
                      ...donation,
                      [name]: value
                    })
                  }}
                ></textarea>
              </div>
              <div className="title-session title-session--smaller incognito">
                Đóng góp ẩn danh
                <div
                  className="custom-toggle toggle-incognito"
                  ref={incognitoToggle}
                  onClick={handleToggleIncognito}
                >
                  <div className="inner-circle"></div>
                </div>
              </div>
              {optionDonate === 1 && (<PayPage setDonation={setDonation} donation={donation}></PayPage>)}
              {/* submit */}
              {error.paymentMethod && <p style={{ color: 'red', fontSize: 'small' }}>{error.paymentMethod}</p>}
              <button to="/paying" className="custom-btn pay-btn">
                Thanh Toán
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
