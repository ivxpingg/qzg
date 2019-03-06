export default {
    methods: {
        /**
         * 分页控件-切换页面
         * @param current
         */
        onPageChange(current) {
            this.searchParams.current = current;
        },
        /**
         * 获取单个数据字典
         * @param type [String]
         * @param key [String]
         */
        getDict(type, key, callback) {
            this.$http({
                method: 'get',
                url: '/dict/getListByType',
                params: {
                    type: type
                }
            }).then(res => {
                if(res.code) {
                    this[key] = res.data;
                }
                if (callback) {
                    callback();
                }
            })
        },
        /**
         * 获取字典列表, 自动赋值
         * @param list [Array]
         * @return null
         */
        getDicts(list, callback) {
            this.$http({
                method: 'get',
                url: '/dict/getListByTypes',
                params: {
                    types: list.join(',')
                }
            }).then(res => {
                if(res.code === 'SUCCESS') {
                    list.forEach(v => {
                        this[`dict_${v}`] = res.data[v] || [];
                    });
                }
                if (callback) {
                    callback();
                }
            });
        },
        // 获取单位列表
        getUnitList(key) {
            this.$http({
                method: 'post',
                url: '/department/unitList'
            }).then(res => {
                if(res.code === 'SUCCESS') {
                    this[key] = res.data || [];
                }
            });
        },
        // 根据单位名称获取部门列表
        getDeparmentList(unitName, key) {
            this.$http({
                method: 'get',
                url: '/department/departmentListByUnit',
                params: {
                    unitName: unitName
                }
            }).then(res => {
                if(res.code === 'SUCCESS') {
                    this[key] = res.data || [];
                }
            });
        },
        /**
         * 获取职务列表
         * @param key
         * @param departmentId
         */
        getJobList(key, departmentId) {
            this.$http({
                method: 'post',
                url: '/job/list',
                data: JSON.stringify({
                    current: 1,        // 当前第几页
                    size: 1000,          // 每页几行
                    total: 0,
                    condition: {
                        departmentId: departmentId || ''
                    }
                })
            }).then(res => {
                if(res.code === 'SUCCESS') {
                    this[key] = res.data.records || [];
                }
            });
        },
        /**
         * 转化时间格式
         * @param value 11225555421
         * @param format ps: 'YYYY-MM-DD HH:mm:ss'
         * @returns {string}
         */
        timeFormat(value, format) {
            return value ? this.$moment(value).format(format) : '';
        },

        assign(target, source) {
            if (!source) {
                return;
            }
            for (let k in target) {
                if (source[k]) {
                    target[k] = source[k];
                }
            }
        }
    }
}