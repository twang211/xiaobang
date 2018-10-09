<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input :placeholder="$t('querytable.buildingName')" v-model="listQuery.buildingName" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-input :placeholder="$t('querytable.buildingCode')" v-model="listQuery.buildingCode" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
        <el-select v-model="listQuery.companyId" class="filter-item" filterable placeholder="请选择所属单位">
            <el-option v-for="item in unitList" :key="item.companyId" :label="item.companyName" :value="item.companyId"/>
          </el-select>
    
          <el-select v-model="listQuery.buildingType" class="filter-item" filterable placeholder="请选择建筑类别">
            <el-option v-for="item in buildingTypeList" :key="item.key" :label="item.value" :value="item.key"/>
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
      
      <el-table-column :label="$t('table.buildingName')" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.buildingName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.buildingCode')" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.buildingCode }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.buildingType')" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.buildingTypeName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.totalFloors')" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.totalFloors }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.tasks')" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.tasks }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.patrolAvgTime')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.patrolAvgTime }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.province')" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.province }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.city')" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.city }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.county')" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.county }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.companyId')" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.companyName }}</span>
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
        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="60%" top="5px">
      <el-form ref="dataForm"   label-width="300px" style="width: 100%;" :model="temp"  class="demo-form-inline">
      <el-row>
          <el-col :span="12">
        <el-form-item :label="$t('table.buildingName')">
          <el-input v-model="temp.buildingName"/>
        </el-form-item>
            </el-col>
          <el-col :span="12">
        <el-form-item :label="$t('table.buildingCode')" v-if="dialogStatus == 'update'">
          <span>{{ temp.buildingCode }}</span>
        </el-form-item>
            </el-col>
        </el-row>
        <el-form-item :label="$t('table.buildingImageId')">
          <el-upload
            class="avatar-uploader"
            action="http://47.92.165.114:8999/fire-service/api/file/upload"
            :headers="myHeaders"
            :show-file-list="false"
            :on-success="handleAvatarSuccess">
            <img v-if="dialogImageUrl" :src="dialogImageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
              <el-button class="uploadBtn" style="margin-left: 10px;" size="medium" type="delete" @click="handleRemove">删除</el-button>
          <!-- <img v-if="dialogImageUrl" :src="dialogImageUrl" class="avatar" @click="handlePictureCardPreview">
        <el-upload class="upload-demo" ref="upload" :headers="myHeaders" action="http://47.92.165.114:8999/fire-service/api/file/upload" :auto-upload="false" :on-success="upSuccess" :on-remove="handleRemove">
              <el-button slot="trigger" size="medium" type="primary">选取文件</el-button>
              <el-button style="margin-left: 10px;" size="medium" type="success" @click="submitUpload">确认上传</el-button>
              <el-button style="margin-left: 10px;" size="medium" type="delete" @click="handleRemove">删除</el-button>
            </el-upload> -->
          <!-- <el-input v-model="temp.buildingImageId"/> -->
          
          <!-- <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog> -->
        </el-form-item>      
        <el-row>
          <el-col :span="12">
        <el-form-item :label="$t('table.companyName')">
          <el-select v-model="temp.companyId" filterable class="filter-item" placeholder="请选择">
            <el-option v-for="item in unitList" :key="item.companyId" :label="item.companyName" :value="item.companyId"/>
          </el-select>
        </el-form-item>
            </el-col>
          <el-col :span="12">
        <el-form-item :label="$t('table.buildingType')">
          <el-select v-model="temp.buildingType" filterable class="filter-item" placeholder="请选择">
            <el-option v-for="item in buildingTypeList" :key="item.key" :label="item.value" :value="item.key"/>
          </el-select>
        </el-form-item>
            </el-col>
        </el-row>
        
        <el-form-item :label="$t('table.province')">
          <!-- <template v-if="dialogStatus == 'create'"> -->
          <area-select style="line-height: 1;" type='text' :placeholders="placeholders" :level='2' v-model="selected" :data="pcaa">
</area-select>
          <!-- </template>
          <span v-else>{{ temp.province }}-{{ temp.city }}-{{ temp.county }}</span> -->
        </el-form-item>
        <el-form-item :label="$t('table.address')">
          <el-input v-model="temp.address"/>
        </el-form-item>
        <el-row>
          <el-col :span="12">
        <el-form-item :label="$t('table.upFloors')">
          <el-input v-model="temp.upFloors" style="width: 20%"/>
        </el-form-item>
            </el-col>
          <el-col :span="12">
        <el-form-item :label="$t('table.downFloors')">
          <el-input v-model="temp.downFloors" style="width: 20%"/>
        </el-form-item>
            </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">

        <el-form-item :label="$t('table.totalFloors')" v-if="dialogStatus == 'update'">
          <span>{{ temp.totalFloors }}</span>
        </el-form-item>
            </el-col>
          <el-col :span="12">
        <el-form-item :label="$t('table.floorsLv')">
          <el-select v-model="temp.floorsLv" filterable class="filter-item" placeholder="请选择">
            <el-option v-for="item in floorsLvList" :key="item.key" :label="item.value" :value="item.key"/>
          </el-select>
        </el-form-item>
            </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
        <el-form-item :label="$t('table.tasks')" v-if="dialogStatus == 'update'">
          <span>{{ temp.tasks }}</span>
        </el-form-item>
            </el-col>
          <el-col :span="12">
        <el-form-item :label="$t('table.patrolAvgTime')">
          <el-input v-model="temp.patrolAvgTime" style="width: 20%"/>分钟
        </el-form-item>
            </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
        <el-form-item :label="$t('table.patrolLastTime')" v-if="dialogStatus == 'update'">
          <span>{{ temp.patrolLastTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
        </el-form-item>
            </el-col>
          <el-col :span="12">
        <el-form-item :label="$t('table.patrolNextTime')" v-if="dialogStatus == 'update'">
          <span>{{ temp.patrolNextTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
        </el-form-item>
            </el-col>
        </el-row>
        <el-form-item :label="$t('table.note')">
          <el-input v-model="temp.note"/>
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
import Vue from 'vue'
import { fetchBuildDataList, fetchTypeList, 
fetchAllinfos, fetchUnitDownDataList, createbuildArticle,fetchBuildData, updateBuildData, fetchDelImg } from '@/api/article'
import waves from '@/directive/waves' // 水波纹指令
import { pca, pcaa } from 'area-data' // v5 or higher
import { parseTime, checkToken, getHeader } from '@/utils'
import 'vue-area-linkage/dist/index.css'; // v2 or higher
import VueAreaLinkage from 'vue-area-linkage';

Vue.use(VueAreaLinkage)

export default {
  name: 'Building',
  directives: {
    waves
  },
  filters: {
  },
  data() {
    return {
        dialogImageUrl: '',
        dialogVisible: false,
      pca: pca,
      pcaa: pcaa,
      selected: [],
      placeholders: ["请选择", "请选择", "请选择"],
      tableKey: 0,
      header: getHeader(),
      myHeaders: {Authorization: getHeader()},
      unitList:[],
      showunitObj:{},
      buildingTypeList:[],
      showbuildingTypeObj:{},
      floorsLvList:[],
      showfloorsLvObj:{},
      extime: '',
      list: null,
      exportlist: null,
      total: null,
      listLoading: true,
      buildingTypeQuery: {
        name:"buildingTypeMap",
        type:"list"
      },
      floorsLvQuery: {
        name:"floorsLvMap",
        type:"list"
      },
      listQuery: {
        page: 1,
        pageSize: 10,
        buildingName: null,
        buildingCode: null,
        companyId: null,
        buildingType: null
      },
      temp: {
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
    this.getbuildingTypeList()
    this.getfloorsLvList()
    this.getUnitDataList()
  },
  methods: {
    getdataList() {
      this.listLoading = true
      fetchBuildDataList(this.listQuery,this.header).then(response => {
        
        var code = response.data.resultCode
        if(code == 0){
        this.list = response.data.resultData.buildingList
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
    getUnitDataList() {
      fetchUnitDownDataList({},this.header).then(response => {
        this.unitList = response.data.resultData.companyList
      })
    },
    getbuildingTypeList() {
      fetchTypeList(this.buildingTypeQuery,this.header).then(response => {
        this.buildingTypeList = response.data.resultData.buildingTypeMap
        this.buildingTypeList.forEach(element => {
          this.showbuildingTypeObj[(element["key"].toString())] = element["value"]
        });
      })
    },
    getfloorsLvList() {
      fetchTypeList(this.floorsLvQuery,this.header).then(response => {
        this.floorsLvList = response.data.resultData.floorsLvMap
        this.floorsLvList.forEach(element => {
          this.showfloorsLvObj[(element["key"].toString())] = element["value"]
        });
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
        pageSize: 10,
        buildingName: null,
        buildingCode: null,
        companyId: null,
        buildingType: null
      }
    this.getdataList()
    },
    resetTemp() {
      this.temp = {
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogImageUrl = ""
      this.placeholders = ["请选择", "请选择", "请选择"]
      this.selected = []
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.temp.province = this.selected[0]
      this.temp.city = this.selected[1]
      this.temp.county = this.selected[2]
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createbuildArticle(this.temp,this.header).then(response => {
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
      fetchBuildData({},row.buildingId,this.header).then(response => {
        this.dialogImageUrl = ""
        if(response.data.resultData.buildingInfo.buildingImageUri){
          this.dialogImageUrl = "http://47.92.165.114:8081"+response.data.resultData.buildingInfo.buildingImageUri
        }
        this.temp = response.data.resultData.buildingInfo
        this.placeholders = []
        this.placeholders.push(this.temp.province)
        this.placeholders.push(this.temp.city)
        this.placeholders.push(this.temp.county)
      })
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.temp.province = this.selected[0]
      this.temp.city = this.selected[1]
      this.temp.county = this.selected[2]
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          updateBuildData(this.temp,this.header).then( response => {
            
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
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleAvatarSuccess(response) {
            var code = response.resultCode
            if(code == 0){
            this.temp.buildingImageId = response.resultData.fileDTO.fileId
            this.dialogImageUrl = "http://47.92.165.114:8081"+response.resultData.fileDTO.fileUri
            this.btnstatus = true;
            }else{
              this.temp.buildingImageId = ""
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
        
      fetchDelImg({fileId:this.temp.buildingImageId},this.header).then(response => {
            var code = response.data.resultCode
            if(code == 0){
              this.temp.buildingImageId = ""
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
  },
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
