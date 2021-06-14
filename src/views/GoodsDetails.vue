<template>
    <div id="goods-details">
        <van-nav-bar
            class="nav"
            :border="false"
            fixed
            left-arrow
            placeholder
            @click-left="$router.go(-1)"
            title="商品详情"
        />
        <swipe
            class="banner"
            indicator-color="white"
            :show-indicators="false"
            :autoplay="2500"
            @change="onChange"
        >
            <swipe-item v-if="details.thumbnail"
                ><van-image lazy-load :src="details.thumbnail" class="img"
            /></swipe-item>
        </swipe>
        <skeleton :loading="!details.title" class="skeleton" :row="2">
            <div
                v-if="true"
                class="title-pire"
            >
                <p class="title">{{ details.title }}</p>
                <div class="pire">
                    <p class="">
                        ￥{{ price || Math.floor(details.price) || 0 }}
                        <span class="original-price">￥{{ Math.floor(details.price / 0.9) || 0 }}</span>
                    </p>
                </div>

                <van-row
                    type="flex"
                    justify="space-between"
                    align="center"
                    class="tap"
                >
                    <p class="item">快递：包邮</p>
                    <p class="item">月销：0笔</p>
                    <p class="item">七天退换</p>
                </van-row>
            </div>
            <van-row
                v-else
                van-row
                type="flex"
                justify="space-between"
                align="center"
                class="spike"
            >
                <div class="left">
                    <p class="pire">￥<span>1</span></p>
                    <p class="original-price">￥992</p>
                </div>
                <div class="right">
                    <p class="text">距离活动结束</p>
                    <p class="time">
                        <span>24</span>:<span>00</span>:<span>00</span>
                    </p>
                </div>
            </van-row>
        </skeleton>
        <ul class="data">
            <Skeleton :loading="!details.title" class="skeleton" :row="4">
                <!-- <li class="item"><span class="lable">剩余</span>{{ details.price ? 3 : 400 }}件</li> -->
                <li class="item" @click="isShowSku = true">
                    <span class="lable">尺码</span
                    ><van-icon class="arrow" name="arrow" />
                </li>
                <li class="item">
                    <span class="lable">保障</span>付款3天内发货
                </li>
                <li class="item">
                    <span class="lable">活动</span>全场8折&nbsp;•&nbsp;限时包邮
                </li>
            </Skeleton>
        </ul>
        <div class="member-box">
            <!-- <div class="member">
                <router-link to="/search?keys=软壳衣裤"
                    ><img src="../assets/my-banner.jpeg" alt=""
                /></router-link>
            </div> -->
            <!-- <van-row
                type="flex"
                justify="space-between"
                align="center"
                class="tap"
            >
                <p class="item">•&nbsp;全场8折</p>
                <p class="item">•&nbsp;全场免邮</p>
                <p class="item">•&nbsp;极速发货</p>
                <p class="item">•&nbsp;七天退换</p>
            </van-row> -->
        </div>
        <van-row type="flex" justify="space-between" align="center" >
            <Tabs v-model="active" class="tabs">
                <Tab title="商品详情">
                    <div class="details">
                        <!-- <p class="title">商品详情</p> -->
                        <skeleton :loading="!details.details" class="skeleton" :row="5">
                            <div id="html" ref="html" v-html="details.details"></div>
                        </skeleton>
                    </div>
                </Tab>
                <Tab title="商品评价(0)">
                    <div class="evaluation">
                        <!-- <p class="title">商品评价</p> -->
                        <skeleton
                            :loading="!details.details"
                            class="skeleton"
                            avatar
                            :row="3"
                        >
                            <div class="img"><img src="../assets/no-news.png" alt=""></div>
                            <p class="text">暂无评价</p>
                        </skeleton>
                    </div>
                </Tab>
            </Tabs>
        </van-row>
        <goods-action>
            <!-- <goods-action-icon icon="chat-o" text="客服" @click="onClickIcon" /> -->
            <goods-action-icon icon="cart-o" text="购物车" to="/Cart" />
            <goods-action-icon text="收藏">
                <template #icon>
                    <star :details="details" :id="id" />
                </template>
            </goods-action-icon>
            <template v-if="!price">
                <goods-action-button
                    type="warning"
                    text="加入购物车"
                    color="linear-gradient(133deg, #ffc05a 0%, #ffad46 100%)"
                    @click="isShowSku = true"
                />
                <goods-action-button
                    type="danger"
                    text="立即购买"
                    color="linear-gradient(45deg, #90B8FF 0%, #1864FF 100%)"
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
            :goods="{ picture: details.thumbnail }"
            :goods-id="id"
            @buy-clicked="onBuy"
            @add-cart="onAddCart"
        />
    </div>
</template>

<script>
import { Swipe, SwipeItem, GoodsAction, GoodsActionIcon, GoodsActionButton, Skeleton, Sku, Tab, Tabs } from 'vant'
import { getUserData, addCart, addOrder, doExchange } from '../services'
import Star from '../components/star'
import AV from 'leancloud-storage'

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
        Star,
        Tab,
        Tabs
    },
    data () {
        return {
            active: 0,
            current: 0,
            isShowSku: this.$route.query.cart,
            details: {},
            id: this.$route.params.id,
            price: this.$route.query.price
        }
    },
    computed: {
        sku () {
            if (this.details.title) {
                const price = this.price || this.details.price
                const size = this.details.sizeList || ''
                const color = this.details.colorList || ''
                const colorList = color.split(/[\r\n\r\n]+/)
                const sizeList = size.split(/[\r\n\r\n]+/)
                const colorTree = colorList.map((i, index) => {
                    return {
                        id: index,
                        name: i
                    }
                })
                const sizeTree = sizeList.map((i, index) => {
                    return {
                        id: index,
                        name: i
                    }
                })
                // console.log([...colorTree.length])
                let listData = doExchange([colorTree.map(i => i.id), sizeTree.map(i => i.id)])
                listData = listData.map((i, index) => {
                    return {
                        id: index, // skuId
                        s1: i[0], // 规格类目 k_s 为 s1 的对应规格值 id
                        s2: i[1], // 规格类目 k_s 为 s2 的对应规格值 id
                        price: price * 100, // 价格（单位分）
                        stock_num: 50 // 当前 sku 组合对应的库存
                    }
                })
                return {
                    // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
                    // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
                    tree: [
                        {
                            k: '颜色', // skuKeyName：规格类目名称
                            k_s: 's1', // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
                            v: colorTree,
                            largeImageMode: false //  是否展示大图模式
                        },
                        {
                            k: '尺码', // skuKeyName：规格类目名称
                            k_s: 's2', // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
                            v: sizeTree,
                            largeImageMode: false //  是否展示大图模式
                        }
                    ],
                    // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
                    list: listData,
                    price: price, // 默认价格（单位元）
                    stock_num: 200, // 商品总库存
                    // collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
                    none_sku: false, // 是否无规格商品
                    hide_stock: false // 是否隐藏剩余库存
                }
            } else return {}
        },
        // 是否登陆
        isLogin () {
            return !!AV.User.current()
        },
        isTestAccount () {
            return getUserData().nickName === '15902173921'
        }
    },
    async created () {
        await this.getDetails()
    },
    async mounted () {
    },
    methods: {
        onChange (index) {
            this.current = index
        },
        async getDetails () {
            //    console.log(this.userId)
            const Details = AV.Object.createWithoutData('ProductList', this.id)
            const details = await Details.fetch()
            // console.log(details)
            // const details = await getGoodsDetail(this.id)
            // details.price = details.price
            let img = new Image()
            img.onload = () => {
                this.imgSrc = details.attributes.thumbnail
                img = null
            }
            img.src = details.attributes.thumbnail
            this.details = {
                ...details.attributes,
                id: this.id
            }
            this.$nextTick(() => {
                this.setHtml()
            })
        },
        onClickIcon () {
            this.$toast('即刻开通超级会员，即刻享受专属客服')
            setTimeout(() => {
                this.$router.push('/member')
            }, 1.5 * 1000)
        },
        onAddCart () {
            if (this.isLogin) {
                addCart(this.details)
                this.$toast('加入购物车成功')
            } else this.$router.push('/login')
        },
        async onBuy (val) {
            if (this.isLogin) {
                // const cartId = await fastadd({
                //     userId: getUserData().userId,
                //     goodsId: this.details.id,
                //     number: val.selectedNum
                // })
                // this.$router.push(`/order-Detail?cartId=${cartId}`)
                const orderId = addOrder([{ buyCount: 1, bookId: this.id, commodity: this.details }])
                this.$router.push(`/order-Detail/${orderId}`)
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
        },
        setHtml () {
            const html = this.$refs.html
            const clientWidth = document.body.clientWidth
            const nub = 750 / clientWidth
            html.style.width = nub * 100 + '%'
            html.style.transform = `scale(${1 / nub})`
        }
    }
}
</script>
<style lang="scss">
#goods-details {
    #html {
        width: 100%;
        overflow: hidden;
        transform-origin: 0px 0px;
        // transform: scale(0.5);
        img {
            max-width: 100% !important;
            width: 100%;
        }
    }
    .van-nav-bar .van-icon {
        // padding: 5px;
        // font-size: 40px;
        // color: #fff;
        // background: rgb(0, 0, 0, 0.4);
        // border-radius: 50%;
    }
}
</style>
<style lang="scss" scoped>
#goods-details {
    // background: #fff;
    height: 100%;
    padding-bottom: 50px;
    .skeleton {
        padding: 20px;
        background: #fff;
    }
    .nav {
        background: rgb(0, 0, 0, 0);
    }
    .banner {
        width: 100%;
        height: 800px;
        .img {
            width: 100%;
            height: 800px;
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
        padding: 30px;
        background: #fff;
        // line-height: 1.5;
        .title {
            // width: 560px;
            font-size: 32px;
            color: #1d1d1d;
        }
        .pire {
            margin-top: 20px;
            // text-align: center;
            font-size: 42px;
            line-height: 1;
            color: #ff2c3a;
        }
        .original-price {
            font-size: 28px;
            color: #888;
            text-decoration: line-through;
        }
    }
    .tap {
        height: 50px;
        margin-top: 10px;
        // margin: 0 32px;
        // padding: 0 25px;
        // background-color: #999;
        border-radius: 8px;
        font-size: 24px;
        color: #999;
        line-height: 50px;
        .item {
            position: relative;
            padding-left: 15px;
        }
    }
    .tabs {
        width: 100%;
    }
    .details {
        width: 100%;
        height: 0px;
        background: #fff;
        .title {
            margin: 20px 0 0;
            padding: 30px 20px;
            // border-top: 2px solid #e8e8e8;
            // border-bottom: 2px solid #e8e8e8;
            font-size: 32px;
            letter-spacing: 2px;
            color: #121314;
            background: #fff;
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
        padding: 25px 20px 40px;
        // background: #fff;
        .title {
            font-size: 32px;
            padding-bottom: 25px;
            border-bottom: 2px solid #eee;
            color: #121314;
        }
        .text {
            margin-top: 20px;
            margin-bottom: 100px;
            font-size: 28px;
            color: #888;
            text-align: center;
        }
        .img {
            width: 300px;
            margin: 100px auto 0px;
            img {
                width: 100%;
            }
        }
    }
    .spike {
        position: relative;
        &::after {
            content: '活动将于12月12日开始';
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
    .van-goods-action {
        z-index: 2;
    }
}
</style>
