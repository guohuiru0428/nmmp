import axios from "@/utils/request";
export default{
    // 获取列表接口
    getUserList(offset,limit){
    return axios({
        url:"http://mengxuegu.com:7300/mock/5f56ee818d90085e5b58434f/user/student",
        method:'get',
        params : {
            offset ,
            limit,
        }
    })
    },
    // 获取总条数
    getCount(){
        return axios({
            url:"https://elm.cangdu.org/v1/users/count",
            method:'get'
        })
    }
}