<template>
    <div id="goods-details">
        <van-nav-bar class="nav" :border="false" fixed left-arrow  @click-left="$router.go(-1)"/>
        <swipe class="banner" indicator-color="white" :show-indicators="false" :autoplay="2500" @change="onChange">
            <swipe-item v-if="details.imgSrcArray" ><van-image lazy-load :src="details.imgSrcArray[0]" fit="cover" class="img" /></swipe-item>
        </swipe>
        <skeleton :loading="!details.title" class="skeleton" :row="2">
            <van-row v-if="true" type="flex" justify="space-between" align="center" class="title-pire">
                <p class="title">{{ details.title }}</p>
                <div class="pire">
                    <p class="">￥{{ price || Math.floor(details.price ) || 0 }}</p>
                    <p class="original-price">￥{{ Math.floor(details.price / 0.9) || 0}}</p>
                </div>
            </van-row>
            <van-row v-else van-row type="flex" justify="space-between" align="center" class="spike">
                <div class="left">
                    <p class="pire">￥<span>1</span></p>
                    <p class="original-price">￥992</p>
                </div>
                <div class="right">
                    <p class="text">距离活动结束</p>
                    <p class="time"><span>24</span>:<span>00</span>:<span>00</span></p>
                </div>
            </van-row>
        </skeleton>
        <ul class="data">
            <skeleton :loading="!details.title" class="skeleton" :row="4">
                <li class="item"><span class="lable">剩余</span>{{ details.price ? 3 : 400 }}件</li>
                <li class="item" @click="isShowSku = true"><span class="lable">尺码</span><van-icon class="arrow" name="arrow" /></li>
                <li class="item"><span class="lable">保障</span>付款2天内发货</li>
                <li class="item"><span class="lable">活动</span>全场8折&nbsp;•&nbsp;限时包邮</li>
            </skeleton>
        </ul>
        <div class="member-box">
            <div class="member"><router-link to="/member"><img src="../assets/my-banner.jpg" alt=""></router-link></div>
            <van-row type="flex" justify="space-between" align="center" class="tap">
                <p class="item">•&nbsp;全场8折</p>
                <p class="item">•&nbsp;全场免邮</p>
                <p class="item">•&nbsp;极速发货</p>
                <p class="item">•&nbsp;七天退换</p>
            </van-row>
        </div>
        <div class="evaluation">
            <p class="title">商品评价(0)</p>
            <skeleton :loading="!details.details" class="skeleton" avatar :row="3">
                <p class="text">暂无评价</p>
            </skeleton>
        </div>
        <div class="details">
            <p class="title">商品详情</p>
            <skeleton :loading="!details.details" class="skeleton" :row="5">
                <div class="html" v-html="details.details"></div>
            </skeleton>
        </div>
        <goods-action>
            <!-- <goods-action-icon icon="chat-o" text="客服" @click="onClickIcon" /> -->
            <goods-action-icon icon="cart-o" text="购物车" to="/Cart" />
            <goods-action-icon text="收藏">
                <template #icon>
                    <star :details="details" />
                </template>
            </goods-action-icon>
            <template v-if="!price">
                <goods-action-button type="warning" text="加入购物车" @click="isShowSku = true" />
                <goods-action-button
                    type="danger"
                    text="立即购买"
                    @click="isShowSku = true"
                />
            </template>
            <goods-action-button
                v-else
                type="danger"
                text="立即购买"
                @click="spike"
            />
        </goods-action>
        <sku
            v-if="details.title"
            v-model="isShowSku"
            :sku="sku"
            :goods="{ picture: details.imgSrcArray[0] }"
            :goods-id="id"
            @buy-clicked="onBuy"
            @add-cart="onAddCart"
        />
    </div>
</template>

<script>
import { Swipe, SwipeItem, GoodsAction, GoodsActionIcon, GoodsActionButton, Skeleton, Sku } from 'vant'
import { getGoodsDetail, getUserData, addCart, fastadd } from '../services'
import Star from '../components/star'

export default {
    name: 'goods-details',
    components: {
        Swipe,
        SwipeItem,
        GoodsAction,
        GoodsActionIcon,
        GoodsActionButton,
        Skeleton,
        Sku,
        Star
    },
    data () {
        return {
            current: 0,
            isShowSku: false,
            details: {},
            id: this.$route.params.id,
            price: this.$route.query.price
        }
    },
    computed: {
        sku () {
            if (this.details.title) {
                const price = this.price || this.details.price
                if (this.details.title.indexOf('衣') !== -1 || this.details.title.indexOf('裤') !== -1) {
                    return {
                        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
                        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
                        tree: [
                            {
                                k: '尺码', // skuKeyName：规格类目名称
                                k_s: 's1', // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
                                v: [
                                    {
                                        id: '1', // skuValueId：规格值 id
                                        name: 'S' // skuValueName：规格值名称
                                    },
                                    {
                                        id: '2',
                                        name: 'M'
                                    },
                                    {
                                        id: '3', // skuValueId：规格值 id
                                        name: 'L' // skuValueName：规格值名称
                                    },
                                    {
                                        id: '4',
                                        name: 'XL'
                                    }
                                ],
                                largeImageMode: false //  是否展示大图模式
                            }
                        ],
                        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
                        list: [
                            {
                                id: 2259, // skuId
                                s1: '1', // 规格类目 k_s 为 s1 的对应规格值 id
                                s2: '1', // 规格类目 k_s 为 s2 的对应规格值 id
                                price: price * 100, // 价格（单位分）
                                stock_num: 100 // 当前 sku 组合对应的库存
                            },
                            {
                                id: 2259, // skuId
                                s1: '2', // 规格类目 k_s 为 s1 的对应规格值 id
                                s2: '1', // 规格类目 k_s 为 s2 的对应规格值 id
                                price: price * 100, // 价格（单位分）
                                stock_num: 100 // 当前 sku 组合对应的库存
                            },
                            {
                                id: 2259, // skuId
                                s1: '3', // 规格类目 k_s 为 s1 的对应规格值 id
                                s2: '1', // 规格类目 k_s 为 s2 的对应规格值 id
                                price: price * 100, // 价格（单位分）
                                stock_num: 100 // 当前 sku 组合对应的库存
                            },
                            {
                                id: 2259, // skuId
                                s1: '4', // 规格类目 k_s 为 s1 的对应规格值 id
                                s2: '1', // 规格类目 k_s 为 s2 的对应规格值 id
                                price: price * 100, // 价格（单位分）
                                stock_num: 100 // 当前 sku 组合对应的库存
                            }
                        ],
                        price: price, // 默认价格（单位元）
                        stock_num: 400, // 商品总库存
                        // collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
                        none_sku: false, // 是否无规格商品
                        hide_stock: false // 是否隐藏剩余库存
                    }
                } else {
                    return {
                        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
                        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
                        tree: [
                            {
                                k: '尺码', // skuKeyName：规格类目名称
                                k_s: 's1', // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
                                v: [
                                    {
                                        id: '1', // skuValueId：规格值 id
                                        name: '均码' // skuValueName：规格值名称
                                    }
                                ],
                                largeImageMode: false //  是否展示大图模式
                            }
                        ],
                        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
                        list: [
                            {
                                id: 2259, // skuId
                                s1: '1', // 规格类目 k_s 为 s1 的对应规格值 id
                                s2: '1', // 规格类目 k_s 为 s2 的对应规格值 id
                                price: price * 100, // 价格（单位分）
                                stock_num: 400 // 当前 sku 组合对应的库存
                            }
                        ],
                        price: price, // 默认价格（单位元）
                        stock_num: 400, // 商品总库存
                        // collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
                        none_sku: false, // 是否无规格商品
                        hide_stock: false // 是否隐藏剩余库存
                    }
                }
            } else return {}
        },
        // 是否登陆
        isLogin () {
            return !!getUserData()
        },
        isTestAccount () {
            return getUserData().nickName === '19965412404'
        }
    },
    async created () {
        await this.getDetails()
        // console.log(this.details)
    },
    mounted () {
    },
    methods: {
        onChange (index) {
            this.current = index
        },
        async getDetails () {
            const details = await getGoodsDetail(this.id)
            // details.price = details.price
            let img = new Image()
            img.onload = () => {
                this.imgSrc = details.imgSrcArray[0]
                img = null
            }
            img.src = details.imgSrcArray[0]
            this.details = details
        },
        onClickIcon () {
            this.$toast('即刻开通超级会员，即刻享受专属客服')
            setTimeout(() => {
                this.$router.push('/member')
            }, 1.5 * 1000)
        },
        async onAddCart (val) {
            console.log(val)
            if (this.isLogin) {
                await addCart({
                    userId: getUserData().userId,
                    goodsId: this.details.id,
                    number: val.selectedNum
                })
                this.$toast('加入购物车成功')
            } else this.$router.push('/login')
        },
        async onBuy (val) {
            if (this.isLogin) {
                const cartId = await fastadd({
                    userId: getUserData().userId,
                    goodsId: this.details.id,
                    number: val.selectedNum
                })
                this.$router.push(`/order-Detail?cartId=${cartId}`)
            } else this.$router.push('/login')
        },
        spike () {
            if (!this.isLogin) this.$router.push('/login')
            else {
                this.$toast('开通vip即可享受1元秒杀')
                setTimeout(() => {
                    this.$router.push('/member')
                }, 1500)
            }
        }
    }
}
</script>
<style lang="scss">
#goods-details {
    .html {
        width: 100%;
        overflow: hidden;
        img {
            max-width: 100%!important;
        }
    }
    .van-nav-bar .van-icon {
        padding: 5px;
        font-size: 40px;
        color: #fff;
        background: rgb(0, 0, 0, .4);
        border-radius: 50%;
    }
}
</style>
<style lang="scss" scoped>
#goods-details {
    // background: #fff;
    height: 100%;
    padding-bottom: 50PX;
    .skeleton {
        padding: 20px;
        background: #fff;
    }
    .nav {
        background: rgb(0, 0, 0, 0);
    }
    .banner {
        width: 100%;
        height: 620px;
        .img {
            width: 100%;
            height: 620px;
        }
        .custom-indicator {
            position: absolute;
            right: 5px;
            bottom: 10px;
            padding: 2px 5px;
            font-size: 24px;
            background: rgba(0, 0, 0, 0.3);
            color: #fff;
        }
    }
    .title-pire {
        padding: 10px 20px 20px;
        background: #fff;
        // line-height: 1.5;
        .title {
            width: 560px;
            font-size: 32px;
            color: #121314;
        }
        .pire {
            text-align: center;
            font-size: 40px;
            line-height: 1;
            color: #121314;
        }
        .original-price {
            font-size: 28px;
            color: #888;
            text-decoration: line-through;
        }
    }
    .tap {
        height: 50px;
        margin: 0 32px;
        padding: 0 25px;
        background-color: #fff;
        border-radius: 8px;
        font-size: 24px;
        color: #121212;
        line-height: 50px;
        .item {
            position: relative;
            padding-left: 15px;
        }
    }
    .details {
        background: #fff;
        .title {
            margin: 20px 0 0;
            padding: 30px 20px;
            // border-top: 2px solid #e8e8e8;
            // border-bottom: 2px solid #e8e8e8;
            font-size: 32px;
            letter-spacing: 2px;
            color: #121314;
        }
    }
    .member-box {
        // background: #fff;
        margin-top: 20px;
        padding: 20px 0;
    }
    .member {
        margin: 0 35px 10px;
        img {
            width: 100%;
        }
    }
    .data {
        background: #fff;
        padding: 20px 20px 0;
        margin-top: 20px;
        line-height: 1;
        font-size: 28px;
        color: #121314;
        li {
            padding-bottom: 30px;
            .lable {
                color: #888;
                margin-right: 20px;
            }
        }
        .arrow {
            float: right;
        }
    }
    .evaluation {
        padding: 25px 20px;
        background: #fff;
        .title {
            font-size: 32px;
            padding-bottom: 25px;
            border-bottom: 2px solid #eee;
            color: #121314;
        }
        .text {
            margin-top: 20px;
            font-size: 28px;
            color: #888;
            text-align: center;
        }
    }
    .spike {
        position: relative;
        &::after {
            content: "活动将于12月12日开始";
            position: absolute;
            display: block;
            top: -60px;
            left: 0;
            width: 100%;
            height: 60px;
            background: rgba(0, 0, 0, 0.5);
            font-size: 24px;
            color: #fff;
            text-align: center;
            line-height: 60px;
        }
        .left {
            width: 430px;
            // height: 115px;
            padding: 20px;
            background-color: #121314;
            font-size: 36px;
            color: #fff;
            .pire {
                span {
                    font-size: 44px;
                }
            }
            .original-price {
                line-height: 1;
                font-size: 26px;
                color: rgba(247, 247, 247, 0.8);
                text-decoration: line-through;
            }
        }
        .right {
            flex: 1;
            padding: 24px 0;
            font-size: 26px;
            color: #fff;
            text-align: center;
            background: rgba(18, 18, 18, 0.45);
        }
        .text {
            line-height: 1;
            margin-bottom: 20px;
        }
        .time {
            line-height: 1;
            // span {
            //     display: inline-block;
            //     padding: 5px;
            //     background: #000;
            //     border-radius: 5px;
            // }
        }
    }
}
</style>
