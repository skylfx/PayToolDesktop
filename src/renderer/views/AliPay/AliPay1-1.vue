<template>
    <a-form :form="form">
        <a-form-item
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
                label="Name"
        >
            <a-input
                    v-decorator="[
          '金额',
          {rules: [{ required: true, message: '请输入金额!' }]}
        ]"
                    placeholder="请输入金额!">
            <a-icon slot="prefix" type="user" />

            </a-input>
        </a-form-item>
        <a-form-item
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
                label="Nickname"
        >
            <a-input
                    v-decorator="[
          '收款码',
          {rules: [{ required: checkNick, message: '请输入收款码!' }]}
        ]"
                    placeholder="请输入收款码!"
            >
                <a-icon slot="prefix" type="user" />
            </a-input>
        </a-form-item>
        <a-form-item
                :label-col="formTailLayout.labelCol"
                :wrapper-col="formTailLayout.wrapperCol"
        >
            <a-checkbox
                    :checked="checkNick"
                    @change="handleChange"
            >
                确认立即执行
            </a-checkbox>
        </a-form-item>
        <a-form-item
                :label-col="formTailLayout.labelCol"
                :wrapper-col="formTailLayout.wrapperCol"
        >
            <a-button
                    type="primary"
                    @click="check"
            >
                确认
            </a-button>
        </a-form-item>
    </a-form>
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
                checkNick: false,
                formItemLayout,
                formTailLayout,
                form: this.$form.createForm(this),
            };
        },
        mounted(){

        },
        methods: {
            check  () {
                this.form.validateFields(
                    (err) => {
                        if (!err) {
                            /*var subject="pc1100";
                            var outTradeNo="111000";// 商户网站唯一订单号
                            var total_amount="0.1";
                            var pay=this.alipayhelper.constructor();
                            var buildParams=pay.buildParams(subject,outTradeNo,total_amount);
                            var buildSign=pay._buildSign(buildParams);
                            var signWithPrivateKey= pay._signWithPrivateKey(buildSign);*/


                            //pay.buildParams()
                            console.info('success');
                        }
                    },
                );
            },
            handleChange  (e) {
                this.checkNick = e.target.checked;
                this.$nextTick(() => {
                    this.form.validateFields(['nickname'], { force: true });
                });
            },
        },
    };
</script>