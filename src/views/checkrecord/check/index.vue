<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">

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
      style="width: 100%;min-height:1000px;">
   
    </el-table>

 
    <div class="pagination-container">
      <el-pagination :current-page="listQuery.page" :total="total" background layout="total, prev, pager, next, jumper" @current-change="handleCurrentChange"/>
    </div>

  </div>
</template>

<script>
import { fetchCheckRecordDataList } from '@/api/article'
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
      exportlist: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        pageSize: 20,
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
      exportQuery: {},
      showReviewer: false
    }
  },
  created() {
    checkToken()
    this.getdataList()
  },
  methods: {
    getdataList() {
      this.listLoading = true
      fetchCheckRecordDataList(this.listQuery,this.header).then(response => {
        console.log(response.data.resultData, 'fetchUserDataList')
        this.list = response.data.resultData.checkRecordList
        this.total = response.data.resultData.pageInfo.totalCounts
      this.listLoading = false
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
      console.log(this.listQuery,"this.listQuery")
      this.getdataList()
    },
    resetQuery() {
      this.listQuery = {
        page: 1,
        pageSize: 20,
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
      console.log(val,"skip")
      this.listQuery.skip = val
      this.getdataList()
    },
    handleCurrentChange(val) {
      console.log(val,"page")
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
