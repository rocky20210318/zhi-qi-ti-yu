<template>
    <div id="search">
        <sticky>
            <van-row type="flex" justify="space-between" align="center" class="nav" >
                <div @click="$router.go(-1)"><van-icon name="arrow-left" class="icon" color="#fff" size="20px" /></div>
                <Search v-model="keys" show-action placeholder="请输入搜索关键词" class="search" @search="search" />
            </van-row>
            <dropdown-menu class="dropdown">
                <dropdown-item v-model="value" :options="option" @change="sort" />
                <dropdown-item title="筛选" ref="item">
                    <van-cell center title="包邮">
                        <template #right-icon>
                            <van-switch v-model="switch1" size="24" active-color="#faa641" />
                        </template>
                    </van-cell>
                    <van-cell center title="折扣">
                        <template #right-icon>
                            <van-switch v-model="switch2" size="24" active-color="#faa641" />
                        </template>
                    </van-cell>
                    <div style="padding: 5px 16px;">
                        <Button color="#faa641" type="danger" block round @click="onConfirm">
                        确认
                        </Button>
                    </div>
                </dropdown-item>
            </dropdown-menu>
        </sticky>
        <goods-list ref="goodsList" :keys="keys" :params="params" class="goods-list"/>
    </div>
</template>

<script>
import { Search, DropdownMenu, DropdownItem, Button, Sticky } from 'vant'
import GoodsList from '../components/goods-list'

export default {
    name: 'search',
    components: {
        Search,
        DropdownMenu,
        DropdownItem,
        Button,
        GoodsList,
        Sticky
    },
    data () {
        console.log(this.$route.query.keys)
        return {
            keys: this.$route.query.keys,
            value: 0,
            switch1: false,
            switch2: false,
            option: [
                { text: '综合', value: 0 },
                { text: '新品推荐', value: 1 },
                { text: '热卖爆款', value: 2 }
            ],
            params: {}
        }
    },
    computed: {
    },
    async created () {
    },
    mounted () {
    },
    methods: {
        onConfirm () {
            this.$refs.item.toggle(false)
            this.search()
        },
        sort () {
            this.params = {
                keys: '时尚' + this.keys
            }
            this.search()
        },
        search () {
            this.$refs.goodsList.onRefresh()
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
        background: transparent;
    }
    .van-dropdown-menu__title {
        color: #fff;
    }
}
</style>
<style lang="scss" scoped>
#search {
    .nav {
        background: linear-gradient(90deg,#fcd755,#faa641);
        .icon {
            margin-left: 20px;
        }
        .search {
            flex: 1;
            background: rgba(0,0,0,0);
        }
    }
    .dropdown {
        background: linear-gradient(90deg,#fcd755,#faa641)
    }
    .goods-list {
        margin: 24px;
    }
}
</style>
