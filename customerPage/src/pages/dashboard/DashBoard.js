import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./dashboard.css";
import { DashBoardTab } from "./DashBoardTab";
import avatarImg from "../../assets/img/avatar.png";
import { Header } from "../../components/header/Header";
import Chart from "react-apexcharts";

// img
import coinImg from "../../assets/img/coin.png";
import { DashBoardTopNav } from "./DashBoardTopNav";
import axios from "axios";

/**
 * @author
 * @function DashBoard
 **/

export const DashBoard = (props) => {
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

  const state2 = {
    series: statistic.organizations.map(organization => organization.contribution),
    options: {
      series: statistic.organizations.map(organization => organization.contribution),
      labels: statistic.organizations.map(organization => organization.name),
      plotOptions: {
        pie: {
          expandOnClick: false,
          donut: {
            size: "50px",
            labels: {
              show: true,
              total: {
                show: true,
                showAlways: true,
                fontSize: "24px",
                color: "#2787AB",
              },
            },
          },
        },
      },
    },
  };

  const state3 = {
    series: [
      {
        name: "Người trong độ tuổi lao động",
        data: [
          30, 45, 42, 50, 34, 44, 67, 30, 33, 27, 32, 34, 52, 50, 30, 0, 0, 0,
          0, 0,
        ],
      },
      {
        name: "Người trên tuổi lao động",
        data: [
          67, 55, 72, 61, 44, 78, 66, 87, 59, 69, 79, 54, 45, 66, 42, 0, 0, 0,
          0, 0,
        ],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "area",
        fontFamily: "Roboto, sans-serif",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: [
          "1/12/2021",
          "2/12/2021",
          "3/12/2021",
          "4/12/2021",
          "5/12/2021",
          "6/12/2021",
          "7/12/2021",
          "8/12/2021",
          "9/12/2021",
          "10/12/2021",
          "11/12/2021",
          "12/12/2021",
          "13/12/2021",
          "14/12/2021",
          "15/12/2021",
          "16/12/2021",
          "17/12/2021",
          "18/12/2021",
          "19/12/2021",
          "20/12/2021",
        ],
      },
      title: {
        text: "",
        align: "left",
      },
    },
  };


  useEffect(() => {
    axios.get("http://localhost:8080/statistic/overview").then(res => {
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
    <div>
      <div className="dashboard">
        <div className="dashboard__left">
          <DashBoardTab link="dashboard" />
        </div>

        <div className="dashboard__body">
          <div className="header">
            <div className="search-input">
              <input type="text" placeholder="Tìm kiếm" />
              <i class="fas fa-search"></i>
            </div>

            <div className="header__account hide flex-align">
              <div className="header__question">
                <i class="far fa-question-circle"></i>
              </div>
              <div className="header__notify">
                <i class="fas fa-bell"></i>
                <div className="notify-badge"></div>
              </div>

              <div className="header__user flex-align">
                <div className="avatar">
                  <img src={avatarImg} alt="avatar" />
                </div>
                <div className="username">Lam Hong</div>
                <div className="toggle-down">
                  <i class="fas fa-sort-down"></i>
                </div>
              </div>
            </div>

            <DashBoardTopNav />
          </div>
          {/* end : header */}

          {/* content */}

          {/* top pannel */}
          <div className="top-pannel">
            <div className="short-info">
              <div className="title">Thống kê tổng quan</div>
              <div className="short-info__body">
                <div className="item">
                  <div className="image">
                    <i class="fas fa-user-alt"></i>
                  </div>
                  <div className="info">
                    <span className="name-item">Người ủng hộ</span>
                    <div className="detail-info">
                      <div className="txt-tongcong">Tổng cộng:</div>
                      <div className="number">{statistic.numberOfSupporter}</div>
                      {/* <div className="percent">( 23.5% )</div>
                      <i class="fas fa-arrow-circle-up"></i> */}
                    </div>
                  </div>
                </div>

                <div className="item item2">
                  <div className="image">
                    <i class="fas fa-people-carry"></i>
                  </div>
                  <div className="info">
                    <span className="name-item">Tình nguyện viên</span>
                    <div className="detail-info">
                      <div className="txt-tongcong">Tổng cộng:</div>
                      <div className="number">{statistic.numberOfVolunteer}</div>
                      {/* <div className="percent">( 23.5% )</div>
                      <i class="fas fa-arrow-circle-down"></i> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="total-info">
              <h3 className="title">Tổng cộng</h3>
              <div className="total-info__detail">
                <div className="money">
                  <span className="vnd">VNĐ</span>
                  <span className="txt-money">{statistic.sumOfAmount?.toFixed(0).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}</span>
                </div>

                {/* <div className="percent">
                  (11.5%) <i class="fas fa-arrow-circle-up"></i>
                </div> */}
              </div>
            </div>
          </div>
          {/* end: top pannel */}

          {/* second pannel */}
          <div className="second-pannel">
            <div className="main-chart">
              {" "}
              <h1 className="chart-title">Thống kê đóng góp</h1>
              <Chart
                options={state.options}
                series={state.series}
                height="100%"
              />
            </div>
            <div className="top-donator">
              <h3 className="title">Người đóng góp nhiều nhất</h3>
              {statistic.supporters.map(supporter =>
                <div className="list-user">
                  <div className="item-user">
                    <div className="image">
                      <img
                        src={"https://letters.noticeable.io/" + supporter.avatar}
                        alt=""
                      />
                    </div>
                    <div className="info">
                      <div className="name">{supporter.fullname} ({supporter.username})</div>
                      <div className="type">{supporter.times} lần</div>
                    </div>
                    <div className="money">
                      {" "}
                      <div className="image-coin">
                        <img src={coinImg} alt="" />
                      </div>
                      <span>{supporter.total.toFixed(0).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}</span>
                      <div className="vnd">VNĐ</div>
                    </div>
                  </div>
                </div>)}
            </div>
          </div>

          <div className="chart-row2">
            {/*             <div className="main-chart chart2">
              {" "}
              <h1 className="chart-title">Người dùng mới </h1>
              <Chart
                options={state3.options}
                series={state3.series}
                height="100%"
                type="area"
              />
            </div> */}
            <div className="main-chart chart3">
              <div className="top-donator donator2">
                <h3 className="title">Tổ chức hoạt động tốt nhất</h3>
                <div className="list-user">
                  {statistic.organizations.map((organization, index) =>
                    <div className="item-user">
                      <div className="image">
                        <span class="avatar-number">{index+1}</span>
                      </div>
                      <div className="info">
                        <div className="name">{organization.name}</div>
                        <div className="type">{organization.numberOfPost} chương trình</div>
                      </div>
                      <div className="money">
                        {" "}
                        <div className="image-coin">
                          <img src={coinImg} alt="" />
                        </div>
                        <span>{organization.contribution.toFixed(0).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}</span>
                        <div className="vnd">VNĐ</div>
                      </div>
                    </div>)}
                </div>
              </div>

              <div className="pannel">
                <h1 className="chart-title left">So sánh các tổ chức</h1>
                <Chart
                  options={state2.options}
                  series={state2.series}
                  height="100%"
                  type="donut"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
