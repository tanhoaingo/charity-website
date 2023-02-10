import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import facebookImg from "../../assets/img/auth/facebook.png";
import googleImg from "../../assets/img/auth/google.png";
import loginGif from "../../assets/img/component/loginbackground.gif";
import useForm from "../../util/authentication/useForm";
import validate from "../../util/authentication/validateInfo";
import "./auth.css";


/**
 * @author
 * @function Login
 **/

export const Login = (props) => {
  /*   const handleLogin = () => {
      localStorage.setItem("mykey", "2");
    }; */
  const { values, errors, handleChange, handleLogin, handleSignup } = useForm(validate);

  useEffect(() => {
    if(window.localStorage.getItem("USERNAME")){
      window.location.href = "http://localhost:3001";
    }
  });

  return (
    <div className="login">
      <div className="login__above">
        <div className="login__gif">
          <img src={loginGif} alt="" />
        </div>
      </div>
      <div className="login__bottom">
        <div className="content__wrapper">
          <div className="content__body">
            <h3>Chào mừng trở lại</h3>
            <form onSubmit={handleLogin}>
              <div className="auth-form">
                <input
                  type="text"
                  placeholder="Nhập tên tài khoản"
                  className="large-custom-input"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                />
                {errors.username && <p>{errors.username}</p>}
                <input
                  type="password"
                  placeholder="Mật khẩu"
                  className="large-custom-input"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                />
                {errors.password && <p>{errors.password}</p>}
                <div className="option-login">
                  <div className="remember-me__wrapper">
                    <span>
                      {" "}
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        className="custom-checkbox-ciclex"
                      />
                    </span>
                    <span>Ghi nhớ tôi</span>
                  </div>
                  <Link to="/forgetpassword">Quên mật khẩu?</Link>
                </div>

                <button
                  type="submit"
                  className="button-19"
                >
                  Đăng nhập
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
                  {/* <Link to="/auth" className="session-method">
                  <img src={appleImg} alt="" />
                </Link> */}
                </div>

                <div className="change-auth">
                  <span>Chưa có tài khoản? </span>
                  <Link to="/signup">Đăng ký</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
