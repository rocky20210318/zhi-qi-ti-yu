<template>
    <router-link :to="`/goods-details/${details.id}`" class="product-list-item-1">
        <div class=""><van-image width="100%" fit="cover" lazy-load :src="details.thumbnail" class="img" /></div>
        <p class="van-ellipsis title">{{ details.title }}</p>
        <van-row type="flex" align="center" class="data">
            <p class="Price"><span>￥</span>{{ Math.floor(details.price ) }}</p>
            <p class="original-price">￥{{ Math.floor(details.price / 0.9) }}</p>
            <div>
                <!-- <tag type="primary" plain>限时包邮</tag> -->
                <tag type="primary" color="#313635" plain>特惠9折</tag>
            </div>
        </van-row>
    </router-link>
</template>

<script>
import { Tag } from 'vant'

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
        Tag
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
<style lang="scss" scoped>
.product-list-item-1 {
    width: 300px;
    padding: 20px 20px;
    box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.1);
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
    .img {
        height: 408px;
        border-radius: 10px;
        overflow: hidden;
    }
    .title {
        padding: 15px 0;
        font-size: 28px;
        color: #121314;
    }
    .Price {
        font-size: 30px;
        line-height: 1;
        color: #313635;
        span {
            font-size: 24px
        }
    }
    .original-price {
        flex: 1;
        margin-left: 8px;
        font-size: 24px;
        line-height: 1;
        color: #888;
        text-decoration: line-through;
    }
}
</style>
