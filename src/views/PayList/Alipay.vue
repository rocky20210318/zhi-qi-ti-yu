<template>
    <div id="alipay">
        <van-nav-bar fixed left-arrow @click-left="$router.go(-1)" placeholder left-text="返回" title="登陆支付宝" />
    </div>
</template>

<script>
// import { Dialog } from 'vant''

export default {
    name: 'alipay',
    components: {
    },
    data () {
        return {
        }
    },
    computed: {
    },
    async created () {
    },
    mounted () {
    },
    methods: {

    }
}
</script>
<style lang="scss">
#alipay {
    .van-nav-bar {
        background: #1D222D;
        .van-nav-bar__title {
            font-weight: 400;
            color: #fff;
        }
        .van-nav-bar__text {
            color: #999;
        }
        .van-nav-bar__arrow {
            font-size: 40px;
        }
    }
}
</style>
<style lang="scss" scoped>
#alipay {}
</style>
