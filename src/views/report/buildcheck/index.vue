<template>
        <div class="app-container calendar-list-container">
    <div class="filter-container">
            <el-input :placeholder="$t('querytable.apparatusName')" v-model="listQuery.apparatusName" style="width: 120px;" class="filter-item" @keyup.enter.native="handleFilter"/>
            <el-input :placeholder="$t('querytable.apparatusCode')" v-model="listQuery.apparatusCode" style="width: 120px;" class="filter-item" @keyup.enter.native="handleFilter"/>

      <el-select v-model="listQuery.companyId" @change="changeCompany" class="filter-item" filterable placeholder="单位名称">
        <el-option v-for="item in unitlist"  :key="item.companyId" :label="item.companyName" :value="item.companyId"/>
      </el-select>
      <el-select v-model="listQuery.buildingId" class="filter-item" filterable placeholder="建筑名称">
        <el-option v-for="item in buildlist" :key="item.buildingId" :label="item.buildingName" :value="item.buildingId"/>
      </el-select>
      <el-select v-model="listQuery.checkUserId" class="filter-item" filterable placeholder="巡查人">
        <el-option v-for="item in userlist" :key="item.userId" :label="item.userName" :value="item.userId"/>
      </el-select>
      
      <el-date-picker v-model="listQuery.queryDateFrom" type="date" placeholder="开始时间"/>
      <el-date-picker v-model="listQuery.queryDateTo" type="date" placeholder="结束时间"/>
       <el-select v-model="listQuery.isPass" :placeholder="$t('querytable.isPass')" clearable style="width: 120px" class="filter-item" placeholder="是否合格">

            <el-option v-for="item in selectType" :key="item.key" :label="item.label" :value="item.key"/>      </el-select>
       <el-select v-model="listQuery.isAmend" :placeholder="$t('querytable.isAmend')" clearable style="width: 120px" class="filter-item" placeholder="是否处理">

            <el-option v-for="item in selectType" :key="item.key" :label="item.label" :value="item.key"/>      </el-select>
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
      
      <el-table-column :label="$t('table.apparatusName')" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.apparatusName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.apparatusCode')" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.apparatusCode }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.companyName')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.companyName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.buildingName')" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.buildingName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.apparatusAddress')" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.apparatusAddress }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.isPass')" align="center" >
        <template slot-scope="scope">
          <span>{{ checkType[scope.row.isPass] }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.isAmend')" align="center" >
        <template slot-scope="scope">
          <span>{{ checkType[scope.row.isAmend] }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.checkUserAutographUri')" align="center" >
        <template slot-scope="scope">
          <img  :src="scope.row.checkUserAutographUri" class="avatar">
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.config')" align="center" >
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="lookInfos(scope.row)">{{ $t('table.look') }}</el-button>
        </template>
      </el-table-column>
    </el-table>

 
    <div class="pagination-container">
      <el-pagination :current-page="listQuery.page" :page-size="listQuery.pageSize" :total="total" background layout="total, prev, pager, next, jumper" @current-change="handleCurrentChange"/>
    </div>
    <el-dialog title="详情" :visible.sync="dialogFormVisible" width="90%">
      
             <div class="app-container calendar-list-container">
    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="infos"
      border
      fit
      highlight-current-row
      style="width: 100%;">     
      <el-table-column :label="$t('table.checkPoint')" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.checkPoint }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.isPass')" align="center" >
        <template slot-scope="scope">
          <span>{{ checkType[scope.row.isPass] }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.isAmend')" align="center" >
        <template slot-scope="scope">
          <span>{{ checkType[scope.row.isAmend] }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.errorDescription')" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.errorDescription }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.spotHandling')" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.spotHandling }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.reportingConditions')" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.reportingConditions }}</span>
        </template>
      </el-table-column>
    </el-table>
             </div>
    </el-dialog>

  </div>

</template>

<script>
import { fetchCheckRecordDataList,fetchCheckRecordInfosData, fetchTypeList, fetchUnitDownDataList, fetchBuildDownDataList, fetchUserDownDataList} from '@/api/article'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime, checkToken, getHeader } from '@/utils'

export default {
  name: 'BuildCheck',
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
      userlist: null,
      userTypeList:[],
      showuserTypeObj:{},
      exportlist: null,
      total: null,
      listLoading: true,
      userTypeQuery: {
        name:"userTypeMap",
        type:"list"
      },
      listQuery: {
        page: 1,
        pageSize: 10,
        isFinish: 1,
        kind: 1,
        checkUserType: 2,
        apparatusCode: null,
        apparatusUuId: null,
        apparatusName: null,
        companyId: null,
        buildingId: null,
        checkUserId: null,
        isAmend: null,
        queryDateFrom: null,
        queryDateTo: null,
      },
      exportQuery: {},
      infos: [],
      dialogFormVisible: false,
      showReviewer: false,
      checkType:["否","是"],
      selectType: [{ label: '是', key: 1 }, { label: '否', key: 0 }],
    }
  },
  created() {
    checkToken()
    this.getdataList()
    this.getuserTypeList()
    this.getunitdataList()
    this.getuserdataList()
  },
  methods: {
    getdataList() {
      this.listLoading = true
      fetchCheckRecordDataList(this.listQuery,this.header).then(response => {
        var code = response.data.resultCode
        if(code == 0){
        this.list = response.data.resultData.taskDetailList
        this.list.forEach(element => {
          if(element.checkUserAutographUri){

            element.checkUserAutographUri = "http://47.92.165.114:8081"+element.checkUserAutographUri
          }
        });
        this.total = response.data.resultData.pageInfo.totalCounts
      this.listLoading = false
        }else{
          
    this.$notify({
        title: '失败',
        message: response.data.resultMsg,
        type: 'warning',
        duration: 1500
    })
        }
      })
    },
    getuserTypeList() {
      fetchTypeList(this.userTypeQuery,this.header).then(response => {
        this.userTypeList = response.data.resultData.userTypeMap
        this.userTypeList.forEach(element => {
          this.showuserTypeObj[element["key"]] = element["value"]
        });
      })
    },
    getunitdataList() {
      fetchUnitDownDataList({},this.header).then(response => {
        this.unitlist = response.data.resultData.companyList
      })
    },
    changeCompany(value) {
      
      this.buildlist = []
      fetchBuildDownDataList({companyId:value},this.header).then(response => {
        this.buildlist = response.data.resultData.buildingList
      })
    },
    getuserdataList() {
      fetchUserDownDataList({},this.header).then(response => {
        this.userlist = response.data.resultData.userList
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
      if(this.listQuery.queryDateFrom &&this.listQuery.queryDateTo ){

        this.listQuery.queryDateFrom = parseTime(this.listQuery.queryDateFrom, '{y}-{m}-{d}')
      this.listQuery.queryDateTo = parseTime(this.listQuery.queryDateTo, '{y}-{m}-{d}')
      }
      this.getdataList()
    },
    resetQuery() {
      this.listQuery = {
        page: 1,
        pageSize: 10,
        isFinish: 1,
        kind: 1,
        checkUserType: 2,
        apparatusCode: null,
        apparatusUuId: null,
        apparatusName: null,
        companyId: null,
        buildingId: null,
        checkUserId: null,
        isAmend: null,
        queryDateFrom: null,
        queryDateTo: null,
      }
    this.getdataList()
    },
    lookInfos(row){
      this.infos = []
      this.dialogFormVisible = true
      
      fetchCheckRecordInfosData({taskDetailId:row.taskDetailId},this.header).then(response => {
        var code = response.data.resultCode
        if(code == 0){
          
      this.infos = response.data.resultData.detailList
      
        // this.infos.forEach(element => {
        //   if(element.checkUserAutographUri){

        //     element.checkUserAutographUri = "http://47.92.165.114:8081"+element.checkUserAutographUri
        //   }
        // });
        // this.list = response.data.resultData.taskDetailInfo
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

<style>
  .avatar {       width: 50%;
    height: 100%;
    display: block;
    margin: 0 auto;
  }
</style>