export default function validateInfo(values){
    let errors = {};

    if(!values.username.trim()){
        errors.username = "Tên tài khoản không được bỏ trống";
    }
    if(!values.email){
        errors.email = "Email không được bỏ trống";
    } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
        errors.email = "Email không hợp lệ";
    }
    if(!values.phoneNumber) {
        errors.phoneNumber = 'Số điện thoại không được bỏ trống';
    }
    if(!values.password) {
        errors.password = 'Mật khẩu không được bỏ trống';
    } else if (values.password.length < 6){
        errors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }
    return errors;
}