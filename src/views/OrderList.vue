<template>
    <div id="order-list">
        <van-nav-bar fixed left-arrow @click-left="$router.go(-1)" placeholder title="订单管理" />
        <Search v-model="keys" show-action placeholder="请输入商品标题" class="search" @search="search" />
        <tabs v-model="showType" sticky animated swipeable color="#121314" @click="onClickTab">
            <tab title="全部订单"/>
            <tab title="待付款"/>
            <tab title="待发货"/>
            <tab title="待收货"/>
            <tab title="待评价"/>
        </tabs>
        <div v-if="orderList.length">
            <div v-for="data in orderList" :key="data.orderId" class="order-item">
                <van-row type="flex" justify="space-between" align="center" class="text">
                    <span>订单号：{{ data.orderId }}</span>
                    <span>{{ data.status === 0 ? '待付款' : '待发货' }}</span>
                </van-row>
                <book-large-list
                    class="list"
                    :can-handle="false"
                >
                    <book-large-list-item
                        v-for="item in data.books"
                        :key="item.id"
                        :data="item"
                        :order-id="item.id"
                        :status='data.status'
                        class="item"
                        @click.native="handleItemClick(data)"
                    />
                </book-large-list>
                <van-row type="flex" justify="end" align="center" class="book-detail">
                    <!-- <div>
                        <Button
                            v-if="isShowCancelOrder(data.status)"
                            type="primary"
                            radius
                            class="pay"
                            @click="isShowPayMethod = true"
                        >
                            付款
                        </Button>
                    </div> -->
                    <div>
                        <Button
                            v-if="isShowCancelOrder(data.status)"
                            type="primary"
                            radius
                            class="button"
                            @click="showOrderDelete(data.orderId)"
                        >
                            取消订单
                        </Button>
                    </div>
                    <div>
                        <Button
                            v-if="isShowRefundOrder(data.status)"
                            type="primary"
                            radius
                            class="button"
                            @click="showOrderRefund(data.id, data.actualPrice)"
                        >
                            申请退款
                        </Button>
                    </div>
                </van-row>
            </div>
        </div>
        <div v-else><Empty description="暂无订单"/></div>
        <div v-show="isShowPayMethod" class="payMethod" @click="isShowPayMethod = false">
            <ul class="payList">
                <li><p class="">支付宝信支付正在接入中</p></li>
                <!-- <li v-if="isTestAccount" @click="handleBuy"><img src="../assets/zhifubao.png">支付宝</li> -->
                <li><router-link to="/credit-card"><img src="../assets/xinyongka.png">信用卡</router-link></li>
            </ul>
        </div>
    </div>
</template>

<script>
import { tabs, tab, Button, Empty, Dialog, Search } from 'vant'
import BookLargeList from '../components/book-large-list/index'
import { getOrderList, orderDelete } from '../services'

export default {
    name: 'order-list',
    components: {
        tabs,
        tab,
        Button,
        Empty,
        BookLargeList,
        BookLargeListItem: BookLargeList.Item,
        Search
    },
    data () {
        return {
            isShowPayMethod: false,
            orderList: [],
            isShowAlter: false,
            alterData: null,
            showType: Number(this.$route.query.showType) || 0,
            keys: ''
        }
    },
    computed: {
    },
    async created () {
        this.getOrderList()
    },
    mounted () {
    },
    methods: {
        async onClickTab (index) {
            // this.showType = index
            await this.getOrderList()
        },
        isShowCancelOrder (nub) {
            const nubArray = [0]
            return nubArray.indexOf(nub) !== -1
        },
        isShowRefundOrder (nub) {
            const nubArray = [1]
            return nubArray.indexOf(nub) !== -1
        },
        handleItemClick (item) {
            // console.log(item)
            if (item.status === 0) {
                this.$router.push('/order-detail/' + item.orderId)
            }
        },
        async orderRefund (orderId) {
            // await orderRefund(orderId)
            this.$toast('申请已提交')
            this.getOrderList()
        },
        async orderRemove (orderId) {
            await orderDelete(orderId)
            this.$toast('取消订单成功')
            this.getOrderList()
        },
        async getOrderList () {
            const data = await getOrderList(this.showType)
            // console.log(data)
            this.orderList = data
        },
        showOrderDelete (orderId) {
            Dialog.confirm({
                title: '取消订单',
                message: '是否确认取消订单'
            }).then(() => {
                this.orderRemove(orderId)
            }).catch(() => {})
        },
        showOrderRefund (orderId, actualPrice) {
            Dialog.confirm({
                title: '申请退款',
                message: '是否确认申请退款'
            }).then(() => {
                this.orderRefund(orderId)
            }).catch(() => {})
        },
        search () {}
    }
}
</script>
<style lang="scss" scoped>
#order-list {
    .pay {
        position: absolute;
        left: 35px;
        bottom: 15px;
        width: 150px;
        height: 45px;
        border-radius: 10px;
        background: linear-gradient(to right,#ffd01e,#ff8917);
        border: 0 solid #999;
        line-height: 45px;
        color: #fff;
    }
    .button {
        width: 180px;
        height: 50px;
        background-color: #f1f1f1;
        box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
        border-radius: 12px;
        border: 0;
        color: #6e6e6e;
        line-height: 50px;
        // position: absolute;
        // right: 0px;
        // bottom: 10px;
        // width: 200px;
        // height: 45px;
        // border-radius: 10px;
        // background: #fff;
        // border: 0 solid #999;
        // line-height: 45px;
        // color: #999;
    }
    .order-item {
        position: relative;
        margin: 20px 20px 10px;
        background: #fff;
        border-radius: 15px;
        .text {
            padding: 20px 40px 0;
            font-size: 28px;
            color: #888;
        }
        .list {
            padding: 0;
        }
        .item {
            // border: 1px solid #eee;
            // background: #f7f7f7;
        }
    }
    .payMethod {
        position: fixed;
        z-index: 99999;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        .payList {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            background: #fff;
            font-size: 34px;
            text-align: center;
            li {
                height: 150px;
                border-bottom:  1px solid #eee;
                line-height: 150px;
            }
            img {
                max-width: 80px;
                max-height: 80px;
                vertical-align: middle;
                margin-right: 20px;
                margin-top: -10px;
            }
            a {
                display: block;
            }
        }
    }
    .book-detail {
        padding: 20px;
        padding-top: 0;
    }
}
</style>
