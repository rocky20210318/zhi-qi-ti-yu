<template>
    <div id="address-list">
        <van-nav-bar fixed left-arrow @click-left="$router.go(-1)" placeholder title="地址管理" />
        <address-list
            v-model="chosenAddressId"
            :list="list"
            default-tag-text="默认"
            :switchable="switchable"
            @add="$router.push('/address')"
            @edit="onEdit"
            @select="select"
        />
        <empty v-if="typeof list !== 'object'" description="暂未添加地址" />
    </div>
</template>

<script>
import { AddressList, Empty } from 'vant'
import { getAddress } from '../services'

export default {
    name: 'app',
    components: {
        AddressList,
        Empty
    },
    data () {
        // console.log(this.$route.query)
        return {
            chosenAddressId: '',
            list: [],
            switchable: !this.$route.query.switchable
        }
    },
    computed: {
    },
    async created () {
        console.log(this.$route)
        this.getList()
    },
    mounted () {
    },
    methods: {
        async getList () {
            const listData = await getAddress()
            if (listData.length === 0) this.list = undefined
            else {
                listData.forEach(i => {
                    i.address = `${i.province} ${i.city} ${i.county} ${i.addressDetail}`
                })
                this.list = listData
            }
            // console.log(this.list, listData, typeof listData)
        },
        onEdit (val) {
            this.$router.push('/address?id=' + val.id)
        },
        select (item, index) {
            // this.$router.replace('/order-detail?index=' + index)
            this.$router.go(-1)
            console.log(index)
        }
    }
}
</script>
<style lang="scss">
#address-list {
    .van-tag--danger {
        background: #313635;
    }
    .van-address-item .van-radio__icon--checked .van-icon {
        background: #313635;
        border-color: #313635;
    }
    .van-button--danger {
        border: 0;
        background: linear-gradient(45deg, #90B8FF 0%, #1864FF 100%);
    }
}
</style>
<style lang="scss" scoped>
#address-list {
}
</style>
