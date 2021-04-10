<template>
    <div id="app-entrance">
        <router-view/>
        <p v-if="caseNumber" class="record"><a href="https://beian.miit.gov.cn/">{{ caseNumber }}</a></p>
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
        caseNumber () {
            // console.log(this.$router.query.)
            const domain = document.domain
            let text = null
            switch (domain) {
            case 'www.huixinyigouh.com':
                text = '粤ICP备2020102189号-1'
                break
            case 'www.jiangduoduohw.com':
                text = '粤ICP备2020108328号-1'
                break
            case 'localhost':
                text = '粤ICP备2020102189号-1'
                break
            }
            return text
        }
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
