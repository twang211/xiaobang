<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">            
            <el-input :placeholder="$t('querytable.apparatusName')" v-model="listQuery.apparatusName" style="width: 120px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-input :placeholder="$t('querytable.apparatusCode')" v-model="listQuery.apparatusCode" style="width: 120px;" class="filter-item" @keyup.enter.native="handleFilter"/>

      <el-select v-model="listQuery.companyId" @change="changeCompany" class="filter-item" filterable placeholder="单位名称">
        <el-option v-for="item in unitlist" :key="item.companyId" :label="item.companyName" :value="item.companyId"/>
      </el-select>
      <el-select v-model="listQuery.buildingId" class="filter-item" filterable placeholder="建筑名称">
        <el-option v-for="item in buildlist" :key="item.buildingId" :label="item.buildingName" :value="item.buildingId"/>
      </el-select>
      <el-date-picker v-model="listQuery.queryDateFrom" class="filter-item" type="date" placeholder="开始时间"/>
      <el-date-picker v-model="listQuery.queryDateTo" class="filter-item" type="date" placeholder="结束时间"/>

       <el-select v-model="listQuery.isAmend" :placeholder="$t('querytable.isAmend')" clearable style="width: 120px" class="filter-item" placeholder="是否处理">

            <el-option v-for="item in selectType" :key="item.key" :label="item.label" :value="item.key"/>      </el-select>

      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('querytable.search') }}</el-button>
      <el-button v-waves class="filter-item" type="primary" @click="resetQuery">{{ $t('querytable.resetsearch') }}</el-button>
      <el-button v-waves class="filter-item" type="primary" @click="sendInfo" :disabled="this.multipleSelection.length === 0">{{ $t('table.send') }}</el-button>

    </div>

    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;min-height:600px" @selection-change="handleSelectionChange">
       <el-table-column
      type="selection"
      width="55">
    </el-table-column>
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
         <el-table-column :label="$t('table.companyName')" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.companyName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.buildingName')" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.buildingName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.apparatusAddress')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.apparatusAddress }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.checkUserName')" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.checkUserName }}</span>
        </template>
      </el-table-column>
   
      <el-table-column :label="$t('table.finishTime')" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.finishTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.isAmend')" align="center" >
        <template slot-scope="scope">
          <span>{{ checkType[scope.row.isAmend] }}</span>
        </template>
      </el-table-column>
 
      <el-table-column :label="$t('table.look')" align="center">
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
      style="width: 100%">
      <el-table-column :label="$t('table.checkPoint')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.checkPoint }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.errorDescription')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.errorDescription }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.spotHandling')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.spotHandling }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.reportingConditions')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.reportingConditions }}</span>
        </template>
      </el-table-column>
    </el-table>
       </div>
        </el-dialog>

    <el-dialog title="短信发送" :visible.sync="senddialogFormVisible" width="70%">
             <div class="app-container calendar-list-container">      
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="addPhoneNum">{{ $t('table.add') }}</el-button>
    </div>
              <el-form ref="form" label-width="80px">
                <el-form-item label="手机号"
                  :key="tag.numr"
                  v-for="tag in phonenum">
                  <el-input v-model="tag.num"></el-input>
                </el-form-item>
                <el-form-item label="短信内容">
                  
                  <el-tag
                  :key="item.apparatusId"
                  v-for="(item, index) in multipleSelection"
                  style="width:90%;height:auto">
                  <span class="spanline" v-if="index < 10">您好！{{item.buildingName}}的{{item.apparatusAddress}}防火分区:{{item.apparatusName}}(设备/区域) 已整改完毕！[0{{index}}]
                    </span>
                  <span class="spanline" v-else>您好！{{item.buildingName}}的{{item.apparatusAddress}}防火分区:{{item.apparatusName}}(设备/区域) 已整改完毕！[{{index}}]
                    </span>
                  </el-tag>
                </el-form-item>
              </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="senddialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="sendSmsInfos">{{ $t('table.send') }}</el-button>
      </div>
              </div>
        </el-dialog>
  </div>
</template>

<script>
import { fetchCheckRecordDataList,fetchCheckRecordData,fetchUnitDownDataList, fetchBuildDownDataList, fetchUserDownDataList,sendInfoPost } from '@/api/article'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime, checkToken, getHeader } from '@/utils'

export default {
  name: 'User',
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
      infos: [],
      phonenum: [],
      postphone: [],
        multipleSelection: [],
      unitlist: null,
      buildlist: null,
      userlist: null,
      userTypeList:[],
      showuserTypeObj:{},
      exportlist: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        pageSize: 10,
        companyId: null,
        buildingId: null,
        apparatusName: null,
        checkUserId: null,
        checkUserType: null,
        isPass: 0,
        isAmend: null,
        apparatusCode: null,
        apparatusUuId: null,
        queryDateFrom: null,
        queryDateTo: null,
      },
      selectType: [{ label: '是', key: 1 }, { label: '否', key: 0 }],
      checkType:["否","是"],
      exportQuery: {},
      infos: [],
      dialogFormVisible: false,
      senddialogFormVisible: false,
      showReviewer: false
    }
  },
  created() {
    checkToken()
    this.getdataList()
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
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      sendInfo() {
        this.phonenum = []
        console.log(this.multipleSelection,"multipleSelection")
        if(this.multipleSelection.length > 0){
          this.senddialogFormVisible = true
      this.phonenum.push({"type":""})
        }
      },
    addPhoneNum(){
      this.phonenum.push({"type":""})
    },
    sendSmsInfos(){
        this.postphone = []
        this.phonenum.forEach(element => {
          this.postphone.push(element.num)
        });
        this.multipleSelection.forEach(element => {
      sendInfoPost({mobileNumberList:this.postphone,param:{building:element.buildingName,area:element.apparatusAddress,apparatus:element.apparatusName}},this.header).then(response => {
        var code = response.data.resultCode
        if(code == 0){
        this.$message({
          title: '成功',
          message: '成功',
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
        });
      },
    getexportList() {
      // this.listLoading = true
      // fetchcuList(this.exportQuery).then(response => {
      //   this.exportlist = response.data.data
      //   this.handleDownloadInfo()
      //   this.listLoading = false
      // })
    },
    lookInfos(row){
      this.infos = []
      this.dialogFormVisible = true
      fetchCheckRecordData({taskDetailId:row.taskDetailId},this.header).then(response => {
        var code = response.data.resultCode
        if(code == 0){
          
      this.infos = response.data.resultData.troubleList
        // this.list = response.data.resultData.taskDetailInfo
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
    handleFilter() {
      this.listQuery.page = 1
      this.getdataList()
    },
    resetQuery() {
      this.listQuery = {
        page: 1,
        pageSize: 10,
        companyId: null,
        buildingId: null,
        apparatusName: null,
        checkUserId: null,
        checkUserType: null,
        isPass: 0,
        isAmend: null,
        apparatusCode: null,
        apparatusUuId: null,
        queryDateFrom: null,
        queryDateTo: null,
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

<style>
.spanline{
  word-break:normal; width:auto; display:block; white-space:pre-wrap;word-wrap : break-word ;overflow: hidden ;
}
</style>