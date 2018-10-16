<template>
  <el-tabs v-model="activeName" type="card" >
    <el-tab-pane label="建筑列表" name="building" disabled>
        <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input :placeholder="$t('querytable.buildingName')" v-model="listQuery.buildingName" style="width: 120px;" class="filter-item" @keyup.enter.native="handleFilter"/>

      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('querytable.search') }}</el-button>
      <el-button v-waves class="filter-item" type="primary" @click="resetQuery">{{ $t('querytable.resetsearch') }}</el-button>
      <el-tag style="margin-bottom:20px;font-size: 20px;">
        请选择待巡查建筑点击下一步
    </el-tag>
      <el-button v-waves class="filter-item" type="primary" @click="nextPush">{{ $t('querytable.next') }}</el-button>

    </div>

    <el-table
      v-loading="listLoading"
      :key="tableKey"
    ref="singleTable"
      :data="list"
    highlight-current-row
      border
      fit
      style="width: 100%;min-height:600px"
      @current-change="handleChangeCurrent">
    <el-table-column
    :label="$t('table.index')" align="center"
      type="index"
      width="50">
    </el-table-column>
       <el-table-column :label="$t('table.buildingName')" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.buildingName }}</span>
        </template>
      </el-table-column>
       <el-table-column :label="$t('table.buildingType')" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.buildingTypeName }}</span>
        </template>
      </el-table-column>
       <el-table-column :label="$t('table.totalFloors')" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.totalFloors }}</span>
        </template>
      </el-table-column>
       <el-table-column :label="$t('table.tasks')" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.tasks }}</span>
        </template>
      </el-table-column>
       <el-table-column :label="$t('table.patrolAvgTime')" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.patrolAvgTime }}</span>
        </template>
      </el-table-column>
    </el-table>

 
    <div class="pagination-container">
      <el-pagination :current-page="listQuery.page" :page-size="listQuery.pageSize" :total="total" background layout="total, prev, pager, next, jumper" @current-change="handleCurrentChange"/>
    </div>

  </div>
    </el-tab-pane>
    <el-tab-pane label="派发任务" name="distribute" disabled>
              <div class="app-container calendar-list-container">
    <div class="filter-container">

      <el-date-picker v-model="distributetemp.taskOnTime"  class="filter-item" type="datetime" placeholder="派发时间"/>
            <el-select v-model="distributetemp.taskPeriodType" class="filter-item" filterable placeholder="任务类型">
        <el-option v-for="item in periodTypeList" :key="item.key" :label="item.value" :value="item.key"/>
      </el-select>
      <el-button v-waves class="filter-item" type="primary" @click="previewInfo">{{ $t('table.confirm') }}</el-button>
      <el-button v-waves class="filter-item" type="primary" @click="goBack">{{ $t('table.goback') }}</el-button>

    </div>

   <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="userlist"
    ref="multipleTable"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @selection-change="handleSelectionChange">
  <el-table-column
      type="selection"
      width="55">
    </el-table-column>
       <el-table-column :label="$t('table.userName')" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.userName }}</span>
        </template>
      </el-table-column>
       <el-table-column :label="$t('table.userCode')" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.userCode }}</span>
        </template>
      </el-table-column>
       <el-table-column :label="$t('table.userId')" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.userId }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
    </el-tab-pane>
    <el-tab-pane label="楼层展示" name="floors" disabled>
        <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-button v-waves class="filter-item" type="primary" @click="postInfo">{{ $t('table.confirm') }}</el-button>
      <el-button v-waves class="filter-item" type="primary" @click="goBack">{{ $t('table.goback') }}</el-button>
    </div>
      <ul id="v-for-object" class="demo">
      <li v-for="value in AllArr">
       
      <el-tag style="margin-bottom:20px;font-size: 20px;">
        {{ value.key }}层：
    </el-tag>
      <el-select v-model="value.value" class="filter-item" filterable placeholder="任务类型">
        <el-option v-for="item in multipleSelection" :key="item.userId" :label="item.userName" :value="item.userId"/>
      </el-select>
  </li>
</ul></div>
    </el-tab-pane>
    <el-tab-pane label="确认派送" name="over" disabled>
              <div class="app-container calendar-list-container">
    <div class="filter-container">

      <el-button v-waves class="filter-item" type="primary" @click="goBack">{{ $t('table.goback') }}</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="PostArr"
      border
      fit
      highlight-current-row
      style="width: 100%;">
       <el-table-column :label="$t('table.taskExecuteUserName')" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ showuserObj[scope.row.taskExecuteUserId] }}</span>
        </template>
      </el-table-column>
       <el-table-column :label="$t('table.aboutFloors')" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.aboutFloors }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.config')" align="center" width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="PostServer(scope.row)">{{ $t('table.confirm') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
    </el-tab-pane>
  </el-tabs>

</template>

<script>
import { fetchBuildDataList,fetchUserDownDataList,fetchTypeList,createTaskAdd } from '@/api/article'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime, checkToken, getHeader, range } from '@/utils'

export default {
  name: 'Distribute',
  directives: {
    waves
  },
  filters: {
  },
  data() {
    return {
      activeName:"building",
      tableKey: 0,
      header: getHeader(),
      myHeaders: {Authorization: getHeader()},
      extime: '',
      list: null,
      userlist: null,
      useuserlist: null,
      showuserObj: {},
      AllArr:[],
      PostArr:[],
      periodTypeList:[],
      exportlist: null,
      total: null,
      listLoading: true,
      buildinfo: null,
      periodTypeQuery: {
        name:"periodTypeMap",
        type:"list"
      },
      listQuery: {
        page: 1,
        pageSize: 10,
        buildingName: null,
      },
      temp: {
        taskPeriodType:"",
        taskOnTime:"",
        companyId:"",
        buildingId:"",
        aboutFloors:"",
        taskExecuteUserId:"",
      },
      distributetemp: {
        taskOnTime:"",
        taskPeriodType:""
      },
      exportQuery: {},
      showReviewer: false,
      multipleSelection: []
    }
  },
  created() {
    checkToken()
    this.getdataList()
  },
  methods: {
    getdataList() {
      this.listLoading = true
      fetchBuildDataList(this.listQuery,this.header).then(response => {
        var code = response.data.resultCode
        if(code == 0){
        this.list = response.data.resultData.buildingList
        this.total = response.data.resultData.pageInfo.totalCounts
      this.listLoading = false
        }else{
          
    this.$message({
        title: '失败',
        message: response.data.resultMsg,
        type: 'warning',
        duration: 2000
    })
        }
      })
    },
    goBack() {
      
      this.activeName = "building"
      this.created()
      this.userlist = null
      this.AllArr = []
    },
    getAllinfos() {
    },
    getexportList() {
      // this.listLoading = true
      // fetchcuList(this.exportQuery).then(response => {
      //   this.exportlist = response.data.data
      //   this.handleDownloadInfo()
      //   this.listLoading = false
      // })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getdataList()
    },
    resetQuery() {
      this.listQuery = {
        page: 1,
        pageSize: 10,
        buildingName: null,
      }
    this.getdataList()
    },
    resetdistributetemp() {
      this.distributetemp = {
        taskOnTime:"",
        taskPeriodType:""
      }
    },
    handleSizeChange(val) {
      this.listQuery.skip = val
      this.getdataList()
    },
    handleChangeCurrent(val) {
      this.buildinfo = val
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getdataList()
    },
    handleDownload() {
      this.extime = parseTime(new Date(), '{y}-{m}-{d}')
      this.getexportList()
    },
    handleDownloadInfo() {
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['开户公司ID', '开户公司名称', '备注']
        const filterVal = ['id', 'cusName', 'notes']
        const data = this.formatJson(filterVal, this.exportlist)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '客户基础信息-' + this.extime
        })
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        })
      )
    },
    nextPush(){
      if(this.buildinfo){
      this.activeName = "distribute"
      this.resetdistributetemp()
      this.getuserdataList()
      this.getperiodTypeList()
      }
    },
    getuserdataList() {
      console.log(this.buildinfo)
      this.userlist = null
      fetchUserDownDataList({buildingId:this.buildinfo.buildingId},this.header).then(response => {
        this.userlist = response.data.resultData.userList
        this.userlist.forEach(element => {
            this.showuserObj[element["userId"]] = element["userName"]
        });
      })
    },
    getperiodTypeList() {
      fetchTypeList(this.periodTypeQuery,this.header).then(response => {
        this.periodTypeList = response.data.resultData.periodTypeMap
        // this.periodTypeList.forEach(element => {
          //   this.showperiodTypeObj[(element["key"].toString())] = element["value"]
        // });
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;

    },
    previewInfo(){
      this.AllArr = []
      if(this.distributetemp.taskOnTime && this.distributetemp.taskPeriodType){

      var mul = this.multipleSelection
      var len = this.multipleSelection.length
      if(len > parseInt(this.buildinfo.totalFloors)){
        this.$message({
          title: '失败',
              message: '人数多余楼层数',
              type: 'warning',
              duration: 2000
            })
      }else{
        var l = range(parseInt("-"+this.buildinfo.downFloors),(this.buildinfo.upFloors+1))
        var newArr = []
        var b;
        var llen = (parseInt(l.length / len)+1)
        if((l.length % len) == 0){
          llen = (parseInt(l.length / len))
         }
        l.forEach(function(item, index, array) {
          var a = Math.floor(index / llen);
          if (b !== a) {
              b = a;
              newArr[a] = new Array();
          }    
          newArr[a].push({"key":item,"value":mul[a].userId});         
          });
            for(var i = 0; i < newArr.length; i++)
            {
                this.AllArr = this.AllArr.concat(newArr[i]);
            }
        this.activeName = "floors"
      }
      }else{

        this.$message({
          title: '失败',
              message: '派发时间/任务类型不能为空！',
              type: 'warning',
              duration: 2000
            })
      }
    },
    postInfo(){
      var usersIdList = []        
      // var usersId = this.userlist        
      var pArr = []

   
        this.multipleSelection.forEach((uitem, uindex, array) => {
            uitem.aboutFloors = null
            this.AllArr.forEach(function(Aitem, Aindex, array) {
              if(uitem.userId == Aitem.value){
                // uitem.listitem.push(Aitem.key)
                if(!uitem.aboutFloors){
                  uitem.aboutFloors =  Aitem.key
                }else{
                  uitem.aboutFloors +=  (","+Aitem.key)
                }

              }
            });
            uitem.taskPeriodType = this.distributetemp.taskPeriodType
            uitem.taskOnTime = parseTime(this.distributetemp.taskOnTime, '{y}-{m}-{d} {h}:{i}:{s}')
            uitem.companyId = this.buildinfo.companyId
            uitem.buildingId = this.buildinfo.buildingId
            uitem.taskExecuteUserId = uitem.userId
        });      
        this.PostArr = this.multipleSelection
        this.activeName = "over"
          
    },
    PostServer(row){
      createTaskAdd(row,this.header).then(response => {
        var code = response.data.resultCode
        if(code == 0){
              this.$message({
                  title: '成功',
                  message: '派发成功',
                  type: 'success',
                  duration: 2000
              })
        }else{
        this.$message({
          title: '失败',
              message: response.data.resultMsg,
              type: 'warning',
              duration: 2000
            })
        }
      })
    }
  }
}
</script>

<style>
#v-for-object{
  
}
#v-for-object li{
list-style-type:none;
    width: 30%;
    float: left;
}
</style>