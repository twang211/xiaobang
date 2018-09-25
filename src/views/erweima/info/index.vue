<template>
  <div class="app-container calendar-list-container">

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
