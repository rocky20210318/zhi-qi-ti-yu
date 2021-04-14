<template>
    <div id="type-list">
        <Sidebar class="sidebar" v-model="activeKey" @change="getList">
            <SidebarItem title="衣裤" />
            <SidebarItem title="鞋子" />
            <SidebarItem title="器材" />
            <SidebarItem title="装备" />
        </Sidebar>
        <div class="content">
            <div class="list">
                <router-link :to="`/search?keys=${item.keys}`" v-for="item in typeList" :key="item.keys" class="item">
                    <div><img :src="item.imgSrc" alt=""></div>
                    <p class="title">{{ item.title }}</p>
                </router-link>
            </div>
        </div>
        <basic-footer />
    </div>
</template>

<script>
import { Sidebar, SidebarItem } from 'vant'
import AV from 'leancloud-storage'

export default {
    name: 'type-list',
    components: {
        Sidebar,
        SidebarItem
    },
    data () {
        return {
            activeKey: 0,
            typeList: []
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
            let typeList = await articleList.find()
            this.typeList = typeList.map(item => {
                return { ...item.attributes }
            })
            console.log(this.typeList)
        }
    }
}
</script>
<style lang="scss">
</style>
<style lang="scss" scoped>
#type-list {
    .sidebar {
        position: fixed;
        left: 0;
        top: 0;
        z-index: 2;
        // height: 100%;
    }
    .content {
        position: fixed;
        right: 0;
        top: 0;
        z-index: 1;
        width: 100%;
        height: 100%;
        padding-left: 80PX;
        box-sizing: border-box;
        background: #fff;
        .list {
            font-size: 26px;
        }
        .item {
            display: inline-block;
            margin-top: 60px;
            margin-left: 40px;
            text-align: center;
            img {
                width: 150px;
                height: 150px;
            }
        }
    }
}
</style>
