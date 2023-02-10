import React, { useEffect } from "react";
import "./auth.css";
import loginGif from "../../assets/img/component/loginbackground.gif";
import { Link } from "react-router-dom";
import appleImg from "../../assets/img/auth/apple.png";
import facebookImg from "../../assets/img/auth/facebook.png";
import googleImg from "../../assets/img/auth/google.png";
import useForm from "../../util/authentication/useForm";
import validate from "../../util/authentication/validateInfo";
/**
 * @author
 * @function SignUp
 **/

export const SignUp = (props) => {
  /* const handleLogin = () => {
    localStorage.setItem("mykey", "2");
  }; */
  const { values, errors, handleChange, handleLogin, handleSignup } = useForm(validate);
  useEffect(() => {
    if(window.localStorage.getItem("USERNAME")){
      window.location.href = "http://localhost:3001";
    }
  });
  return (
    <div>
      <div className="login">
        <div className="login__above">
          <div className="login__gif">
            <img src={loginGif} alt="" />
          </div>
        </div>
        <div className="login__bottom">
          <div className="content__wrapper">
            <div className="content__body signup">
              <h3>Đăng ký thành viên</h3>
              <form onSubmit={handleSignup}>
              <div className="auth-form signup">
                <div className="signup">
                  <div className="col">
                    <input
                      type="text"
                      placeholder="Tên tài khoản"
                      className="large-custom-input"
                      name="username"
                      value={values.username}
                      onChange={handleChange}
                    />
                    {errors.username && <p>{errors.username}</p>}
                    <input
                      type="number"
                      placeholder="Số điện thoại"
                      className="large-custom-input"
                      name="phoneNumber"
                      value={values.phoneNumber}
                      onChange={handleChange}
                    />
                    {errors.phoneNumber && <p>{errors.phoneNumber}</p>}
                  </div>
                  <div className="col">
                    <input
                      type="text"
                      placeholder="Nhập email"
                      className="large-custom-input"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                    />
                    {errors.email && <p>{errors.email}</p>}
                    <input
                      type="password"
                      placeholder="Mật khẩu"
                      className="large-custom-input"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                    />
                    {errors.password && <p>{errors.password}</p>}
                  </div>
                </div>
                <button type="submit" className="button-19">
                  Đăng ký
                </button>
                <div className="social-login">
                  <Link
                    to={
                      localStorage.getItem("loginto") === "dashboard"
                        ? "/dashboard"
                        : "/"
                    }
                    className="session-method"
                  >
                    <img src={googleImg} alt="" />
                    <span>Google</span>
                  </Link>
                  <Link
                    to={
                      localStorage.getItem("loginto") === "dashboard"
                        ? "/dashboard"
                        : "/"
                    }
                    className="session-method"
                  >
                    <img className="fb" src={facebookImg} alt="" />
                    <span>Facebook</span>
                  </Link>
                  {/* <Link to="/au th" className="session-method">
                    <img src={appleImg} alt="" />
                  </Link> */}
                </div>

                <div className="change-auth">
                  <span>Đã có tài khoản? </span>
                  <Link to="/login">Đăng nhập</Link>
                </div>
              </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
