import React, { useEffect, useState } from "react";
import { Header } from "../../components/header/Header";
import Chart from "react-apexcharts";

import "./analysicitem.css";
import avatarImg from "../../assets/img/avatar.png";
import post1Img from "../../assets/img/homePagePost/post1.jpg";
import { Link } from "react-router-dom";

// json
import { donateUser } from "../../assets/JsonData/donateUser";
import axios from "axios";
/**
 * @author
 * @function AnaLysicItem
 **/

export const AnaLysicItem = (props) => {
  const queryParams = new URLSearchParams(window.location.search);
  const [statistic, setStatistic] = useState({
    sumOfAmount: 0,
    numberOfSupporter: 0,
    numberOfVolunteer: 0,
    supporters: [],
    contributionStatistics: [],
    organizations: []
  });
  const now = new Date();
  const days = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  function pad(n) {
    return (n < 10) ? ("0" + n) : n;
  }
  function createCategory(numberOfDays) {
    let categories = []
    for (let i = 1; i <= numberOfDays; i++) {
      categories.push(`${pad(i)}/${pad(now.getMonth() + 1)}/${now.getFullYear()}`);
    }
    return categories;
  }

  function createTotalData(dates, contributions) {
    let total = [];
    for (let i = 0; i < dates.length; i++) {
      total.push(0);
    }
    contributions.map(item => {
      if (dates.indexOf(item.createAt) > -1) {
        total[dates.indexOf(item.createAt)] = item.total;
      }
    })
    return total;
  }

  function createTimesData(dates, contributions) {
    let times = [];
    for (let i = 0; i < dates.length; i++) {
      times.push(0);
    }
    contributions.map(item => {
      if (dates.indexOf(item.createAt) > -1) {
        times[dates.indexOf(item.createAt)] = item.times;
      }
    })
    return times;
  }
  // chart

  const [state, setState] = useState({
    series: [
      {
        type: "column",
        name: "Tiền quyên góp",
        data: [
          3467000, 5060000, 7880000, 5060000, 6688000, 7500000, 4400000,
          2200000, 5789000, 7100000, 5420000, 9677000, 5512000, 7898000,
          11220000, 0, 0, 0, 0, 0,
        ],
      },
      {
        name: "Lượt quyên góp",
        data: [
          11, 32, 45, 32, 34, 52, 41, 11, 32, 45, 32, 34, 52, 41, 55, 0, 0, 0,
          0, 0,
        ],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: createCategory(days),
      },
      yaxis: [
        {
          title: {
            text: "",
          },
        },
        {
          opposite: true,
          title: {
            text: "",
          },
        },
      ],
      title: {
        text: "",
        align: "left",
      },
    },
  });
  useEffect(() => {
    axios.get("http://localhost:8080/statistic/overview/" + queryParams.get('id')).then(res => {
      console.log(res.data);
      setStatistic(res.data);
            setState({
              ...state,
              series: [
                {
                  type: "column",
                  name: "Tiền quyên góp",
                  data: createTotalData(state.options.xaxis.categories, res.data.contributionStatistics)
                },
                {
                  name: "Lượt quyên góp",
                  data: createTimesData(state.options.xaxis.categories, res.data.contributionStatistics)
                },
              ]
            })
    })
  }, []);
  return (
    <div className="analysic-item-page">
      <Header type="analysic" />

      <div className="body">
        <div className="left-pannel">
          <div className="left-pannel__container__wrapper">
            <div className="left-pannel__container">
              <Link className="xxx" to="/">
                <button className="return-home">
                  {" "}
                  <i class="fas fa-arrow-left"></i>Về trang chủ
                </button>
              </Link>
              <div className="post-left">
                <div className="image">
                  <img src="https://www.1stformationsblog.co.uk/wp-content/uploads/2020/09/Charity-Image.png" alt="" />
                </div>
              </div>

              <div className="title">
              </div>
              {/* <div className="option" >
                <a className="detail-btn" href="#">
                  Xem chi tiết
                </a>
                <a className="save-btn" href="#">
                  Lưu lại
                </a>
              </div> */}

              <div className="option-tab">
                <div className="tab-btn active">
                  <Link to={"/analysic?id=" + queryParams.get('id')}>Tổng quan</Link>
                </div>
                <div className="tab-btn">
                  <Link to={"/user?id=" + queryParams.get('id')}>Danh sách ủng hộ</Link>
                </div>
{/*                 <div className="tab-btn">
                  <Link to={"/statement?id=" + queryParams.get('id')}>Sao kê</Link>
                </div> */}
                {/* <div className="tab-btn">
                  <Link to="/achievement">Thành quả</Link>
                </div> */}
              </div>
            </div>
          </div>
        </div>

        <div className="right-pannel">
          <h3>
            <div class="container">
              <div class="main">
                <div class="topbar">
                  <div class="toggle"></div>
                </div>

                <div class="cardBox">
{/*                   <div class="card">
                    {" "}
                    <div class="iconBx">
                      <ion-icon name="eye-outline"></ion-icon>
                    </div>
                    <div>
                      <div class="numbers">1,504</div>
                      <div class="cardName">Lượt truy cập</div>
                    </div>
                  </div> */}
                  <div class="card">
                    <div class="iconBx">
                      <i class="fas fa-child"></i>
                    </div>
                    <div>
                      <div class="numbers">{statistic.numberOfVolunteer}</div>
                      <div class="cardName">Tình nguyện viên</div>
                    </div>
                  </div>
                  <div class="card">
                    {" "}
                    <div class="iconBx">
                      <ion-icon name="cash-outline"></ion-icon>
                    </div>
                    <div>
                      <div class="numbers money">{statistic.sumOfAmount?.toFixed(0).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")} VNĐ</div>
                      <div class="cardName">Tiền quyên góp</div>
                    </div>
                  </div>
                  <div class="card">
                    {" "}
                    <div class="iconBx">
                      <i class="fas fa-hand-holding-heart"></i>
                    </div>
                    <div>
                      <div class="numbers">{statistic.numberOfSupporter}</div>
                      <div class="cardName">Người quyên góp</div>
                    </div>
                  </div>
                </div>
                <div class="details recentCustomers">
                  <div class="chart1">
                    <h1 className="chart-title">Thống kê quyên góp</h1>
                    <Chart
                      options={state.options}
                      series={state.series}
                      height="100%"
                    />
                  </div>
                </div>
              </div>
            </div>
          </h3>
        </div>
      </div>
    </div>
  );
};
