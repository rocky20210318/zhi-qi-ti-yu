<template>
    <div id="search">
        <sticky>
            <van-row type="flex" justify="space-between" align="center" class="nav" >
                <div @click="$router.go(-1)"><van-icon name="arrow-left" class="icon" color="#fff" size="20px" /></div>
                <Search v-model="keys" show-action placeholder="请输入搜索关键词" class="search" @search="search" />
            </van-row>
            <dropdown-menu class="dropdown">
                <dropdown-item v-model="value" :options="option1" title="综合" @close="sort" />
                <dropdown-item v-model="value" :options="option2" title="销量" @close="sort" ref="item" />
            </dropdown-menu>
        </sticky>
        <goods-list ref="goodsList" :keys="keys" :params="params" :query-fun="queryFun" class="goods-list"/>
    </div>
</template>

<script>
import { Search, DropdownMenu, DropdownItem, Sticky } from 'vant'
import GoodsList from '../components/goods-list'

export default {
    name: 'search',
    components: {
        Search,
        DropdownMenu,
        DropdownItem,
        GoodsList,
        Sticky
    },
    data () {
        return {
            keys: this.$route.query.keys,
            value: 0,
            switch1: false,
            switch2: false,
            option1: [
                { text: '综合', value: 0 },
                { text: '新品', value: 1 },
                { text: '价格', value: 2 }
            ],
            option2: [
                { text: '升序', value: 3 },
                { text: '降序', value: 4 }
            ],
            params: {}
        }
    },
    computed: {
        queryFun () {
            let fun = (Fun) => {}
            switch (this.value) {
            case 0:
                break
            case 1:
                fun = (Fun) => { Fun.descending('updatedAt') }
                break
            case 2:
                fun = (Fun) => { Fun.ascending('price') }
                break
            case 3:
                fun = (Fun) => { Fun.ascending('createdAt') }
                break
            case 4:
                fun = (Fun) => { Fun.descending('createdAt') }
                break
            }
            return fun
        }
    },
    async created () {
    },
    mounted () {
    },
    methods: {
        sort () {
            this.params = {
                keys: '时尚' + this.keys
            }
            this.search()
        },
        search () {
            this.$refs.goodsList.onRefresh()
            // Location.
        }
    }
}
</script>
<style lang="scss">
#search {
    .van-search__action {
        color: #fff;
    }
    .van-dropdown-menu__bar {
        background: #fff;
    }
    .van-dropdown-menu__title {
        // color: #fff;
    }
}
</style>
<style lang="scss" scoped>
#search {
    .nav {
        background: linear-gradient(90deg,#fcd755 0%,#d81e06 100%);
        .icon {
            margin-left: 20px;
        }
        .search {
            flex: 1;
            background: rgba(0,0,0,0);
        }
    }
    .dropdown {
        // background: linear-gradient(90deg,#fcd755 0%,#d81e06 100%)
    }
    .goods-list {
        margin: 24px;
    }
}
</style>
