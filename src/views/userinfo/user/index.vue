<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input :placeholder="$t('querytable.userName')" v-model="listQuery.userName" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-input :placeholder="$t('querytable.userCode')" v-model="listQuery.userCode" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-select v-model="listQuery.userType" :placeholder="$t('querytable.userType')" clearable style="width: 200px" class="filter-item">
        <el-option v-for="item in userTypeList" :key="item.key" :label="item.value" :value="item.key"/>
      </el-select>
      <el-select v-model="listQuery.roleLevel" :placeholder="$t('querytable.roleLevel')" clearable style="width: 200px" class="filter-item">
        <el-option v-for="item in roleLevelList" :key="item.key" :label="item.value" :value="item.key"/>
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
      
      <el-table-column :label="$t('table.userName')" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.userCode')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.userCode }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.sex')" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.sexName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.userType')" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.userTypeName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.roleLevel')" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.roleLevelName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.department')" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.department }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.phone')" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.email')" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.config')" align="center" >
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>
        </template>
      </el-table-column>
    </el-table>

 
    <div class="pagination-container">
      <el-pagination :current-page="listQuery.page" :page-size="listQuery.pageSize" :total="total" background layout="total, prev, pager, next, jumper" @current-change="handleCurrentChange"/>
    </div>
        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="50%" top="5px">
      <el-form ref="dataForm" label-width="20%" style="width: 100%;" :model="temp"  class="demo-form-inline">
           <el-row>
          <el-col :span="12">
        <el-form-item :label="$t('table.loginAccount')" style="width: 100%;">
          <el-input v-model="temp.loginAccount"/>
        </el-form-item>
            </el-col>
          <el-col :span="12">
        <el-form-item :label="$t('table.userName')" style="width: 100%;">
          <el-input v-model="temp.userName"/>
        </el-form-item>
            </el-col>
        </el-row>
           <el-row>
          <el-col :span="12">
        <el-form-item :label="$t('table.password')" style="width: 100%;">
          <el-input v-model="temp.password"/>
        </el-form-item>
            </el-col>
          <el-col :span="12">
        <el-form-item :label="$t('table.department')" style="width: 100%;">
          <el-select v-model="temp.department" filterable class="filter-item" placeholder="请选择">
          <el-option v-for="item in departmentList" :key="item.key" :label="item.value" :value="item.value"/>
          </el-select>
        </el-form-item>
            </el-col>
        </el-row>
           <el-row>
          <el-col :span="12">
        <el-form-item :label="$t('table.userType')" style="width: 100%;">
          <el-select v-model="temp.userType" filterable class="filter-item" placeholder="请选择">
          <el-option v-for="item in userTypeList" :key="item.key" :label="item.value" :value="item.key"/>
          </el-select>
        </el-form-item>
            </el-col>
          <el-col :span="12">
        <el-form-item :label="$t('table.roleLevel')" style="width: 100%;">
          <el-select v-model="temp.roleLevel" filterable class="filter-item" placeholder="请选择">
          <el-option v-for="item in roleLevelList" :key="item.key" :label="item.value" :value="item.key"/>
          </el-select>
        </el-form-item>
            </el-col>
        </el-row>
       
        <el-row>
          <el-col :span="12">
        <el-form-item :label="$t('table.headImageId')" style="width: 100%;">         
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
              <el-button class="uploadBtn" style="margin-left: 50%;" size="medium" type="delete" @click="handleRemove">删除</el-button>
        </el-form-item>

            </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
        <el-form-item :label="$t('table.nickName')" style="width: 100%;">
          <el-input v-model="temp.nickName"/>
        </el-form-item>
            </el-col>
          <el-col :span="12">
        <el-form-item :label="$t('table.sex')" style="width: 100%;">
          
          <el-select v-model="temp.sex" class="filter-item" placeholder="请选择">
          <el-option v-for="item in sexList" :key="item.key" :label="item.value" :value="item.key"/>
          </el-select>
        </el-form-item>
            </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
        <el-form-item :label="$t('table.birthday')" style="width: 100%;">   
          <el-date-picker v-model="temp.birthday" type="date" placeholder="请选择"/>

        </el-form-item>
            </el-col>
          <el-col :span="12">
        <el-form-item :label="$t('table.phone')" style="width: 100%;">
          <el-input v-model="temp.phone"/>
        </el-form-item>
            </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
        <el-form-item :label="$t('table.wechat')" style="width: 100%;">
          <el-input v-model="temp.wechat"/>
        </el-form-item>
            </el-col>
          <el-col :span="12">
        <el-form-item :label="$t('table.email')" style="width: 100%;">
          <el-input v-model="temp.email"/>
        </el-form-item>
            </el-col>
        </el-row>
        <el-form-item :label="$t('table.companyId')" style="width: 100%;">
          <el-select v-model="companytemp.companyId" filterable class="filter-item" placeholder="请选择">
          <el-option v-for="item in unitList" :key="item.companyId" :label="item.companyName" :value="item.companyId"/>
          </el-select>
              <el-button style="margin-left: 10px;" size="medium" type="success" @click="companyAdd">添加</el-button>
        </el-form-item>
        <el-form-item>
          <el-tag
            :key="tag.companyId"
            v-for="tag in companyList"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)" style="margin-left:5px">
            {{tag.companyName}}
          </el-tag>
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
import { fetchUserDataList, fetchTypeList, 
fetchAllinfos, createUserArticle, fetchUserData, updateUserData, fetchDelImg, 
fetchUnitDownDataList, companyAddApi, fetchcompanyData, companyDelApi } from '@/api/article'
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
        dialogImageUrl: '',
      tableKey: 0,
      header: getHeader(),
      myHeaders: {Authorization: getHeader()},
      companyList:null,
      departmentList:[],
      roleLevelList:[],
      userTypeList:[],
      departmentList:[],
      sexList:[],
      unitList:[],
      showunitObj:{},
      extime: '',
      list: null,
      exportlist: null,
      total: null,
      listLoading: true,
      userTypeQuery: {
        name:"userTypeMap",
        type:"list"
      },
      roleLevelQuery: {
        name:"roleLevelMap",
        type:"list"
      },
      departmentQuery: {
        name:"departmentMap",
        type:"list"
      },
      sexQuery: {
        name:"sexMap",
        type:"list"
      },
      departmentQuery: {
        name:"departmentMap",
        type:"list"
      },
      listQuery: {
        page: 1,
        pageSize: 10,
        userName: null,
        userCode: null,
        userType: null,
        roleLevel: null
      },
      companytemp: {
        companyId:"",
        userId:"",
      },
      temp: {
        loginAccount:"",
        userName:"",
        password:"",
        department:"",
        userType:"",
        roleLevel:"",
        headImageId:"",
        nickName:"",
        sex:"",
        birthday:"",
        phone:"",
        wechat:"",
        email:"",
      },
      uptemp: {
        userId:"",
        userName:"",
        headImageId:"",
        nickName:"",
        department:"",
        sex:"",
        birthday:"",
        phone:"",
        wechat:"",
        email:"",
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
    this.getroleLevelList()
    this.getsexList()
    this.getdepartmentList()
    this.getUnitDataList()
  },
  methods: {
    getdataList() {
      this.listLoading = true
      fetchUserDataList(this.listQuery,this.header).then(response => {
        
        var code = response.data.resultCode
        if(code == 0){
        this.list = response.data.resultData.userList
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
    getuserTypeList() {
      fetchTypeList(this.userTypeQuery,this.header).then(response => {
        this.userTypeList = response.data.resultData.userTypeMap
      })
    },
    getroleLevelList() {
      fetchTypeList(this.roleLevelQuery,this.header).then(response => {
        this.roleLevelList = response.data.resultData.roleLevelMap
      })
    },
    getsexList() {
      fetchTypeList(this.sexQuery,this.header).then(response => {
        this.sexList = response.data.resultData.sexMap
      })
    },
    getUnitDataList() {
      fetchUnitDownDataList({},this.header).then(response => {
        this.unitList = response.data.resultData.companyList
        this.unitList.forEach(element => {
          this.showunitObj[(element["companyId"])] = element["companyName"]
        });
      })
    },
    getdepartmentList() {
      fetchTypeList(this.departmentQuery,this.header).then(response => {
        this.departmentList = response.data.resultData.departmentMap
      })
    },
    getcompanyinfo() {
      fetchcompanyData({userId:this.temp.userId},this.header).then(response => {
        this.companyList = response.data.resultData.companyList
      })
    },
    companyAdd() {
      this.companytemp.userId = this.temp.userId
      companyAddApi(this.companytemp,this.header).then(response => {
        this.getcompanyinfo()
      })
    },
    handleClose(row) {
      this.companytemp.companyId = row.companyId
      this.companytemp.userId = this.temp.userId
      companyDelApi(this.companytemp,this.header).then(response => {
        this.getcompanyinfo()
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
        userName: null,
        userCode: null,
        userType: null,
        roleLevel: null
      }
    this.getdataList()
    },
    resetTemp() {
      this.temp = {
        loginAccount:"",
        userName:"",
        password:"",
        department:"",
        userType:"",
        roleLevel:"",
        headImageId:"",
        nickName:"",
        sex:"",
        birthday:"",
        phone:"",
        wechat:"",
        email:"",
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
        this.dialogImageUrl =""
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      if(this.temp.birthday){

        this.temp.birthday = parseTime(this.temp.birthday,'{y}-{m}-{d}')
      }
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createUserArticle(this.temp,this.header).then(response => {
            this.list.unshift(this.temp)
            var code = response.data.resultCode
            console.log(response.data,"22222")
            console.log(code,"22222")
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
      fetchUserData({},row.userId,this.header).then(response => {
        this.dialogImageUrl =""
        if(response.data.resultData.userInfo.headImageUri){
          this.dialogImageUrl = "http://47.92.165.114:8081"+response.data.resultData.userInfo.headImageUri
        }
        this.temp = response.data.resultData.userInfo
        this.temp.sex = this.temp.sex.toString()
        this.temp.userType = this.temp.userType.toString()
        this.temp.roleLevel = this.temp.roleLevel.toString()
        this.getcompanyinfo()
      })
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.uptemp.userId = this.temp.userId
      this.uptemp.userName = this.temp.userName
      this.uptemp.headImageId = this.temp.headImageId
      this.uptemp.nickName = this.temp.nickName
      this.uptemp.department = this.temp.department
      this.uptemp.sex = this.temp.sex
      if(this.uptemp.birthday){

        this.uptemp.birthday = parseTime(this.temp.birthday,'{y}-{m}-{d}')
      }
      this.uptemp.phone = this.temp.phone
      this.uptemp.wechat = this.temp.wechat
      this.uptemp.email = this.temp.email
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          updateUserData(this.uptemp,this.header).then( response => {
            var code = response.data.resultCode
            if(code == 0){
            this.dialogFormVisible = false
            this.$message({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
    this.getdataList()
            }else{
              this.$message({
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
      this.temp.headImageId = response.resultData.fileDTO.fileId
      this.dialogImageUrl = "http://47.92.165.114:8081"+response.resultData.fileDTO.fileUri
      this.btnstatus = true;
            }else{
              this.temp.headImageId = ""
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
        
      fetchDelImg({fileId:this.temp.headImageId},this.header).then(response => {
            var code = response.data.resultCode
            if(code == 0){
      this.temp.headImageId = ""
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