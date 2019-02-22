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
        getDict(type, key) {
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
            })
        },
        /**
         * 获取字典列表, 自动赋值
         * @param list [Array]
         * @return null
         */
        getDicts(list) {
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
            });
        },
    }
}