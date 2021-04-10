<template>
    <div id="spike-lits">
        <div class="top-bg" />
        <div class="top">
            <van-row type="flex" justify="space-between" align="center" class="member">
                <div class="left">
                    <h1>VIP专享</h1>
                    <p class="text">开通VIP会员</p>
                    <p class="text">立刻享受1元秒杀</p>
                    <p class="opening">立即开通>></p>
                </div>
                <div class="right">
                    <div><van-image width="100%" fit="cover" lazy-load src="http://img3m6.ddimg.cn/81/31/1603701576-1_b_1.jpg" class="img" /></div>
                    <p class="title van-ellipsis">冬日呢子大衣特价款</p>
                    <p class="price">¥<span>1</span></p>
                </div>
            </van-row>
            <van-row type="flex" justify="space-between" align="center" class="time-box">
                <div v-for="(item, index) in tabData" :key="item.time" :class="[`item`, {'active': activeIndex === index}]" @click="clickTime(index)">
                    <p class="time">{{ item.title }}</p>
                    <p v-if="activeTime < item.time" class="status">未开始</p>
                    <p v-else-if="tabData[index + 1] && activeTime >= tabData[index + 1].time" class="status">已结束</p>
                    <p v-else class="status">抢购中</p>
                </div>
            </van-row>
        </div>
        <pull-refresh v-model="isRefreshLoading" @refresh="onRefresh" class="pull-refresh">
            <list
                v-if="listData.length !== 0 || !finished"
                v-model="isLoading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
            >
                <ul class="list">
                    <li v-for="item in listData" :key="item.id" @click="$router.push(`/goods-details/${item.id}?price=1`)">
                        <van-row type="flex" justify="space-between" align="center" class="item">
                            <div class="left"><van-image width="100%" fit="cover" lazy-load :src="item.imgSrcArray" class="img" /></div>
                            <div class="right">
                                <p class="title van-multi-ellipsis--l2">{{ item.title }}</p>
                                <!-- <van-row type="flex" justify="space-between" align="bottom" class="pire-quantity">
                                    <p class="pire">¥<span>1</span></p>
                                    <p class="original-price">￥{{ Math.floor(item.price / 0.9) || 0}}</p>
                                    <p class="quantity">仅剩<span>1</span>件</p>
                                </van-row>
                                <van-row type="flex" justify="space-between" align="center">
                                    <p class="countdown">24:00:00</p>
                                    <div class="button">去购买</div>
                                </van-row> -->
                                <van-row type="flex" justify="space-between" align="center">
                                    <p class="quantity">剩<span>3</span>件</p>
                                    <p class="original-price">￥{{ Math.floor(item.price / 0.9) || 0}}</p>
                                    <van-row type="flex" justify="space-between" align="center" class="button">
                                        <p class="text">特卖</p>
                                        <p class="price">¥&nbsp;<span>1</span></p>
                                    </van-row>
                                </van-row>
                            </div>
                        </van-row>
                    </li>
                </ul>
            </list>
        </pull-refresh>
        <basic-footer />
    </div>
</template>

<script>
import { List, PullRefresh } from 'vant'
import { getGoodsByKeys } from '../services'

export default {
    name: 'spike-lits',
    props: {},
    components: {
        List,
        PullRefresh
    },
    data () {
        return {
            listData: [],
            isLoading: true,
            isRefreshLoading: false,
            finished: false,
            pageIndex: 0,
            pageSize: 20,
            tabData: [
                {
                    title: '09:00',
                    keys: '女装',
                    time: 9
                },
                {
                    title: '12:00',
                    keys: '连衣裙',
                    time: 12
                },
                {
                    title: '14:00',
                    keys: '女包',
                    time: 14
                },
                {
                    title: '18:00',
                    keys: '男装',
                    time: 18
                },
                {
                    title: '22:00',
                    keys: '包包',
                    time: 22
                }
            ],
            activeTime: 0,
            activeIndex: 0
        }
    },
    computed: {
        goodsStatus () {
            const data = this.tabData[this.activeIndex]
            if (this.activeTime < data.time) return '未开始'
            else if (this.tabData[this.activeIndex + 1] && this.activeTime >= this.tabData[this.activeIndex + 1].time) return '已结束'
            else return ''
        }
    },
    async created () {
        // Dialog({
        //     title: '提示',
        //     message: '商城将于1月15日10点正式运营'
        // })
        this.defaultActive()
        this.listData = await getGoodsByKeys({
            page: 1,
            limit: 30,
            keyword: this.tabData[this.activeIndex].keys
        })
    },
    mounted () {
    },
    methods: {
        onRefresh () {},
        onLoad () {},
        defaultActive () {
            const newTime = new Date()
            const h = newTime.getHours()
            this.activeTime = h
            const length = this.tabData.length - 1
            if (this.activeTime < this.tabData[0].time) {
                this.activeIndex = 0
            } else if (this.activeTime >= this.tabData[length].time) {
                this.activeIndex = length
            } else {
                for (let i = 0; i < this.tabData.length; i++) {
                    const data = this.tabData[i]
                    if (this.activeTime >= data.time && this.activeTime < this.tabData[i + 1].time) {
                        this.activeIndex = i
                        break
                    }
                }
            }
        },
        async clickTime (index) {
            this.activeIndex = index
            this.listData = await getGoodsByKeys({
                page: 1,
                limit: 30,
                keyword: this.tabData[index].keys,
                maxprice: 150
            })
        }
    }
}
</script>
<style lang="scss" scoped>
#spike-lits {
    overflow: hidden;
    .nav {
        background: transparent;
        }
    .nav-title {
        color: #fff;
    }
    .member {
        position: relative;
        z-index: 2;
        // top: 100px;
        height: 354px;
        margin: 60px 30px 0;
        padding: 0 36px;
        background-image: linear-gradient(180deg,#fde4cf 0%,#fbcca9 100%);
        border-radius: 20px;
        color: #d15134;
        font-size: 26px;
        line-height: 1;
        h1 {
            margin-bottom: 20px;
            font-size: 36px;
            font-weight: 500;
        }
        .text {
            margin-bottom: 16px;
        }
        .opening {
            margin-top: 110px;
        }
        .right {
            width: 222px;
            padding: 15px;
            height: 294px;
            margin-right: 100px;
            box-sizing: border-box;
            border-radius: 10px;
            background: #fff;
            text-align: center;
        }
        .img {
            // width: 80%;
            margin-bottom: 10px;
            border-radius: 10px;
            overflow: hidden;
            // height: 200px;
            // height: ;
        }
        .title {
            margin-bottom: 10px;
            font-size: 28px;
            color: #333;
        }
    }
    .top-bg {
        position: fixed;
        left: 0;
        // top: -50px;
        z-index: 2;
        width: 100%;
        height: 400px;
        // border-radius: 30px;
        background: url('../assets/spike-lits-bg.png')no-repeat;
        background-size: 100% auto;
    }
    .top {
        position: fixed;
        z-index: 3;
        width: 100%;
    }
    .pull-refresh {
        position: relative;
        z-index: 1;
        margin-top: 550px;
        // position: relative;
        // top: 390px;
    }
    .list {
        margin: 0 20px;
        .item {
            padding: 20px 30px;
            margin-bottom: 30px;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.1);
            background: #fff;
            // border-bottom: solid 2px #c9c9c9;
            .left {
                width: 200px;
                height: 200px;
                margin-right: 16px;
                .img {
                    height: 200px;
                    border-radius: 10px;
                    overflow: hidden;
                }
            }
            .right {
                flex: 1;
            }
            .title {
                margin-bottom: 26px;
                font-size: 26px;
                line-height: 1.5;
                color: rgba(0, 0, 0, 0.7);
            }
            .quantity {
                font-size: 24px;
                color: #fe3641;
                span {
                    font-size: 32px;
                }
            }
            .original-price {
                font-size: 30px;
                text-decoration: line-through;
                color: #b9b9b9;
            }
            .button {
                width: 240px;
                height: 62px;
                padding: 0 56px 0 26px;
                box-sizing: border-box;
                line-height: 62px;
                background: url('../assets/button-bg.png')no-repeat;
                background-size: 100% auto;
                box-shadow: 0px 2px 24px 0px rgba(249, 215, 127, 0.4);
                border-radius: 10px;
                color: #fff;
                .price {
                    font-size: 30px;
                    span {
                        font-size: 42px;
                    }
                }
            }
        }
    }
    .pire-quantity {
        margin-bottom: 15px;
        span {
            margin: 0 3px;
            font-size: 44px;
            color: #121212;
            line-height: 1;
        }
    }
    .time-box {
        position: relative;
        z-index: 2;
        padding: 20px 80px;
        text-align: center;
        background: #f7f7f7;
        .item {
            color:  rgba(0, 0, 0, 0.3);
        }
        p {
            font-size: 28px;
            line-height: 1;
        }
        .time {
            font-size: 34px;
            line-height: 1.5;
        }
        .active {
            color: #66a7ff;
        }
    }
    .quantity {
        font-size: 24px;
        color: #121212;
    }
    // .button {
    //     display: block;
    //     width: 163px;
    //     height: 54px;
    //     // margin-top: 10px;
    //     background-color: #121212;
    //     border-radius: 8px;
    //     font-size: 26px;
    //     color: #fff;
    //     line-height: 54px;
    //     text-align: center;
    // }
}
</style>
