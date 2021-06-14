<template>
    <div id="pay-list">
        <van-nav-bar fixed left-arrow @click-left="$router.go(-1)" placeholder title="支付方式" />
        <div class="list">
            <!-- <cell value="即将开通" is-link @click="$toast('即将开通支付宝支付')">
                <template #title>
                    <van-icon size="0.5rem" name="alipay" /><span class="custom-title">支付宝</span>
                </template>
            </cell>
            <cell value="即将开通" is-link @click="$toast('即将开通支微信支付')">
                <template #title>
                    <van-icon size="0.5rem" name="wechat" /><span class="custom-title">微信支付</span>
                </template>
            </cell>
            <cell value="即将开通" is-link @click="$toast('即将开通银行卡支付')">
                <template #title>
                    <van-icon size="0.5rem" name="debit-pay" /><span class="custom-title">银行卡</span>
                </template>
            </cell> -->
            <cell value="去绑定" is-link to="/credit-card">
                <template #title>
                    <van-icon size="0.6rem" name="credit-pay" /><span class="custom-title">银行卡</span>
                </template>
            </cell>
            <!-- <cell value="去绑定" is-link to="/credit-card">
                <template #title>
                    <van-icon size="0.6rem" name="alipay" color="#1E90FF" /><span class="custom-title">支付宝</span>
                </template>
            </cell> -->
            <!-- <p class="prompt">即将开通支付宝、微信支付</p> -->
        </div>
    </div>
</template>

<script>
import { Cell } from 'vant'

export default {
    name: 'pay-list',
    components: {
        Cell
    },
    data () {
        return {
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
        padding: 20px;
    }
    .prompt {
        margin-top: 30px;
        font-size: 28px;
        color: #888;
        text-align: center;
    }
    .van-cell__title .van-icon {
        width: 40px;
        vertical-align: middle;
        margin-right: 30px;
    }
}
</style>
