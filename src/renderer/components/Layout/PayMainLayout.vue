<template>
    <a-layout id="main">
        <a-layout-sider
                :trigger="null"
                collapsible
                v-model="collapsed" class="sider"
        >
            <div class="logo" />
            <PayMenu></PayMenu>
        </a-layout-sider>
        <a-layout :class="collapsed ? 'mainsmall' : 'mainbig'">
            <a-layout-header style="background: #fff; padding-left: 20px;text-align: left">
                <a-row>
                       <a-col :span="12">
                        <div style="">
                        <a-icon  class="trigger"
                                :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                                @click="()=> collapsed = !collapsed"
                        /> <router-link :to="{path:'/'}" style="padding-left:10px;display: inline-block"><h3 style="display: inline-block"><a-icon type="home" /> 支付测试系统</h3>
                        <logo></logo></router-link>
                    </div>
                    </a-col>
                    <a-col :span="12" style="text-align: right">
                        <div>
                       <!-- <a-button type="dashed" shape="circle" icon="fullscreen"   @click.native.stop="winControl('maximize')"  v-show="isMaximized"/>
                        <a-button type="primary" shape="circle" icon="fullscreen"   @click.native.stop="winControl('maximize')"  v-show="!isMaximized"/>
                        --><a-button type="primary" shape="circle" icon="fullscreen-exit"  @click.native.stop="winControl('minimize')"/>
                        <a-button type="primary" shape="circle" icon="logout"  @click="winControl('close')"/>
                    </div>
                        </a-col>
                </a-row>



            </a-layout-header>
            <a-layout-content class="content">
                <router-view></router-view>
            </a-layout-content>

            <a-layout-footer class="footer">@2019</a-layout-footer>
        </a-layout>
    </a-layout>
</template>

<script>
    const electron = require('electron');
    const remote = electron.remote;
    import PayMenu from '@/components/Layout/PayMenu'
    import Logo from '@/components/image/Logo'
    export default {
        name: "paymain",
        data(){
            return {
                collapsed: false,
                // 是最大化
                isMaximized: false,
            }
        },
        components: { PayMenu,Logo },
        methods:{
        winControl(action) {
            const browserWindow = remote.getCurrentWindow()
            switch (action) {
                case 'minimize':
                    browserWindow.minimize()
                    break;
                case 'maximize':
                    // if (this.isMaximized) {
                    if (browserWindow.isMaximized()) {
                        browserWindow.unmaximize()
                    } else {
                        if (this.isMaximized) {
                            browserWindow.unmaximize()
                        } else {
                            browserWindow.maximize()
                        }
                    }
                    // this.isMaximized = browserWindow.isMaximized()
                    this.isMaximized = !this.isMaximized

                    break;
                case 'close':
                    browserWindow.close()
                    break;
                default:
                    break;
            }
        }
        },
    }

</script>

<style scoped lang="scss">

    /* CSS */


    .mainbig{
        margin-left: 200px;
    }
    .mainsmall{
        margin-left: 80px;
    }
    #main {
        text-align: center;
        height: 100%;
    }

    #main > .ant-layout {
        margin-bottom: 48px;
        //height: 100%;
    }
    #main > .ant-layout:last-child {
        margin-bottom: 0;
    }
    .sider{
        overflow: auto;
        height: 100vh;
        position: fixed;
        left: 0
    }
    .content{
        margin-top: 10px;
        margin-left: 10px;
        margin-right: 10px;
        padding: 10px;
        /* width: 100%; */
        background-color: white;
        min-height: 280px;
        overflow: initial;
    }
    .footer{
        padding-top: 10px;
        padding-bottom: 10px;
        height: 30px;
    }
</style>
