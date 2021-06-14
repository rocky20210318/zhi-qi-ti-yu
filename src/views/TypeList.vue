<template>
    <div id="type-list">
        <van-row type="flex" justify="space-between" align="center" class="nav" >
            <!-- <p class="title">分类</p> -->
            <Search v-model="keys" placeholder="请输入搜索关键词" shape="round" class="search" @search="search" />
        </van-row>
        <Sidebar class="sidebar" v-model="activeKey" @change="onChange">
            <SidebarItem title="衣裤" />
            <SidebarItem title="鞋子" />
            <SidebarItem title="器材" />
            <SidebarItem title="装备" />
        </Sidebar>
        <div class="content">
            <!-- <Divider>活动推荐</Divider> -->
            <!-- <router-link to="/coupon-list" class="activity"><img src="../assets/coupon-img.jpeg" alt=""></router-link>
            <div class="list">
                <router-link :to="`/search?keys=${item.keys}`" v-for="item in typeList" :key="item.keys" class="item">
                    <div><img :src="item.imgSrc" alt=""></div>
                    <p class="title">{{ item.title }}</p>
                </router-link>
            </div> -->
            <div class="type-list" >
                <p v-for="item in typeList" :key="item.keys" :class="['item', { 'active': paramsKeys === item.title }]">{{ item.title }}</p>
            </div>
            <GoodsList ref="goodsList" :keys="paramsKeys" class="goods-list"/>
        </div>
        <basic-footer />
    </div>
</template>

<script>
import { Sidebar, SidebarItem, Search } from 'vant'
import GoodsList from '../components/goods-list-2'
import AV from 'leancloud-storage'

export default {
    name: 'type-list',
    components: {
        Sidebar,
        SidebarItem,
        Search,
        GoodsList
    },
    data () {
        return {
            activeKey: 0,
            typeList: [],
            keys: '',
            paramsKeys: '冲锋衣裤'
        }
    },
    computed: {
    },
    async created () {
        this.getList()
    },
    mounted () {
    },
    methods: {
        async getList () {
            const articleList = new AV.Query('TypeList')
            articleList.equalTo('typeId', this.activeKey + 1)
            // articleList.skip(1)
            // articleList.limit(100)
            const typeList = await articleList.find()
            this.typeList = typeList.map(item => {
                return { ...item.attributes }
            })
            // console.log(this.typeList)
        },
        async onChange (index) {
            await this.getList()
            const keys = this.typeList[index].title
            this.paramsKeys = keys
            console.log(this.paramsKeys)
            setTimeout(() => {
                this.$refs.goodsList.onRefresh()
            }, 100)
        },
        search () {
            this.paramsKeys = this.keys
            console.log(this.paramsKeys)
            setTimeout(() => {
                this.$refs.goodsList.onRefresh()
            }, 100)
            // Location.
        }
    }
}
</script>
<style lang="scss">
#type-list {
    .van-sidebar-item--select::before {
        background-color: #3377FF;
    }
}
</style>
<style lang="scss" scoped>
#type-list {
    // height: 100%;
    .nav {
        background: #fff;
        .title {
            padding: 0 12PX;
            font-size: 36px;
            color: #060606;
        }
        .search {
            flex: 1;
        }
    }
    .sidebar {
        position: fixed;
        left: 0;
        top: 88px;
        z-index: 1;
        height: 100%;
        background-color: #f7f8fa;
    }
    .activity {
        display: block;
        width: 80%;
        margin: auto;
        border-radius: 12px;
        overflow: hidden;
        img {
            width: 100%;
        }
    }
    .type-list {
        width: 100%;
        margin: 16px 0 30px;
        overflow: auto;
        white-space:nowrap;
        .item {
            display: inline-block;
            margin-right: 20px;
            padding: 10px 20px;
            border-radius: 25px;
            border: 2px solid #888;
            font-size: 24px;
            color: #888;
            line-height: 1;
            &.active {
                border-color: #3578FF;
                color: #3578FF;
            }
        }
    }
    .content {
        position: fixed;
        right: 0;
        top: 88px;
        z-index: 0;
        width: 100%;
        height: 100%;
        padding-left: 90PX;
        box-sizing: border-box;
        background: #fff;
        overflow: auto;
        .list {
            font-size: 26px;
        }
        // .item {
        //     display: inline-block;
        //     margin-top: 60px;
        //     margin-left: 40px;
        //     text-align: center;
        //     img {
        //         width: 150px;
        //         height: 150px;
        //     }
        // }
    }
}
</style>
