<template>
    <div>
        <a-breadcrumb style="text-align: left;padding-bottom: 20px">
            <a-breadcrumb-item href="">
                <a-icon type="alipay-circle" />
                <span>支付宝支付</span>
            </a-breadcrumb-item>
            <a-breadcrumb-item href="">
                <a-icon type="qrcode" />
                <span>二维码支付</span>
            </a-breadcrumb-item>
        </a-breadcrumb>
        <a-form :form="form">
            <a-form-item
                    :label-col="formItemLayout.labelCol"
                    :wrapper-col="formItemLayout.wrapperCol"
                    label="订单唯一标识"
            >
                <a-input v-decorator="[
          'outTradeNo',
          {rules: []}
        ]"  :disabled=true>
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
                        placeholder="请输入金额!"  @pressEnter="enters">
                    <a-icon slot="prefix" type="money-collect" />

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
                        placeholder="请输入交易说明!" @pressEnter="enters"
                >
                    <a-icon slot="prefix" type="info-circle" />
                </a-input>
            </a-form-item>
            <a-form-item
                    :label-col="formTailLayout.labelCol"
                    :wrapper-col="formTailLayout.wrapperCol"
            >
                <a-button id="precreate"
                          type="primary"
                          @click="precreate" style="width: 100%"
                >
                    确认
                </a-button>

            </a-form-item>
            <a-form-item
                    :label-col="formItemLayout.labelCol"
                    :wrapper-col="formItemLayout.wrapperCol"
                    label="二维码"
            >

                <div id="qrCode">
                    <canvas id="canvas" style="background-color: beige;"></canvas>
                    <a-button id="query"
                              block
                              @click="query"
                    >
                       查询
                    </a-button>
                </div>

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
    import QRCode from 'qrcode'
    var pay;//支付class
    export default {
        data () {
            return {
                result:"",
                status:"",
                ALI_GATEWAY_URL:"",//阿里网关
                formItemLayout,
                formTailLayout,
                form: this.$form.createForm(this),
            };
        },
        components: {
            QRCode: QRCode
        },
        mounted(){
            pay=  new this.alipayhelper();
            this.ALI_GATEWAY_URL= pay.accountSettings.ALI_GATEWAY_URL;
            document.getElementById('total_amount').focus();//默认焦点
            //this.outTradeNo= randomUUID();//// 商户网站唯一订单号
            this.form.setFieldsValue({
                outTradeNo: randomUUID()
            });
        },
        methods: {
            //input enter事件
            enters (e){
                var curentInput=e.target.id;
                if(curentInput=='total_amount'){
                    document.getElementById('subject').focus();//默认焦点
                }

                if(curentInput=='subject'){
                    document.getElementById('precreate').focus();//默认焦点
                }

            },
            precreate  () {
                this.form.validateFields(
                    (err,values) => {
                        if (!err) {
                            var subject=values.subject;//商品信息
                            if(!subject){
                                subject="shop";
                            }
                            var outTradeNo=values.outTradeNo;
                            var total_amount=values.total_amount;

                            var buildParams=pay.buildParamsP(outTradeNo, subject, total_amount);
                            var res=this.$http.get(this.ALI_GATEWAY_URL+buildParams).then(response => {
                                console.log("alipay_trade_precreate_response",response);
                                if(response.status!=200){
                                    this.$message.error('网络错误');
                                }else{
                                  var code=  response.data.alipay_trade_precreate_response.code;
                                    if(code==10000){
                                        this.result='支付成功';
                                        this.status="SUCCESS";
                                    }else if(code==10003){
                                        this.result='等待用户付款';
                                        this.status="WAIT";
                                    }else{
                                        this.result=response.data.alipay_trade_precreate_response.sub_msg;
                                        this.status="ERROR";
                                    }

                                      // this.qr_code= response.data.alipay_trade_precreate_response.qr_code;
                                     var qr_code= response.data.alipay_trade_precreate_response.qr_code
                                    if(qr_code){
                                        var canvas = document.getElementById('canvas')
                                        QRCode.toCanvas(canvas, response.data.alipay_trade_precreate_response.qr_code, function (error) {
                                            if (error) console.error(error)
                                            console.log('QRCode success!');
                                        })
                                    }
                                    //插入插入开始
                                    var date1=this.$moment().format('YYYY-MM-DD HH:mm:ss')
                                    var payT={_id:outTradeNo,auth_code:'',subject:subject,total_amount:total_amount,
                                        status:this.status,result:this.result,buyer_logon_id:'',update_time:date1}
                                    this.$db.insert(payT, function (err, newDoc) {
                                        console.log("插入",newDoc)
                                    });
                                    //数据库插入结束
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
                var outTradeNo=this.form.getFieldValue(('outTradeNo'));
                if(outTradeNo==""){
                    this.$message.error('网络错误');
                };
                var buildParams=pay.buildParamsQ(outTradeNo);
                var res=this.$http.get(this.ALI_GATEWAY_URL+buildParams).then(response => {
                    console.log("alipay_trade_query_response",response);
                    if(response.status!=200){
                        this.$message.error('网络错误');
                    }else{
                        var code=response.data.alipay_trade_query_response.code;
                        var buyer_logon_id=response.data.alipay_trade_query_response.buyer_logon_id;
                        if(code!=10000){
                            this.result=response.data.alipay_trade_query_response.sub_msg;
                        }else{
                            //this.$message.success('支付申请已发送,等待付款完成');
                            var trade_status=response.data.alipay_trade_query_response.trade_status;
                            if(trade_status=='TRADE_SUCCESS'){
                                this.result='支付成功';
                                this.status="SUCCESS";
                            }else if(trade_status=='WAIT_BUYER_PAY'){
                                this.result='等待用户付款';
                                this.status="WAIT";
                            } else{
                                this.result=trade_status;
                                this.status="ERROR";
                            }
                            if(response.data.alipay_trade_pay_response.sub_msg){
                                this.result=response.data.alipay_trade_pay_response.sub_msg;
                                this.status="ERROR";
                            }
                        }

                        //数据库更新
                        var date1=this.$moment().format('YYYY-MM-DD HH:mm:ss')
                        this.$db.update({ _id:outTradeNo }, { $set: { status:this.status,result:this.result,buyer_logon_id:buyer_logon_id,update_time:date1} }, { multi: true }, function (err, numReplaced) {
                            console.log("update___",numReplaced);
                        });
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