<template>
    <Modal v-model="modalValue"
           class="addCredential-container"
           title="证书"
           :width="1064"
           @on-visible-change="onVisibleChange">
        <div class="diploma-box" ref="diploma">
            <div class="content" style="padding-top: 250px;">
                {{certificateInfo.userName}} 于 {{certificateInfo.issueDate}}, 参加由“{{certificateInfo.departmentName}}”举办的《{{certificateInfo.courseName}}》，
                考核合格，准予结业。
            </div>
            <div class="content" style="position: absolute; left: 0; bottom: 180px;">
                特发此证！
            </div>
            <div class="num" style="left: 160px; bottom: 100px;">
                证书编号：{{certificateInfo.certificateNo}}
            </div>
            <div class="date" style="right: 140px; bottom: 100px;">
                填发日期： {{certificateInfo.issueDate}}
            </div>
        </div>

        <div slot="footer">
            <Button type="primary"
                    size="large"
                    @click="exportPDF">导出</Button>
        </div>
    </Modal>
</template>

<script>
    import modalMixin from '../../../../lib/mixin/modalMixin';
    import comMixin from '../../../../lib/mixin/comMixin';
    import html2canvas from 'html2canvas';
    import jspdf from 'jspdf/dist/jspdf.debug';
    export default {
        name: 'diploma',
        mixins: [modalMixin, comMixin],
        props: {
            certificateId: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                certificateInfo: {
                    departmentName: '',
                    courseName: '',
                    certificateNo: '',
                    issueDate: '',
                    userName: '',
                    userId: '',
                    certificateTypeLabel: '',
                    issuer: '',
                    certificateType: ''
                }
            };
        },
        watch: {
            certificateId(val) {
                if (val) {
                    this.getData();
                }
            }
        },
        methods: {
            getData() {
                this.$http({
                    method: 'get',
                    url: '/certificate/query',
                    params: {
                        certificateId: this.certificateId
                    }
                }).then((res) => {

                    if (res.code === 'SUCCESS') {
                        Object.assign(this.certificateInfo, res.data, {
                            issueDate: this.timeFormat(res.data.issueDate, 'YYYY年MM月DD日')
                        })
                    }
                })
            },

            // 导出PDF
            exportPDF() {
                this.$Spin.show();
                console.dir(html2canvas);
                try {

                    html2canvas(this.$refs.diploma, {
                        scale: 2, // 添加的scale 参数
                    }).then((canvas) => {
                        let pageData = canvas.toDataURL('image/jpeg', 1.0);
                        let pdf = new jspdf("", "pt", 'a4');

                        let contentWidth = canvas.width;
                        let contentHeight = canvas.height;

                        //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
                        let imgWidth = 595.28;
                        let imgHeight = (595.28/contentWidth * contentHeight);

                        //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
                        //当内容未超过pdf一页显示的范围，无需分页

                        pdf.addImage(pageData, 'JPEG', 0, 10, imgWidth, imgHeight );

                        this.$Spin.hide();
                        pdf.save('证书.pdf');
                    });
                }
                catch (e) {
                    this.$Spin.hide();
                    this.$Notice.warning('生成PDF失败！');
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    .diploma-container {
    }

    .diploma-box {
        position: relative;
        width: 1024px;
        height: 678px;
        background: url("./images/diploma-bg.jpg") no-repeat;

        .content{
            padding: 0 100px 0;
            font-size: 30px;
            font-weight: 700;
            letter-spacing: 10px;
            text-indent: 60px;
            line-height: 60px;
        }

        .num, .date {
            position: absolute;
            font-size: 20px;
            letter-spacing: 4px;
        }
    }
</style>