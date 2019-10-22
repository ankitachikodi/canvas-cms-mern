let service = {};
service.isLogin = ()=>{
    let email = localStorage.getItem('email')
    if(email !== null && typeof email !== "undefined" && email !== ""){
        return true;
    }else{
        return false
    }
}

service.isFaculty = () => {
    let type = localStorage.getItem('type')
    if(type === "Faculty"){
        return true;
    }else if(type === "Student"){
        return false;
    }else{
        // redirect login
    }
}

service.getUser = () => {
    let email = localStorage.getItem('email');
    let type = localStorage.getItem('type');
    return {
        email: email,
        type: type,
    }
    
}

export default service;
