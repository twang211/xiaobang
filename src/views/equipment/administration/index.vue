<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input :placeholder="$t('querytable.apparatusUuid')" v-model="listQuery.apparatusUuid" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-input :placeholder="$t('querytable.apparatusCode')" v-model="listQuery.apparatusCode" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-select v-model="listQuery.companyId" @change="changeCompany" class="filter-item" filterable placeholder="关联单位">
        <el-option v-for="item in unitlist" :key="item.companyId" :label="item.companyName" :value="item.companyId"/>
      </el-select>
      <el-select v-model="listQuery.buildingId" class="filter-item" filterable placeholder="关联建筑">
        <el-option v-for="item in buildlist" :key="item.buildingId" :label="item.buildingName" :value="item.buildingId"/>
      </el-select>
       <el-select v-model="listQuery.apparatusTypeId" @change="changeSystem" class="filter-item" filterable placeholder="设备类别">
        <el-option v-for="item in systemlist" :key="item.typeId" :label="item.typeName" :value="item.typeId"/>
      </el-select>
      <el-select v-model="listQuery.apparatusNameId"  class="filter-item" filterable placeholder="设备名称">
        <el-option v-for="item in namelist" :key="item.nameId" :label="item.apparatusName" :value="item.nameId"/>
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
            
      <el-table-column :label="$t('table.apparatusUuid')" align="center" width="350">
        <template slot-scope="scope">
          <span>{{ scope.row.apparatusUuid }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.apparatusCode')" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.apparatusCode }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.apparatusNameId')" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.apparatusName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.apparatusTypeId')" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.apparatusTypeName }}</span>
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
      <el-table-column :label="$t('table.config')" align="center" >
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>
        </template>
      </el-table-column>
    </el-table>

 
    <div class="pagination-container">
      <el-pagination :current-page="listQuery.page" :page-size="listQuery.pageSize"  :total="total" background layout="total, prev, pager, next, jumper" @current-change="handleCurrentChange"/>
    </div>
        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="50%" top="5px">
      <el-form ref="dataForm" :rules="rules" label-width="30%" style="width: 100%;" :model="temp"  class="demo-form-inline">
        
            <el-row>
          <el-col :span="12">
      <el-form-item :label="$t('table.apparatusImageId')" style="width: 100%;">         
          <!-- <img v-if="dialogImageUrl" :src="dialogImageUrl" class="avatar" @click="handlePictureCardPreview">
        <el-upload class="upload-demo" ref="upload" :headers="myHeaders" action="http://47.92.165.114:8999/fire-service/api/file/upload" :auto-upload="false" :on-success="upSuccess" :on-remove="handleRemove">
              <el-button slot="trigger" size="medium" type="primary">选取文件</el-button>
              <el-button style="margin-left: 10px;" size="medium" type="success" @click="submitUpload">确认上传</el-button>
              <el-button style="margin-left: 10px;" size="medium" type="delete" @click="handleRemove">删除</el-button>
            </el-upload> -->
            <el-upload
            class="avatar-uploader"
            action="http://47.92.165.114:8999/fire-service/api/file/upload"
            :headers="myHeaders"
            :show-file-list="false"
            :on-success="handleAvatarSuccess">
            <img v-if="dialogImageUrl" :src="dialogImageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
              <el-button class="uploadBtn" style="margin-left: 55%;" size="medium" type="delete" @click="handleRemove">删除</el-button>
        </el-form-item>
        
            </el-col>
        </el-row>
            <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('table.apparatusUuid')" style="width: 100%;">
              <el-input v-model="temp.apparatusUuid"/>
            </el-form-item>
            </el-col>
          <el-col :span="12">
          <el-form-item :label="$t('table.kind')" style="width: 100%;">
            <el-select v-model="temp.kind" @change="changeKind" class="filter-item" filterable placeholder="设备分类">
                  <el-option v-for="item in kindList" :key="item.key" :label="item.value" :value="item.key"/>
                </el-select>
              </el-form-item>
            </el-col>
        </el-row>

            <el-row>
          <el-col :span="12">
          <el-form-item :label="$t('table.apparatusTypeId')" style="width: 100%;">
            <el-select v-model="temp.apparatusTypeId" @change="changeSystem" class="filter-item" filterable placeholder="设备类别">
        <el-option v-for="item in systemTypelist" :key="item.typeId" :label="item.typeName" :value="item.typeId"/>
      </el-select>
        </el-form-item>
            </el-col>
          <el-col :span="12">
          <el-form-item :label="$t('table.apparatusNameId')" style="width: 100%;">
   
      <el-select v-model="temp.apparatusNameId"  class="filter-item" filterable placeholder="设备名称">
        <el-option v-for="item in namelist" :key="item.nameId" :label="item.apparatusName" :value="item.nameId"/>
      </el-select>
        </el-form-item>
            </el-col>
        </el-row>

            <el-row>
          <el-col :span="12">
          <el-form-item :label="$t('table.companyId')" style="width: 100%;">
    <el-select v-model="temp.companyId" @change="changeCompany" class="filter-item" filterable placeholder="关联单位">
        <el-option v-for="item in unitlist" :key="item.companyId" :label="item.companyName" :value="item.companyId"/>
      </el-select>
        </el-form-item>
            </el-col>
          <el-col :span="12">
          <el-form-item :label="$t('table.buildingId')" style="width: 100%;">
      <el-select v-model="temp.buildingId" class="filter-item" filterable placeholder="关联建筑">
        <el-option v-for="item in buildlist" :key="item.buildingId" :label="item.buildingName" :value="item.buildingId"/>
      </el-select>
        </el-form-item>
            </el-col>
        </el-row>

            <el-row>
          <el-col :span="12">
        <el-form-item :label="$t('table.buildingNo')" prop="buildingNo" style="width: 100%;">
          <el-input v-model="temp.buildingNo"/>
        </el-form-item>
            </el-col>
          <el-col :span="12">
        <el-form-item :label="$t('table.floor')" prop="floor" style="width: 100%;">
          <el-input v-model="temp.floor"/>
        </el-form-item>
            </el-col>
        </el-row>

            <el-row>
          <el-col :span="12">
        <el-form-item :label="$t('table.fireAreaCode')" prop="fireAreaCode" style="width: 100%;">
          <el-input v-model="temp.fireAreaCode"/>
        </el-form-item>
            </el-col>
          <el-col :span="12">
        <el-form-item :label="$t('table.roomNo')" prop="roomNo" style="width: 100%;">
          <el-input v-model="temp.roomNo"/>
        </el-form-item>
            </el-col>
        </el-row>

            <el-row>
          <el-col :span="12">
        <el-form-item :label="$t('table.apparatusAddress')" v-if="dialogStatus == 'update'" style="width: 100%;">
          <el-input v-model="temp.apparatusAddress"/>
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
import { fetchAdminDataList,createAdminArticle,fetchAdminData,createAdminUpdate, fetchUnitDownDataList, fetchBuildDownDataList,
fetchSystemDataList, fetchNameDataList, fetchDelImg, fetchTypeList, fetchDownTypeList, fetchDownNameList,fetchDownSystemDataList } from '@/api/article'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime, checkToken, getHeader } from '@/utils'

export default {
  name: 'Administration',
  directives: {
    waves
  },
  filters: {
  },
  data() {
      var checkNum = (rule, value, callback) => {
        setTimeout(() => {
          if (!Number.isInteger(parseInt(value))) {
            callback(new Error('请输入数字值'));
          } else {
              callback();
          }
        }, 1000);
      }
    return {
        dialogImageUrl: '',
      tableKey: 0,
      header: getHeader(),
      myHeaders: {Authorization: getHeader()},
      extime: '',
      list: null,
      unitlist: null,
      buildlist: null,
      systemlist: null,
      systemTypelist: null,
      namelist: [],
      kindList:[],
      showkindObj:{},
      exportlist: null,
      total: null,
      listLoading: true,
      kindQuery: {
        name:"apparatusKindMap",
        type:"list"
      },
      listQuery: {
        page: 1,
        pageSize: 10,
        apparatusUuid: null,
        apparatusCode: null,
        apparatusNameId: null,
        apparatusTypeId: null,
        companyId: null,
        buildingId: null,
      },
      temp: {
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '添加'
      },
      exportQuery: {},
      showReviewer: false,
    
      rules: {
        buildingNo: [
            { validator: checkNum, trigger: 'blur' },
            { max: 2, message: '长度最大2个字符', trigger: 'blur' }
        ],
        floor: [
            { validator: checkNum, trigger: 'blur' },
            { max: 2, message: '长度最大2个字符', trigger: 'blur' }
        ],
        fireAreaCode: [
            { validator: checkNum, trigger: 'blur' },
            { max: 2, message: '长度最大2个字符', trigger: 'blur' }
        ],
        roomNo: [
            { validator: checkNum, trigger: 'blur' },
            { max: 4, message: '长度最大4个字符', trigger: 'blur' }
        ],
      }
    }
  },
  created() {
    checkToken()
    this.getdataList()
    this.getunitdataList()
    // this.getbuilddataList()
    this.getsystemdataList()
    this.getkindList()
  },
  methods: {
    getdataList() {
      this.listLoading = true
      fetchAdminDataList(this.listQuery,this.header).then(response => {
        var code = response.data.resultCode
        if(code == 0){
        this.list = response.data.resultData.apparatusList
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
    // getbuilddataList() {
    //   fetchBuildDownDataList({},this.header).then(response => {
    //     this.buildlist = response.data.resultData.buildingList
    //   })
    // },
    getsystemdataList() {
      fetchDownSystemDataList({},this.header).then(response => {
        this.systemlist = response.data.resultData.typeList
      })
    },
    getkindList() {
      fetchTypeList(this.kindQuery,this.header).then(response => {
        this.kindList = response.data.resultData.apparatusKindMap
        this.kindList.forEach(element => {
          this.showkindObj[(element["key"].toString())] = element["value"]
        });
      })
    },
    changeKind(value) {
      this.systemTypelist = []
      this.temp.apparatusTypeId = value
      fetchDownTypeList({kind:value},this.header).then(response => {
        this.systemTypelist = response.data.resultData.typeList
      })
    },
    changeSystem(value) {
      this.namelist = []
      fetchDownNameList({typeId:value},this.header).then(response => {
        this.namelist = response.data.resultData.nameList
        this.namelist.forEach(element => {
          if(element.typeId == value){
            this.temp.apparatusNameId = element.nameId
          }
        });
      })
    },
    changeCompany(value) {
      this.buildlist = []
      this.temp.buildingId = value
      fetchBuildDownDataList({companyId:value},this.header).then(response => {
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
        apparatusUuid: null,
        apparatusCode: null,
        apparatusNameId: null,
        apparatusTypeId: null,
        companyId: null,
        buildingId: null,
      }
    this.getdataList()
    },
    resetTemp() {
      this.temp = {
      }
    },
    handleCreate() {
      this.resetTemp()
      this.systemTypelist = []
      this.namelist = []
      this.buildlist = []
      this.dialogStatus = 'create'
        this.dialogImageUrl = ""
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      // this.temp.floor = parseInt(this.temp.floor)
      // this.temp.kind = parseInt(this.temp.kind)
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createAdminArticle(this.temp,this.header).then(response => {
            this.list.unshift(this.temp)
            
            var code = response.data.resultCode
            if(code == 0){
            this.dialogFormVisible = false
            this.$message({
              title: '成功',
              message: '创建成功',
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
    this.getdataList()
          })
        }
      })
    },
    handleUpdate(row) {
      fetchAdminData({apparatusId:row.apparatusId},this.header).then(response => {
        this.dialogImageUrl = ""
        if(response.data.resultData.apparatusInfo.apparatusImageUri){
          this.dialogImageUrl = "http://47.92.165.114:8081"+response.data.resultData.apparatusInfo.apparatusImageUri
        }
      this.temp = response.data.resultData.apparatusInfo
      this.temp.floor = this.temp.floor.toString()
      this.temp.kind = this.temp.kind.toString()
      this.changeSystem(this.temp.apparatusTypeId)
      this.changeKind(this.temp.kind)
      this.changeCompany(this.temp.buildingId)
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
          createAdminUpdate(this.temp,this.header).then( response => {
            var code = response.data.resultCode
            if(code == 0){
            this.dialogFormVisible = false
            this.$message({
              title: '成功',
              message: '更新成功',
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
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleAvatarSuccess(response) {
            var code = response.resultCode
            if(code == 0){
              this.temp.apparatusImageId = response.resultData.fileDTO.fileId
              this.dialogImageUrl = "http://47.92.165.114:8081"+response.resultData.fileDTO.fileUri
              this.btnstatus = true;
            }else{
              this.temp.apparatusImageId = ""
              this.dialogImageUrl = ""
            this.btnstatus = false;
              this.$message({
                  title: '失败',
                  message: response.resultMsg,
                  type: 'warning',
                  duration: 2000
              })
            }
    },
      handlePictureCardPreview(file) {
        this.dialogVisible = true;
      },
      handleRemove(file, fileList) {
        
      fetchDelImg({fileId:this.temp.apparatusImageId},this.header).then(response => {
            var code = response.data.resultCode
            if(code == 0){
      this.temp.apparatusImageId = ""
      this.dialogImageUrl = ""
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
  }
}
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .uploadBtn{    position: absolute;
    left: 28%;
    top: 0;}
</style>