<template>
    <div id="home">
        <van-row type="flex" justify="space-between" align="center" class="logo-search-news">
            <template v-if="isShowLogo">
                <p><img class="logo" src="../assets/logo.png"></p>
                <p class="title">易购一元拍</p>
            </template>
            <Search shape="round" class="search" v-model="keys" placeholder="请输入搜索关键词" @search="$router.push(`/search?keys=${keys    }`)"/>
            <div class="to-bg" />
        </van-row>
        <swipe class="banner" :autoplay="3000" :show-indicators="false">
            <swipe-item @click="$router.push('/luck-draw-1')"><img src="../assets/banner-1.png" alt=""></swipe-item>
            <swipe-item @click="$router.push('/sign-in-1')"><img src="../assets/banner-2.png" alt=""></swipe-item>
            <swipe-item @click="$router.push('/member')"><img src="../assets/banner-3.jpg" alt=""></swipe-item>
        </swipe>
        <van-row type="flex" justify="space-between" align="center" class="tab-1">
            <router-link to="/sign-in-1" class="item">
                <div><img class="img" src="../assets/tap-1.png" alt=""></div>
                <p class="title">签到有礼</p>
            </router-link>
            <router-link to="/activity-list?type=1" class="item">
                <div><img class="img" src="../assets/tap-2.png" alt=""></div>
                <p class="title">好物上新</p>
            </router-link>
            <router-link to="/spike-lits" class="item">
                <div><img class="img" src="../assets/tap-3.png" alt=""></div>
                <p class="title">会员秒杀</p>
            </router-link>
            <router-link to="/member" class="member">
                <div><img class="img" src="../assets/tap-4.png" alt=""></div>
                <p class="title">会员中心</p>
            </router-link>
            <router-link to="/activity-list?type=4" class="item">
                <div><img class="img" src="../assets/tap-5.png" alt=""></div>
                <p class="title">热销榜单</p>
            </router-link>
        </van-row>
        <!-- <van-row type="flex" justify="space-between" align="center" class="tab-2">
            <router-link to="/activity-list?type=0" class="item"><img src="../assets/remai.png" alt=""></router-link>
            <router-link to="/activity-list?type=1" class="item"><img src="../assets/xinping.png" alt=""></router-link>
            <router-link to="/activity-list?type=2" class="item"><img src="../assets/guojidapai.png" alt=""></router-link>
            <router-link to="/activity-list?type=3" class="item"><img src="../assets/nanzhuang.png" alt=""></router-link>
        </van-row> -->
        <van-row type="flex" justify="space-between" align="center" class="tab-2">
            <router-link to="/activity-list?type=0" class="item-1" >
                <p class="title" style="color:#ff8825">热卖榜单</p>
                <p class="text">大家都在买</p>
                <div class="img"><van-image lazy-load src="///gw.alicdn.com/imgextra/i3/133/O1CN01bokVy31CqxAmxGaR3_!!133-2-lubanu.png_125x125q90_.webp" fit="cover" class="" /></div>
            </router-link>
            <router-link to="/activity-list?type=2" class="item-1">
                <p class="title" style="color:#63a5f7">品牌特卖</p>
                <p class="text">大牌云集</p>
                <div class="img"><van-image lazy-load src="//img.alicdn.com/tfs/TB16211RoY1gK0jSZFMXXaWcVXa-400-400.jpg_240x240q90.jpg_.webp" fit="cover" class="" /></div>
            </router-link>
            <router-link to="/activity-list?type=1" class="item-1">
                <p class="title" style="color:#fc67a9">冬季专场</p>
                <p class="text">冬季特惠</p>
                <div class="img"><van-image lazy-load src="//gw.alicdn.com/imgextra/i2/150/O1CN01MfHVe61CyjxsT6R9U_!!150-0-lubanu.jpg_180x180q90_.webp" fit="cover" class="" /></div>
            </router-link>
            <router-link to="/activity-list?type=3" class="item-1">
                <p class="title" style="color:#9c8dff">全名口碑</p>
                <p class="text">口碑商品</p>
                <div class="img"><van-image lazy-load src="//gw.alicdn.com/imgextra/i2/161/O1CN01yrdH301D3mKV9gEXI_!!161-0-lubanu.jpg_180x180q90_.webp" fit="cover" class="" /></div>
            </router-link>
        </van-row>
        <van-row type="flex" justify="space-between" align="center" class="tab-2">
            <router-link to="/spike-lits" class="item-2">
                <van-row type="flex" justify="space-between" align="center" class="title">
                    <img src="../assets/home-title-bg-2.png" alt="">
                    <p style="color: #faa641">1 元好货限时抢</p>
                </van-row>
                <div class="goods-img">
                    <van-image width="40%" lazy-load src="//gw.alicdn.com/imgextra/i4/148/O1CN014J0tpi1Cxp7LqQ8Qk_!!148-0-lubanu.jpg_180x180q90_.webp" fit="cover" class="van-image" />
                    <van-image width="40%" lazy-load src="//gw.alicdn.com/imgextra/i2/114/O1CN014e9dnt1CiFjm4DRvb_!!114-2-lubanu.png_125x125q90_.webp" fit="cover" class="van-image" />
                </div>
            </router-link>
            <router-link to="/activity-list?type=3" class="item-2">
                <van-row type="flex" justify="space-between" align="center" class="title">
                    <img src="../assets/home-title-bg.png" alt="">
                    <p>品质好货任你选</p>
                </van-row>
                <div class="goods-img">
                    <van-image width="40%" lazy-load src="//gw.alicdn.com/imgextra/i4/158/O1CN01rajEeq1D2P6W1L8BP_!!158-0-lubanu.jpg_180x180q90_.webp" fit="cover" class="van-image" />
                    <van-image width="40%" lazy-load src="//gw.alicdn.com/imgextra/i3/157/O1CN01M9Nbkj1D1wg6P7zlf_!!157-0-lubanu.jpg_180x180q90_.webp" fit="cover" class="van-image" />
                </div>
            </router-link>
        </van-row>
        <div class="list">
            <van-row type="flex" justify="space-between" align="center" class="title">
                <p class="text">冬季推荐</p>
                <router-link to="/activity-list?type=1" class="more">更多<van-icon size="14" color="#9b9b9b" name="arrow" /></router-link>
            </van-row>
            <van-row class="horizontal-lits">
                <goods-list-item v-for="item in listData" :key="item.id" :details="item" class="item" />
            </van-row>
        </div>
        <div class="member"><router-link to="/member"><img src="../assets/my-banner.jpg" alt=""></router-link></div>
        <div class="list">
            <van-row type="flex" justify="space-between" align="center" class="title">
                <p class="text">热卖新品</p>
                <router-link to="/activity-list?type=2" class="more">更多<van-icon size="14" color="#9b9b9b" name="arrow" /></router-link>
            </van-row>
            <goods-list class="product-list" keys="女装" :max-page-index="2"/>
        </div>
        <basic-footer />
        <privacy-agreement />
    </div>
</template>

<script>
import { Swipe, SwipeItem, Search } from 'vant'
import GoodsList from '../components/goods-list'
import PrivacyAgreement from '../components/privacy-agreement'
import { addLogindata, getGoodsByKeys } from '../services'

export default {
    name: 'home',
    components: {
        Swipe,
        SwipeItem,
        GoodsList,
        GoodsListItem: GoodsList.item,
        PrivacyAgreement,
        Search
    },
    data () {
        return {
            listData: [],
            keys: ''
        }
    },
    computed: {
        isShowLogo () {
            // console.log(this.$router.query.)
            const domain = document.domain
            let boolean = false
            switch (domain) {
            case 'www.huixinyigouh.com':
                boolean = true
                break
            }
            return boolean
        }
    },
    async created () {
        this.addLogindata()
        await this.getGoodsLIst()
    },
    mounted () {
    },
    methods: {
        // 登陆ip记录
        addLogindata () {
            console.log(this.$route.query.channel)
            if (this.$route.query.channel) {
                addLogindata({
                    channel: this.$route.query.channel,
                    platformtype: '易购一元拍',
                    isauditor: 0,
                    text: JSON.stringify({
                        information: navigator.userAgent
                    })
                })
            }
        },
        async getGoodsLIst () {
            this.listData = await getGoodsByKeys({
                page: 1,
                limit: 20,
                keyword: '大衣'
            })
            console.log(this.listData)
        }
    }
}
</script>
<style lang="scss" scoped>
#home {
    padding: 0 24px;
    // background: #fff;
    .logo-search-news {
        position: relative;
        z-index: 1;
        padding: 20px 24px 20px;
        margin: 0 -24px;
        .title {
            font-size: 28px;
            margin-left: 10px;
            margin-right: 10px;
            line-height: 1;
            color: #fff;
            // text-align: center;
        }
        .to-bg {
            position: absolute;
            z-index: -1;
            top: 0;
            left: 0;
            width: 100%;
            height: 330px;
            background: url('../assets/home-bg-1.png')no-repeat;
            background-size: 100% auto;
        }
    }
    .logo {
        width: 50px;
    }
    .search {
        flex: 1;
        // margin-right: 30px;
        text-align: right;
        padding: 0;
        border-radius: 999PX;
    }
    .banner {
        position: relative;
        z-index: 2;
        margin-bottom: 20px;
        img {
            width: 100%;
            border-radius: 20px;
            overflow: hidden;
        }
    }
    .tab-1 {
        margin-bottom: 33px;
        padding: 0 0px;
        font-size: 18px;
        color: #333333;
        text-align: center;
        .img {
            width: 90px;
            margin-bottom: 11px;
            vertical-align: top;
        }
    }
    .tab-2 {
        margin-bottom: 5px;
        line-height: 1;
        text-align: center;
        .item-1 {
            width: 24.5%;
            height: 274px;
            padding: 20px;
            box-sizing: border-box;
            // margin-right: 6px;
            background: #fff;
            .title {
                font-size: 32px;
                margin-bottom: 10px;
            }
            .text {
                font-size: 24px;
                color: #888;
                margin-bottom: 16px;
            }
            .img {
                width: 100%;
                height: 80%;
                border-radius: 10px;
                overflow: hidden;
            }
        }
        .item-2 {
            width: 49.5%;
            height: 274px;
            padding: 20px;
            box-sizing: border-box;
            background: #fff;
            text-align: left;
            .title {
                img {
                    width: 130px;
                }
                p {
                    margin-top: 10px;
                    font-size: 24px;
                    color: #ff6354;
                    letter-spacing: -1px;
                    line-height: 1;
                }
            }
            .goods-img {
                text-align: center;
                padding-top: 40px;
                .van-image:first-child {
                    margin-right: 20px;
                }
            }
        }
    }
    .list {
        line-height: 1;
        .text {
            position: relative;
            padding: 20px 0 20px 15px;
            font-size: 36px;
            color: #121314;
            &::before {
                content: " ";
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                width: 4px;
                height: 50%;
                margin: auto;
                background: #faa641;
            }
        }
        .more {
            font-size: 28px;
            color: #9b9b9b;
            .van-icon {
                position: relative;
                top: 3px;
            }
        }
        .horizontal-lits {
            padding-bottom: 40px;
            white-space: nowrap;
            overflow: auto;
        }
        .item {
            margin: 30px 30px 0 0;
            width: 350px;
            display: inline-block;
        }
    }
    .product-list {
        background: #f7f7f7;
        margin: 0px -24px 60px;
        padding: 20px 24px;
    }
    .member {
        background: #f7f7f7;
        margin: 0px -24px 0px;
        padding: 20px 24px;
        img {
            width: 100%;
        }
    }
}
</style>
