<template>
    <a-form
            :form="form"
            @submit="handleSubmit"
    >
        <a-form-item
                label="Note"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 12 }"
        >
            <a-input
                    v-decorator="[
          'note',
          {rules: [{ required: true, message: 'Please input your note!' }]}
        ]"
            />
        </a-form-item>
        <a-form-item
                :wrapper-col="{ span: 12, offset: 5 }"
        >
            <a-button
                    type="primary"
                    html-type="submit"
            >
                Submit
            </a-button>
        </a-form-item>
    </a-form>
</template>

<script>
    export default {
        data () {
            return {
                formLayout: 'horizontal',
                form: this.$form.createForm(this),
            };
        },
        methods: {
            handleSubmit (e) {
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    if (!err) {
                        console.log('Received values of form: ', values);
                    }
                });
            },
            handleSelectChange (value) {
                console.log(value);
                this.form.setFieldsValue({
                    note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
                });
            },
        },
    };
</script>