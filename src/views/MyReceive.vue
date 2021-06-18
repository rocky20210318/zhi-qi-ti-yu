<template>
    <div id="my-receive">
        <van-nav-bar
            fixed
            left-arrow
            @click-left="$router.go(-1)"
            placeholder
            title="我的优惠卷"
        />
        <ul class="list" v-if="listData.length !== 0">
            <li
                v-for="item in listData"
                :key="item.price"
            >
                <!-- <van-row
                    type="flex"
                    justify="space-between"
                    align="center"
                    class="top"
                >
                    <div class="left">
                        <p class="price">{{ item.price }}<span>元</span></p>
                        <p class="condition">满{{ item.condition }}使用</p>
                    </div>
                    <div class="right">
                        <p class="title">{{ item.price }}元优惠券</p>
                        <p class="time">使用时间：2021.05.01-2021.05.04</p>
                    </div>
                </van-row>
                <van-row
                    type="flex"
                    justify="space-between"
                    align="center"
                    class="bottom"
                >
                    <p class="receive-time">领取时间：2021.04.25-2021.04.30</p>
                    <div class="button">暂不可领取</div>
                </van-row> -->
                <van-row type="flex" justify="space-between" align="center" class="item" >
                    <p class="price"><span>{{ item.price }}</span>元</p>
                    <div class="data">
                        <p class="title">{{ item.price }}元优惠券</p>
                        <p class="time">2021.06.01-2021.06.04</p>
                    </div>
                    <div class="button">不可<br>使用</div>
                </van-row>
            </li>
        </ul>
        <div v-else class="empty">
            <img src="../assets/custom-empty-image.png" alt="">
            <router-link to="/coupon-list" class="button">去领取</router-link>
        </div>
    </div>
</template>

<script>
import { getCouponsList } from '../services'
export default {
    name: 'my-receive',
    components: {
    },
    data () {
        return {
            listData: []
        }
    },
    computed: {
    },
    async created () {
        this.setReceiveList()
    },
    mounted () {
    },
    methods: {
        setReceiveList () {
            this.listData = getCouponsList()
        }
    }
}
</script>
<style lang="scss" scoped>
#my-receive {
    .list {
        padding: 0 30px;
        & >li:nth-child(n) {
            background: url('../assets/coupon-img-1.png') no-repeat;
            background-size: auto 100%;
        }
        & >li:nth-child(2n) {
            background: url('../assets/coupon-img-2.png') no-repeat;
            background-size: auto 100%;
        }
        & >li:nth-child(3n) {
            background: url('../assets/coupon-img-3.png') no-repeat;
            background-size: auto 100%;
        }
        & >li:nth-child(4n) {
            background: url('../assets/coupon-img-4.png') no-repeat;
            background-size: auto 100%;
        }
        .item {
            height: 200px;
            margin-top: 30px;
            border-radius: 10px;
            overflow: hidden;
            color: #fff;
            line-height: 1;
        }
        .price {
            width: 220px;
            margin-right: 20px;
            // height: 200px;
            font-size: 24px;
            text-align: center;
            // line-height: 200px;
            span {
                font-size: 90px;
                font-weight: 700;
            }
        }
        .data {
            flex: 1;
            .title {
                padding-top: 20px;
                font-size: 30px;
            }
            .time {
                margin-top: 16px;
                font-size: 24px;
                color: rgba(255, 255, 255, 0.7);
            }
        }
        .button {
            width: 108px;
            height: 200px;
            padding-top: 60px;
            box-sizing: border-box;
            background: #fff;
            border-radius: 10px;
            font-size: 28px;
            font-weight: 700;
            line-height: 1.5;
            text-align: center;
            color: #333;
        }
    }
    .empty {
        img {
            display: block;
            width: 60%;
            margin: 200px auto 0;
        }
        .button {
            display: block;
            width: 660px;
            height: 88px;
            margin: 200px auto;
            background-image: linear-gradient(45deg, #313635 0%, #313635 30%);
            box-shadow: 0px 4px 30px 0px rgba(255, 61, 72, 0.39);
            border-radius: 60px;
            font-size: 32px;
            color: #fff;
            text-align: center;
            line-height: 88px;
        }
    }
}
</style>
