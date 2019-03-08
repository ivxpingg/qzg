<template>
    <div class="resource-container">
        <!--<Carousel v-model="value" loop autoplay :height="200">-->
            <!--<CarouselItem>-->
                <!--<div class="demo-carousel" style="height: 200px; background-color: red;">-->
                    <!--<img src="./images/slideshow1.png" style="width: 100%" alt="">-->
                <!--</div>-->
            <!--</CarouselItem>-->
            <!--<CarouselItem>-->
                <!--<div class="demo-carousel" style="height: 200px; background-color: blueviolet;">-->
                    <!--<img src="./images/slideshow2.png" style="width: 100%" alt="">-->
                <!--</div>-->
            <!--</CarouselItem>-->
            <!--<CarouselItem>-->
                <!--<div class="demo-carousel" style="height: 200px; background-color: yellowgreen;">-->
                    <!--<img src="./images/slideshow3.png" style="width: 100%" alt="">-->
                <!--</div>-->
            <!--</CarouselItem>-->
        <!--</Carousel>-->

        <div class="swiper-container" style="height: 200px;">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <img src="./images/slideshow1.png" style="width: 100%" alt="">
                </div>
                <div class="swiper-slide">
                    <img src="./images/slideshow2.png" style="width: 100%" alt="">
                </div>
                <div class="swiper-slide">
                    <img src="./images/slideshow3.png" style="width: 100%" alt="">
                </div>
            </div>
            <div class="my-pagination"></div>
        </div>


        <vIvxFilterBox dashed>
            <Form inline>
                <FormItem label="筛选条件:" :label-width="65">
                    <RadioGroup v-model="searchParams.condition.resourceType" type="button">
                        <Radio label="">全部</Radio>
                        <Radio v-for="item in dict_resourceType"
                               :label="item.value" :key="item.id">{{item.label}}</Radio>
                    </RadioGroup>
                </FormItem>
            </Form>
        </vIvxFilterBox>

        <div class="ivx-table-box">
            <Table border
                   height="460"
                   :loading="tableLoading"
                   :columns="tableColumns"
                   :data="tableData"></Table>
            <Page prev-text="上一页"
                  next-text="下一页"
                  show-total
                  :current="searchParams.current"
                  :page-size="searchParams.size"
                  :total="searchParams.total"
                  @on-change="onPageChange"></Page>
        </div>
    </div>
</template>

<script>
    import comMixin from '../../../lib/mixin/comMixin';
    import authMixin from '../../../lib/mixin/authMixin';
    export default {
        name: 'resource',
        mixins: [comMixin, authMixin],
        data() {
            return {
                mySwiper: null,
                value: 0,
                searchParams: {
                    current: 1,        // 当前第几页
                    size: 10,          // 每页几行
                    total: 0,           // 总行数
                    condition: {
                        resourceType: '',
                        searchKey: '',
                        publishStatus: 'published'
                    }
                },
                tableColumns: [
                    { title: '序号', width: 65, align: 'center', type: 'index', },
                    { title: '资源名称', width: 120, align: 'center', key: 'resourceName' },
                    { title: '资源类型', width: 120, align: 'center', key: 'resourceTypeLabel' },
                    { title: '发布时间', width: 180, align: 'center',
                        render: (h, params) => {
                            let str = this.timeFormat(params.row.publishTime, 'YYYY-MM-DD HH:mm:ss');
                            return h('div', str);
                        }
                    },
                    { title: '描述', minWidth: 120, align: 'center', key: 'description' }

                ],
                tableData: [
                    // {
                    //     resourceName: '资源名称1',
                    //     resourceTypeLabel: '视频',
                    //     publishTime: '2018-09-21',
                    //     publishStatus: 'unpublished',
                    //     publishStatusLabel: '未发布',
                    //     pageView: 10,
                    //     description: '描述内容描述内容描述内容描述内容描述内容'
                    // }
                ],
                tableLoading: false,
                // 字典
                dict_resourceType: []
            };
        },
        mounted() {
            this.getDicts(['resourceType']);
            this.initSwiper();
        },
        watch: {
            'searchParams.current'() {
                this.getData();
            },
            'searchParams.condition': {
                deep: true,
                handler() {
                    this.getData();
                }
            }
        },
        methods: {
            initSwiper() {
                this.mySwiper = new Swiper('.swiper-container',{
                    loop: true,
                    pagination: '.my-pagination',
                    grabCursor: true,
                    paginationClickable: true
                    //其他设置
                });
            },
            getData() {
                this.tableLoading = true;
                this.$http({
                    method: 'post',
                    url: '/resource/list',
                    data: JSON.stringify(this.searchParams)
                }).then((res) => {
                    this.tableLoading = false;
                    if (res.code === 'SUCCESS') {
                        this.tableData = res.data.records;
                        this.searchParams.total = res.data.total;
                    }
                }).catch(() => {
                    this.tableLoading = false;
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    .resource-container {
        .my-pagination {
            position: absolute;
            left: 0;
            text-align: center;
            bottom:5px;
            width: 100%;
        }
    }
</style>
<style lang="scss">
    .swiper-pagination-switch {
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 10px;
        background: #999;
        box-shadow: 0px 1px 2px #555 inset;
        margin: 0 3px;
        cursor: pointer;
    }
    .swiper-active-switch {
        background: #fff;
    }
</style>