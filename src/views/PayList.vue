<template>
    <div id="pay-list">
        <van-nav-bar fixed left-arrow @click-left="$router.go(-1)" placeholder title="支付订单" />
        <p class="amount">￥<span>{{ amount }}</span></p>
        <van-row type="flex" align="center" justify="center" class="time">
            <p>支付剩余时间</p>
            <CountDown format="mm:ss" class="count-down" :time="time" />
        </van-row>
        <div class="list">
            <p class="title">银行卡支付</p>
            <cell value="去绑定" is-link to="/credit-card">
                <template #title>
                    <img class="icon" src="../assets/zhaoshang.jpeg" alt=""><span class="custom-title">招商银行</span><Tag type="danger">推荐</Tag>
                </template>
            </cell>
            <cell value="去绑定" is-link to="/credit-card">
                <template #title>
                    <van-icon size="0.6rem" name="credit-pay" /><span class="custom-title">其他银行卡</span>
                </template>
            </cell>
        </div>
        <div class="list">
            <p class="title">快捷支付</p>
            <p class="prompt">即将开通支付宝与微信支付</p>
            <!-- <cell value="" is-link to="/alipay">
                <template #title>
                    <van-icon color="#1678ff" size="0.7rem" name="alipay" /><span class="custom-title">支付宝支付</span>
                </template>
            </cell> -->
            <!-- <cell value="" is-link @click="$toast('即将开通支付宝支付')">
                <template #title>
                    <van-icon color="#62b900" size="0.7rem" name="wechat-pay" /><span class="custom-title">微信支付</span>
                </template>
            </cell> -->
        </div>
    </div>
</template>

<script>
import { Cell, Tag, CountDown } from 'vant'

export default {
    name: 'pay-list',
    components: {
        Cell,
        Tag,
        CountDown
    },
    data () {
        return {
            time: 5 * 60 * 1000,
            amount: this.$route.params.amount
        }
    },
    computed: {
    },
    async created () {
    },
    mounted () {
    },
    methods: {
    }
}
</script>
<style lang="scss">
#pay-list {

}
</style>
<style lang="scss" scoped>
#pay-list {
    .list {
        margin: 0 30px 30px;
        padding: 30px 30px 10px;
        border-radius: 10px;
        background: #fff;
        .title {
            margin-bottom: 20px;
            font-size: 30px;
        }
        .icon {
            position: relative;
            top: -3px;
            width: 46px;
            margin-right: 10px;
            vertical-align: middle;
        }
        .custom-title {
            margin-right: 30px;
        }
    }
    .prompt {
        margin-top: 30px;
        margin-bottom: 20px;
        font-size: 28px;
        color: #888;
        text-align: center;
    }
    .van-cell__title .van-icon {
        width: 40px;
        vertical-align: middle;
        margin-right: 30px;
    }
    .amount {
        padding: 40px 0 10px;
        color: #000;
        font-size: 28px;
        text-align: center;
        span {
            font-size: 60px;
        }
    }
    .time {
        margin-bottom: 40px;
        font-size: 24px;
        text-align: center;
        color: #888;
        .count-down {
            color: #888;
        }
    }
}
</style>
