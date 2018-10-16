<template>
        <div class="app-container calendar-list-container">
    <div class="filter-container">
            <el-input :placeholder="$t('querytable.workUserName')" v-model="listQuery.workUserName" style="width: 120px;" class="filter-item" @keyup.enter.native="handleFilter"/>
                 
      <el-select v-model="listQuery.companyId" class="filter-item" filterable placeholder="单位名称">
        <el-option v-for="item in unitlist" :key="item.companyId" :label="item.companyName" :value="item.companyId"/>
      </el-select>
      <el-select v-model="listQuery.buildingId" class="filter-item" filterable placeholder="建筑名称">
        <el-option v-for="item in buildlist" :key="item.buildingId" :label="item.buildingName" :value="item.buildingId"/>
      </el-select>

      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('querytable.search') }}</el-button>
      <el-button v-waves class="filter-item" type="primary" @click="resetQuery">{{ $t('querytable.resetsearch') }}</el-button>
      <el-button v-waves class="filter-item" type="primary" @click="printInfos">{{ $t('querytable.print') }}</el-button>

    </div>

    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;min-height:600px">
      
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
      <el-table-column :label="$t('table.apparatusName')" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.apparatusName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.apparatusUuid')" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.apparatusUuid }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.lookTime')" align="center" >
        <template slot-scope="scope">
          <span v-if="scope.row.troubleTime">{{ scope.row.troubleTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
          <span v-else>--</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.troubleDesc')" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.troubleDesc }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.workTime')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.workTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.workUserAutographUri')" align="center">
        <template slot-scope="scope">
          <img  :src="scope.row.workUserAutographUri" class="avatar">
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
      

      <el-table-column :label="$t('table.workMethod')" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.workMethod }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.safetyPrecautions')" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.safetyPrecautions }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.isReference')" align="center" >
        <template slot-scope="scope">
          <span>{{ checkType[scope.row.isReference] }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.isStopSystem')" align="center" >
        <template slot-scope="scope">
          <span>{{ checkType[scope.row.isStopSystem] }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.lookTime')" align="center" >
        <template slot-scope="scope">
          <span v-if="scope.row.troubleTime">{{ scope.row.troubleTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
          <span v-else>--</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.workTime')" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.workTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
    </el-table>
             </div>
    </el-dialog>
    <el-dialog title="打印预览" :visible.sync="printdialogFormVisible" width="80%">
     　<div  id="printTest" class="app-container calendar-list-container"  style="padding:0">
     <table border="1px" class="printTable">
       <thead>
         <tr>
           <td style="width:75px">单位名称</td>
           <td style="width:75px">建筑物名称</td>
           <td style="width:75px">设备名称</td>
           <td style="width:75px">设备编码</td>
           <td style="width:75px">描述问题</td>
           <td style="width:75px">发现人签名</td>
           <td style="width:75px">发现时间</td>
           <td style="width:75px">维修方法</td>
           <td style="width:75px">安全措施</td>
           <td style="width:70px">是否备案</td>
           <td style="width:80px">是否停用系统</td>
           <td style="width:75px">维修时间</td>
           <td style="width:75px">签名图片</td>
           <td style="width:75px">负责人签名</td>
         </tr>
       </thead>
       <tbody>
          <tr
            :key="printinfo.apparatusId"
            v-for="printinfo in printlist"
          >
            <td>{{printinfo.companyName}}</td>
            <td>{{printinfo.buildingName}}</td>
            <td>{{printinfo.apparatusName}}</td>
            <td>{{printinfo.apparatusCode}}</td>
            <td>{{printinfo.troubleDesc}}</td>
            <td></td>
            <td>{{printinfo.troubleTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</td>
            <td>{{printinfo.workMethod}}</td>
            <td>{{printinfo.safetyPrecautions}}</td>
            <td>{{checkType[printinfo.isReference]}}</td>
            <td>{{checkType[printinfo.isStopSystem]}}</td>
            <td>{{printinfo.workTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</td>
            <td><img  :src="printinfo.workUserAutographUri" class="printavatar"></td>
            <td></td>
          </tr>
       </tbody>
    </table>
　　　　</div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="printdialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" v-print="'#printTest'">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import Vue from 'vue'
import { fetchWorkrecordDataList,fetchWorkRecordData, fetchTypeList, fetchUnitDownDataList, fetchBuildDownDataList, fetchUserDownDataList, printWorkDataList} from '@/api/article'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime, checkToken, getHeader } from '@/utils'
import Print from 'vue-print-nb'
Vue.use(Print); //注册

export default {
  name: 'Workrecord',
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
      printlist: null,
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
        companyId: null,
        buildingId: null,
        workUserName: null,
      },
      printQuery: {
      },
      exportQuery: {},
      showReviewer: false,
      printdialogFormVisible: false,
      infos: [],
      dialogFormVisible: false,
      checkType:["否","是"],
      selectType: [{ label: '是', key: 1 }, { label: '否', key: 0 }],
    }
  },
  created() {
    checkToken()
    this.getdataList()
    this.getuserTypeList()
    this.getunitdataList()
    this.getbuilddataList()
    this.getuserdataList()
  },
  methods: {
    getdataList() {
      this.listLoading = true
      fetchWorkrecordDataList(this.listQuery,this.header).then(response => {
        var code = response.data.resultCode
        if(code == 0){
        this.list = response.data.resultData.recordList
        this.list.forEach(element => {
          if(element.workUserAutographUri){

            element.workUserAutographUri = "http://47.92.165.114:8081"+element.workUserAutographUri
          }
        });
        this.total = response.data.resultData.pageInfo.totalCounts
      this.listLoading = false
        }else{
          
    this.$message({
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
    getbuilddataList() {
      fetchBuildDownDataList({},this.header).then(response => {
        this.buildlist = response.data.resultData.buildingList
      })
    },
    getuserdataList() {
      fetchUserDownDataList({},this.header).then(response => {
        this.userlist = response.data.resultData.userList
      })
    },
    lookInfos(row){
      this.infos = []
      this.dialogFormVisible = true
      fetchWorkRecordData({workRecordId:row.workRecordId},this.header).then(response => {
        var code = response.data.resultCode
        if(code == 0){
          
          if(response.data.resultData.workRecordInfo.workUserAutographUri){

            response.data.resultData.workRecordInfo.workUserAutographUri = "http://47.92.165.114:8081"+response.data.resultData.workRecordInfo.workUserAutographUri
          }
      this.infos.push(response.data.resultData.workRecordInfo) 
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
        companyId: null,
        buildingId: null,
        workUserName: null,
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
    printInfos() {
      
      this.printdialogFormVisible = true
      
        this.printQuery.companyId =  this.listQuery.companyId,
        this.printQuery.buildingId =  this.listQuery.buildingId,
        this.printQuery.workUserName =  this.listQuery.workUserName,
      this.listLoading = true
      printWorkDataList(this.printQuery,this.header).then(response => {
        var code = response.data.resultCode
        if(code == 0){
        this.printlist = response.data.resultData.recordList
        this.printlist.forEach(element => {
          if(element.workUserAutographUri){

            element.workUserAutographUri = "http://47.92.165.114:8081"+element.workUserAutographUri
          }
        });
      this.listLoading = false
        }else{
          
    this.$message({
        title: '失败',
        message: response.data.resultMsg,
        type: 'warning',
        duration: 1500
    })
        }
      })
    },
    printInfosBtn() {
      this.$print(this.$ref.print)
      this.printdialogFormVisible = false
    },
  }
}
</script>

<style>
  .avatar {    width: 50%;
    height: 100%;
    display: block;
    margin: 0 auto;
  }
  .printavatar {    
    width: 100%;
    display: block;
    margin: 0 auto;
  }
.printTable{
  width: 100%;
  border-spacing: 0;    
  font-size: 12px;
  table-layout:fixed;
  text-align: center
}
.printTable tbody td{
  word-wrap:break-word;
}
</style>