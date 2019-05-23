<template>
    <div>
    <a-breadcrumb style="text-align: left;padding-bottom: 20px">
        <a-breadcrumb-item href="">
            <a-icon type="alipay-circle" />
            <span>支付宝支付</span>
        </a-breadcrumb-item>
        <a-breadcrumb-item href="">
            <a-icon type="barcode" />
            <span>支付码支付</span>
        </a-breadcrumb-item>
    </a-breadcrumb>
    <a-form :form="form">
        <a-form-item
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
                label="订单唯一标识"
        >
            <a-input v-model="outTradeNo" :disabled=true>
                <a-icon slot="prefix" type="idcard" />

            </a-input>
        </a-form-item>
        <a-form-item
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
                label="收款金额"
        >
            <a-input
                    v-decorator="[
          'total_amount',
          {rules: [{ required: true, message: '请输入金额!' },{pattern:'(^[0-9]{1,6}$)|(^[0-9]{1,6}[\\.]{1}[0-9]{1,2}$)', message: '最大六位整数两位小数的金额!'}]}
        ]"
                    placeholder="请输入金额!" v-model="total_amount" @pressEnter="enters">
            <a-icon slot="prefix" type="money-collect" />

            </a-input>
        </a-form-item>
        <a-form-item
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
                label="收款码"
        >
            <a-input
                    v-decorator="[
          'auth_code',
          {rules: [{  required: true, message: '请输入收款码!' },{pattern:'^(((2[5-9])|(30))\\d{14,22})$', message: '支付授权码，25~30开头的长度为16~24位的数字!'}]}
        ]"
                    placeholder="请输入收款码!" v-model="auth_code" @pressEnter="enters"
            >
                <a-icon slot="prefix" type="barcode" />
            </a-input>
        </a-form-item>
        <a-form-item
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
                label="交易说明"
        >
            <a-input
                    v-decorator="[
          'subject',
          {rules: [{  max: 20, message: '请输入20字符内的交易说明!' }]}
        ]"
                    placeholder="请输入交易说明!" v-model="subject" @pressEnter="enters"
            >
                <a-icon slot="prefix" type="info-circle" />
            </a-input>
        </a-form-item>
        <a-form-item
                :label-col="formTailLayout.labelCol"
                :wrapper-col="formTailLayout.wrapperCol"
        >
            <a-button id="check"
                    type="primary"
                    @click="check" style="width: 100%"
            >
                确认
            </a-button>
        </a-form-item>
        <!--<a-form-item
                :label-col="formTailLayout.labelCol"
                :wrapper-col="formTailLayout.wrapperCol"
        >
            <a-button id="query"
                      type="primary"
                      @click="query" style="width: 100%"
            >
                查询
            </a-button>
        </a-form-item>-->
        <a-form-item
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
                label="支付结果"
        >
         <!--   <a-input v-model="result" :disabled=true>
                <a-icon slot="prefix" type="profile" />
            </a-input>-->

            <a-textarea v-model="result" :disabled=true :rows="2">
            </a-textarea>

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

import {randomUUID} from '@/utils/util'
    var pay;//支付class
    export default {
        data () {
            return {
                auth_code:"",
                total_amount:"",
                outTradeNo:"",
                subject:"",
                result:"",
                ALI_GATEWAY_URL:"",//阿里网关
                formItemLayout,
                formTailLayout,
                form: this.$form.createForm(this),
            };
        },
        mounted(){
            pay=  new this.alipayhelper();
            this.ALI_GATEWAY_URL= pay.accountSettings.ALI_GATEWAY_URL;
            document.getElementById('total_amount').focus();//默认焦点
            this.outTradeNo= randomUUID();//// 商户网站唯一订单号

        },
        methods: {
            //input enter事件
            enters (e){
                var curentInput=e.target.id;
                if(curentInput=='total_amount'){
                    document.getElementById('auth_code').focus();//默认焦点
                }
                if(curentInput=='auth_code'){
                    document.getElementById('subject').focus();//默认焦点
                }
                if(curentInput=='subject'){
                    document.getElementById('check').focus();//默认焦点
                }

            },
            check  () {
                this.form.validateFields(
                    (err) => {
                        if (!err) {
                            var subject=this.subject;//商品信息
                            if(!subject){
                                subject="shop";
                            }
                            var outTradeNo=this.outTradeNo;
                            var total_amount=this.total_amount;
                            var auth_code=this.auth_code;

                           var buildParams=pay.buildParams(outTradeNo,auth_code, subject, total_amount);
                            console.log("buildParams1",buildParams);
                            var res=this.$http.get(this.ALI_GATEWAY_URL+buildParams).then(response => {
                                console.log(response);
                                if(response.status!=200){
                                    this.$message.error('网络错误');
                                }else{
                                    if(response.data.alipay_trade_pay_response.code!=10000){
                                        this.result=response.data.alipay_trade_pay_response.sub_msg;
                                    }else{
                                        this.result='支付申请已发送,等待付款完成';
                                    }
                                    setTimeout(function (){
                                        //this.$options.methods.query.bind(this)();
                                        this.query();
                                    }.bind(this), 2000);//重置this
                                }
                               //var sucess= pay.verifySign(response);
                            })
                                .catch(err => {
                                    console.log(err);
                                });
                        }
                    },
                );
            },
            query (){
                var outTradeNo=this.outTradeNo;
                if(outTradeNo==""){
                    this.$message.error('网络错误');
                };
                var buildParams=pay.buildParamsQ(outTradeNo);
                var res=this.$http.get(this.ALI_GATEWAY_URL+buildParams).then(response => {
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
                    }
                    //var sucess= pay.verifySign(response);
                })
                    .catch(err => {
                        console.log(err);
                    });
            }
        },
    };
</script>