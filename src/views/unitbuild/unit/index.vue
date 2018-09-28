<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input :placeholder="$t('querytable.companyName')" v-model="listQuery.companyName" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-input :placeholder="$t('querytable.companyCode')" v-model="listQuery.companyCode" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-input :placeholder="$t('querytable.companyCorporate')" v-model="listQuery.companyCorporate" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-select v-model="listQuery.companyType" :placeholder="$t('querytable.companyType')" filterable clearable style="width: 200px" class="filter-item">
        <el-option v-for="item in companyTypeList" :key="item.key" :label="item.value" :value="item.key"/>
      </el-select>
      <el-select v-model="listQuery.safetyLevel" :placeholder="$t('querytable.safetyLevel')" filterable clearable style="width: 200px" class="filter-item">
        <el-option v-for="item in safetyLevelList" :key="item.key" :label="item.value" :value="item.key"/>
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
      style="width: 100%;min-height:600px">
      
      <el-table-column :label="$t('table.companyName')" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.companyName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.companyCode')" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.companyCode }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.companyCorporate')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.companyCorporate }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.safetyManager')" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.safetyManager }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.controlRoomPhone')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.controlRoomPhone }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.companyAddress')" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.companyAddress }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.companyType')" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.companyTypeName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.safetyLevel')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.safetyLevelName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.config')" align="center" >
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>
        </template>
      </el-table-column>
    </el-table>

 
    <div class="pagination-container">
      <el-pagination :current-page="listQuery.page" :page-size="listQuery.pageSize"  :total="total" background layout="total, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
      
    </div>
        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="70%" top="5px">
      <el-form ref="dataForm" :rules="rules" :inline="true"  label-width="300px" style="width: 100%;" :model="temp"  class="demo-form-inline">
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('table.companyCode')" v-if="dialogStatus == 'update'">
              <span>{{ temp.companyCode }}</span>
            </el-form-item>
            </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('table.companyName')" prop="companyName">
              <el-input v-model="temp.companyName"/>
            </el-form-item>
            </el-col>
        </el-row>
        
        <el-row>
          <el-col :span="12">
        <el-form-item :label="$t('table.companyCorporate')" prop="companyCorporate">
          <el-input v-model="temp.companyCorporate"/>
        </el-form-item>
            </el-col>
          <el-col :span="12">
        <el-form-item :label="$t('table.safetyManager')" prop="safetyManager">
          <el-input v-model="temp.safetyManager"/>
        </el-form-item>
            </el-col>
        </el-row>
        
        <el-row>
          <el-col :span="12">
        <el-form-item :label="$t('table.controlRoomPhone')" prop="controlRoomPhone">
          <el-input v-model="temp.controlRoomPhone"/>
        </el-form-item>
            </el-col>
          <el-col :span="12">
            
        <el-form-item :label="$t('table.companyAddress')" prop="companyAddress">
          <el-input v-model="temp.companyAddress"/>
        </el-form-item>
            </el-col>
        </el-row>
        
        <el-row>
          <el-col :span="12">
        <el-form-item :label="$t('table.referenceNumber')">
          <el-input v-model="temp.referenceNumber"/>
        </el-form-item>  
            </el-col>
          <el-col :span="12">
        <el-form-item :label="$t('table.companyType')">
          <el-select v-model="temp.companyType" filterable class="filter-item" placeholder="请选择">
            <el-option v-for="item in companyTypeList" :key="item.key" :label="item.value" :value="item.key"/>
          </el-select>
        </el-form-item>
            </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
        <el-form-item :label="$t('table.safetyLevel')">
          <el-select v-model="temp.safetyLevel" filterable class="filter-item" placeholder="请选择">
            <el-option v-for="item in safetyLevelList" :key="item.key" :label="item.value" :value="item.key"/>
          </el-select>
        </el-form-item>
            </el-col>
          <el-col :span="12">
        <el-form-item :label="$t('table.isDenselyPlace')">
          <el-select v-model="temp.isDenselyPlace" class="filter-item" placeholder="请选择">
            <el-option v-for="item in selectType" :key="item.key" :label="item.label" :value="item.key"/>
          </el-select>
        </el-form-item>
            </el-col>
        </el-row>
            
        <el-row>
          <el-col :span="12">
        <el-form-item :label="$t('table.isPublicDenselyPlace')">
          <el-select v-model="temp.isPublicDenselyPlace" class="filter-item" placeholder="请选择">
            <el-option v-for="item in selectType" :key="item.key" :label="item.label" :value="item.key"/>
          </el-select>
        </el-form-item>
            </el-col>
          <el-col :span="12">
        <el-form-item :label="$t('table.isPublicRecreationPlace')">
          <el-select v-model="temp.isPublicRecreationPlace" class="filter-item" placeholder="请选择">
            <el-option v-for="item in selectType" :key="item.key" :label="item.label" :value="item.key"/>
          </el-select>
        </el-form-item>
            </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
        <el-form-item :label="$t('table.isCheckPass')">
          <el-select v-model="temp.isCheckPass" class="filter-item" placeholder="请选择">
            <el-option v-for="item in selectType" :key="item.key" :label="item.label" :value="item.key"/>
          </el-select>
        </el-form-item>
            </el-col>
          <el-col :span="12">
        <el-form-item :label="$t('table.usedStatus')">
          <el-select v-model="temp.usedStatus" class="filter-item" placeholder="请选择">
            <el-option v-for="item in selectType" :key="item.key" :label="item.label" :value="item.key"/>
          </el-select>
        </el-form-item>
            </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
        <el-form-item :label="$t('table.hasSafetySystem')">
          <el-select v-model="temp.hasSafetySystem" class="filter-item" placeholder="请选择">
            <el-option v-for="item in selectType" :key="item.key" :label="item.label" :value="item.key"/>
          </el-select>
        </el-form-item>
            </el-col>
          <el-col :span="12">
            
        <el-form-item :label="$t('table.hasContingencyPlan')">
          <el-select v-model="temp.hasContingencyPlan" class="filter-item" placeholder="请选择">
            <el-option v-for="item in selectType" :key="item.key" :label="item.label" :value="item.key"/>
          </el-select>
        </el-form-item>
            </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
        <el-form-item :label="$t('table.hasCheckRecord')">
          <el-select v-model="temp.hasCheckRecord" class="filter-item" placeholder="请选择">
            <el-option v-for="item in selectType" :key="item.key" :label="item.label" :value="item.key"/>
          </el-select>
        </el-form-item>
            </el-col>
          <el-col :span="12">
        <el-form-item :label="$t('table.hasRegularCheck')">
          <el-select v-model="temp.hasRegularCheck" class="filter-item" placeholder="请选择">
            <el-option v-for="item in selectType" :key="item.key" :label="item.label" :value="item.key"/>
          </el-select>
        </el-form-item>
            </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
        <el-form-item :label="$t('table.hasYearCheckRecord')">
          <el-select v-model="temp.hasYearCheckRecord" class="filter-item" placeholder="请选择">
            <el-option v-for="item in selectType" :key="item.key" :label="item.label" :value="item.key"/>
          </el-select>
        </el-form-item>
            </el-col>
          <el-col :span="12">
        <el-form-item :label="$t('table.hasTrainRecord')">
          <el-select v-model="temp.hasTrainRecord" class="filter-item" placeholder="请选择">
            <el-option v-for="item in selectType" :key="item.key" :label="item.label" :value="item.key"/>
          </el-select>
        </el-form-item>
            </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
        <el-form-item :label="$t('table.hasManoeuvreRecord')">
          <el-select v-model="temp.hasManoeuvreRecord" class="filter-item" placeholder="请选择">
            <el-option v-for="item in selectType" :key="item.key" :label="item.label" :value="item.key"/>
          </el-select>
        </el-form-item>
            </el-col>
          <el-col :span="12">
        <el-form-item :label="$t('table.hasSafetyManager')">
          <el-select v-model="temp.hasSafetyManager" class="filter-item" placeholder="请选择">
            <el-option v-for="item in selectType" :key="item.key" :label="item.label" :value="item.key"/>
          </el-select>
        </el-form-item>
            </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
        <el-form-item :label="$t('table.hasSafetyFile')">
          <el-select v-model="temp.hasSafetyFile" class="filter-item" placeholder="请选择">
            <el-option v-for="item in selectType" :key="item.key" :label="item.label" :value="item.key"/>
          </el-select>
        </el-form-item>
            </el-col>
          <el-col :span="12">
        <el-form-item :label="$t('table.hasClearKeyPlace')">
          <el-select v-model="temp.hasClearKeyPlace" class="filter-item" placeholder="请选择">
            <el-option v-for="item in selectType" :key="item.key" :label="item.label" :value="item.key"/>
          </el-select>
        </el-form-item>
            </el-col>
        </el-row>

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
import { fetchUnitDataList, fetchTypeList, 
fetchAllinfos, createunitArticle, fetchUnitData, updateUnitData } from '@/api/article'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime, checkToken, getHeader } from '@/utils'

export default {
  name: 'Unit',
  directives: {
    waves
  },
  filters: {
  },
  data() {
    return {
      tableKey: 0,
      header: getHeader(),
      companyTypeList:[],
      showcompanyTypeObj:{},
      safetyLevelList:[],
      showsafetyLevelObj:{},
      extime: '',
      list: null,
      exportlist: null,
      total: null,
      listLoading: true,
      companyTypeQuery: {
        name:"companyTypeMap",
        type:"list"
      },
      safetyLevelQuery: {
        name:"safetyLevelMap",
        type:"list"
      },
      listQuery: {
        page: 1,
        pageSize: 20,
        companyName: null,
        companyCode: null,
        companyCorporate: null,
        companyType: null,
        safetyLevel: null
      },
      temp: {
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
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '添加'
      },
      selectType: [{ label: '是', key: 1 }, { label: '否', key: 0 }],
      exportQuery: {},
      showReviewer: false,
        rules: {
          companyName: [
            { required: true, message: '请输入单位名称', trigger: 'blur' }
          ],
          companyCorporate: [
            { required: true, message: '请输入法人', trigger: 'blur' }
          ],
          safetyManager: [
            { required: true, message: '请输入消防安全管理人', trigger: 'blur' }
          ],
          controlRoomPhone: [
            { required: true, message: '请输入控制室电话', trigger: 'blur' }
          ],
          companyAddress: [
            { required: true, message: '请输入地址', trigger: 'blur' }
          ],
        }
    }
  },
  created() {
    checkToken()
    this.getdataList()
    this.getcompanyTypeList()
    this.getsafetyLevelList()
  },
  methods: {
    getdataList() {
      this.listLoading = true
      fetchUnitDataList(this.listQuery,this.header).then(response => {
        var code = response.data.resultCode
        if(code == 0){

        this.list = response.data.resultData.companyList
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
    getcompanyTypeList() {
      fetchTypeList(this.companyTypeQuery,this.header).then(response => {
              var code = response.data.resultCode
        if(code == 0){
        this.companyTypeList = response.data.resultData.companyTypeMap
        this.companyTypeList.forEach(element => {
          this.showcompanyTypeObj[(element["key"].toString())] = element["value"]
        });
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
    getsafetyLevelList() {
      fetchTypeList(this.safetyLevelQuery,this.header).then(response => {
        var code = response.data.resultCode
        if(code == 0){
   
        this.safetyLevelList = response.data.resultData.safetyLevelMap
        this.safetyLevelList.forEach(element => {
          this.showsafetyLevelObj[(element["key"].toString())] = element["value"]
        });
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
        pageSize: 20,
        companyName: null,
        companyCode: null,
        companyCorporate: null,
        companyType: null,
        safetyLevel: null
      }
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
          createunitArticle(this.temp,this.header).then(response => {

            this.list.unshift(this.temp)
            
            var code = response.data.resultCode
            if(code == 0){
              this.dialogFormVisible = false
              this.$notify({
                  title: '成功',
                  message: '创建成功',
                  type: 'success',
                  duration: 2000
              })
            }else{
              this.$notify({
                  title: '失败',
                  message: response.data.resultMsg,
                  type: 'warning',
                  duration: 2000
              })
              
            }
              this.getdataList()
          })
        }
      })
    },
    handleUpdate(row) {
      fetchUnitData({},row.companyId,this.header).then(response => {
        this.temp = response.data.resultData.companyInfo
        this.temp.usedStatus = parseInt(this.temp.usedStatus)
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
            
            var code = response.data.resultCode
            if(code == 0){
              this.dialogFormVisible = false
              
              this.$notify({
                  title: '成功',
                  message: '更新成功',
                  type: 'success',
                  duration: 2000
              })
            }else{
              this.$notify({
                title: '失败',
                  message: response.data.resultMsg,
                  type: 'warning',
                  duration: 2000
              })
            }
              this.getdataList()
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
    }
  }
}
</script>
