import Vue from 'vue'
import VueRouter from 'vue-router'
// import AV from 'leancloud-storage'
// import { Toast } from 'vant'

const authFilter = (to, from, next) => {
    const UserData = JSON.parse(localStorage.getItem('UserData')) || null
    if (UserData) {
        next()
    } else {
        next({
            path: '/login'
        })
    }
}

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/search',
        name: 'Search',
        component: () => import('../views/Search.vue')
    },
    {
        path: '/member',
        name: 'Member',
        component: () => import('../views/Member.vue')
    },
    {
        path: '/goods-details/:id',
        name: 'GoodsDetails',
        component: () => import('../views/GoodsDetails.vue')
    },
    {
        path: '/activity-list',
        name: 'ActivityList',
        component: () => import('../views/ActivityList.vue')
    },
    {
        path: '/spike-lits',
        name: 'SpikeLits',
        component: () => import('../views/SpikeLits.vue')
    },
    {
        path: '/my',
        name: 'My',
        component: () => import('../views/My.vue'),
        beforeEnter: authFilter
    },
    {
        path: '/set',
        name: 'Set',
        component: () => import('../views/Set.vue'),
        beforeEnter: authFilter
    },
    {
        path: '/cart',
        name: 'Cart',
        component: () => import('../views/Cart.vue'),
        beforeEnter: authFilter
    },
    {
        path: '/order-detail',
        name: 'OrderDetail',
        component: () => import('../views/OrderDetail.vue'),
        beforeEnter: authFilter
    },
    {
        path: '/order-list',
        name: 'OrderList',
        component: () => import('../views/OrderList.vue'),
        beforeEnter: authFilter
    },
    {
        path: '/collect',
        name: 'Collect',
        component: () => import('../views/Collect.vue'),
        beforeEnter: authFilter
    },
    {
        path: '/address-list',
        name: 'AddressList',
        component: () => import('../views/AddressList.vue'),
        beforeEnter: authFilter
    },
    {
        path: '/address',
        name: 'Address',
        component: () => import('../views/Address.vue'),
        beforeEnter: authFilter
    },
    {
        path: '/message-list',
        name: 'MessageList',
        component: () => import('../views/MessageList.vue'),
        beforeEnter: authFilter
    },
    {
        path: '/edit-user',
        name: 'EditUser',
        component: () => import('../views/EditUser.vue'),
        beforeEnter: authFilter
    },
    {
        path: '/feedback',
        name: 'Feedback',
        component: () => import('../views/Feedback.vue'),
        beforeEnter: authFilter
    },
    {
        path: '/pay-list',
        name: 'PayList',
        component: () => import('../views/PayList.vue'),
        beforeEnter: authFilter
    },
    {
        path: '/credit-card',
        name: 'CreditCard',
        component: () => import('../views/CreditCard.vue'),
        beforeEnter: authFilter
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/sign-up',
        name: 'SignUp',
        component: () => import('../views/SignUp.vue')
    },
    {
        path: '/privacy',
        name: 'privacy',
        component: () => import('../views/privacy-agreement/privacy.vue')
    },
    {
        path: '/agreement',
        name: 'agreement',
        component: () => import('../views/privacy-agreement/agreement.vue')
    },
    {
        path: '/luck-draw-1',
        name: 'LuckDraw-1',
        component: () => import('../views/Activity/LuckDraw-1.vue')
    },
    {
        path: '/sign-in-1',
        name: 'SignIn-1',
        component: () => import('../views/Activity/SignIn-1.vue')
    }
]

const router = new VueRouter({
    // mode: 'hash',
    // base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    next()
})

router.afterEach((to, from) => {
    // 跳转页面回到顶部
    window.scrollTo(0, 0)
    document.body.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
})
Vue.use(VueRouter)

export default router
