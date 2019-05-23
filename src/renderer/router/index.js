import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
//
export default new Router({
    routes: [
        {
            path: '/',
            name: 'payhome',
            redirect: '/payhome',
            component: require('@/components/Layout/PayMainLayout').default,
            children: [{
                path: 'payhome',
                component: require('@/views/payhome/payhome').default
            }]
        },
        {
            path: '/alipay1',
            name: 'alipay1',
            redirect: '/alipay1/alipay1',
            component: require('@/components/Layout/PayMainLayout').default,
            children: [{
                path: 'alipay1',
                component: require('@/views/Alipay/Alipay1').default
            }]
        },
        {
            path: '/alipay2',
            name: 'alipay2',
            redirect: '/alipay2/alipay2',
            component: require('@/components/Layout/PayMainLayout').default,
            children: [{
                path: 'alipay2',
                component: require('@/views/Alipay/Alipay2').default
            }]
        },
        {
            path: '/alipayquery',
            name: 'alipayquery',
            redirect: '/alipayquery/alipayquery',
            component: require('@/components/Layout/PayMainLayout').default,
            children: [{
                path: 'alipayquery',
                component: require('@/views/Alipay/AlipayQuery').default
            }]
        },
        {
            path: '/alipayback',
            name: 'alipayback',
            redirect: '/alipayback/alipayback',
            component: require('@/components/Layout/PayMainLayout').default,
            children: [{
                path: 'alipayback',
                component: require('@/views/Alipay/AlipayBack').default
            }]
        },
        {
            path: '/alipaylist',
            name: 'alipaylist',
            redirect: '/alipaylist/alipaylist',
            component: require('@/components/Layout/PayMainLayout').default,
            children: [{
                path: 'alipaylist',
                component: require('@/views/Alipay/AlipayList').default
            }]
        },
        {
            path: '/paysettings',
            name: 'paysettings',
            redirect: '/paysettings/paysettings',
            component: require('@/components/Layout/PayMainLayout').default,
            children: [{
                path: 'paysettings',
                component: require('@/views/PaySettings/PaySettings').default
            }]
        },
        {
            path: '/wxpay1',
            name: 'wxpay1',
            redirect: '/wxpay1/wxpay1',
            component: require('@/components/Layout/PayMainLayout').default,
            children: [{
                path: 'wxpay1',
                component: require('@/views/WxPay/WxPay1').default
            }]
        },
        {
            path: '/wxpay2',
            name: 'wxpay2',
            redirect: '/wxpay2/wxpay2',
            component: require('@/components/Layout/PayMainLayout').default,
            children: [{
                path: 'wxpay2',
                component: require('@/views/WxPay/WxPay2').default
            }]
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})
