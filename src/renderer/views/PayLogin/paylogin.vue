<template>
    <div>具体登录页面

        <a-button type="dashed" icon="logout"  @click="payLogin"/>

    </div>
</template>

<script>
    export default {
        name: "payhome",
        mounted(){
            console.log("paylogin",this.$route)
        },
        methods:{
            payLogin() {
                this.$router.push({name:'paymain', params: {param1: 1}});
            },
        }
    }
</script>

<style scoped>

</style>