<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
    <el-select
      v-model="sheng"
      @change="choseProvince"
      placeholder="省级地区">
      <el-option
        v-for="item in province"
        :key="item.id"
        :label="item.value"
        :value="item.id">
      </el-option>
    </el-select>
    <el-select
      v-model="shi"
      @change="choseCity"
      placeholder="市级地区">
      <el-option
        v-for="item in shi1"
        :key="item.id"
        :label="item.value"
        :value="item.id">
      </el-option>
    </el-select>
    <el-select
      v-model="qu"
      @change="choseBlock"
      placeholder="区级地区">
      <el-option
        v-for="item in qu1"
        :key="item.id"
        :label="item.value"
        :value="item.id">
      </el-option>
    </el-select>
      <!-- <el-input :placeholder="$t('querytable.companyName')" v-model="listQuery.companyName" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-input :placeholder="$t('querytable.companyCode')" v-model="listQuery.companyCode" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-input :placeholder="$t('querytable.companyCorporate')" v-model="listQuery.companyCorporate" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-select v-model="listQuery.companyType" :placeholder="$t('querytable.companyType')" clearable style="width: 200px" class="filter-item">
        <el-option v-for="item in companyTypeList" :key="item.key" :label="item.value" :value="item.key"/>
      </el-select>
      <el-select v-model="listQuery.safetyLevel" :placeholder="$t('querytable.safetyLevel')" clearable style="width: 200px" class="filter-item">
        <el-option v-for="item in safetyLevelList" :key="item.key" :label="item.value" :value="item.key"/>
      </el-select> -->
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
      
      <el-table-column :label="$t('table.buildingName')" align="center" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.buildingName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.buildingType')" align="center" width="200">
        <template slot-scope="scope">
          <span>{{ showbuildingTypeObj[scope.row.buildingType] }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.totalFloors')" align="center" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.totalFloors }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.tasks')" align="center" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.tasks }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.patrolAvgTime')" align="center" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.patrolAvgTime }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.province')" align="center" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.province }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.city')" align="center" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.city }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.county')" align="center" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.county }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.companyId')" align="center" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.companyName }}</span>
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

        <el-form-item :label="$t('table.companyName')">
          <el-select v-model="temp.companyId" class="filter-item" placeholder="请选择">
            <el-option v-for="item in unitList" :key="item.companyId" :label="item.companyName" :value="item.companyId"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('table.buildingType')">
          <el-select v-model="temp.buildingType" class="filter-item" placeholder="请选择">
            <el-option v-for="item in buildingTypeList" :key="item.key" :label="item.value" :value="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('table.province')">
    <el-select
      v-model="temp.province"
      @change="addchoseProvince"
      placeholder="省级地区">
      <el-option
        v-for="item in province"
        :key="item.id"
        :label="item.value"
        :value="item.id">
      </el-option>
    </el-select>
        </el-form-item>
        <el-form-item :label="$t('table.city')">
    <el-select
      v-model="temp.city"
      @change="addchoseCity"
      placeholder="市级地区">
      <el-option
        v-for="item in citylist"
        :key="item.id"
        :label="item.value"
        :value="item.id">
      </el-option>
    </el-select>
        </el-form-item>
        <el-form-item :label="$t('table.county')">
    <el-select
      v-model="temp.county"
      @change="addchoseBlock"
      placeholder="区级地区">
      <el-option
        v-for="item in countylist"
        :key="item.id"
        :label="item.value"
        :value="item.id">
      </el-option>
    </el-select>
        </el-form-item>

        <el-form-item :label="$t('table.buildingName')">
          <el-input v-model="temp.buildingName"/>
        </el-form-item>
        <el-form-item :label="$t('table.buildingCode')">
          <el-input v-model="temp.buildingCode"/>
        </el-form-item>

        <el-form-item :label="$t('table.upFloors')">
          <el-input v-model="temp.upFloors"/>
        </el-form-item>
        <el-form-item :label="$t('table.downFloors')">
          <el-input v-model="temp.downFloors"/>
        </el-form-item>
        <el-form-item :label="$t('table.tasks')">
          <el-input v-model="temp.tasks"/>
        </el-form-item>
        <el-form-item :label="$t('table.patrolAvgTime')">
          <el-input v-model="temp.patrolAvgTime"/>
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
import { fetchBuildDataList, fetchTypeList, 
fetchAllinfos, fetchUnitDataList, createbuildArticle,fetchBuildData } from '@/api/article'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime, checkToken, getHeader } from '@/utils'

import axios from 'axios'

export default {
  name: 'Building',
  directives: {
    waves
  },
  filters: {
  },
  data() {
    return {
      mapJson:'../static/json/map.json',
      province:'',
      sheng: '',
      shi: '',
      shi1: [],
      qu: '',
      qu1: [],
      city:'',
      citylist: [],
      countylist: [],

      tableKey: 0,
      header: getHeader(),
      unitList:[],
      showunitObj:{},
      buildingTypeList:[],
      showbuildingTypeObj:{},
      extime: '',
      list: null,
      exportlist: null,
      total: null,
      listLoading: true,
      buildingTypeQuery: {
        name:"buildingTypeMap",
        type:"list"
      },
      listQuery: {
        page: 1,
        pageSize: 20,
        buildingName: null,
        buildingCode: null,
        companyId: null,
        buildingType: null
      },
      temp: {
        companyId:"",
        buildingCode:"",
        buildingType:"",
        province:"",
        city:"",
        county:"",
        buildingName:"",
        upFloors:"",
        downFloors:"",
        tasks:"",
        patrolAvgTime:"",

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
    this.getUnitDataList()
    this.getCityData()
  },
  methods: {
    getdataList() {
      this.listLoading = true
      fetchBuildDataList(this.listQuery,this.header).then(response => {
        console.log(response.data.resultData, 'fetchBuildDataList')
        this.list = response.data.resultData.buildingList
        this.total = response.data.resultData.pageInfo.totalCounts
      this.listLoading = false
      })
    },
    getUnitDataList() {
      fetchUnitDataList({},this.header).then(response => {
        console.log(response.data.resultData, 'fetchUnitDataList')
        this.unitList = response.data.resultData.companyList
      })
    },
    getbuildingTypeList() {
      fetchTypeList(this.buildingTypeQuery,this.header).then(response => {
        console.log(response.data.resultData.buildingTypeMap, 'fetchTypeList')
        this.buildingTypeList = response.data.resultData.buildingTypeMap
        this.buildingTypeList.forEach(element => {
          this.showbuildingTypeObj[(element["key"].toString())] = element["value"]
        });
          console.log(this.showbuildingTypeObj)
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
      console.log(this.listQuery,"this.listQuery")
      this.getdataList()
    },
    resetTemp() {
      this.temp = {
        companyId:"",
        buildingCode:"",
        buildingType:"",
        province:"",
        city:"",
        county:"",
        buildingName:"",
        upFloors:"",
        downFloors:"",
        tasks:"",
        patrolAvgTime:"",
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
      console.log(this.temp,"this.temp")
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createbuildArticle(this.temp,this.header).then(() => {
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
      fetchBuildData({},row.buildingId,this.header).then(response => {
        console.log(response.data.resultData, 'fetchBuildData')
        // this.temp = response.data.resultData.companyInfo
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
    },
    // 加载china地点数据，三级
      getCityData:function(){
        var that = this
        axios.get(this.mapJson).then(function(response){
          if (response.status==200) {
            var data = response.data
            that.province = []
            that.city = []
            that.block = []
            // 省市区数据分类
            for (var item in data) {
              if (item.match(/0000$/)) {//省
                that.province.push({id: item, value: data[item], children: []})
              } else if (item.match(/00$/)) {//市
                that.city.push({id: item, value: data[item], children: []})
              } else {//区
                that.block.push({id: item, value: data[item]})
              }
            }
            // 分类市级
            for (var index in that.province) {
              for (var index1 in that.city) {
                if (that.province[index].id.slice(0, 2) === that.city[index1].id.slice(0, 2)) {
                  that.province[index].children.push(that.city[index1])
                }
              }
            }
            // 分类区级
            for(var item1 in that.city) {
              for(var item2 in that.block) {
                if (that.block[item2].id.slice(0, 4) === that.city[item1].id.slice(0, 4)) {
                  that.city[item1].children.push(that.block[item2])
                }
              }
            }
          }
          else{
            console.log(response.status)
          }
        }).catch(function(error){console.log(typeof+ error)})
      },
      // 选省
      choseProvince:function(e) {
        for (var index2 in this.province) {
          if (e === this.province[index2].id) {
            this.shi1 = this.province[index2].children
            this.shi = this.province[index2].children[0].value
            this.qu1 =this.province[index2].children[0].children
            this.qu = this.province[index2].children[0].children[0].value
            this.E = this.qu1[0].id
          }
        }
      },
      // 选市
      choseCity:function(e) {
        for (var index3 in this.city) {
          if (e === this.city[index3].id) {
            this.qu1 = this.city[index3].children
            this.qu = this.city[index3].children[0].value
            this.E = this.qu1[0].id
            // console.log(this.E)
          }
        }
      },
      // 选区
      choseBlock:function(e) {
        this.E=e;
        // console.log(this.E)
      },
      // 选省
      addchoseProvince:function(e) {
        for (var index2 in this.province) {
          if (e === this.province[index2].id) {
            this.citylist = this.province[index2].children
            this.temp.city = this.province[index2].children[0].value
            this.countylist =this.province[index2].children[0].children
            this.temp.county = this.province[index2].children[0].children[0].value
            this.E = this.countylist[0].id
          }
        }
      },
      // 选市
      addchoseCity:function(e) {
        for (var index3 in this.citylist) {
          if (e === this.citylist[index3].id) {
            this.countylist = this.citylist[index3].children
            this.temp.county = this.citylist[index3].children[0].value
            this.E = this.countylist[0].id
            // console.log(this.E)
          }
        }
      },
      // 选区
      addchoseBlock:function(e) {
        this.E=e;
        // console.log(this.E)
      }
  },
}
</script>
