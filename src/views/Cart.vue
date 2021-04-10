<template>
    <div>
        <div>
            <van-row type="flex" justify="space-between" align="center" class="top-background">
                <div color="light" class="title">购物车</div>
                <div class="count">共{{ totalCount }}件宝贝</div>
            </van-row>
            <book-large-list
                v-if="cartList.length"
                class="list"
                @change="onCartChange"
                @delete="onCartRemove"
            >
                <book-large-list-item v-for="item in cartList" :key="item.id" :data="item" />
            </book-large-list>
            <div v-else>
                <div class="cart-no-data">
                    <img src="https://img.yzcdn.cn/vant/custom-empty-image.png" width="100%"
                        class="cart-no-data-img"
                    >
                </div>
            </div>
        </div>
        <footer v-if="cartList.length">
            <van-row type="flex" justify="space-between" align="center" class="footer-wrap">
                <span class="totals">¥{{ total }}</span>
                <a
                    class="buy-btn"
                    @click="handleBuy"
                >立即购买</a>
            </van-row>
        </footer>
        <basic-footer />
    </div>
</template>

<script>
// import BasicTitle from '../components/basic-title'
// import BasicButton from '../components/basic-button'
import BookLargeList from '../components/book-large-list/index'
// import recommendedList from '../components/recommended-list'
import { getCart } from '../services'

export default {
    name: 'cart',
    components: { BookLargeList, BookLargeListItem: BookLargeList.Item },
    data () {
        return {
            chooseData: [],
            // total: 0,
            deleteTotal: 0,
            cartList: []
        }
    },
    computed: {
        // cartList () {
        //     console.log(getCart())
        //     return getCart()
        // },
        totalCount () {
            return this.cartList.length - this.deleteTotal
        },
        total () {
            let total = 0
            for (const i in this.cartList) {
                // console.log(i)
                const data = this.cartList[i]
                total += data.buyCount * data.price
            }
            return total
        }
    },
    async created () {
        this.cartList = await getCart()
    },
    mounted () {
    },
    methods: {
        onCartChange (data, total) {
            this.chooseData = data
            this.total = total
        },
        async onCartRemove (cartId) {
            // this.cartList = await getCart()
        },
        handleBuy () {
            const checkedData = this.cartList.filter((item) => item.checked)
            if (checkedData.length === 0) {
                this.$toast('请勾选商品')
                return false
            }
            this.$router.push('/order-detail')
        }
    }
}
</script>

<style scoped lang="scss">
$footer-height: 58px * 2;
.recommended {
    padding-top: 30px;
    font-size: 32px;
    text-align: center;
    color: #4d83f7;
}
.content-wrap {
    padding-bottom: $footer-height;
}
.top-background {
    margin-top: -80px;
    padding: 90px 34px 38px;
    height: 328px;
    //   background-image: url(../assets/cart-bg.png);
    background: linear-gradient(180deg, #fcd755 0%, #faa641 100%) ;
    box-sizing: border-box;
    color: #ffffff;
    .title {
            font-size: 48px;
    }
    .count {
        font-size: 14px * 2;
    }
}
.list {
    margin-top: -120px;
}
.footer-wrap {
    z-index: 99;
    position: fixed;
    bottom: 100px;
    left: 0;
    width: 100%;
    background: #fff;
    height: $footer-height;
    padding: 0 40px;
    box-sizing: border-box;
    .totals {
        font-size: 24px * 2;
        font-weight: 500;
        color: #d0021b;
    }
    .buy-btn {
        width: 124px * 2;
        height: 41px * 2;
        line-height: 41px * 2;
        background: linear-gradient(180deg, #fcd755 0%, #faa641 100%);
        color: #fff;
        font-size: 18px * 2;
        text-align: center;
        border-radius: 41px;
    }
}
.cart-no-data {
    position: relative;
}
.cart-no-data-img {
    display: block;
    margin: 20px auto 44px;
    width: 350px;
    height: 310px;
}
.no-data-text-1 {
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
    font-size: 28px;
    color: #666;
    text-align: center;
    letter-spacing: 0.3px;
}
.maybe-like {
    width: 80%;
    margin: auto;
    img {
        width: 100%;
    }
}
</style>
