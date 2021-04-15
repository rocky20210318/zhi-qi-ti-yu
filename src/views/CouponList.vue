<template>
    <div id="coupon-list">
        <van-nav-bar
            fixed
            left-arrow
            @click-left="$router.go(-1)"
            placeholder
            title="领取优惠卷"
        />
        <ul>
            <li
                v-for="item in listData"
                :key="item.price"
                class="item"
                @click="$toast('还未到领取时间')"
            >
                <van-row
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
                </van-row>
            </li>
        </ul>
    </div>
</template>

<script>

export default {
    name: 'coupon-list',
    components: {
    },
    data () {
        return {
            listData: [
                {
                    price: 40,
                    condition: 199
                },
                {
                    price: 80,
                    condition: 399
                },
                {
                    price: 130,
                    condition: 599
                },
                {
                    price: 200,
                    condition: 899
                }
            ]
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
<style lang="scss" scoped>
#coupon-list {
    .item {
        margin: 40px 40px;
        padding: 20px 0 0px;
        background: url('../assets/coupon-img.png') no-repeat;
        background-size: 100% auto;
        color: #fff;
    }
    .top {
        padding: 0 50px 20px;
        .price {
            margin-bottom: 10px;
            font-size: 48px;
            font-weight: 700;
            span {
                font-size: 28px;
                font-weight: 500;
            }
        }
        .title {
            margin-top: 18px;
            margin-bottom: 16px;
            font-size: 30px;
            line-height: 1;
            font-weight: 500;
        }
        .time,
        .condition {
            font-size: 24px;
        }
    }
    .bottom {
        padding: 20px 50px;
        border-top: 1px dotted #eee;
    }
    .button {
        // width: 200px;
        // margin: auto;
        // height: 60px;
        padding: 8px 16px;
        background: #313635;
        font-size: 28px;
        font-weight: 500;
        line-height: 1;
    }
}
</style>
