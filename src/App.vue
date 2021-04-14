<template>
    <div id="app-entrance">
        <router-view/>
        <!-- 底部导航 -->
        <basic-footer v-if="$route.meta.isShowBasicFooter" />
    </div>
</template>

<script>

export default {
    name: 'app',
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
<style lang="scss" scoped>
#app-entrance {
    height: 100%;
}
.record {
    position: relative;
    z-index: 0;
    top: -150px;
    text-align: center;
    font-size: 28px;
    color: #666;
    margin-bottom: 20px;
}
</style>
