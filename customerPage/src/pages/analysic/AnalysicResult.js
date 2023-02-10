import React, { useEffect, useMemo, useState } from "react";
import { Header } from "../../components/header/Header";
import { enGB, vi } from "date-fns/locale";
import { DatePicker } from "react-nice-dates";
import "react-nice-dates/build/style.css";

import "./analysicitem.css";
import avatarImg from "../../assets/img/avatar.png";
import post1Img from "../../assets/img/homePagePost/post1.jpg";
import { Link } from "react-router-dom";

// toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// json
import { donateUser } from "../../assets/JsonData/donateUser";
import Select from "react-select";
import {
  useTable,
  useGlobalFilter,
  useSortBy,
  usePagination,
  useFilters,
} from "react-table";
import donateUserJson from "../../assets/JsonData/userData.json";
import { COLUMNS } from "../../assets/JsonData/Column";
import { Filter } from "./Filter";

/**
 * @author
 * @function AnalysicResult
 **/

export const AnalysicResult = (props) => {
  const options = [
    { value: "", label: "Tất cả" },
    { value: "8", label: "Tháng 8" },
    { value: "9", label: "Tháng 9" },
    { value: "10", label: "Tháng 10" },
    { value: "11", label: "Tháng 11" },
    { value: "12", label: "Tháng 12" },
  ];
  const options2 = [
    { value: "", label: "Tất cả" },
    { value: "2020", label: "Năm 2020" },
    { value: "2021", label: "Năm 2021" },
  ];
  const optionPages = [
    { value: 10, label: "10" },
    { value: 20, label: "20" },
    { value: 50, label: "50" },
    { value: 100, label: "100" },
  ];
  const optionType = [
    { value: "", label: "Tất cả" },
    { value: "mot lan", label: "Một lần" },
    { value: "hang thang", label: "Hàng tháng" },
  ];
  const optionMethod = [
    { value: "", label: "Tất cả" },
    { value: "Momo", label: "MoMo" },
    { value: "Zalo Pay", label: "Zalo Pay" },
    { value: "Bank", label: "Ngân hàng" },
  ];

  const [valueState, setValueState] = useState("");
  const [valueYear, setValueYear] = useState("");
  const [method, setMethod] = useState("");
  const handler = (event) => {
    const value = event.value;
    setValueState(value);
  };
  const handleYear = (e) => {
    setValueYear(e.value);
  };
  const handleDate = (e) => {
    setDate(e.value);
  };

  const handleMethod = (e) => {
    setMethod(e.value);
    setGlobalFilter(e.value);
  };
  const handleType = (e) => {
    setGlobalFilter(e.value);
  };
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => donateUserJson, []);
  const tableInstance = useTable(
    {
      columns,

      data,
    },

    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    prepareRow,
    pageOptions,
    setPageSize,
    state,
    setGlobalFilter,
    setFilter,
  } = tableInstance;

  const { globalFilter, pageIndex, pageSize, filter } = state;

  // toast
  const notify = () =>
    toast.success("🦄 Wow so easy!", {
      position: "top-right",
      autoClose: 2222,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      width: "500px",
    });

  const [date, setDate] = useState();
  useEffect(() => {
    var localDate = new Date(date);
    var xx = localDate.toLocaleDateString("en-US");
    if (xx === "Invalid Date") {
      xx = "";
    }

    console.log("binnnnnnnnnnnnn");
    console.log(xx);
    if (xx !== "") {
      var initial = xx.split(/\//);
      if (initial[1] && initial[0]) {
        if (initial[1].length === 1) initial[1] = "0" + initial[1];
        if (initial[0].length === 1) initial[0] = "0" + initial[0];
      }

      xx = [initial[2], initial[1], initial[0]].join("-");
      console.log(xx);
      if (xx === "Invalid Date") {
        xx = "";
      }
    }

    setGlobalFilter(xx || "");
  }, [date]);

  const handleDeleteDate = () => {
    setDate("");
  };
  return (
    <div className="analysic-item-page">
      <Header type="analysic" />

      <div className="body">
        <div className="left-pannel">
          <div className="left-pannel__container__wrapper">
            <div className="left-pannel__container">
              <div className="post-left">
                <div className="image">
                  <img src={post1Img} alt="" />
                </div>
              </div>

              <div className="title">
                Chương trình tặng quà cho người lao động khu vực Sài Gòn và các
                tỉnh bị giãn cách
              </div>
              {/* <div className="option">
                <a className="detail-btn" href="#">
                  Xem chi tiết
                </a>
                <a className="save-btn" href="#">
                  Lưu lại
                </a>
              </div> */}

              <div className="option-tab">
                <div className="tab-btn ">
                  <Link to="/analysic">Tổng quan</Link>
                </div>
                <div className="tab-btn ">
                  <Link to="/user">Danh sách ủng hộ</Link>
                </div>
                <div className="tab-btn">
                  <Link to="/statement">Sao kê</Link>
                </div>
                <div className="tab-btn active">
                  <Link to="/achievement">Thành quả</Link>
                </div>{" "}
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

                <div class="details recentCustomers statement">
                  <div class="recentOrders">
                    <div className="statement__header">
                      <div className="option">
                        <Filter
                          filter={globalFilter}
                          setFilter={setGlobalFilter}
                        />
                        <div className="date-picker">
                          <DatePicker
                            date={date}
                            onDateChange={setDate}
                            locale={vi}
                          >
                            {({ inputProps, focused }) => (
                              <input
                                className={
                                  "input" + (focused ? " -focused" : "")
                                }
                                {...inputProps}
                              />
                            )}
                          </DatePicker>
                          <span onClick={handleDeleteDate}>
                            <i class="far fa-trash-alt"></i>
                          </span>
                        </div>
                        <div className="month-year">
                          <Select
                            placeholder="Chọn tháng"
                            className="honghong month"
                            options={options}
                            onChange={handler}
                          />
                          <Select
                            placeholder="Chọn năm"
                            className="honghong year"
                            options={options2}
                            onChange={handleYear}
                          />
                        </div>
                        <Select
                          placeholder="Phương thức"
                          className="honghong method"
                          options={optionMethod}
                          onChange={handleMethod}
                        />
                        <Select
                          placeholder="Chọn loại"
                          className="honghong type"
                          options={optionType}
                          onChange={handleType}
                        />
                        {/* <button onClick={notify}>Notify!</button> */}
                        <ToastContainer
                          position="top-center"
                          autoClose={2222}
                          hideProgressBar={false}
                          newestOnTop={false}
                          closeOnClick
                          rtl={false}
                          pauseOnFocusLoss
                          draggable
                          pauseOnHover
                        />
                      </div>
                    </div>
                    <table {...getTableProps()}>
                      <thead>
                        {headerGroups.map((headergroup) => (
                          <tr {...headergroup.getHeaderGroupProps()}>
                            {headergroup.headers.map((column) => (
                              <td
                                {...column.getHeaderProps(
                                  column.getSortByToggleProps()
                                )}
                              >
                                {column.render("Header")}

                                <span>
                                  {column.isSorted ? (
                                    column.isSortedDesc ? (
                                      <i class="desc fas fa-caret-right"></i>
                                    ) : (
                                      <i class="asc fas fa-caret-right"></i>
                                    )
                                  ) : (
                                    ""
                                  )}
                                </span>
                              </td>
                            ))}
                          </tr>
                        ))}
                      </thead>
                      <tbody {...getTableBodyProps()}>
                        {page.map((row) => {
                          prepareRow(row);
                          return (
                            <tr {...row.getRowProps()}>
                              {row.cells.map((cell) => {
                                var localDate = new Date(date);
                                var x1 = localDate.toLocaleDateString("en-US");
                                var localDate1 = new Date(cell.value);
                                var x2 = localDate1.toLocaleDateString("en-US");

                                if (true) {
                                  if (cell.column.id === "avatar") {
                                    return (
                                      <td width="60px" {...cell.getCellProps()}>
                                        <div class="imgBx">
                                          {cell.render("Cell")}
                                        </div>
                                      </td>
                                    );
                                  } else if (cell.column.id === "type") {
                                    return (
                                      <td {...cell.getCellProps()}>
                                        <span>{cell.render("Cell")}</span>
                                      </td>
                                    );
                                  } else if (cell.column.id === "id") {
                                    return (
                                      <td
                                        className="idcol"
                                        {...cell.getCellProps()}
                                      >
                                        {cell.render("Cell")}
                                      </td>
                                    );
                                  } else {
                                    return (
                                      <td {...cell.getCellProps()}>
                                        <span>{cell.render("Cell")}</span>
                                      </td>
                                    );
                                  }
                                } else {
                                  return "";
                                }
                              })}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>

                    <div className="footer">
                      <span>Số dòng 1 trang</span>

                      <Select
                        placeholder="10"
                        className="select-page"
                        options={optionPages}
                        onChange={(e) => setPageSize(Number(e.value))}
                      />
                      <span className="txt-page-index">
                        {pageIndex + 1} of {pageOptions.length}
                      </span>
                      <button
                        className="btn-page prev"
                        disabled={!canPreviousPage}
                        onClick={() => previousPage()}
                      >
                        <i class="fas fa-chevron-left"></i>
                      </button>
                      <button
                        className="btn-page next"
                        disabled={!canNextPage}
                        onClick={() => nextPage()}
                      >
                        <i class="fas fa-chevron-right"></i>
                      </button>
                    </div>
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
