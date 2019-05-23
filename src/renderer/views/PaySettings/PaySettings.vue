<template>
    <div>
        <a-breadcrumb style="text-align: left;padding-bottom: 20px">
            <a-breadcrumb-item>
                <a-icon type="setting" />
                <span>系统配置</span>
            </a-breadcrumb-item>
        </a-breadcrumb>
    <a-form :form="form">

        <a-form-item
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
                label=""
        >
            <a-checkbox  @change="onChangeStart"
            >
                开机启动
            </a-checkbox>
        </a-form-item>
        <a-form-item
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
                label=""
        >
            <a-checkbox @change="onChangeUpdate"
            >
               自动更新
            </a-checkbox>
        </a-form-item>
        <a-form-item
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
        >
            <a-button id="logout"
                      type="primary"
                      @click="logout" style="width: 100%"
            >
                注销
            </a-button>
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
    import {ipcRenderer} from 'electron'

    export default {
        data () {
            return {
                autoStart: false,
                update: false,
                formItemLayout,
                formTailLayout,
                form: this.$form.createForm(this),
            };
        },
        mounted(){
            this.getAutoStartValue()
        },
        methods: {
            onChangeStart (e) {
                console.log(`checked = ${e.target.checked}`)
                this.autoStart=e.target.checked;
                console.log(this.autoStart)

            },
            onChangeUpdate (e) {
                console.log(`checked = ${e.target.checked}`)
                this.update=e.target.checked;
                console.log(this.update)
            },
            //设置单选
            changeAutoStart() {
                console.log("this.autoStart",this.autoStart)
                if (this.autoStart) {
                    this.enableAutoStart()
                } else {
                    this.disableAutoStart()
                }
            },
            getAutoStartValue() {
                // 检查是否自动启动
                ipcRenderer.send('getAutoStartValue')
                ipcRenderer.on('getAutoStartValue', (event, result) => {
                    this.autoStart = result;

                    // 首次不watch对象 监听
                    this.$watch('autoStart', this.changeAutoStart)
                })
            },
            enableAutoStart() {
                // 设置自动启动
                ipcRenderer.send('enableAutoStart')
            },
            disableAutoStart() {
                // 取消自动启动
                ipcRenderer.send('disableAutoStart')
            },
            logout() {
                this.$store.dispatch('FedLogOut')//存储
                ipcRenderer.send('loggedOut')
            }
        },
    };
</script>