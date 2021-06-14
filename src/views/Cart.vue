<template>
    <div>
        <div>
            <van-row
                type="flex"
                justify="space-between"
                align="center"
                class="top-background"
            >
                <div color="light" class="title">购物车</div>
                <!-- <div class="count">共{{ totalCount }}件宝贝</div> -->
            </van-row>
            <book-large-list
                v-if="cartList.length"
                class="list"
                @change="onCartChange"
                @delete="onCartRemove"
            >
                <book-large-list-item
                    v-for="item in cartList"
                    :key="item.id"
                    :data="item"
                />
            </book-large-list>
            <div v-else>
                <div class="cart-no-data">
                    <img src="../assets/custom-empty-image.webp" class="cart-no-data-img" />
                    <p class="no-data-text-1">购物车空空如也</p>
                </div>
            </div>
        </div>
        <footer v-if="cartList.length">
            <van-row
                type="flex"
                justify="space-between"
                align="center"
                class="footer-wrap"
            >
                <span class="totals">¥{{ total }}</span>
                <a class="buy-btn" @click="handleBuy">立即购买({{ chooseData.length }})</a>
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
import { getCart, removeCartItem, addOrder } from '../services'

export default {
    name: 'cart',
    components: { BookLargeList, BookLargeListItem: BookLargeList.Item },
    data () {
        return {
            chooseData: [],
            total: 0,
            deleteTotal: 0
            // cartList: []
        }
    },
    computed: {
        cartList () {
            console.log(getCart())
            return getCart()
        },
        totalCount () {
            return this.cartList.length - this.deleteTotal
        }
        // total () {
        //     let total = 0
        //     for (const i in this.cartList) {
        //         // console.log(i)
        //         const data = this.cartList[i]
        //         total += data.buyCount * data.price
        //     }
        //     return total
        // }
    },
    async created () {
        // this.cartList = await getCart()
    },
    mounted () {
    },
    methods: {
        // onCartChange (data, total) {
        //     this.chooseData = data
        //     this.total = total
        // },
        // async onCartRemove (cartId) {
        //     // this.cartList = await getCart()
        // },
        // handleBuy () {
        //     const checkedData = this.cartList.filter((item) => item.checked)
        //     if (checkedData.length === 0) {
        //         this.$toast('请勾选商品')
        //         return false
        //     }
        //     this.$router.push('/order-detail')
        // }
        onCartChange (data, total) {
            this.chooseData = data
            this.total = total
        },
        onCartRemove (cartId) {
            this.deleteTotal++
            removeCartItem(cartId)
        },
        handleBuy () {
            if (!this.chooseData || this.chooseData.length === 0) {
                this.$toast('请勾选商品')
                return false
            }
            console.log(this.chooseData)
            const data = this.chooseData.map((item) => {
                removeCartItem(item.cartId)
                return {
                    bookId: item.bookId,
                    buyCount: item.count,
                    commodity: item.commodity
                }
            })
            console.log(data)
            const orderId = addOrder(data)
            this.$router.push(`/order-detail/${orderId}`)
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
    padding: 23px 34px 38px;
    height: 340px;
    background: url('../assets/cart-bg.png')no-repeat;
    background-size: 100%;
    // background: linear-gradient(180deg, #fcd755 0%, #d81e06 100%);
    box-sizing: border-box;
    color: #ffffff;
    .title {
        font-size: 36px;
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
        color: #ff202c;
    }
    .buy-btn {
        width: 124px * 2;
        height: 41px * 2;
        line-height: 41px * 2;
        background: linear-gradient(45deg, #90B8FF 0%, #1864FF 100%);
        color: #fff;
        font-size: 18px * 2;
        text-align: center;
        border-radius: 10px;
    }
}
.cart-no-data {
    position: relative;
    top: -120px;
    margin: 0 30px;
    padding-top: 180px;
    height: 750px;
    background-color: #ffffff;
    box-shadow: 0px 8px 40px 0px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    .cart-no-data-img {
        display: block;
        // margin: 20px auto 44px;
        width: 60%;
        margin: 0 auto 20px;
        // width: 350px;
        // height: 310px;
    }
    .no-data-text-1 {
        font-size: 28px;
        color: #111;
        text-align: center;
    }
}
.maybe-like {
    width: 80%;
    margin: auto;
    img {
        width: 100%;
    }
}
</style>
