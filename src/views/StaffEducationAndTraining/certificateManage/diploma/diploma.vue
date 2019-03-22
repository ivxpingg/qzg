<template>
    <Modal v-model="modalValue"
           class="addCredential-container"
           title="证书"
           :width="1064"
           @on-visible-change="onVisibleChange">
        <div style="position: relative;">
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
            <img :src="imgSrc" alt="证书" style="width: 1024px; position: absolute; top: 0; left: 0;">
        </div>

    </Modal>
</template>

<script>
    import modalMixin from '../../../../lib/mixin/modalMixin';
    import comMixin from '../../../../lib/mixin/comMixin';
    import html2canvas from 'html2canvas';
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
                },
                imgSrc: ''
            };
        },
        mounted() {
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
                        });

                        this.exportPDF();
                    }
                })
            },

            // 导出PDF
            exportPDF() {
                this.$Spin.show();
                try {

                    html2canvas(this.$refs.diploma, {
                        scale: 2, // 添加的scale 参数
                    }).then((canvas) => {
                        let pageData = canvas.toDataURL('image/jpeg', 1.0);

                        this.imgSrc = pageData;
                        // this.downloadFile( pageData, '证书');


                        this.$Spin.hide();
                    });
                }
                catch (e) {
                    this.$Spin.hide();
                    this.$Notice.warning('生成PDF失败！');
                }
            },
            downloadFile(content, fileName) { //下载base64图片

                var base64ToBlob = function(code) {
                    let parts = code.split(';base64,');
                    let contentType = parts[0].split(':')[1];
                    let raw = window.atob(parts[1]);
                    let rawLength = raw.length;
                    let uInt8Array = new Uint8Array(rawLength);
                    for(let i = 0; i < rawLength; ++i) {
                        uInt8Array[i] = raw.charCodeAt(i);
                    }
                    return new Blob([uInt8Array], {
                        type: contentType
                    });
                };
                let aLink = document.createElement('a');
                let blob = base64ToBlob(content); //new Blob([content]);
                let evt = document.createEvent("HTMLEvents");
                evt.initEvent("click", true, true); //initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
                aLink.download = fileName;
                aLink.href = URL.createObjectURL(blob);


                aLink.click();
            }
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