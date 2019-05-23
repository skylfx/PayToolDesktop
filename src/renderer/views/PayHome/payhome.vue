<template>
    <div class="page-header-index-wide">
        <a-row :gutter="24">
            <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
                 <div style="height: 200px">
                     <a-card>
                         <div slot="title"> <a-icon type="setting" /> <span style="padding-left: 20px">支付工具</span></div>
                         <p>支付宝条码支付</p>
                         <p>支付宝码扫码支付</p>
                         <p>其他</p>
                     </a-card>
                 </div>
            </a-col>
            <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
                <div style="height: 200px"><a-alert message="vue.ant.design" type="success" showIcon /></div>
            </a-col>
            <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
                <div style="height: 200px"><a-alert message="electron-vue" type="success" showIcon /></div>
            </a-col>
            <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
                <div style="height: 200px"><a-alert message="alipay" type="success" showIcon /></div>
            </a-col>
        </a-row>
        <a-row :gutter="12">
            <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
                <a-card  :bordered="true" title="实时访问统计" :style="{ marginTop: '24px' }">

                    <div style="height: 105px">
                        <a-row>
                            <a-col :span="8">
                                <div class="head-info" :class="center && 'center'">
                                    <span>今日</span>
                                    <p><a>无</a></p>
                                </div>
                            </a-col>
                            <a-col :span="8">
                                <div class="head-info" :class="center && 'center'">
                                    <span>今日</span>
                                    <p><a></a></p>
                                </div>
                            </a-col>
                            <a-col :span="8">
                                <div class="head-info" :class="center && 'center'">
                                    <span>总览</span>
                                    <p><a></a></p>
                                </div>
                            </a-col>
                        </a-row>
                    </div>
                </a-card>
            </a-col>
            <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
                <a-card :loading="loading" :bordered="true" title="销售额类别占比" :style="{ marginTop: '24px' }">

                    <p>支付宝</p>
                    <p>微信</p>
                </a-card>
            </a-col>
        </a-row>
    </div>
</template>

<script>



    export default {
        name: "payhome",
        components: {
        },
        data() {
            return {
                loading: true,
                center: null,
                loginfo:{},
            }
        },

        created() {
            setTimeout(() => {
                this.loading = !this.loading
            }, 1000)
        },
        methods: {
        }
    }
</script>

<style lang="scss" scoped>
    .extra-wrapper {
        line-height: 55px;
        padding-right: 24px;

        .extra-item {
            display: inline-block;
            margin-right: 24px;

            a {
                margin-left: 24px;
            }
        }
    }

    /* 首页访问量统计 */
    .head-info {
        position: relative;
        text-align: left;
        padding: 0 32px 0 0;
        min-width: 125px;

        &.center {
            text-align: center;
            padding: 0 32px;
        }

        span {
            color: rgba(0, 0, 0, .45);
            display: inline-block;
            font-size: .95rem;
            line-height: 42px;
            margin-bottom: 4px;
        }
        p {
            line-height: 42px;
            margin: 0;
            a {
                font-weight: 600;
                font-size: 1rem;
            }
        }
    }
</style>