<template>
    <pull-refresh v-model="isRefreshLoading" @refresh="onRefresh" class="product-list">
        <list
            v-if="listData.length !== 0 || !finished"
            v-model="isLoading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
        >
            <van-row type="flex" justify="space-between" align="center" class="list">
                <item v-for="item in listData" :key="item.id" :details="item" class="item" />
            </van-row>
        </list>
    </pull-refresh>
</template>

<script>
import { List, PullRefresh } from 'vant'
import item from './item-1'
// import { getGoodsByKeys } from '../../services'
import AV from 'leancloud-storage'

export default {
    name: 'product-list',
    props: {
        keys: {
            type: String,
            default: ''
        },
        // 是否随机获取商品(1是0否),使用随机参数不能指定keywork
        israndom: {
            type: Number,
            default: 0
        },
        params: {
            type: Object,
            default () {
                return {}
            }
        },
        maxPageIndex: {
            type: Number,
            default: null
        }
    },
    components: {
        List,
        PullRefresh,
        item
    },
    data () {
        return {
            listData: [],
            isLoading: false,
            isRefreshLoading: false,
            finished: false,
            pageIndex: 0,
            pageSize: 20
        }
    },
    computed: {
    },
    async created () {
        // this.onLoad()
    },
    mounted () {
    },
    methods: {
        async onLoad () {
            // console.log(this.getList)
            if (this.maxPageIndex && this.pageIndex > this.maxPageIndex) {
                this.isLoading = false
                this.finished = true
                return false
            }
            this.pageIndex++
            // const articleList = new AV.Query('ProductList')
            // articleList.skip(this.pageIndex)
            // articleList.limit(this.pageSize)
            // articleList.contains('title', this.keys)
            // // console.log(index, size)
            // // articleList.descending('likeNumber')
            // // articleList.addDescending('readNumber')
            // let listData = await articleList.find()
            // listData = listData.map(item => {
            //     return { ...item.attributes }
            // })
            // // const listData = await getGoodsByKeys({
            // //     page: this.pageIndex,
            // //     limit: this.pageSize,
            // //     keyword: this.keys,
            // //     israndom: this.israndom,
            // //     ...this.params
            // // })
            let listData = await this.getList(this.pageIndex, this.pageSize)
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
            let listData = await this.getList(this.pageIndex, this.pageSize)
            this.listData = []
            this.listData = listData
            // this.$forceUpdate()
            if (listData.length === 0) this.finished = true
            // console.log(this.listData, listData)
            this.isRefreshLoading = false
        },
        async getList(index, size) {
            const articleList = new AV.Query('ProductList')
            articleList.skip((index - 1) * size)
            articleList.limit(size)
            articleList.contains('title', this.keys)
            let listData = await articleList.find()
            return listData = listData.map(item => {
                return {
                    ...item.attributes,
                    id: item.id
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.product-list {
    .list {
        flex-wrap: wrap;
    }
    // .item:nth-child(2n + 1) {
    //     margin-right: 30px;
    // }
    .item {
        margin-bottom: 20px;
    }
}
</style>
