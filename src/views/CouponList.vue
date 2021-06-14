<template>
    <div id="coupon-list">
        <van-nav-bar
            fixed
            left-arrow
            @click-left="$router.go(-1)"
            placeholder
            title="领取优惠卷"
        />
        <ul class="list">
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
                        <p class="time">2021.06.04-2021.06.07</p>
                    </div>
                    <div v-if="!item.isReceive" class="button" @click="receive(item)">领取</div>
                    <div v-else class="button">已领取</div>
                </van-row>
            </li>
        </ul>
    </div>
</template>

<script>
import AV from 'leancloud-storage'
import { getCoupons, getCouponsList } from '../services'

export default {
    name: 'coupon-list',
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
            const listData = [
                {
                    id: 1,
                    price: 20,
                    condition: 200,
                    isReceive: false
                },
                {
                    id: 2,
                    price: 50,
                    condition: 300,
                    isReceive: false
                },
                {
                    id: 3,
                    price: 120,
                    condition: 500,
                    isReceive: false
                }
            ]
            listData.forEach(i => {
                i.isReceive = this.ifReceive(i)
            })
            this.listData = listData
        },
        receive (item) {
            if (AV.User.current()) {
                getCoupons(item)
                this.setReceiveList()
            } else this.$router.push('/login')
        },
        ifReceive (item) {
            if (AV.User.current()) {
                const couponsList = getCouponsList()
                const coupons = couponsList.filter(i => item.id === i.id)
                return coupons.length !== 0
            }
        }
    }
}
</script>
<style lang="scss" scoped>
#coupon-list {
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
            background: #fff;
            border-radius: 10px;
            font-size: 28px;
            font-weight: 700;
            line-height: 200px;
            text-align: center;
            color: #333;
        }
    }
}
</style>
