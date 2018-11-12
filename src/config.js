var config ;
if (process.env.NODE_ENV !== 'production') {
    config = {
        basicsUrl:"http://localhost:8000",
        fileUrl:"http://localhost:8001",
    }
}else {
    config = {
        basicsUrl:"https://blogapi.iweijie.cn",
        fileUrl:"http://file.iweijie.cn"
    }
}

export default  config