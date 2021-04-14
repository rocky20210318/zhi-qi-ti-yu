<template>
    <div id="collect">
        <van-nav-bar fixed left-arrow @click-left="$router.go(-1)" placeholder title="我的收藏" />
        <!-- <ul v-if="listData.length !== 0">
            <li
                v-for="item in listData"
                :key="item.id"
            >
                <router-link :to="`/details/${item.valueId}`">
                    <goods-list-item :details="item" />
                </router-link>
            </li>
        </ul> -->
        <van-row v-if="listData.length !== 0" type="flex" justify="space-between" align="center" class="list">
            <goods-list-item v-for="item in listData" :key="item.id" :details="item" class="item" />
        </van-row>
        <div v-else><Empty description="你还没有收藏商品哦"/></div>
    </div>
</template>

<script>
import { Empty } from 'vant'
import { getCollectionList } from '@/services'
import GoodsList from '../components/goods-list'

export default {
    name: 'collect',
    components: {
        GoodsListItem: GoodsList.item,
        Empty
    },
    data () {
        return {
            listData: []
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
            const listData = await getCollectionList()
            // listData.map(i => {
            //     i.id = i.
            // })
            this.listData = listData
        }
    }
}
</script>
<style lang="scss" scoped>
#collect {
    .list {
        margin: 20px 24px;
        flex-wrap: wrap;
    }
    .item {
        margin-bottom: 20px;
    }
}
</style>
