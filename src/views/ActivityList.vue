<template>
    <div id="activity-list">
        <van-nav-bar :border="false" fixed left-arrow  @click-left="$router.go(-1)" class="nav">
            <template #title>
                <p class="nav-title"></p>
            </template>
        </van-nav-bar>
        <div class="img-bg"><van-image lazy-load :src="typeData[pageType].imgUrl" fit="cover" class="img" /></div>
        <pull-refresh v-model="isRefreshLoading" @refresh="onRefresh" class="pull-refresh">
            <list
                v-if="listData.length !== 0 || !finished"
                v-model="isLoading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
            >
                <ul class="list">
                    <li v-for="item in listData" :key="item.id" @click="$router.push(`/goods-details/${item.id}`)">
                        <van-row type="flex" justify="space-between" align="center" class="item">
                            <div class="left"><van-image width="100%" fit="cover" lazy-load :src="item.imgSrcArray" class="img" /></div>
                            <div class="right">
                                <p class="title van-multi-ellipsis--l2">{{ item.title }}</p>
                                <van-row type="flex" justify="space-between" align="bottom" class="pire-quantity">
                                    <p class="pire">¥<span>{{ Math.floor(item.price) }}</span></p>
                                    <p class="original-price">￥{{ Math.floor(item.price / 0.9) || 0}}</p>
                                    <p class="quantity">已售<span>0</span>件</p>
                                </van-row>
                                <van-row type="flex" justify="space-between" align="center">
                                    <p></p>
                                    <div class="button">去购买</div>
                                </van-row>
                            </div>
                        </van-row>
                    </li>
                </ul>
            </list>
        </pull-refresh>
    </div>
</template>

<script>
import { List, PullRefresh } from 'vant'
import { getGoodsByKeys } from '../services'

export default {
    name: 'activity-list',
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
            keys: '',
            typeData: [
                {
                    imgUrl: '//img12.360buyimg.com/cms/jfs/t1/132496/40/7415/87838/5f3b4eebE5373e47a/21f688f530adde11.jpg',
                    keys: '时尚'
                },
                {
                    imgUrl: '//img14.360buyimg.com/da/jfs/t1/59402/20/5415/153057/5d37b3f4E565eee1d/b3818446414de902.jpg',
                    keys: '新品'
                },
                {
                    imgUrl: '//img11.360buyimg.com/babel/s1980x750_jfs/t1/151966/30/9886/23833/5fd73e5fE6f54b4a7/f377d122da9466f1.jpg!cc_1980x750.webp',
                    keys: '大牌'
                },
                {
                    imgUrl: require('../assets/ActivityList-4.jpg'),
                    keys: '男'
                },
                {
                    imgUrl: require('../assets/ActivityList-5.jpg'),
                    keys: '女装'
                }
            ],
            pageType: this.$route.query.type
        }
    },
    computed: {
    },
    async created () {
        this.onLoad()
    },
    mounted () {
    },
    methods: {
        async onLoad () {
            // console.log(this.getList)
            this.pageIndex++
            const listData = await getGoodsByKeys({
                page: this.pageIndex,
                limit: this.pageSize,
                keyword: this.typeData[this.pageType].keys
            })
            if (listData.length === 0) this.finished = true
            else {
                this.listData = this.listData.concat(listData)
            }
            // console.log(this.listData)
            this.isLoading = false
        },
        async onRefresh () {
            this.pageIndex = 1
            this.finished = false
            const listData = await getGoodsByKeys({
                page: this.pageIndex,
                limit: this.pageSize,
                keyword: this.typeData[this.pageType].keys
            })
            this.listData = []
            this.listData = listData
            // this.$forceUpdate()
            if (listData.length === 0) this.finished = true
            console.log(this.listData, listData)
            this.isRefreshLoading = false
        }
    }
}
</script>
<style lang="scss">
#activity-list {
    .van-nav-bar .van-icon {
        color: #fff;
    }
}
</style>
<style lang="scss" scoped>
#activity-list {
    // padding-bottom: 80px;
    .nav {
        background: transparent;
        }
    .nav-title {
        color: #fff;
    }

    .pull-refresh {
        position: relative;
        z-index: 1;
        // margin-top: 80px;
        // position: relative;
        // top: 390px;
    }
    .img-bg {
        .img {
            margin: 20px;
            margin-bottom: 20px;
        }
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
                margin-bottom: 15px;
                font-size: 26px;
                line-height: 1.5;
                color: #121314;
            }
            .pire {
                font-size: 30px;
                color: #121212;
                line-height: 1;
                span {
                    font-size: 44px;
                }
            }
            .original-price {
                flex: 1;
                margin-left: 10px;
                font-size: 24px;
                line-height: 1;
                color: #888;
                text-decoration: line-through;
            }
            .countdown {
                width: 100px;
                padding: 7px 12px;
                background-color: #ffecee;
                border-radius: 4px;
                border: solid 1px #ff0a31;
                font-size: 24px;
                color: #ff0a31;
                line-height: 1;
            }
        }
    }
    .pire-quantity {
        margin-bottom: 15px;
        span {
            margin: 0 3px;
            font-size: 44px;
            color: #313635;
            line-height: 1;
        }
    }
    .time-box {
        position: relative;
        z-index: 2;
        padding: 100px 80px;
        text-align: center;
        .item {
            color: rgba(250, 248, 248, 0.685);
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
            color: #fff;
        }
    }
    .quantity {
        font-size: 24px;
        color: #121212;
    }
    .button {
        display: block;
        width: 163px;
        height: 54px;
        // margin-top: 10px;
        background-color: #313635;
        border-radius: 8px;
        font-size: 26px;
        color: #fff;
        line-height: 54px;
        text-align: center;
    }
}
</style>
