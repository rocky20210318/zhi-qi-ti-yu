<template>
    <router-link :to="`/goods-details/${details.id}`" class="product-list-item-1">
        <div class=""><van-image width="100%" fit="cover" lazy-load :src="details.thumbnail" class="img" /></div>
        <p class="van-ellipsis title">{{ details.title }}</p>
        <van-row type="flex" align="center" justify="space-between" class="data">
            <p class="Price"><span>￥</span>{{ Math.floor(details.price ) }}</p>
            <p class="original-price">￥{{ Math.floor(details.price / 0.9) }}</p>
            <router-link :to="`/goods-details/${details.id}?cart=true`">
                <!-- <tag type="primary" plain>限时包邮</tag> -->
                <img src="../../assets/cart-icon.png" class="cart-icon" @click.stop="onAddCart(item)">
            </router-link>
        </van-row>
    </router-link>
</template>

<script>
// import { Tag } from 'vant'
import { addCart } from '../../services'
import AV from 'leancloud-storage'

export default {
    name: 'goods-list-item-1',
    props: {
        details: {
            type: Object,
            default () {
                return {}
            }
        }
    },
    components: {
        // Tag
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
        onAddCart (item) {
            if (AV.User.current) {
                addCart(item)
                this.$toast('加入购物车成功')
            } else this.$router.push('/login')
        }
    }
}
</script>
<style lang="scss" scoped>
.product-list-item-1 {
    width: 340px;
    // padding: 20px 20px;
    padding-bottom: 20px;
    box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.1);
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
    .data {
        padding: 0 20px;
    }
    .img {
        width: 100%;
        height: 440px;
        // border-radius: 10px;
        overflow: hidden;
    }
    .title {
        padding: 15px 20px;
        font-size: 32px;
        color: #121314;
    }
    .Price {
        font-size: 34px;
        line-height: 1;
        color: #ff202c;
        span {
            font-size: 24px
        }
    }
    .original-price {
        position: relative;
        top: 2px;
        flex: 1;
        margin-left: 14px;
        font-size: 24px;
        line-height: 1;
        color: #888;
        text-decoration: line-through;
    }
    .cart-icon {
        width: 46px;
    }
}
</style>
