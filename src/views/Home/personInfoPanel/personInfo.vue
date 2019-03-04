<template>
    <div class="personInfo-container">
        <div class="user-info">
            <div class="left-panel">
                <img src="/images/user-man.png" alt="">
            </div>
            <div class="right-panel">
                <div class="attr name">沈晓明</div>
                <div class="attr">部门：技术部</div>
                <div class="attr">账号：chenxm</div>
            </div>
        </div>
        <div class="other-info">
            <div class="item">
                <div class="title">培训学时</div>
                <div class="value">52h</div>
            </div>
            <div class="item">
                <div class="title">待结业课程</div>
                <div class="value">3</div>
            </div>
            <div class="item">
                <div class="title">努力值</div>
                <div class="value">2000</div>
            </div>
            <div class="item">
                <div class="title">消息通知</div>
                <div class="value">10</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'personInfo',
        data() {
            return {};
        }
    }
</script>

<style lang="scss" scoped>
    .personInfo-container {
        .user-info {
            height: 200px;
            padding-top: 30px;
            .left-panel {
                float: left;
                width: 40%;
                text-align: center;
                img {
                    display: inline-block;
                    width: 100px;
                    border-radius: 50%;
                }
            }
            .right-panel {
                float: left;
                width: 59%;
                .attr {
                    margin-top: 10px;
                    margin-left: 15px;
                }
                .name {
                    font-size: 16px;
                    font-weight: 700;
                }
            }
        }
        .other-info {
            height: 200px;
            .item {
                float: left;
                height: 100px;
                width: 50%;
                border: 1px solid #dcdee2;

                .title {
                    margin-top: 20px;
                    margin-bottom: 10px;
                    font-size: 18px;
                    color: #515a6e;
                    text-align: center;
                }
                .value {
                    font-size: 20px;
                    color: #333;
                    text-align: center;
                }
            }
        }
    }
</style>