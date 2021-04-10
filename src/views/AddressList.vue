<template>
    <div id="address-list">
        <van-nav-bar fixed left-arrow @click-left="$router.go(-1)" placeholder title="地址管理" />
        <address-list
            v-model="chosenAddressId"
            :list="list"
            default-tag-text="默认"
            :switchable="false"
            @add="$router.push('/address')"
            @edit="onEdit"
            @click-item="select"
        />
        <empty v-if="typeof list !== 'object'" description="暂未添加地址" />
    </div>
</template>

<script>
import { AddressList, Empty } from 'vant'
import { getAddressList } from '../services'

export default {
    name: 'app',
    components: {
        AddressList,
        Empty
    },
    data () {
        return {
            chosenAddressId: '',
            list: []
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
            const listData = await getAddressList()
            if (listData.length === 0) this.list = undefined
            else {
                listData.forEach(i => {
                    i.address = `${i.province} ${i.city} ${i.county} ${i.addressDetail}`
                })
                this.list = listData
            }
            console.log(this.list, listData, typeof listData)
        },
        onEdit (val) {
            // console.log(val)
            this.$router.push('/address?id=' + val.id)
        },
        select (item, index) {
            this.$router.replace('/order-detail?index=' + index)
            console.log(index)
        }
    }
}
</script>
<style lang="scss">
#address-list {
    .van-tag--danger {
        background: #faa641;
    }
    .van-address-item .van-radio__icon--checked .van-icon {
        background: #faa641;
        border-color: #faa641;
    }
    .van-button--danger {
        border-color: #faa641;
        background: #faa641;
    }
}
</style>
<style lang="scss" scoped>
#address-list {
}
</style>
