<template>
    <div>
        <a-breadcrumb style="text-align: left;padding-bottom: 20px">
            <a-breadcrumb-item href="">
                <a-icon type="alipay-circle" />
                <span>支付宝支付</span>
            </a-breadcrumb-item>
            <a-breadcrumb-item href="">
                <a-icon type="search" />
                <span>支付查询</span>
            </a-breadcrumb-item>
        </a-breadcrumb>
    <a-form :form="form">

        <a-form-item
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
                label="订单唯一标识"
        >
            <a-input
                    v-decorator="[
          'outTradeNo',
          {rules: [{ required: true, message: '订单唯一标识!' }]}
        ]"
                    placeholder="订单唯一标识!"  @pressEnter="enters">
            <a-icon slot="prefix" type="idcard" />

            </a-input>
        </a-form-item>


        <a-form-item
                :label-col="formTailLayout.labelCol"
                :wrapper-col="formTailLayout.wrapperCol"
        >
            <a-button id="check"
                    type="primary"
                    @click="query" style="width: 100%"
            >
                查询
            </a-button>
        </a-form-item>

        <a-form-item
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
                label="支付查询结果"
        >
            <a-input v-model="result" :disabled=true>
                <a-icon slot="prefix" type="profile" />

            </a-input>
        </a-form-item>
    </a-form>
    </div>
</template>

<script>
    const formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 8 },
    };
    const formTailLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 8, offset: 4 },
    };

    export default {
        data () {
            return {
                result:"",
                formItemLayout,
                formTailLayout,
                form: this.$form.createForm(this),
            };
        },
        mounted(){
            document.getElementById('outTradeNo').focus();//默认焦点
        },
        methods: {
            //input enter事件
            enters (e){
                var curentInput=e.target.id;

                if(curentInput=='outTradeNo'){
                    document.getElementById('check').focus();//默认焦点
                }
            },
            query  () {
                this.form.validateFields(
                    (err,values) => {
                        if (!err) {
                            var outTradeNo=values.outTradeNo;
                           var pay=  new this.alipayhelper();
                           var ALI_GATEWAY_URL= pay.accountSettings.ALI_GATEWAY_URL;

                           var buildParams=pay.buildParamsQ(outTradeNo);
                            var res=this.$http.get(ALI_GATEWAY_URL+buildParams).then(response => {
                                //console.log(response);
                                if(response.status!=200){
                                    this.$message.error('网络错误');
                                }else{
                                    if(response.data.alipay_trade_query_response.code!=10000){
                                        this.result=response.data.alipay_trade_query_response.sub_msg;
                                    }else{
                                        //this.$message.success('支付申请已发送,等待付款完成');
                                        var trade_status=response.data.alipay_trade_query_response.trade_status;
                                            if(trade_status=='TRADE_SUCCESS'){
                                                this.result='交易支付成功';
                                            }else{
                                                this.result=trade_status;
                                            }
                                    }
                                    //response.data.code
                                }
                               //var sucess= pay.verifySign(response);
                            })
                                .catch(err => {
                                    console.log(err);
                                });
                          //  console.log("res"+res);
                        }
                    },
                );
            }
        },
    };
</script>