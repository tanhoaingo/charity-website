import axios from "axios";
import { useEffect, useState } from "react"
import { useDispatch } from 'react-redux';
import { getEntire } from "../../action/post";
const usePost = (validatePost) => {
    const [values, setValues] = useState({
        title: '',
        organization: '',
        expectation: 0,
        expirationDate: 0,
        type: '',
        content: ''
    });
    const [errors, setErrors] = useState({});
    const [row, setRow] = useState(1);
    const [files, setFiles] = useState([]);
    const [desc, setDesc] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const dispatch = useDispatch();

    const handleChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };
    const handleTypeChange = e => {
        setValues({
            ...values,
            type: e.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        let err = validatePost(values);
        setErrors(err);
        if (Object.keys(err).length === 0) {
            if (files.length === 0) {
                alert("Chưa thêm ảnh mô tả cho bài viết!");
            } else {
                const formData = new FormData();
                for (const element of files) {
                    formData.append(`files`, element);
                }
                formData.append("title", values.title);
                formData.append("organization", values.organization);
                formData.append("expectation", values.expectation);
                formData.append("expirationDate", values.expirationDate);
                formData.append("type", values.type);
                formData.append("content", values.content);
                formData.append("description", desc);

                axios({
                    method: 'POST', url: "http://localhost:8080/post/create", data: formData, headers: { "Navigation": "http://localhost:3001/createpost-success" }
                }).then((res) => {
                    if (res.status == 200) {
                        window.location.href = "http://localhost:3001/createpost-success";
                    }

                });
            }
        }
    }

    const handleTxtAreaChange = (e) => {
        const previousRow = e.target.rows;
        e.target.rows = 1;
        const currentRow = (e.target.scrollHeight - 43 + 19) / 19;
        if (previousRow === currentRow) {
            e.target.rows = currentRow;
        }
        setRow(currentRow);
        setValues({
            ...values,
            content: e.target.value
        });
    }

    const handleUpload = (e) => {
        if (e.target.files.length !== 0) {
            let items = [];
            let description = [];
            for (const element of e.target.files) {
                items.push(element);
                description.push('');
            }

            setFiles(items);
            setDesc(description);
        }
    };
    const handleDescChange = (e) => {
        let des = [...desc];
        des[e.target.name] = e.target.value;
        setDesc(des);
    }
    const handleOldDescUpdate = (e) => {
        let imgs = [...oldImages];
        imgs[e.target.name].description = e.target.value;
        setDesc(imgs);
    }
    function handleLoad(data) {
        console.log(data);
        setRow(data.content.length * 2);
        setValues({
            title: data.title,
            organization: data.organization,
            expectation: data.expectation,
            expirationDate: data.remainingDay,
            type: data.type,
            content: data.content.join("\r\n")
        });
        let images = [];
        data.images.map(image => {
            images.push({
                id: image.id,
                imgByte: image.imgByte,
                description: image.description,
                isDeleted: false
            })
        })
        setOldImages(images);
    }
    const clickDeleteButton = (e) => {
        e.preventDefault();
        let imgs = [...oldImages];
        imgs[e.target.name].isDeleted = !imgs[e.target.name].isDeleted;
        setDesc(imgs);
    }

    function handleUpdate(id) {
        let err = validatePost(values);
        setErrors(err);
        if (Object.keys(err).length === 0) {
            let isEmpty = true;
            oldImages.forEach(image => {
                if(!image.isDeleted){
                    isEmpty = false;
                }
            })
            if (files.length === 0 && isEmpty) {
                alert("Chưa thêm hình ảnh mô tả bài viết!");
            } else {
                const formData = new FormData();
                for (const element of files) {
                    formData.append(`files`, element);
                }
                formData.append("title", values.title);
                formData.append("organization", values.organization);
                formData.append("expectation", values.expectation);
                formData.append("expirationDate", values.expirationDate);
                formData.append("type", values.type);
                formData.append("content", values.content);
                formData.append("description", desc);
                formData.append(`oldImages`, JSON.stringify(oldImages));

                axios({
                    method: 'PUT', url: "http://localhost:8080/post/update/" + id, data: formData, headers: { "Navigation": "http://localhost:3001/dashboard/postadmin" }
                }).then(() => {
                    dispatch(getEntire());
                });
            }

        }
    }
    return { values, errors, row, files, oldImages, desc, handleChange, handleTypeChange, handleSubmit, handleTxtAreaChange, handleUpload, handleDescChange, handleLoad, handleOldDescUpdate, clickDeleteButton, handleUpdate };
};

export default usePost;