<template>
    <div id="address">
        <van-nav-bar fixed left-arrow @click-left="$router.go(-1)" placeholder title="新增地址" />
        <address-edit
            :area-list="areaList"
            :show-delete="!!id"
            show-set-default
            show-search-result
            :search-result="searchResult"
            :area-columns-placeholder="['请选择', '请选择', '请选择']"
            :address-info="addressInfo"
            @save="onSave"
            @delete="onDelete"
        />
    </div>
</template>

<script>
import { AddressEdit } from 'vant'
import areaList from '../json/area'
import { saveAddress, getAddressDetails, deleteDddress, updateAddress } from '../services'

export default {
    name: 'address-details',
    components: {
        AddressEdit
    },
    data () {
        return {
            areaList,
            searchResult: [],
            addressInfo: {},
            id: this.$route.query.id || null
        }
    },
    computed: {
    },
    async created () {
        if (this.id) this.addressInfo = await getAddressDetails(this.id)
        console.log(this.addressInfo)
    },
    mounted () {
    },
    methods: {
        async onSave (val) {
            // console.log(val)
            try {
                if (this.id) await updateAddress(this.id, { ...val })
                else {
                    await saveAddress({
                        ...val
                    })
                }
                this.$toast('保存收货地址成功')
                setTimeout(() => {
                    this.$router.history.go(-1)
                }, 1.5 * 1000)
            } catch (e) {
                this.$toast(e.message)
            }
        },
        async onDelete () {
            try {
                await deleteDddress(this.id)
                this.$toast('已删除地址')
                setTimeout(() => {
                    this.$router.history.go(-1)
                }, 1.5 * 1000)
            } catch (e) {
                this.$toast(e.message)
            }
        }
    }
}
</script>
<style lang="scss">
#address {
    // height: 100%;
    .van-button--danger {
        background: linear-gradient(45deg, #90B8FF 0%, #1864FF 100%);
        border: 0;
    }
    .van-switch--on {
        background: linear-gradient(45deg, #90B8FF 0%, #1864FF 100%);
    }
}
</style>
<style lang="scss" scoped>
#address {
    // height: 100%;
}
</style>
