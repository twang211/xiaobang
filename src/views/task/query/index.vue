<template>
        <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input :placeholder="$t('querytable.taskName')" v-model="listQuery.taskName" style="width: 120px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-input :placeholder="$t('querytable.taskCode')" v-model="listQuery.taskCode" style="width: 120px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-input :placeholder="$t('querytable.taskExecuteUserName')" v-model="listQuery.taskExecuteUserName" style="width: 120px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-select v-model="listQuery.taskPeriodType" class="filter-item" filterable placeholder="任务周期">
        <el-option v-for="item in periodTypeList" :key="item.key" :label="item.value" :value="item.key"/>
      </el-select>
      <el-select v-model="listQuery.taskStatus" class="filter-item" filterable placeholder="任务状态">
        <el-option v-for="item in taskStatusList" :key="item.key" :label="item.value" :value="item.key"/>
      </el-select>     
      <el-select v-model="listQuery.companyId" class="filter-item" filterable placeholder="关联单位">
        <el-option v-for="item in unitlist" :key="item.companyId" :label="item.companyName" :value="item.companyId"/>
      </el-select>
      <el-select v-model="listQuery.buildingId" class="filter-item" filterable placeholder="关联建筑">
        <el-option v-for="item in buildlist" :key="item.buildingId" :label="item.buildingName" :value="item.buildingId"/>
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('querytable.search') }}</el-button>
      <el-button v-waves class="filter-item" type="primary" @click="resetQuery">{{ $t('querytable.resetsearch') }}</el-button>

    </div>

    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;min-height:600px">
      
      <el-table-column :label="$t('table.taskName')" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.taskName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.taskCode')" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.taskCode }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.taskPeriodType')" align="center" >
        <template slot-scope="scope">
          <span>{{ showperiodTypeObj[scope.row.taskPeriodType] }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.companyId')" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.companyName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.buildingId')" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.buildingName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.taskStatus')" align="center" >
        <template slot-scope="scope">
          <span>{{ showtaskStatusObj[scope.row.taskStatus] }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.taskExecuteUserName')" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.taskExecuteUserName }}</span>
        </template>
      </el-table-column>
    </el-table>

 
    <div class="pagination-container">
      <el-pagination :current-page="listQuery.page" :page-size="listQuery.pageSize" :total="total" background layout="total, prev, pager, next, jumper" @current-change="handleCurrentChange"/>
    </div>

  </div>

</template>

<script>
import { fetchQueryDataList, fetchTypeList, fetchUnitDownDataList, fetchBuildDownDataList} from '@/api/article'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime, checkToken, getHeader } from '@/utils'

export default {
  name: 'Query',
  directives: {
    waves
  },
  filters: {
  },
  data() {
    return {
      tableKey: 0,
      header: getHeader(),
      myHeaders: {Authorization: getHeader()},
      extime: '',
      list: null,
      unitlist: null,
      buildlist: null,
      periodTypeList:[],
      showperiodTypeObj:{},
      taskStatusList:[],
      showtaskStatusObj:{},
      exportlist: null,
      total: null,
      listLoading: true,
      periodTypeQuery: {
        name:"periodTypeMap",
        type:"list"
      },
      taskStatusQuery: {
        name:"taskStatusMap",
        type:"list"
      },
      listQuery: {
        page: 1,
        pageSize: 10,
        taskName: null,
        taskCode: null,
        taskPeriodType: null,
        companyId: null,
        buildingId: null,
        taskStatus: null,
        taskExecuteUserName: null,
      },
      temp: {
        loginAccount:"",
        userName:"",
        password:"",
        department:"",
        userType:"",
        roleLevel:"",
        headImageId:"",
        nickName:"",
        sex:"",
        birthday:"",
        phone:"",
        wechat:"",
        email:"",
      },
      exportQuery: {},
      showReviewer: false
    }
  },
  created() {
    checkToken()
    this.getdataList()
    this.getperiodTypeList()
    this.gettaskStatusList()
    this.getunitdataList()
    this.getbuilddataList()
  },
  methods: {
    getdataList() {
      this.listLoading = true
      fetchQueryDataList(this.listQuery,this.header).then(response => {
        var code = response.data.resultCode
        if(code == 0){
        this.list = response.data.resultData.taskList
        this.total = response.data.resultData.pageInfo.totalCounts
      this.listLoading = false
        }else{
          
    this.$notify({
        title: '失败',
        message: response.data.resultMsg,
        type: 'warning',
        duration: 2000
    })
        }
      })
    },
    getperiodTypeList() {
      fetchTypeList(this.periodTypeQuery,this.header).then(response => {
        this.periodTypeList = response.data.resultData.periodTypeMap
        this.periodTypeList.forEach(element => {
          this.showperiodTypeObj[(element["key"].toString())] = element["value"]
        });
      })
    },
    gettaskStatusList() {
      fetchTypeList(this.taskStatusQuery,this.header).then(response => {
        this.taskStatusList = response.data.resultData.taskStatusMap
        this.taskStatusList.forEach(element => {
          this.showtaskStatusObj[(element["key"].toString())] = element["value"]
        });
      })
    },
    getunitdataList() {
      fetchUnitDownDataList({},this.header).then(response => {
        this.unitlist = response.data.resultData.companyList
      })
    },
    getbuilddataList() {
      fetchBuildDownDataList({},this.header).then(response => {
        this.buildlist = response.data.resultData.buildingList
      })
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
        taskName: null,
        taskCode: null,
        taskPeriodType: null,
        companyId: null,
        buildingId: null,
        taskStatus: null,
        taskExecuteUserName: null,
      }
    this.getdataList()
    },
    handleSizeChange(val) {
      this.listQuery.skip = val
      this.getdataList()
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
  }
}
</script>
