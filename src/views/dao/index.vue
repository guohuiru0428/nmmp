<template>
  <div class="user">
    <!-- 查询 -->
    <el-form :inline="true" :model="formInline"  class="demo-form-inline">
  <el-form-item >
    <el-input v-model="formInline.user" placeholder="会员卡号"></el-input>
  </el-form-item>
  <el-form-item >
    <el-input v-model="formInline.user" placeholder="会员注册"></el-input>
  </el-form-item>
   <el-form-item prop="payType">
        <el-select v-model="formInline.payType" placeholder="支付类型" style="width:110px">
          <el-option v-for="(item,index) in payTypeValue" :key="index" :label="item.name" :value="item.type"></el-option>
        </el-select>
      </el-form-item>
  <!-- 生日时间 -->
  <el-form-item>
  <el-date-picker type="date" placeholder="选择日期" v-model="value" style="width: 100%;"></el-date-picker>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">查询</el-button>
    <el-button type="primary" @click="onSubmit">新增</el-button>
    <el-button type="primary" @click="onSubmit">删除</el-button>
  </el-form-item>
</el-form>
<!-- 渲染 -->
    <el-table :data="list" style="width: 100%;height:100%;">
       <el-table-column prop="name" label="用户姓名" width="180"></el-table-column>
      <el-table-column prop="cardNum" label="编号" width="180"></el-table-column>
      <el-table-column prop="birthday" label="出生年月" width="180"></el-table-column>
      <el-table-column prop="phone" label="电话号码" width="180"></el-table-column>
      <el-table-column prop="address" label="家庭住址" width="180" ></el-table-column>
    </el-table>
    <el-pagination @current-change="add" background  :page-size="pageSize"  layout="total,prev, pager, next"  
    :current-page="currentpage" :total="total" ></el-pagination>
  </div>
</template>
<script>
import MerrApi from "../../api/merr";
const payType = [
  {
    type: 1,
    name: "现金"
  },
  {
    type: 2,
    name: "微信"
  },
  {
    type: 3,
    name: "支付宝"
  },
  {
    type: 4,
    name: "银行卡"
  }
];
export default {
  data() {
    return {
        // current-page	当前页数，
        // page-sizes	每页显示个数选择器的选项设置
      list: [],
      formInline:{},
      pageSize: 10,//每页显示的条数10条
      offset: 0,
     total:0,//总记录数
    //  改变时会出发当前页
    currentpage:1,//当前页默认为第一页
    payTypeValue : payType
    };
  },
  created() {
    this.getUser();
  },
  mounted() {},
  methods: {
    getUser() {
        // 请求数据渲染
        // 调用分页方法查询，不要少了THIS
      MerrApi.getUserList(this.offset,this.pageSize)
        .then(res => {
          // console.log(res)
          this.list = res.data.data.rows;
          // console.log(res.data.data.rows);
        })
        .catch(error => {
          console.log(error);
        });
        // 请求条数渲染
        MerrApi.getCount().then(res=>{
            // console.log(res)
            this.total=res.count
        })
    },
    add(data){
        // console.log(data)
        this.offset=(data-1)*this.pageSize
        this.getUser();
    },
    // 查询
    onSubmit(){

    }
  }
};
</script>

<style scoped>
.demo-form-inline{
  margin-top: 20px;
}
</style>
