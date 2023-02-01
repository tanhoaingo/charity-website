import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login, signup } from '../../action/auth';

const useForm = (validate) => {
    const dispatch = useDispatch();
    const [values,setValues] = useState({
        username: '',
        email: '',
        phoneNumber: '',
        password: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };

    const handleLogin = e => {
        e.preventDefault();
        let err = {}
        if(!values.username.trim()){
            err.username = "Vui lòng nhập tên tài khoản";
        }
        if(!values.password){
            err.password = "Vui lòng nhập mật khẩu";
        }
        setErrors(err);
        if(Object.keys(err).length === 0){
            dispatch(login({username: values.username, password: values.password}));
        }
    }

    const handleSignup = e => {
        e.preventDefault();
        let err = validate(values);
        setErrors(err);
        if(Object.keys(err).length === 0){
            dispatch(signup({username: values.username, password: values.password, email: values.email, phoneNumber: values.phoneNumber}));
        }
    }

    return {values, errors, handleChange, handleLogin, handleSignup};
}
export default useForm;
