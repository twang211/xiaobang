<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input :placeholder="$t('querytable.userName')" v-model="listQuery.userName" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <!-- <el-input :placeholder="$t('querytable.department')" v-model="listQuery.department" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/> -->
      <el-select v-model="listQuery.userType" :placeholder="$t('querytable.userType')" clearable style="width: 200px" class="filter-item">
        <el-option v-for="item in userTypeList" :key="item.key" :label="item.value" :value="item.key"/>
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('querytable.search') }}</el-button>
      
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">{{ $t('table.add') }}</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;min-height:1000px;">
      
      <el-table-column :label="$t('table.userName')" align="center" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.sex')" align="center" width="200">
        <template slot-scope="scope">
          <span>{{ showsexObj[scope.row.sex] }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.userType')" align="center" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.userTypeName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.roleLevel')" align="center" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.roleLevelName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.department')" align="center" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.department }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.phone')" align="center" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.email')" align="center" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.config')" align="center" width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>
        </template>
      </el-table-column>
    </el-table>

 
    <div class="pagination-container">
      <el-pagination :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.pageSize" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>
        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="temp" label-position="left" label-width="200px" style="width: 400px; margin-left:50px;">
        <el-form-item :label="$t('table.companyCode')">
          <el-input v-model="temp.companyCode"/>
        </el-form-item>
        <el-form-item :label="$t('table.companyName')">
          <el-input v-model="temp.companyName"/>
        </el-form-item>
        <el-form-item :label="$t('table.companyCorporate')">
          <el-input v-model="temp.companyCorporate"/>
        </el-form-item>
        <el-form-item :label="$t('table.safetyManager')">
          <el-input v-model="temp.safetyManager"/>
        </el-form-item>
        <el-form-item :label="$t('table.controlRoomPhone')">
          <el-input v-model="temp.controlRoomPhone"/>
        </el-form-item>
        <el-form-item :label="$t('table.companyAddress')">
          <el-input v-model="temp.companyAddress"/>
        </el-form-item>
        <el-form-item :label="$t('table.companyType')">
          <el-select v-model="temp.companyType" class="filter-item" placeholder="请选择">
            <el-option v-for="item in companyTypeList" :key="item.key" :label="item.value" :value="item.key"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('table.safetyLevel')">
          <el-select v-model="temp.safetyLevel" class="filter-item" placeholder="请选择">
            <el-option v-for="item in safetyLevelList" :key="item.key" :label="item.value" :value="item.key"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('table.isDenselyPlace')">
          <el-select v-model="temp.isDenselyPlace" class="filter-item" placeholder="请选择">
            <el-option v-for="item in selectType" :key="item.key" :label="item.label" :value="item.key"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('table.isPublicDenselyPlace')">
          <el-select v-model="temp.isPublicDenselyPlace" class="filter-item" placeholder="请选择">
            <el-option v-for="item in selectType" :key="item.key" :label="item.label" :value="item.key"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('table.isPublicRecreationPlace')">
          <el-select v-model="temp.isPublicRecreationPlace" class="filter-item" placeholder="请选择">
            <el-option v-for="item in selectType" :key="item.key" :label="item.label" :value="item.key"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('table.isCheckPass')">
          <el-select v-model="temp.isCheckPass" class="filter-item" placeholder="请选择">
            <el-option v-for="item in selectType" :key="item.key" :label="item.label" :value="item.key"/>
          </el-select>
        </el-form-item>
        </el-form-item><el-form-item :label="$t('table.referenceNumber')">
          <el-input v-model="temp.referenceNumber"/>
        </el-form-item>  
        <el-form-item :label="$t('table.usedStatus')">
          <el-select v-model="temp.usedStatus" class="filter-item" placeholder="请选择">
            <el-option v-for="item in selectType" :key="item.key" :label="item.label" :value="item.key"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('table.hasSafetySystem')">
          <el-select v-model="temp.hasSafetySystem" class="filter-item" placeholder="请选择">
            <el-option v-for="item in selectType" :key="item.key" :label="item.label" :value="item.key"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('table.hasContingencyPlan')">
          <el-select v-model="temp.hasContingencyPlan" class="filter-item" placeholder="请选择">
            <el-option v-for="item in selectType" :key="item.key" :label="item.label" :value="item.key"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('table.hasCheckRecord')">
          <el-select v-model="temp.hasCheckRecord" class="filter-item" placeholder="请选择">
            <el-option v-for="item in selectType" :key="item.key" :label="item.label" :value="item.key"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('table.hasRegularCheck')">
          <el-select v-model="temp.hasRegularCheck" class="filter-item" placeholder="请选择">
            <el-option v-for="item in selectType" :key="item.key" :label="item.label" :value="item.key"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('table.hasYearCheckRecord')">
          <el-select v-model="temp.hasYearCheckRecord" class="filter-item" placeholder="请选择">
            <el-option v-for="item in selectType" :key="item.key" :label="item.label" :value="item.key"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('table.hasTrainRecord')">
          <el-select v-model="temp.hasTrainRecord" class="filter-item" placeholder="请选择">
            <el-option v-for="item in selectType" :key="item.key" :label="item.label" :value="item.key"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('table.hasManoeuvreRecord')">
          <el-select v-model="temp.hasManoeuvreRecord" class="filter-item" placeholder="请选择">
            <el-option v-for="item in selectType" :key="item.key" :label="item.label" :value="item.key"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('table.hasSafetyManager')">
          <el-select v-model="temp.hasSafetyManager" class="filter-item" placeholder="请选择">
            <el-option v-for="item in selectType" :key="item.key" :label="item.label" :value="item.key"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('table.hasSafetyFile')">
          <el-select v-model="temp.hasSafetyFile" class="filter-item" placeholder="请选择">
            <el-option v-for="item in selectType" :key="item.key" :label="item.label" :value="item.key"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('table.hasClearKeyPlace')">
          <el-select v-model="temp.hasClearKeyPlace" class="filter-item" placeholder="请选择">
            <el-option v-for="item in selectType" :key="item.key" :label="item.label" :value="item.key"/>
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
import { fetchUserDataList, fetchTypeList, fetchsafetyLevelList, 
fetchAllinfos, createunitArticle, fetchUnitData, updateUnitData } from '@/api/article'
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
      userTypeList:[],
      showuserTypeObj:{},
      departmentList:[],
      showdepartmentObj:{},
      showsexObj:{},
      extime: '',
      list: null,
      exportlist: null,
      total: null,
      listLoading: true,
      userTypeQuery: {
        name:"userTypeMap",
        type:"list"
      },
      sexQuery: {
        name:"sexMap",
        type:"map"
      },
      departmentQuery: {
        name:"departmentMap",
        type:"list"
      },
      listQuery: {
        page: 1,
        pageSize: 20,
        userName: null,
        userCode: null,
        userType: null,
        department: null
      },
      temp: {
        userName:"",
        userName:"",
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '添加'
      },
      selectType: [{ label: '是', key: 1 }, { label: '否', key: 0 }],
      exportQuery: {},
      showReviewer: false
    }
  },
  created() {
    checkToken()
    this.getdataList()
    this.getuserTypeList()
    this.getsafetyLevelList()
    this.getsexList()
  },
  methods: {
    getdataList() {
      this.listLoading = true
      fetchUserDataList(this.listQuery,this.header).then(response => {
        console.log(response.data.resultData, 'fetchUserDataList')
        this.list = response.data.resultData.userList
        this.total = response.data.resultData.pageInfo.totalCounts
      this.listLoading = false
      })
    },
    getuserTypeList() {
      fetchTypeList(this.userTypeQuery,this.header).then(response => {
        console.log(response.data.resultData, 'fetchcompanyTypeList')
        this.userTypeList = response.data.resultData.userTypeMap
        this.userTypeList.forEach(element => {
          this.showuserTypeObj[(element["key"].toString())] = element["value"]
        });
          console.log(this.showuserTypeObj)
      })
    },
    getsafetyLevelList() {
      fetchTypeList(this.safetyLevelQuery,this.header).then(response => {
        console.log(response.data.resultData.safetyLevelMap, 'fetchsafetyLevelList')
        this.safetyLevelList = response.data.resultData.safetyLevelMap
        this.safetyLevelList.forEach(element => {
          this.showsafetyLevelObj[(element["key"].toString())] = element["value"]
        });
      })
    },
    getsexList() {
      fetchTypeList(this.sexQuery,this.header).then(response => {
        console.log(response.data.resultData, 'fetchsafetyLevelList')
        this.showsexObj = response.data.resultData.sexMap
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
    resetTemp() {
      this.temp = {
        companyCode: "",
        companyName: "",
        companyCorporate: "",
        safetyManager: "",
        controlRoomPhone: "",
        companyAddress: "",
        companyType: "",
        safetyLevel: "",
        isDenselyPlace: "",
        isPublicDenselyPlace: "",
        isPublicRecreationPlace: "",
        isCheckPass: "",
        referenceNumber: "",
        usedStatus: "",
        hasSafetySystem: "",
        hasContingencyPlan: "",
        hasCheckRecord: "",
        hasRegularCheck: "",
        hasYearCheckRecord: "",
        hasTrainRecord: "",
        hasManoeuvreRecord: "",
        hasSafetyManager: "",
        hasSafetyFile: "",
        hasClearKeyPlace: "",
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
          createunitArticle(this.temp,this.header).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      fetchUnitData({},row.companyId,this.header).then(response => {
        console.log(response.data.resultData.companyInfo, 'fetchUnitData')
        this.temp = response.data.resultData.companyInfo
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
          updateUnitData(this.temp,this.header).then( response => {
            console.log(response,"updateUnitData")
            if(response.data.resultCode == "0"){
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
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
    }
  }
}
</script>
