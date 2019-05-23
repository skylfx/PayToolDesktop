<template>
    <div>   <a-breadcrumb style="text-align: left;padding-bottom: 20px">
        <a-breadcrumb-item href="">
            <a-icon type="alipay-circle" />
            <span>支付宝支付</span>
        </a-breadcrumb-item>
        <a-breadcrumb-item href="">
            <a-icon type="back" />
            <span>支付订单查询</span>
        </a-breadcrumb-item>
    </a-breadcrumb>
        <a-form layout="inline" style="padding-bottom: 20px">
        <a-row :gutter="48">
            <a-col :md="8" :sm="24">
                <a-form-item label="订单唯一标识">
                    <a-input placeholder="请输入" v-model="queryp._id"/>
                </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
                <a-form-item label="支付账号">
                    <a-input placeholder="请输入" v-model="queryp.buyer_logon_id"/>
                </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
            <span class="table-page-search-submitButtons">
              <a-button type="primary" @click="fetch">查询</a-button>
              <a-button style="margin-left: 8px">重置</a-button>

             <a-button >删除全部</a-button>
            </span>
            </a-col>
        </a-row>
    </a-form>

    <a-table :columns="columns" :dataSource="paydata"  :pagination="pagination" :rowKey="record => record._id"
             :loading="loading"
             @change="handleTableChange" :bordered="true" :scroll="{ x: '100%', y: 400 }">
        <a slot="_id" slot-scope="text" style="">{{text}}</a>

        <span slot="idTitle"><a-icon type="idcard" /> 订单唯一标识</span>
        <span slot="moneyTitle"><a-icon type="money-collect" /> 订单金额</span>
        <span slot="barcodeTitle"><a-icon type="barcode" /> 收款码</span>

        <template slot="expandedRowRender" slot-scope="record" style="margin: 0" >
            <p>交易说明：{{record.subject}}</P>
            <p>交易结果：{{record.result}}</P>
        </template>
        <template slot="action" slot-scope="text, record">
       </template>
    </a-table>

    </div>
</template>
<script>
    const columns = [{
        dataIndex: '_id',
        key: '_id',
        slots: { title: 'idTitle' },
        scopedSlots: { customRender: '_id' },
        width: '25%'
    },{
        dataIndex: 'total_amount',
        key: 'total_amount',
        slots: { title: 'moneyTitle' },
        align: 'right',
        width: '10%',
    }, {
        key: 'auth_code',
        dataIndex: 'auth_code',
        slots: { title: 'barcodeTitle' },
        width: '18%'
    },   {
        title: '支付账号',
        key: 'buyer_logon_id',
        dataIndex: 'buyer_logon_id',
        width: '18%'
    },  {
            title: '支付状态',
            key: 'status',
            dataIndex: 'status',
            width: '10%'
        },{
        title: '更新时间',
        key: 'update_time',
        dataIndex: 'update_time'
    }];

    export default {
        data() {
            return {
                paydata:[],
                columns,
                pagination: {
                    current: 1,
                    pageSize: 8,
                    total: 1
                },
                queryp:{},
                loading: false,
            }
        },
        mounted(){
            // 测试 -删除所有记录
            //this.$db.remove({}, { multi: true }, function (err, numRemoved) {
            //});

            this.fetch();
        },
        methods: {
            deleteAll(){
                this.$db.remove({}, { multi: true }, function (err, numRemoved) {
                        });
            },
            handleTableChange (pagination, filters, sorter) {
               //没启用自带查询条件 he排序
                const pager = {...this.pagination};
                pager.current = pagination.current;
                this.pagination = pager;
                this.fetch({
                    results: pagination.pageSize,
                    page: pagination.current,
                    sortField: sorter.field,
                    sortOrder: sorter.order,
                    ...filters,
                });
            },
            //分页查询
            fetch (params = {}) {
                //console.log('params:', params);//分页或者排序条件
                this.loading = true;
                var that=this;
                this.$db.count(that.queryp, function (err, count) {

                    var psize=that.pagination.pageSize;
                    that.pagination.page = Math.ceil(count / psize);
                    that.pagination.total = count;

                    console.log(that.queryp)
                    console.log(that.queryp._id=="")
                    if(that.queryp._id=="")
                        delete that.queryp._id;
                    if(that.queryp.buyer_logon_id=="")
                        delete that.queryp.buyer_logon_id;
                    console.log(that.queryp)

                    that.$db.find(that.queryp).sort({update_time:-1}).skip(psize*(that.pagination.current-1)).limit(psize).exec(function (err, newDoc) {
                        //console.log('newDoc:', newDoc);
                        that.loading = false;
                        that.paydata=newDoc;
                    });
                });

            }

        }
    }
</script>
<style>
 /*   .ant-table td { white-space: nowrap; }*/
/* .ant-table-thead > tr > th, .ant-table-tbody > tr > td{
     padding: 16px 8px !important;
 }
 .ant-table-thead > tr > th{
     white-space: nowrap;
 }*/
</style>
