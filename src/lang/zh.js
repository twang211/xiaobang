export default {
    route: {
        dashboard: '首页',
        introduction: '简述',
        documentation: '文档',
        guide: '引导页',
        permission: '权限测试页',
        pagePermission: '页面权限',
        directivePermission: '指令权限',
        icons: '图标',
        components: '组件',
        componentIndex: '介绍',
        tinymce: '富文本编辑器',
        markdown: 'Markdown',
        jsonEditor: 'JSON编辑器',
        dndList: '列表拖拽',
        splitPane: 'Splitpane',
        avatarUpload: '头像上传',
        dropzone: 'Dropzone',
        sticky: 'Sticky',
        countTo: 'CountTo',
        componentMixin: '小组件',
        backToTop: '返回顶部',
        dragDialog: '拖拽 Dialog',
        dragKanban: '可拖拽看板',
        charts: '图表',
        keyboardChart: '键盘图表',
        lineChart: '折线图',
        mixChart: '混合图表',
        example: '综合实例',
        nested: '路由嵌套',
        menu1: '菜单1',
        'menu1-1': '菜单1-1',
        'menu1-2': '菜单1-2',
        'menu1-2-1': '菜单1-2-1',
        'menu1-2-2': '菜单1-2-2',
        'menu1-3': '菜单1-3',
        menu2: '菜单2',
        Table: 'Table',
        dynamicTable: '动态Table',
        dragTable: '拖拽Table',
        inlineEditTable: 'Table内编辑',
        complexTable: '综合Table',
        treeTable: '树形表格',
        customTreeTable: '自定义树表',
        tab: 'Tab',
        form: '表单',
        createArticle: '创建文章',
        editArticle: '编辑文章',
        articleList: '文章列表',
        errorPages: '错误页面',
        page401: '401',
        page404: '404',
        errorLog: '错误日志',
        excel: 'Excel',
        exportExcel: 'Export Excel',
        selectExcel: 'Export Selected',
        uploadExcel: 'Upload Excel',
        zip: 'Zip',
        exportZip: 'Export Zip',
        theme: '换肤',

        clipboardDemo: 'Clipboard',
        i18n: '国际化',
        externalLink: '外链'
    },
    navbar: {
        logOut: '退出登录',
        dashboard: '首页',
        github: '项目地址',
        screenfull: '全屏',
        theme: '换肤',
        size: '布局大小'
    },
    login: {
        title: '系统登录',
        logIn: '登录',
        username: '账号',
        password: '密码',
        any: '随便填',
        thirdparty: '第三方登录',
        thirdpartyTips: '本地不能模拟，请结合自己业务进行模拟！！！'
    },
    documentation: {
        documentation: '文档',
        github: 'Github 地址'
    },
    permission: {
        roles: '你的权限',
        switchRoles: '切换权限'
    },
    guide: {
        description: '引导页对于一些第一次进入项目的人很有用，你可以简单介绍下项目的功能。本 Demo 是基于',
        button: '打开引导'
    },
    components: {
        documentation: '文档',
        tinymceTips: '富文本是管理后台一个核心的功能，但同时又是一个有很多坑的地方。在选择富文本的过程中我也走了不少的弯路，市面上常见的富文本都基本用过了，最终权衡了一下选择了Tinymce。更详细的富文本比较和介绍见',
        dropzoneTips: '由于我司业务有特殊需求，而且要传七牛 所以没用第三方，选择了自己封装。代码非常的简单，具体代码你可以在这里看到 @/components/Dropzone',
        stickyTips: '当页面滚动到预设的位置会吸附在顶部',
        backToTopTips1: '页面滚动到指定位置会在右下角出现返回顶部按钮',
        backToTopTips2: '可自定义按钮的样式、show/hide、出现的高度、返回的位置 如需文字提示，可在外部使用Element的el-tooltip元素',
        imageUploadTips: '由于我在使用时它只有vue@1版本，而且和mockjs不兼容，所以自己改造了一下，如果大家要使用的话，优先还是使用官方版本。'
    },
    querytable: { //查询文字描述
        resetsearch: '重置查询',
        search: '查询',
        companyName: '单位名称',
        companyCode: '单位编码',
        companyCorporate: '法人',
        companyType: '选择监管单位类别',
        safetyLevel: '选择消防重点单位类别',
        userName: '用户姓名',
        userCode: '用户编码',
        userType: '人员类别',
        roleLevel: '用户权限',
        department: '所属部门',
        buildingName: '建筑物名',
        buildingCode: '建筑编码',
        typeName: '设备名称',
        kind: '设备分类',
        typeId: '设备类型',
        apparatusName: '设备名称',
        apparatusUuid: '设备UUID',
        apparatusCode: '设备编码',
        apparatusNameId: '设备名称',
        apparatusTypeId: '设备类别',
        taskName: '任务名称',
        taskCode: '任务编码',
        taskPeriodType: '任务周期类型',
        companyId: '关联单位',
        buildingId: '关联建筑',
        taskStatus: '任务状态',
        taskExecuteUserName: '任务执行人',
        next: '下一步',
        checkUserType: '巡查人类型',
        upkeepPeriod: '保养周期',
        workUserName: '维修人',
        print: '打印',
    },
    table: { //列表&&编辑内容文字描述
        companyCode: '单位编码',
        companyName: '单位名称',
        companyCorporate: '法人',
        safetyManager: '消防安全管理人',
        controlRoomPhone: '控制室电话',
        companyAddress: '地址',
        companyType: '监管单位类别',
        safetyLevel: '消防重点单位类别',
        isDenselyPlace: '人员密集场所',
        isPublicDenselyPlace: '公众聚集场所',
        isPublicRecreationPlace: '公共娱乐场所',
        isCheckPass: '经消防安全检查是否合格',
        referenceNumber: '文号',
        usedStatus: '建筑物或场所使用情况与消防验收',
        hasSafetySystem: '消防安全制度是否健全',
        hasContingencyPlan: '灭火和应急救援预案是否制定',
        hasCheckRecord: '防火巡查、检查记录是否记录',
        hasRegularCheck: '消防设施、器材、消防安全标志定期检验',
        hasYearCheckRecord: '建筑消防设施每年检测是否记录',
        hasTrainRecord: '员工消防安全培训记录是否记录',
        hasManoeuvreRecord: '消防演练是否记录',
        hasSafetyManager: '消防安全重点单位消防安全管理人是否确定',
        hasSafetyFile: '消防档案是否建立',
        hasClearKeyPlace: '消防安全重点单位消防安全重点部位是否清晰',
        buildingName: '建筑物名',
        buildingCode: '建筑编码',
        buildingType: '建筑物类别',
        buildingImageId: '图片ID',
        floorsLv: '建筑层级',
        upFloors: '地上楼层数量',
        downFloors: '地下楼层数量',
        totalFloors: '楼层总数',
        tasks: '任务总数',
        patrolAvgTime: '巡查平均时间',
        patrolLastTime: '上次检查时间',
        patrolNextTime: '下次检查时间',
        province: '所在城市',
        city: '所在市',
        county: '所在区县',
        address: '详细地址',
        note: '备注',
        loginAccount: '登陆账号',
        userName: '姓名',
        userCode: '用户编码',
        userId: '用户ID',
        password: '密码',
        userType: '人员类别',
        roleLevel: '用户权限',
        department: '所属部门',
        headImageId: '用户头像ID',
        nickName: '昵称',
        sex: '性别',
        birthday: '出生年月',
        phone: '电话',
        wechat: '微信',
        email: '电子邮件',
        typeName: '设备类型（系统）名称',
        kind: '设备分类',
        nameId: '设备名称ID',
        apparatusId: '设备ID',
        typeId: '设备类型',
        apparatusName: '设备名称',
        checkPoint: '巡查要点',
        periodType: '检查周期',
        checkReminder: '巡查提示',
        activeStatus: '是否启用',
        apparatusUuid: '设备UUID',
        apparatusCode: '设备编码',
        apparatusNameId: '设备名称',
        apparatusTypeId: '设备类别',
        apparatusImageId: '设备图片',
        buildingNo: '楼号',
        floor: '所在建筑物楼层',
        fireAreaCode: '所在防火分区编号',
        roomNo: '房间号',
        apparatusAddress: '设备地址',
        apparatusStatus: '设备情况',
        taskName: '任务名称',
        taskCode: '任务编码',
        taskPeriodType: '任务周期类型',
        companyId: '关联单位',
        buildingId: '关联建筑',
        taskStatus: '任务状态',
        taskExecuteUserName: '任务执行人',
        aboutFloors: '关联层数',
        isPass: '是否合格',
        isAmend: '是否处理',
        finishTime: '巡查时间',
        checkUserAutographUri: '巡查人签名',
        checkUserName: '巡查人',
        checkUserType: '巡查人类型',
        upkeepContent: '保养内容',
        upkeepPeriod: '保养周期',
        createTime: '保养时间',
        upkeepUserAutographUri: '人员签名',
        lookTime: '发现时间',
        workTime: '维修时间',
        workUserAutographUri: '维修人员',
        isFinish: '是否结束',
        workRecordId: '维修ID',
        workMethod: '维修方法',
        safetyPrecautions: '安全措施',
        errorDescription: '故障描述',
        spotHandling: '现场处理',
        reportingConditions: '报修情况',
        tempo: '完成率',
        apparatusCount: '任务数量',
        troubleCount: '隐患发现数目',
        troubleDesc: '故障描述',
        taskBeginTime: '任务开始时间',
        taskFinishTime: '任务结束时间',
        taskUser: '执行人',
        isReference: '是否备案',
        isStopSystem: '是否停用系统',

        index: '序号',
        next: '下一步',
        add: '添加',
        chkpointadd: '巡查要点',
        edit: '编辑',
        cancel: '取 消',
        confirm: '确 定',
        config: '查看编辑',
        look: '查看',
        auditing: '审核状态',
        pass: '通过',
        reject: '驳回',
        distribute: '转发',
        cancel: '取消',
        send: '发送短信',
        phonenum: '手机号',
        sendmsg: '短信内容',
        goback: '返回',
        setting: '操作',
    },
    errorLog: {
        tips: '请点击右上角bug小图标',
        description: '现在的管理后台基本都是spa的形式了，它增强了用户体验，但同时也会增加页面出问题的可能性，可能一个小小的疏忽就导致整个页面的死锁。好在 Vue 官网提供了一个方法来捕获处理异常，你可以在其中进行错误处理或者异常上报。',
        documentation: '文档介绍'
    },
    excel: {
        export: '导出',
        selectedExport: '导出已选择项',
        placeholder: '请输入文件名(默认excel-list)'
    },
    zip: {
        export: '导出',
        placeholder: '请输入文件名(默认file)'
    },
    theme: {
        change: '换肤',
        documentation: '换肤文档',
        tips: 'Tips: 它区别于 navbar 上的 theme-pick, 是两种不同的换肤方法，各自有不同的应用场景，具体请参考文档。'
    },
    tagsView: {
        refresh: '刷新',
        close: '关闭',
        closeOthers: '关闭其它',
        closeAll: '关闭所有'
    }
}