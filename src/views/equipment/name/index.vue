<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input :placeholder="$t('querytable.apparatusName')" v-model="listQuery.apparatusName" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>

          <el-select v-model="listQuery.typeId" filterable class="filter-item" placeholder="请选择">
            <el-option v-for="item in typeList" :key="item.typeId" :label="item.typeName" :value="item.typeId"/>
          </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('querytable.search') }}</el-button>
            <el-button v-waves class="filter-item" type="primary" @click="resetQuery">{{ $t('querytable.resetsearch') }}</el-button>

      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">{{ $t('table.add') }}</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;">
      
      <el-table-column :label="$t('table.apparatusName')" align="center" width="350">
        <template slot-scope="scope">
          <span>{{ scope.row.apparatusName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.nameId')" align="center" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.nameId }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.typeId')" align="center" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.typeId }}</span>
        </template>
      </el-table-column>
    </el-table>

 
        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="temp" label-position="left" label-width="200px" style="width: 90%; margin-left:50px;">

        <el-form-item :label="$t('table.apparatusName')">
          <el-input v-model="temp.apparatusName"/>
        </el-form-item>
        <el-form-item :label="$t('table.typeId')">
          <el-select v-model="temp.typeId" filterable class="filter-item" placeholder="请选择">
            <el-option v-for="item in typeList" :key="item.typeId" :label="item.typeName" :value="item.typeId"/>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">{{ $t('table.confirm') }}</el-button>
        <el-button v-else type="primary" @click="updateData">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { fetchNameDataList, createNameArticle, fetchSystemDataList } from '@/api/article'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime, checkToken, getHeader } from '@/utils'

export default {
  name: 'Name',
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
      typeList: [],
      list: null,
      exportlist: null,
      total: null,
      listLoading: true,
      listQuery: {
        apparatusTypeId: null,
        apparatusName: null,
      },
      temp: {
        typeId:"",
        apparatusName:"",
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '添加'
      },
      exportQuery: {},
      showReviewer: false
    }
  },
  created() {
    checkToken()
    this.getdataList()
    this.getSystemdataList()
  },
  methods: {
    getdataList() {
      this.listLoading = true
      fetchNameDataList(this.listQuery,this.header).then(response => {
        console.log(response.data.resultData, 'fetchUserDataList')
        this.list = response.data.resultData.nameList
        // this.total = response.data.resultData.pageInfo.totalCounts
      this.listLoading = false
      })
    },
    getSystemdataList() {
      fetchSystemDataList({},this.header).then(response => {
        console.log(response.data.resultData, 'fetchUserDataList')
        this.typeList = response.data.resultData.typeList
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
      console.log(this.listQuery,"this.listQuery")
      this.getdataList()
    },
    resetQuery() {
      this.listQuery = {
        apparatusTypeId: null,
        apparatusName: null,
      }
    this.getdataList()
    },
    resetTemp() {
      this.temp = {
        typeId:"",
        apparatusName:"",
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createNameArticle(this.temp,this.header).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
    this.getdataList()
          })
        }
      })
    },
    handleUpdate(row) {
      fetchUserData({},row.userId,this.header).then(response => {
        console.log(response.data.resultData, 'fetchUserData')
        if(response.data.resultData.userInfo.headImageUri){
          this.dialogImageUrl = "http://47.92.165.114:8081"+response.data.resultData.userInfo.headImageUri
        }
      })
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          updateUserData(this.uptemp,this.header).then( response => {
            console.log(response,"updateUnitData")
            if(response.data.resultCode == "0"){
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
    this.getdataList()
            }
          })
        }
      })
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
