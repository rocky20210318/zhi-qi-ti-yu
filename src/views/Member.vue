<template>
    <div id="member">
        <van-nav-bar class="nav" :border="false" title="开通会员" fixed  placeholder />
        <div class="top-bg">
            <h1 class="">会员抢购专场</h1>
            <h3>更多优惠等你拿</h3>
        </div>
        <p class="title"><span>超级会员权益</span></p>
        <grid class="grid" :border="false">
            <grid-item class="grid-item">
                    <van-image lazy-load :src="require('../assets/member-member.png')" class="img" />
                    <p class="text">会员专享</p>
            </grid-item>
            <grid-item class="grid-item">
                    <van-image lazy-load :src="require('../assets/member-zhengdian.png')" class="img" />
                    <p class="text">镇店之宝</p>
            </grid-item>
            <grid-item class="grid-item">
                    <van-image lazy-load :src="require('../assets/member-shangping.png')" class="img" />
                    <p class="text">专享商品</p>
            </grid-item>
            <grid-item class="grid-item">
                    <van-image lazy-load :src="require('../assets/member-huodong.png')" class="img" />
                    <p class="text">专享活动</p>
            </grid-item>
            <grid-item class="grid-item">
                    <van-image lazy-load :src="require('../assets/member-tuikuan.png')" class="img" />
                    <p class="text">极速退款</p>
            </grid-item>
            <grid-item class="grid-item">
                    <van-image lazy-load :src="require('../assets/member-libao.png')" class="img" />
                    <p class="text">每月礼包</p>
            </grid-item>
            <grid-item class="grid-item">
                    <van-image lazy-load :src="require('../assets/member-zhekou.png')" class="img" />
                    <p class="text">多件多折</p>
            </grid-item>
            <grid-item class="grid-item">
                    <van-image lazy-load :src="require('../assets/member-kefu.png')" class="img" />
                    <p class="text">专属客服</p>
            </grid-item>
        </grid>
        <div class="button"><Button size="large" color="linear-gradient(45deg, #313635 0%, #888 100%)" @click="$router.push('/pay-list')" class="">88元即刻开通</Button></div>
        <div v-show="isShowPayMethod" class="payMethod" @click="isShowPayMethod = false">
            <ul class="payList">
                <!-- <li><p class="">支付宝信支付正在接入中</p></li> -->
                <!-- <li @click="handleBuy"><img src="../assets/zhifubao.png">支付宝</li> -->
                <li><router-link to="/credit-card"><img src="../assets/xinyongka.png">信用卡</router-link></li>
            </ul>
        </div>
        <basic-footer />
    </div>
</template>

<script>
import { Grid, GridItem, Button } from 'vant'

export default {
    name: 'member',
    components: {
        Grid,
        GridItem,
        Button
    },
    data () {
        return {
            isShowPayMethod: false
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
#member {
    .van-nav-bar {
        background: transparent;
    }
    .van-grid-item__content {
        padding-bottom: 0;
    }
}
</style>
<style lang="scss" scoped>
#member {
    min-height: 100%;
    background: #fff;
    background-size: 100%;
    .top-bg {
        width: 714px;
        height: 240px;
        margin: 0 0 0 auto;
        padding-left: 60px;
        box-sizing: border-box;
        background: url('../assets/member-bg.png')no-repeat;
        background-size: 100%;
        color: #fff;
        line-height: 1;
        h1 {
            padding: 60px 0 20px;
            font-size: 36px;
        }
        h3 {
            font-size: 28px;
        }
    }
    .title {
        margin-top: 130px;
        font-size: 34px;
        color: #121212;
        text-align: center;
        line-height: 1;
        span {
            position: relative;
            &::after,
            &::before {
                content: ' ';
                position: absolute;
                top: 0;
                left: -150px;
                bottom: 0 ;
                width: 130px;
                height: 1px;
                margin: auto;
                background-color: #e8e8ee;
            }
            &::before {
                left: auto;
                right: -150px;
            }
        }
    }
    .grid {
        padding: 40px 40px;
        .img {
            width: 106px;
            margin-bottom: 20px;
        }
        .text {
            font-size:  26px;
            letter-spacing: 3px;
            color: #505050;
        }
    }
    .button {
        padding: 146px 35px;
        // box-sizing: border-box;
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
}
</style>
