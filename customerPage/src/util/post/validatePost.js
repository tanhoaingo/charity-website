export default function validatePost(values){
    let errors = {};

    if(!values.title.trim()){
        errors.title = "Tên bài viết không được bỏ trống";
    }
    if(!values.organization.trim()){
        errors.organization = "Tên tổ chức không được bỏ trống";
    }
    if(values.expectation < 1000000){
        errors.expectation = "Số tiền phải lớn hơn hoặc bằng 1 triệu đồng";
    }
    if(values.expirationDate < 1){
        errors.expirationDate = "Ngày hết hạn phải lớn hơn 0";
    }
    if(!values.type.trim()){
        errors.type = "Loại không được bỏ trống";
    }
    if(!values.content.trim()){
        errors.content = "Nội dung không được bỏ trống";
    }

    return errors;
}
