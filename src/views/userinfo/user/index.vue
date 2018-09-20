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
      style="width: 100%;min-height:1000px;">
      
      <el-table-column :label="$t('table.userName')" align="center" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.userCode')" align="center" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.userCode }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.sex')" align="center" width="90">
        <template slot-scope="scope">
          <span>{{ scope.row.sexName }}</span>
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
      <el-pagination :current-page="listQuery.page" :total="total" background layout="total, prev, pager, next, jumper" @current-change="handleCurrentChange"/>
    </div>
        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="temp" label-position="left" label-width="200px" style="width: 90%; margin-left:50px;">
        <el-form-item :label="$t('table.loginAccount')">
          <el-input v-model="temp.loginAccount"/>
        </el-form-item>
        <el-form-item :label="$t('table.userName')">
          <el-input v-model="temp.userName"/>
        </el-form-item>
        <el-form-item :label="$t('table.password')">
          <el-input v-model="temp.password"/>
        </el-form-item>
        <el-form-item :label="$t('table.department')">
          <el-select v-model="temp.department" filterable class="filter-item" placeholder="请选择">
          <el-option v-for="item in departmentList" :key="item.key" :label="item.value" :value="item.value"/>
          </el-select>
        </el-form-item>
       
        <el-form-item :label="$t('table.userType')">
          <el-select v-model="temp.userType" filterable class="filter-item" placeholder="请选择">
          <el-option v-for="item in userTypeList" :key="item.key" :label="item.value" :value="item.key"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('table.roleLevel')">
          <el-select v-model="temp.roleLevel" filterable class="filter-item" placeholder="请选择">
          <el-option v-for="item in roleLevelList" :key="item.key" :label="item.value" :value="item.key"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('table.headImageId')">         
          <img v-if="dialogImageUrl" :src="dialogImageUrl" class="avatar" @click="handlePictureCardPreview">
        <el-upload class="upload-demo" ref="upload" :headers="myHeaders" action="http://47.92.165.114:8999/fire-service/api/file/upload" :auto-upload="false" :on-success="upSuccess" :on-remove="handleRemove">
              <el-button slot="trigger" size="medium" type="primary">选取文件</el-button>
              <el-button style="margin-left: 10px;" size="medium" type="success" @click="submitUpload">确认上传</el-button>
              <el-button style="margin-left: 10px;" size="medium" type="delete" @click="handleRemove">删除</el-button>
            </el-upload>
        </el-form-item>
        <el-form-item :label="$t('table.nickName')">
          <el-input v-model="temp.nickName"/>
        </el-form-item>
        <el-form-item :label="$t('table.sex')">
          
          <el-select v-model="temp.sex" class="filter-item" placeholder="请选择">
          <el-option v-for="item in sexList" :key="item.key" :label="item.value" :value="item.key"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('table.birthday')">   
          <el-date-picker v-model="temp.birthday" type="date" placeholder="请选择"/>

        </el-form-item>
        <el-form-item :label="$t('table.phone')">
          <el-input v-model="temp.phone"/>
        </el-form-item>
        <el-form-item :label="$t('table.wechat')">
          <el-input v-model="temp.wechat"/>
        </el-form-item>
        <el-form-item :label="$t('table.email')">
          <el-input v-model="temp.email"/>
        </el-form-item>
        <el-form-item :label="$t('table.companyId')">
          <el-select v-model="companytemp.companyId" filterable class="filter-item" placeholder="请选择">
          <el-option v-for="item in unitList" :key="item.companyId" :label="item.companyName" :value="item.companyId"/>
          </el-select>
              <el-button style="margin-left: 10px;" size="medium" type="success" @click="companyAdd">添加</el-button>
        </el-form-item>
        <el-form-item>
          <el-tag
            :key="tag"
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
      companyList:[],
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
        pageSize: 20,
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
          console.log(this.showuserTypeObj)
      })
    },
    getroleLevelList() {
      fetchTypeList(this.roleLevelQuery,this.header).then(response => {
        console.log(response.data.resultData, 'fetchcompanyTypeList')
        this.roleLevelList = response.data.resultData.roleLevelMap
          console.log(this.roleLevelList)
      })
    },
    getsexList() {
      fetchTypeList(this.sexQuery,this.header).then(response => {
        console.log(response.data.resultData, 'fetchsafetyLevelList')
        this.sexList = response.data.resultData.sexMap
      })
    },
    getUnitDataList() {
      fetchUnitDownDataList({},this.header).then(response => {
        console.log(response.data.resultData, 'fetchUnitDataList')
        this.unitList = response.data.resultData.companyList
        this.unitList.forEach(element => {
          this.showunitObj[(element["companyId"])] = element["companyName"]
        });
      })
    },
    getdepartmentList() {
      fetchTypeList(this.departmentQuery,this.header).then(response => {
        console.log(response.data.resultData, 'fetchsafetyLevelList')
        this.departmentList = response.data.resultData.departmentMap
      })
    },
    getcompanyinfo() {
      fetchcompanyData({userId:this.temp.userId},this.header).then(response => {
        console.log(response.data.resultData, 'fetchUserData')
        this.companyList = response.data.resultData.companyList
      })
    },
    companyAdd() {
      this.companytemp.userId = this.temp.userId
      companyAddApi(this.companytemp,this.header).then(response => {
        console.log(response.data.resultData, 'fetchsafetyLevelList')
        this.getcompanyinfo()
      })
    },
    handleClose(row) {
      this.companytemp.companyId = row.companyId
      this.companytemp.userId = this.temp.userId
      companyDelApi(this.companytemp,this.header).then(response => {
        console.log(response.data.resultData, 'fetchsafetyLevelList')
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
      console.log(this.listQuery,"this.listQuery")
      this.getdataList()
    },
    resetQuery() {
      this.listQuery = {
        page: 1,
        pageSize: 20,
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
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.temp.birthday = parseTime(this.temp.birthday,'{y}-{m}-{d}')
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createUserArticle(this.temp,this.header).then(() => {
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
      this.uptemp.birthday = parseTime(this.temp.birthday,'{y}-{m}-{d}')
      this.uptemp.phone = this.temp.phone
      this.uptemp.wechat = this.temp.wechat
      this.uptemp.email = this.temp.email
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
    submitUpload() {
      this.$refs.upload.submit();
    },
    upSuccess(response) {
      console.log(response, 999999);
      this.temp.headImageId = response.resultData.fileDTO.fileId
      this.dialogImageUrl = "http://47.92.165.114:8081"+response.resultData.fileDTO.fileUri
      this.btnstatus = true;
    },
      handlePictureCardPreview(file) {
        this.dialogVisible = true;
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
        
      fetchDelImg({fileId:this.temp.headImageId},this.header).then(response => {
        console.log(response.data.resultData, 'fetchBuildDataList')
      this.temp.headImageId = ""
      this.dialogImageUrl = ""
      })
      },
  }
}
</script>
<style>
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
