<template>

  <el-tabs v-model="activeName" type="card">
    <el-tab-pane label="设备系统" name="system">
  <div class="app-container calendar-list-container">
    <div class="filter-container">   
      <el-input :placeholder="$t('querytable.typeName')" v-model="listQuery.apparatusTypeName" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
        <el-select v-model="listQuery.kind" class="filter-item" filterable placeholder="请选择分类">
            <el-option v-for="item in kindList" :key="item.key" :label="item.value" :value="item.key"/>
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
      
      <el-table-column :label="$t('table.typeName')" align="center" width="350">
        <template slot-scope="scope">
          <span class="link-type" @click="editNameInfo(scope.row,'name')">{{ scope.row.typeName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.kind')" align="center" width="200">
        <template slot-scope="scope">
          <span>{{ showkindObj[scope.row.kind] }}</span>
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

        <el-form-item :label="$t('table.typeName')">
          <el-input v-model="temp.typeName"/>
        </el-form-item>
        <el-form-item :label="$t('table.kind')">
          <el-select v-model="temp.kind" filterable class="filter-item" placeholder="请选择">
            <el-option v-for="item in kindList" :key="item.key" :label="item.value" :value="item.key"/>
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
    </el-tab-pane>
    <el-tab-pane label="设备名称" name="name">
        <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input :placeholder="$t('querytable.apparatusName')" v-model="namelistQuery.apparatusName" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="namehandleFilter">{{ $t('querytable.search') }}</el-button>
            <el-button v-waves class="filter-item" type="primary" @click="resetnameQuery">{{ $t('querytable.resetsearch') }}</el-button>

      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="namehandleCreate">{{ $t('table.add') }}</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="namelist"
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
      <el-table-column :label="$t('table.config')" align="center" width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="checkPoint(scope.row,'checkpoint')">{{ $t('table.chkpointadd') }}</el-button>
        </template>
      </el-table-column>
    </el-table>

 
        <el-dialog :title="textMap[dialogStatus]" :visible.sync="namedialogFormVisible">
      <el-form ref="dataForm" :model="temp" label-position="left" label-width="200px" style="width: 90%; margin-left:50px;">

        <el-form-item :label="$t('table.apparatusName')">
          <el-input v-model="nametemp.apparatusName"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="namedialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="namecreateData">{{ $t('table.confirm') }}</el-button>
        <el-button v-else type="primary" @click="updateData">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>

  </div>
    </el-tab-pane>
    <el-tab-pane label="巡查要点" name="checkpoint">
       <div class="app-container calendar-list-container">
    <div class="filter-container">   
      <el-select v-model="checkpointQuery.periodType" class="filter-item" filterable placeholder="请选择分类">
            <el-option v-for="item in periodTypeList" :key="item.key" :label="item.value" :value="item.key"/>
          </el-select>      
          <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="checkpointhandleFilter">{{ $t('querytable.search') }}</el-button>
            <el-button v-waves class="filter-item" type="primary" @click="resetcheckpointQuery">{{ $t('querytable.resetsearch') }}</el-button>

      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="checkpointhandleCreate">{{ $t('table.add') }}</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="checkpointlist"
      border
      fit
      highlight-current-row
      style="width: 100%;">
      
      <el-table-column :label="$t('table.checkPoint')" align="center" width="400">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input v-model="scope.row.checkPoint" class="edit-input" size="small"/>
          </template>
          <span v-else>{{ scope.row.checkPoint }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.checkReminder')" align="center" width="400">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input v-model="scope.row.checkReminder" class="edit-input" size="small"/>
          </template>
          <span v-else>{{ scope.row.checkReminder }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.periodType')" align="center" width="200">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
          <el-select v-model="scope.row.periodType" class="filter-item" placeholder="请选择">
            <el-option v-for="item in periodTypeList" :key="item.key" :label="item.value" :value="item.key"/>
          </el-select>
          </template>
          <span v-else>{{ showperiodTypeObj[scope.row.periodType] }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.activeStatus')" align="center" width="200">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
          <el-select v-model="scope.row.activeStatus" class="filter-item" placeholder="请选择">
            <el-option v-for="item in selectType" :key="item.key" :label="item.label" :value="item.key"/>
          </el-select>
          </template>
          <span v-else>{{ showselectType[scope.row.activeStatus] }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Actions" width="400">
        <template slot-scope="scope">            
          <el-button v-if="scope.row.edit" class="cancel-btn" size="small" icon="el-icon-refresh" type="warning" @click="cancelEdit(scope.row)">取消</el-button>
          <el-button v-if="scope.row.edit" type="success" size="small" icon="el-icon-circle-check-outline" @click="confirmEdit(scope.row)">保存</el-button>
          <el-button v-else type="primary" size="small" icon="el-icon-edit" @click="scope.row.edit=!scope.row.edit">修改</el-button>
        </template>
      </el-table-column>
    </el-table>

        <el-dialog :title="textMap[dialogStatus]" :visible.sync="checkpointdialogFormVisible" width="70%">
       <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="checkpointhandleAdd">{{ $t('table.add') }}</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="checkpointcreateData">{{ $t('table.confirm') }}</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="checkpointdialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="newcheckpointlist"
      border
      fit
      highlight-current-row
      style="width: 100%;">
      
      <el-table-column :label="$t('table.checkPoint')" align="center" width="400">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input v-model="scope.row.checkPoint" class="edit-input" size="small"/>
          </template>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.checkReminder')" align="center" width="400">
        <template slot-scope="scope">
          <template>
            <el-input v-model="scope.row.checkReminder" class="edit-input" size="small"/>
          </template>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.periodType')" align="center" width="200">
        <template slot-scope="scope">
          <template>
          <el-select v-model="scope.row.periodType" class="filter-item" placeholder="请选择">
            <el-option v-for="item in periodTypeList" :key="item.key" :label="item.value" :value="item.key"/>
          </el-select>
          </template>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.activeStatus')" align="center" width="200">
        <template slot-scope="scope">
          <template>
          <el-select v-model="scope.row.activeStatus" class="filter-item" placeholder="请选择">
            <el-option v-for="item in selectType" :key="item.key" :label="item.label" :value="item.key"/>
          </el-select>
          </template>
        </template>
      </el-table-column>
    </el-table>
       </div>
    </el-dialog>


  </div>

    </el-tab-pane>
  </el-tabs>

</template>

<script>
import { fetchSystemDataList, fetchTypeList, createSystemArticle,fetchNameDataList, 
createNameArticle, fetchCheckPointDataList, createCheckPointArticle, createCheckPointUpdate } from '@/api/article'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime, checkToken, getHeader } from '@/utils'

export default {
  name: 'System',
  directives: {
    waves
  },
  filters: {
  },
  data() {
    return {
        activeName: 'system',
      tableKey: 0,
      header: getHeader(),
      myHeaders: {Authorization: getHeader()},
      extime: '',
      list: null,
      namelist: null,
      checkpointlist: null,
      newcheckpointlist: [],
      postcheckpointlist: [],
      periodTypeList:[],
      showperiodTypeObj:{},
      kindList:[],
      showkindObj:{},
      systeminfo:{},
      nameinfo:{},
      exportlist: null,
      total: null,
      listLoading: true,
      periodTypeQuery: {
        name:"periodTypeMap",
        type:"list"
      },
      kindQuery: {
        name:"apparatusKindMap",
        type:"list"
      },
      namelistQuery: {
        apparatusTypeId: null,
        apparatusName: null,
      },
      listQuery: {
        apparatusTypeName: null,
        kind: null,
      },
      checkpointQuery: {
        nameId: null,
        periodType: null,
      },
      checkpointtemp: {
        // checkPoint:"",
        // checkReminder:"",
        // periodType:"1",
        // activeStatus:"1",
      },
      nametemp: {
        typeId:"",
        apparatusName:"",
      },
      temp: {
        typeName:"",
        kind:"",
      },
      dialogFormVisible: false,
      namedialogFormVisible: false,
      checkpointdialogFormVisible: false,
      dialogStatus: '',
      selectType: [{ label: '是', key: "1" }, { label: '否', key: "0" }],
      showselectType: ["否", "是"],
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
    this.getkindList()
    this.getperiodTypeList()
  },
  methods: {
    getdataList() {
      this.listLoading = true
      fetchSystemDataList(this.listQuery,this.header).then(response => {
        console.log(response.data.resultData, 'fetchUserDataList')
        var code = response.data.resultCode
        if(code == 0){
        this.list = response.data.resultData.typeList
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
    getkindList() {
      fetchTypeList(this.kindQuery,this.header).then(response => {
        console.log(response.data.resultData, 'fetchTypeList')
        this.kindList = response.data.resultData.apparatusKindMap
        this.kindList.forEach(element => {
          this.showkindObj[(element["key"].toString())] = element["value"]
        });
        console.log(this.showkindObj, 'this.showkindObj')
      })
    },
    getperiodTypeList() {
      fetchTypeList(this.periodTypeQuery,this.header).then(response => {
        console.log(response.data.resultData, 'fetchTypeList')
        this.periodTypeList = response.data.resultData.periodTypeMap
        this.periodTypeList.forEach(element => {
          this.showperiodTypeObj[(element["key"].toString())] = element["value"]
        });
        console.log(this.showperiodTypeObj, 'this.showkindObj')
      })
    },
    editNameInfo(row,name) {
      console.log(row,"editNameInfoeditNameInfo")
      this.systeminfo = row
      this.activeName = name
      this.getNamedataList()
    },
    getNamedataList() {
      this.listLoading = true
      this.namelistQuery.apparatusTypeId =this.systeminfo.typeId
      fetchNameDataList(this.namelistQuery,this.header).then(response => {
        console.log(response.data.resultData, 'fetchUserDataList')
        this.namelist = response.data.resultData.nameList
        // this.total = response.data.resultData.pageInfo.totalCounts
      this.listLoading = false
      })
    },
    namehandleFilter() {
      console.log(this.namelistQuery,"this.listQuery")
      this.getNamedataList()
    },
    resetnameQuery() {
      this.namelistQuery.apparatusName = null
    this.getNamedataList()
    },
    resetnameTemp() {
      this.nametemp.apparatusName = ""
    },
    namehandleCreate() {
      this.resetnameTemp()
      this.dialogStatus = 'create'
      this.namedialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    namecreateData() {
      this.nametemp.typeId =this.systeminfo.typeId
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createNameArticle(this.nametemp,this.header).then(() => {
            this.list.unshift(this.nametemp)
            var code = response.data.resultCode
            if(code == 0){
            this.namedialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
    this.getNamedataList()
            }else{
              this.$notify({
                  title: '失败',
                  message: response.data.resultMsg,
                  type: 'warning',
                  duration: 2000
              })
              
            }
          })
        }
      })
    },
      checkPoint(row,name) {
        console.log(row,"checkPoint")
        this.nameinfo = row
        this.activeName = name
        this.getCheckPointList()
      },
      getCheckPointList() {
      this.checkpointQuery.nameId =this.nameinfo.nameId
      fetchCheckPointDataList(this.checkpointQuery,this.header).then(response => {
        console.log(response.data.resultData, 'fetchCheckPointDataList')
        this.checkpointlist = response.data.resultData.checkPointList
        
        this.checkpointlist.forEach(element => {
          element.edit = false
        });
      this.listLoading = false
      })
    },    
    resetcheckpointQuery() {
      this.checkpointQuery.periodType = null
      this.getCheckPointList()
    },
    checkpointhandleFilter() {
      console.log(this.namelistQuery,"this.listQuery")
      this.getCheckPointList()
    },
    checkpointhandleCreate() {
      this.newcheckpointlist = []
      this.checkpointdialogFormVisible = true
    },
    checkpointhandleAdd() {
      this.newcheckpointlist.push({"type":this.checkpointtemp})
        this.newcheckpointlist.forEach(element => {
            console.log(element)
            element.edit = true
        });
    },
    checkpointcreateData() {
        console.log(this.newcheckpointlist," this.newcheckpointlist")
        this.postcheckpointlist = []

        
        // checkPoint:"",
        // checkReminder:"",
        // periodType:"1",
        // activeStatus:"1",
        var posttemp = {}
        for (let [key, value] of Object.entries(this.newcheckpointlist)) {
            console.log(key, value);
            value.edit = null
            value.type = null
            posttemp.checkPoint = value.checkPoint
            posttemp.checkReminder = value.checkReminder
            posttemp.periodType = value.periodType
            posttemp.activeStatus = value.activeStatus
            posttemp.apparatusNameId = this.nameinfo.nameId
      this.postcheckpointlist.push(posttemp)
        }
          createCheckPointArticle({checkPointList:this.postcheckpointlist},this.header).then(() => {
            this.list.unshift(this.newcheckpointlist)
            
            var code = response.data.resultCode
            if(code == 0){
          this.checkpointdialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
    this.getCheckPointList()
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
    confirmEdit(row) {
          createCheckPointUpdate(row,this.header).then(() => {
            row.edit = false
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success',
              duration: 2000
            })
    this.getCheckPointList()
          })
    },
    cancelEdit(row) {
      row.edit = false
    this.getCheckPointList()
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
        apparatusTypeName: null,
        kind: null,
      }
    this.getdataList()
    },
    resetTemp() {
      this.temp = {
        typeName:"",
        kind:"",
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
          createSystemArticle(this.temp,this.header).then(() => {
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
    this.getdataList()
            }else{
              this.$notify({
                  title: '失败',
                  message: response.data.resultMsg,
                  type: 'warning',
                  duration: 2000
              })
              
            }
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
            var code = response.data.resultCode
            if(code == 0){
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
    this.getdataList()
            }else{
              this.$notify({
                  title: '失败',
                  message: response.data.resultMsg,
                  type: 'warning',
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
    },
  }
}
</script>
