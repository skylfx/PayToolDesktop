<template>
    <div>

        <router-link :to="{path:'/'}" style="padding-left:10px;display: inline-block"> <a-icon type="github"style="color: white;fontSize : 32px;padding-top: 20px" /></router-link>

        <a-menu theme="dark" mode="inline"  :defaultOpenKeys="['ali','wx']" @select="handleselect" style="text-align: left">
            <a-sub-menu key="ali">
                <span slot="title"><a-icon type="alipay-circle" /><span>支付宝当面付</span></span>
                <a-menu-item key="alipay1">支付码支付</a-menu-item>
                <a-menu-item key="alipay2">二维码支付</a-menu-item>
                <a-menu-item key="alipayquery">支付查询</a-menu-item>
                <a-menu-item key="alipayback">支付退款</a-menu-item>
                <a-menu-item key="alipaylist">支付订单查询</a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="wx">
                <span slot="title"><a-icon type="wechat" /><span>微信当面付</span></span>
                <a-menu-item key="wxpay1">支付码支付</a-menu-item>
                <a-menu-item key="wxpay2">二维码支付</a-menu-item>
            </a-sub-menu>
            <a-menu-item key="paysettings"><a-icon type="setting" /><span>系统配置</span></a-menu-item>
        </a-menu>
    </div>
</template>

<script>
    export default {
        name: "PayMenu",
        methods:{

                handleselect(obj) {
                   // var a={name: menuname, params: {paicheNo: 1}}
                    //console.log(a);
                   // this.$router.push({ path: '/alipay1' })
                    console.log(123);
                    this.$router.push({name:obj.key , params: {}});

                }
        }
    }
</script>

<style scoped>

</style>